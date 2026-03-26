const FALLBACK_PHONE = '+79667722280'
const CALLIBRI_OPEN_DELAY_MS = 1400

const isVisibleElement = (element) => {
  if (!element) return false

  const style = window.getComputedStyle(element)
  const hasSize = element.offsetWidth > 0 || element.offsetHeight > 0

  return style.display !== 'none' && style.visibility !== 'hidden' && Number(style.opacity || 1) > 0 && hasSize
}

const hasOpenedCallibriWidget = () => {
  const selectors = [
    '[id*="callibri"]',
    '[class*="callibri"]',
    '[class*="multichat"]',
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
  let hasCalledAnyLauncher = false

  for (const launcher of launchers) {
    try {
      launcher()
      hasCalledAnyLauncher = true
    } catch {
      // Try the next available launcher.
    }
  }

  if (!hasCalledAnyLauncher) {
    runFallback()
    return
  }

  window.setTimeout(() => {
    if (hasOpenedCallibriWidget()) return
    runFallback()
  }, CALLIBRI_OPEN_DELAY_MS)
}
