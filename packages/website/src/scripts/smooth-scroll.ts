export function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"], a[href^="/#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href')
      if (!href || href === '#') return
      if (href.startsWith('/#') && window.location.pathname !== '/') return
      const selector = href.startsWith('/#') ? href.slice(1) : href
      const target = document.querySelector(selector)
      if (target) {
        e.preventDefault()
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      }
    })
  })
}
