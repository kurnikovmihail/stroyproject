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

const requiredWhenEnabled = (enabled, key) => {
  const value = process.env[key]
  if (!enabled) return value ?? ''
  if (!value || !String(value).trim()) {
    throw new Error(`Missing required environment variable: ${key}`)
  }
  return value
}

const amoEnabled = toBoolean(process.env.AMO_ENABLED, false)

export const appConfig = {
  port: Number(process.env.API_PORT || 3000),
  nodeEnv: process.env.NODE_ENV || 'development',
  amo: {
    enabled: amoEnabled,
    subdomain: requiredWhenEnabled(amoEnabled, 'AMO_SUBDOMAIN'),
    clientId: requiredWhenEnabled(amoEnabled, 'AMO_CLIENT_ID'),
    clientSecret: requiredWhenEnabled(amoEnabled, 'AMO_CLIENT_SECRET'),
    redirectUri: requiredWhenEnabled(amoEnabled, 'AMO_REDIRECT_URI'),
    refreshToken: requiredWhenEnabled(amoEnabled, 'AMO_REFRESH_TOKEN'),
    pipelineId: toNumber(process.env.AMO_PIPELINE_ID),
    statusId: toNumber(process.env.AMO_STATUS_ID),
    sourceTag: process.env.AMO_SOURCE_TAG || 'Сайт stroyproject',
    tokenStoragePath: process.env.AMO_TOKEN_STORAGE_PATH || '/data/amo-token.json',
  },
}
