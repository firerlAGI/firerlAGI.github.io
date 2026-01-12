export function initScrollAnimations() {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in')
      }
    })
  }, observerOptions)

  // 为所有需要动画的元素添加观察
  document.querySelectorAll('.animate-on-scroll').forEach((element) => {
    observer.observe(element)
  })
}

export function initHeroAnimations() {
  const hero = document.querySelector('.hero')
  if (!hero) return

  // 为子元素添加延迟动画
  const elements = hero.querySelectorAll('.hero-title, .hero-subtitle, .hero-cta')
  elements.forEach((el, index) => {
    (el as HTMLElement).style.animationDelay = `${index * 0.2}s`
  })
}
