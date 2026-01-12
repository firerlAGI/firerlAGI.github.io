const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

const storage = (function() {
  try {
    const test = '__storage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return localStorage;
  } catch (e) {
    console.warn('localStorage不可用，使用内存缓存');
    return {
      _cache: {},
      getItem: function(key) {
        return this._cache[key];
      },
      setItem: function(key, value) {
        this._cache[key] = value;
      },
      removeItem: function(key) {
        delete this._cache[key];
      }
    };
  }
})();

const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

const langToggle = document.getElementById('langToggle');

const translations = {
  zh: {
    'nav.projects': '个人项目',
    'nav.about': '关于我',
    'nav.contact': '联系我',
    'projects.title': '精选项目',
    'projects.secondBrain.title': '第二大脑',
    'projects.secondBrain.description': 'AI 驱动的个人知识管理系统，帮助你构建高效的知识网络，提升学习与创造效率。',
    'projects.secondBrain.tech1': 'AI',
    'projects.secondBrain.tech2': '知识图谱',
    'projects.secondBrain.tech3': 'NLP',
    'projects.secondBrain.tech4': '机器学习',
    'projects.adhdAssistant.title': 'ADHD 助手',
    'projects.adhdAssistant.description': '智能时间管理与专注工具，专为 ADHD 人群设计，帮助你掌控时间。',
    'projects.devTools.title': '开发工具集',
    'projects.devTools.description': '提升开发效率的各种工具与插件，让编程变得更简单。',
    'projects.mobileApps.title': '移动应用',
    'projects.mobileApps.description': '跨平台移动应用开发，打造流畅的用户体验。',
    'projects.learnMore': '了解详情 →',
    'projects.knowMore': '了解更多 →',
    'about.title': '关于我',
    'about.role': '全栈开发者 | AI 研究者',
    'about.focusTitle': '当前聚焦：',
    'about.focus1': '第二大脑 - 个人知识管理系统',
    'about.focus2': 'ADHD 研究 - 用 AI 攻克注意力缺陷',
    'about.focus3': '人机协作 - 让技术更好地服务人类',
    'contact.title': '联系我',
    'contact.wechat': '微信',
    'contact.publicAccount': '公众号',
    'alert.comingSoon': '详情页正在开发中，敬请期待！',
    'langToggle.aria': '切换语言'
  },
  en: {
    'nav.projects': 'Projects',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'projects.title': 'Featured Projects',
    'projects.secondBrain.title': 'Second Brain',
    'projects.secondBrain.description': 'AI-powered personal knowledge management system to help you build an efficient knowledge network and enhance learning and creativity.',
    'projects.secondBrain.tech1': 'AI',
    'projects.secondBrain.tech2': 'Knowledge Graph',
    'projects.secondBrain.tech3': 'NLP',
    'projects.secondBrain.tech4': 'Machine Learning',
    'projects.adhdAssistant.title': 'ADHD Assistant',
    'projects.adhdAssistant.description': 'Smart time management and focus tool designed for people with ADHD to help you take control of your time.',
    'projects.devTools.title': 'Dev Tools',
    'projects.devTools.description': 'Various tools and plugins to boost development efficiency, making programming simpler.',
    'projects.mobileApps.title': 'Mobile Apps',
    'projects.mobileApps.description': 'Cross-platform mobile application development, creating smooth user experiences.',
    'projects.learnMore': 'Learn More →',
    'projects.knowMore': 'Learn More →',
    'about.title': 'About Me',
    'about.role': 'Full Stack Developer | AI Researcher',
    'about.focusTitle': 'Current Focus:',
    'about.focus1': 'Second Brain - Personal Knowledge Management System',
    'about.focus2': 'ADHD Research - Using AI to Overcome Attention Deficits',
    'about.focus3': 'Human-AI Collaboration - Making Technology Better Serve Humanity',
    'contact.title': 'Contact',
    'contact.wechat': 'WeChat',
    'contact.publicAccount': 'Official Account',
    'alert.comingSoon': 'Detail page is under development. Stay tuned!',
    'langToggle.aria': 'Switch Language'
  }
};

const projectNames = {
  'second-brain': { zh: '第二大脑', en: 'Second Brain' },
  'adhd-assistant': { zh: 'ADHD 助手', en: 'ADHD Assistant' },
  'dev-tools': { zh: '开发工具集', en: 'Dev Tools' },
  'mobile-apps': { zh: '移动应用', en: 'Mobile Apps' }
};

let currentLang = localStorage.getItem('lang') || 'zh';

function updateLanguage(lang) {
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  const langCurrent = langToggle.querySelector('.lang-current');
  const langNext = langToggle.querySelector('.lang-next');
  langCurrent.textContent = lang === 'zh' ? '中' : 'EN';
  langNext.textContent = lang === 'zh' ? 'EN' : '中';

  langToggle.setAttribute('aria-label', translations[lang]['langToggle.aria']);
  html.setAttribute('lang', lang === 'zh' ? 'zh-CN' : 'en');

  localStorage.setItem('lang', lang);
  currentLang = lang;
}

langToggle.addEventListener('click', () => {
  const newLang = currentLang === 'zh' ? 'en' : 'zh';
  updateLanguage(newLang);
});

updateLanguage(currentLang);

mobileMenuToggle.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  mobileMenuToggle.classList.toggle('active');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});

mobileNavLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    mobileMenuToggle.classList.remove('active');
    document.body.style.overflow = '';
  });
});

mobileMenu.addEventListener('click', (e) => {
  if (e.target === mobileMenu) {
    mobileMenu.classList.remove('open');
    mobileMenuToggle.classList.remove('active');
    document.body.style.overflow = '';
  }
});

themeToggle.addEventListener('click', () => {
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', newTheme);
  storage.setItem('theme', newTheme);
});

const savedTheme = storage.getItem('theme');
if (savedTheme) {
  html.setAttribute('data-theme', savedTheme);
}

const navbar = document.querySelector('.navbar');

let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  if (scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  lastScrollY = scrollY;
});

const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
      const offsetTop = targetSection.offsetTop - 52;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

const animateOnScrollElements = document.querySelectorAll('.card, .about-card, .contact-link, .section-title');

animateOnScrollElements.forEach((el, index) => {
  el.classList.add('animate-on-scroll');
  el.style.transitionDelay = `${index * 50}ms`;
  observer.observe(el);
});

document.querySelectorAll('.card-large, .card-small').forEach((card, index) => {
  card.style.transitionDelay = `${index * 100}ms`;
});

document.querySelectorAll('.card-cta').forEach(link => {
  link.addEventListener('click', (e) => {
    const projectName = link.getAttribute('data-project');
    const name = projectNames[projectName]?.[currentLang] || projectName;
    const alertMsg = translations[currentLang]['alert.comingSoon'];
    alert(`${name} ${alertMsg}`);
  });
});

const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = '发送中...';
    submitButton.disabled = true;
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (response.ok) {
        alert('留言发送成功！我会尽快回复您。');
        contactForm.reset();
      } else {
        alert('发送失败，请稍后重试。');
      }
    } catch (error) {
      alert('留言已记录（演示模式）。正式上线后将通过邮件发送。');
      contactForm.reset();
    } finally {
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    }
  });
}
