import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import { z } from 'zod'

import { appConfig } from './config.js'
import { AmoClient } from './lib/amoClient.js'

const app = express()
const amoClient = new AmoClient(appConfig.amo)

const objectTypeLabels = {
  'private-house': 'Частный дом',
  villa: 'Вилла / резиденция',
  hotel: 'Гостиничный объект',
  commercial: 'Коммерческий объект',
  reconstruction: 'Реконструкция',
}

const firstStepLabels = {
  budget: 'Ориентир по стоимости',
  analysis: 'Разбор участка и ограничений',
  scope: 'Подходящий формат проекта',
  consultation: 'Экспертную консультацию',
}

const leadSchema = z.object({
  name: z.string().trim().min(2).max(120),
  phone: z.string().trim().min(6).max(40),
  objectType: z.enum(['private-house', 'villa', 'hotel', 'commercial', 'reconstruction']),
  firstStep: z.enum(['budget', 'analysis', 'scope', 'consultation']),
  comment: z.string().trim().max(1200).optional().default(''),
  consent: z.literal(true),
})

app.use(helmet({
  contentSecurityPolicy: false,
}))
app.use(express.json({ limit: '256kb' }))
app.use(morgan('tiny'))

app.get('/api/health', (_req, res) => {
  res.status(200).json({ ok: true, provider: appConfig.amo.enabled ? 'amoCRM' : 'disabled' })
})

app.post('/api/leads', async (req, res) => {
  const parsed = leadSchema.safeParse(req.body)

  if (!parsed.success) {
    return res.status(400).json({
      ok: false,
      message: 'Проверьте корректность данных формы.',
      issues: parsed.error.issues.map((issue) => issue.path.join('.')),
    })
  }

  if (!amoClient.isEnabled) {
    return res.status(503).json({
      ok: false,
      message: 'Интеграция CRM временно настраивается. Напишите нам в WhatsApp или Telegram.',
    })
  }

  const normalized = {
    ...parsed.data,
    objectTypeLabel: objectTypeLabels[parsed.data.objectType],
    firstStepLabel: firstStepLabels[parsed.data.firstStep],
    comment: parsed.data.comment || '',
  }

  try {
    const { leadId } = await amoClient.createLeadFromForm(normalized)

    return res.status(201).json({
      ok: true,
      message: 'Заявка отправлена. Свяжемся с вами в рабочее время.',
      leadId,
    })
  } catch (error) {
    console.error('Failed to send lead to amoCRM:', error)

    return res.status(502).json({
      ok: false,
      message: 'Не удалось отправить заявку в CRM. Попробуйте ещё раз или свяжитесь с нами напрямую.',
    })
  }
})

app.use((_req, res) => {
  res.status(404).json({ ok: false, message: 'Not found' })
})

app.listen(appConfig.port, () => {
  console.log(`[api] listening on :${appConfig.port} (${appConfig.nodeEnv})`)
  console.log(`[api] amoCRM integration: ${appConfig.amo.enabled ? 'enabled' : 'disabled'}`)
})
