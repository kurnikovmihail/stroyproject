import dotenv from 'dotenv'

dotenv.config()

const toBoolean = (value, fallback = false) => {
  if (value == null) return fallback
  const normalized = String(value).trim().toLowerCase()
  if (['1', 'true', 'yes', 'on'].includes(normalized)) return true
  if (['0', 'false', 'no', 'off'].includes(normalized)) return false
  return fallback
}

const toNumber = (value) => {
  if (value == null || value === '') return null
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : null
}

const normalizeString = (value) => String(value ?? '').trim()

const sanitizeBearerToken = (value) => normalizeString(value).replace(/^bearer\s+/i, '')

const resolveAmoAuthMode = (value, hasLongLivedToken) => {
  const normalized = normalizeString(value).toLowerCase()
  if (!normalized) {
    return hasLongLivedToken ? 'token' : 'oauth'
  }

  if (normalized === 'oauth' || normalized === 'token') {
    return normalized
  }

  throw new Error('AMO_AUTH_MODE must be either "oauth" or "token"')
}

const requiredWhenEnabled = (enabled, key, transform = normalizeString) => {
  const value = process.env[key]
  if (!enabled) return transform(value)
  if (!value || !String(value).trim()) {
    throw new Error(`Missing required environment variable: ${key}`)
  }
  return transform(value)
}

const amoEnabled = toBoolean(process.env.AMO_ENABLED, false)
const amoLongLivedToken = sanitizeBearerToken(process.env.AMO_LONG_LIVED_TOKEN)
const amoAuthMode = resolveAmoAuthMode(process.env.AMO_AUTH_MODE, Boolean(amoLongLivedToken))
const amoUsesOAuth = amoAuthMode === 'oauth'
const amoUsesToken = amoAuthMode === 'token'

export const appConfig = {
  port: Number(process.env.API_PORT || 3000),
  nodeEnv: process.env.NODE_ENV || 'development',
  amo: {
    enabled: amoEnabled,
    authMode: amoAuthMode,
    subdomain: requiredWhenEnabled(amoEnabled, 'AMO_SUBDOMAIN'),
    clientId: requiredWhenEnabled(amoEnabled && amoUsesOAuth, 'AMO_CLIENT_ID'),
    clientSecret: requiredWhenEnabled(amoEnabled && amoUsesOAuth, 'AMO_CLIENT_SECRET'),
    redirectUri: requiredWhenEnabled(amoEnabled && amoUsesOAuth, 'AMO_REDIRECT_URI'),
    refreshToken: requiredWhenEnabled(amoEnabled && amoUsesOAuth, 'AMO_REFRESH_TOKEN'),
    longLivedToken: requiredWhenEnabled(amoEnabled && amoUsesToken, 'AMO_LONG_LIVED_TOKEN', sanitizeBearerToken),
    pipelineId: toNumber(process.env.AMO_PIPELINE_ID),
    statusId: toNumber(process.env.AMO_STATUS_ID),
    sourceTag: process.env.AMO_SOURCE_TAG || 'Сайт stroyproject',
    tokenStoragePath: process.env.AMO_TOKEN_STORAGE_PATH || '/data/amo-token.json',
  },
}
