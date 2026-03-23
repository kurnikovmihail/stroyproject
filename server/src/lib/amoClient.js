import fs from 'node:fs/promises'
import path from 'node:path'

const EXPIRES_SKEW_MS = 60_000

export class AmoClient {
  constructor(config) {
    this.config = config
    this.baseUrl = config.subdomain ? `https://${config.subdomain}.amocrm.ru` : ''
    this.tokenState = {
      accessToken: '',
      refreshToken: config.refreshToken,
      expiresAt: 0,
    }
    this.tokenLoaded = false
  }

  get isEnabled() {
    return Boolean(this.config.enabled)
  }

  async createLeadFromForm(formData) {
    const leadPayload = this.buildLeadPayload(formData)
    const leadResponse = await this.request('/api/v4/leads/complex', {
      method: 'POST',
      body: JSON.stringify([leadPayload]),
    })

    const leadId = this.extractLeadId(leadResponse)

    if (leadId) {
      const noteText = this.buildLeadNote(formData)
      await this.request(`/api/v4/leads/${leadId}/notes`, {
        method: 'POST',
        body: JSON.stringify([
          {
            note_type: 'common',
            params: { text: noteText },
          },
        ]),
      })
    }

    return { leadId }
  }

  buildLeadPayload(formData) {
    const tags = this.config.sourceTag ? [{ name: this.config.sourceTag }] : []

    const lead = {
      name: `Заявка с сайта · ${formData.objectTypeLabel}`,
      _embedded: {
        contacts: [
          {
            name: formData.name,
            custom_fields_values: [
              {
                field_code: 'PHONE',
                values: [{ value: formData.phone, enum_code: 'WORK' }],
              },
            ],
          },
        ],
      },
    }

    if (tags.length) {
      lead._embedded.tags = tags
    }

    if (this.config.pipelineId) {
      lead.pipeline_id = this.config.pipelineId
    }

    if (this.config.statusId) {
      lead.status_id = this.config.statusId
    }

    return lead
  }

  buildLeadNote(formData) {
    return [
      'Новая заявка с лендинга stroyproject',
      `Имя: ${formData.name}`,
      `Телефон: ${formData.phone}`,
      `Тип объекта: ${formData.objectTypeLabel}`,
      `Первый запрос: ${formData.firstStepLabel}`,
      `Комментарий: ${formData.comment || '—'}`,
      `Согласие ПДн: получено`,
    ].join('\n')
  }

  extractLeadId(payload) {
    if (Array.isArray(payload) && payload[0]?.id) {
      return payload[0].id
    }

    if (payload?._embedded?.leads?.[0]?.id) {
      return payload._embedded.leads[0].id
    }

    return null
  }

  async request(endpoint, options, retry = true) {
    const accessToken = await this.getAccessToken()

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        ...(options.headers || {}),
      },
    })

    if (response.status === 401 && retry) {
      await this.refreshAccessToken(true)
      return this.request(endpoint, options, false)
    }

    if (!response.ok) {
      const rawBody = await response.text()
      throw new Error(`amoCRM API ${response.status}: ${rawBody.slice(0, 500)}`)
    }

    if (response.status === 204) {
      return null
    }

    return response.json()
  }

  async getAccessToken() {
    if (!this.tokenLoaded) {
      await this.loadTokenState()
    }

    if (this.tokenState.accessToken && Date.now() + EXPIRES_SKEW_MS < this.tokenState.expiresAt) {
      return this.tokenState.accessToken
    }

    await this.refreshAccessToken(false)
    return this.tokenState.accessToken
  }

  async refreshAccessToken(forceUsingStoredRefreshToken) {
    const refreshToken = forceUsingStoredRefreshToken
      ? this.tokenState.refreshToken || this.config.refreshToken
      : this.tokenState.refreshToken || this.config.refreshToken

    if (!refreshToken) {
      throw new Error('Missing refresh token for amoCRM OAuth')
    }

    const response = await fetch(`${this.baseUrl}/oauth2/access_token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: this.config.clientId,
        client_secret: this.config.clientSecret,
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        redirect_uri: this.config.redirectUri,
      }),
    })

    if (!response.ok) {
      const rawBody = await response.text()
      throw new Error(`amoCRM OAuth ${response.status}: ${rawBody.slice(0, 500)}`)
    }

    const tokenPayload = await response.json()

    this.tokenState = {
      accessToken: tokenPayload.access_token,
      refreshToken: tokenPayload.refresh_token || refreshToken,
      expiresAt: Date.now() + Math.max((tokenPayload.expires_in || 900) * 1000, 60_000),
    }

    this.tokenLoaded = true
    await this.persistTokenState()
  }

  async loadTokenState() {
    this.tokenLoaded = true

    try {
      const raw = await fs.readFile(this.config.tokenStoragePath, 'utf8')
      const parsed = JSON.parse(raw)
      this.tokenState = {
        accessToken: parsed.accessToken || '',
        refreshToken: parsed.refreshToken || this.config.refreshToken,
        expiresAt: Number(parsed.expiresAt || 0),
      }
    } catch {
      this.tokenState = {
        accessToken: '',
        refreshToken: this.config.refreshToken,
        expiresAt: 0,
      }
    }
  }

  async persistTokenState() {
    try {
      const targetDir = path.dirname(this.config.tokenStoragePath)
      await fs.mkdir(targetDir, { recursive: true })
      await fs.writeFile(this.config.tokenStoragePath, JSON.stringify(this.tokenState, null, 2), 'utf8')
    } catch (error) {
      console.error('Failed to persist amoCRM token state:', error)
    }
  }
}
