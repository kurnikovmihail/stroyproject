const FALLBACK_PHONE = '+79667722280'
const CALLIBRI_OPEN_DELAY_MS = 1400

const isVisibleElement = (element) => {
  if (!element) return false

  const style = window.getComputedStyle(element)
  const rect = element.getBoundingClientRect()
  const hasSize = rect.width > 0 && rect.height > 0

  return style.display !== 'none' && style.visibility !== 'hidden' && Number(style.opacity || 1) > 0 && hasSize
}

const hasOpenedCallbackPopup = () => {
  const popup = document.querySelector('#cbw-popupContainer')
  const form = document.querySelector('#cbw-form')

  if (!popup || !form) return false

  const popupStyle = window.getComputedStyle(popup)
  const transform = popupStyle.transform || ''
  const isCollapsedByTransform = transform.includes('matrix(0')

  return popup.classList.contains('cbw-show') && !isCollapsedByTransform && isVisibleElement(form)
}

const hasOpenedCallibriWidget = () => {
  if (hasOpenedCallbackPopup()) return true

  const selectors = [
    '.callibri_widget_in',
    '.callibri-widget-in',
    '.callibri_chat_window',
    '[class*="callibri"][class*="open"]',
    '[class*="multichat"][class*="open"]',
    'iframe[src*="callibri"]',
    'iframe[src*="gudok"]',
  ]

  for (const selector of selectors) {
    const nodes = document.querySelectorAll(selector)
    for (const node of nodes) {
      if (isVisibleElement(node)) return true
    }
  }

  return false
}

const isMobileDevice = () => {
  const userAgent = navigator.userAgent || ''
  const mobilePattern = /Android|iPhone|iPad|iPod|Mobile|Windows Phone/i
  return mobilePattern.test(userAgent)
}

const showFallbackToast = () => {
  const toastId = 'callibri-fallback-toast'
  if (document.getElementById(toastId)) return

  const toast = document.createElement('div')
  toast.id = toastId
  toast.setAttribute('role', 'status')
  toast.textContent = 'Виджет временно недоступен. Оставьте телефон в форме ниже — перезвоним за 10–15 минут.'

  Object.assign(toast.style, {
    position: 'fixed',
    right: '20px',
    bottom: '20px',
    maxWidth: '320px',
    padding: '12px 14px',
    borderRadius: '14px',
    border: '1px solid rgba(0, 196, 180, 0.34)',
    background: 'rgba(16, 31, 57, 0.96)',
    color: '#e0e0e0',
    fontSize: '13px',
    lineHeight: '1.45',
    boxShadow: '0 12px 30px rgba(0, 0, 0, 0.32)',
    zIndex: '9999',
    opacity: '0',
    transform: 'translateY(8px)',
    transition: 'opacity 240ms ease, transform 240ms ease',
  })

  document.body.appendChild(toast)
  window.requestAnimationFrame(() => {
    toast.style.opacity = '1'
    toast.style.transform = 'translateY(0)'
  })

  window.setTimeout(() => {
    toast.style.opacity = '0'
    toast.style.transform = 'translateY(6px)'
    window.setTimeout(() => toast.remove(), 260)
  }, 4200)
}

const scrollToContactsAndFocus = () => {
  const target =
    document.getElementById('contacts') ||
    document.getElementById('contact') ||
    document.querySelector('.contact-section')

  target?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  window.setTimeout(() => {
    const phoneField =
      document.querySelector('.contact-form input[name="phone"]') ||
      document.querySelector('.contact-form input[type="tel"]')

    if (phoneField instanceof HTMLElement) {
      phoneField.focus({ preventScroll: true })
    }
  }, 550)
}

const runFallback = () => {
  if (isMobileDevice()) {
    window.location.href = `tel:${FALLBACK_PHONE}`
    return
  }

  scrollToContactsAndFocus()
  showFallbackToast()
}

const tryOpenInitializedWidget = () => {
  const callbackWidget = window.callibriCallbackWidget

  try {
    if (callbackWidget && typeof callbackWidget.openCallbackWindow === 'function') {
      callbackWidget.openCallbackWindow(false)
      return true
    }

    if (callbackWidget && typeof callbackWidget.toggleVisibility === 'function') {
      callbackWidget.toggleVisibility(false)
      return true
    }

    if (window.callibriPopUpWidget && typeof window.callibriPopUpWidget.open === 'function') {
      window.callibriPopUpWidget.open()
      return true
    }

    if (typeof window.callibri_open_chat === 'function') {
      window.callibri_open_chat()
      return true
    }
  } catch (error) {
    console.warn('[Callibri] Failed to open initialized widget instance.', error)
  }

  return false
}

const getCallableLaunchers = () => {
  const runtimeConfig = window._callibri ?? {}
  const launchers = []
  const hasModuleSettings = Boolean(runtimeConfig.module_settings)

  // 1) Preferred: explicit callback widget (if enabled in Callibri account)
  if (runtimeConfig.ms_callback && typeof window.callibriCallbackWidgetStart === 'function') {
    launchers.push(window.callibriCallbackWidgetStart)
  }

  if (runtimeConfig.is_online_chat && typeof window.callibriOnlineChatStart === 'function') {
    launchers.push(window.callibriOnlineChatStart)
  }

  if (runtimeConfig.popup_settings && typeof window.callibriPopupWidgetStart === 'function') {
    launchers.push(window.callibriPopupWidgetStart)
  }

  // 2) Generic widget: use only when module settings are present.
  if (hasModuleSettings && typeof window.callibriWidgetStart === 'function' && !launchers.includes(window.callibriWidgetStart)) {
    launchers.push(window.callibriWidgetStart)
  }

  return launchers
}

const attemptLaunchers = (launchers, index = 0) => {
  if (index >= launchers.length) {
    console.warn('[Callibri] Widget did not open from available launchers. Fallback activated.')
    runFallback()
    return
  }

  const launcher = launchers[index]

  try {
    launcher()
  } catch (error) {
    console.warn('[Callibri] Launcher failed, trying next one.', error)
    attemptLaunchers(launchers, index + 1)
    return
  }

  window.setTimeout(() => {
    tryOpenInitializedWidget()

    if (hasOpenedCallibriWidget()) return

    window.setTimeout(() => {
      if (hasOpenedCallibriWidget()) return
      attemptLaunchers(launchers, index + 1)
    }, 420)
  }, CALLIBRI_OPEN_DELAY_MS)
}

const launchCallibriOrFallback = () => {
  if (hasOpenedCallibriWidget()) return

  const launchers = getCallableLaunchers()
  if (!launchers.length) {
    console.warn('[Callibri] No enabled widget modules in current Callibri config.', window._callibri)
    runFallback()
    return
  }

  attemptLaunchers(launchers, 0)
}

export const openCallibriCall = () => {
  if (hasOpenedCallibriWidget()) return

  const openedInitializedWidget = tryOpenInitializedWidget()
  if (openedInitializedWidget) {
    window.setTimeout(() => {
      if (hasOpenedCallibriWidget()) return
      launchCallibriOrFallback()
    }, 360)
    if (hasOpenedCallibriWidget()) return
    return
  }

  launchCallibriOrFallback()
}
