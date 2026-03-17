export const useExpandTransition = () => {
  const animateExpandEnter = (el) => {
    el.style.height = '0'
    el.style.opacity = '0'
    el.style.overflow = 'hidden'
    el.style.transition = 'height 320ms cubic-bezier(0.22, 1, 0.36, 1), opacity 220ms ease'
    void el.offsetHeight
    el.style.height = `${el.scrollHeight}px`
    el.style.opacity = '1'
  }

  const animateExpandAfterEnter = (el) => {
    el.style.height = 'auto'
    el.style.overflow = 'visible'
  }

  const animateExpandLeave = (el) => {
    el.style.height = `${el.scrollHeight}px`
    el.style.opacity = '1'
    el.style.overflow = 'hidden'
    el.style.transition = 'height 280ms cubic-bezier(0.22, 1, 0.36, 1), opacity 180ms ease'
    void el.offsetHeight
    el.style.height = '0'
    el.style.opacity = '0'
  }

  const animateExpandAfterLeave = (el) => {
    el.style.height = ''
    el.style.opacity = ''
    el.style.overflow = ''
    el.style.transition = ''
  }

  return {
    animateExpandEnter,
    animateExpandAfterEnter,
    animateExpandLeave,
    animateExpandAfterLeave,
  }
}
