const FALLBACK_PHONE = '+79667722280'

const getCallableLaunchers = () => {
  const runtimeConfig = window._callibri ?? {}
  const launchers = []

  if (runtimeConfig.is_online_chat && typeof window.callibriOnlineChatStart === 'function') {
    launchers.push(window.callibriOnlineChatStart)
  }

  if (runtimeConfig.ms_callback && typeof window.callibriCallbackWidgetStart === 'function') {
    launchers.push(window.callibriCallbackWidgetStart)
  }

  if (runtimeConfig.popup_settings && typeof window.callibriPopupWidgetStart === 'function') {
    launchers.push(window.callibriPopupWidgetStart)
  }

  const fallbackOrder = [
    window.callibriWidgetStart,
    window.callibriOnlineChatStart,
    window.callibriCallbackWidgetStart,
    window.callibriPopupWidgetStart,
  ]

  for (const launcher of fallbackOrder) {
    if (typeof launcher === 'function' && !launchers.includes(launcher)) {
      launchers.push(launcher)
    }
  }

  return launchers
}

export const openCallibriCall = () => {
  const launchers = getCallableLaunchers()

  for (const launcher of launchers) {
    try {
      launcher()
      return
    } catch {
      // Try the next available launcher.
    }
  }

  window.location.href = `tel:${FALLBACK_PHONE}`
}
