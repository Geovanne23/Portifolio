'use strict';

const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
let motionSetting = 'on';
const shouldReduceMotion = () => motionSetting === 'off' || (motionSetting === 'system' && motionPreference.matches);
const entranceAnimations = new Map();

function animateElement(element, frames, options) {
  if (!element) return;
  if (shouldReduceMotion() || typeof element.animate !== 'function') return;
  entranceAnimations.get(element)?.cancel();
  const animation = element.animate(frames, options);
  entranceAnimations.set(element, animation);
  const cleanUp = () => {
    if (entranceAnimations.get(element) === animation) entranceAnimations.delete(element);
  };
  animation.addEventListener('finish', cleanUp, { once: true });
  animation.addEventListener('cancel', cleanUp, { once: true });
}

function animateEntrance(element, delay = 0, scale = false) {
  animateElement(element, [
    { opacity: 0, transform: `translateY(24px)${scale ? ' scale(0.97)' : ''}` },
    { opacity: 1, transform: 'translateY(0) scale(1)' },
  ], { duration: 650, delay, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'backwards' });
}

motionPreference.addEventListener('change', () => {
  document.body.classList.toggle('motion-disabled', shouldReduceMotion());
  updateMotionControl();
  if (shouldReduceMotion()) {
    entranceAnimations.forEach(animation => animation.cancel());
    entranceAnimations.clear();
    document.getAnimations?.().forEach(animation => animation.cancel());
  }
});

// Local SVGs keep the navigation and controls independent of third-party CDNs.
const iconPaths = {
  'arrow-right': '<path d="M5 12h14m-6-6 6 6-6 6"/>',
  'external-link': '<path d="M15 3h6v6m0-6L10 14M9 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4"/>',
  moon: '<path d="M20.9 13a9 9 0 0 1-9.9-9.9A9 9 0 1 0 20.9 13Z"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>', x: '<path d="m6 6 12 12M6 18 18 6"/>',
  check: '<path d="m5 12 4 4L19 6"/>', copy: '<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H3V3h12v2"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 6 9 7 9-7"/>',
  send: '<path d="m22 2-7 20-4-9-9-4 20-7ZM22 2 11 13"/>',
  github: '<path d="M9 19c-5 1-5-3-7-3m7 6v-4c0-1 .2-2 1-3-4-.5-7-2-7-6 0-2 1-3 2-4-.4-1-.4-2 0-3 2 0 3 1 3 1 3-.5 5-.5 8 0 0 0 1-1 3-1 .4 1 .4 2 0 3 1 1 2 2 2 4 0 4-3 5.5-7 6 1 1 1 2 1 3v4"/>',
  code: '<path d="m8 6-6 6 6 6m8-12 6 6-6 6m-3-14-2 16"/>',
  'file-code': '<path d="M14 2H4v20h16V8l-6-6Zm0 0v6h6m-10 4-3 3 3 3m4-6 3 3-3 3"/>',
  braces: '<path d="M8 3H6v7l-3 2 3 2v7h2m8-18h2v7l3 2-3 2v7h-2"/>',
  atom: '<ellipse cx="12" cy="12" rx="10" ry="4"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/><circle cx="12" cy="12" r="1"/>',
  palette: '<path d="M12 3a9 9 0 1 0 0 18h2a2 2 0 0 0 0-4h-1a2 2 0 0 1 0-4h4a4 4 0 0 0 4-4c0-4-5-6-9-6Z"/><path d="M7 8h.01M12 6h.01M17 8h.01M6 13h.01"/>',
  server: '<rect x="3" y="3" width="18" height="7" rx="2"/><rect x="3" y="14" width="18" height="7" rx="2"/><path d="M7 6h.01M7 17h.01"/>',
  cpu: '<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 2v4m6-4v4M9 18v4m6-4v4M2 9h4m-4 6h4m12-6h4m-4 6h4"/>',
  'git-branch': '<path d="M6 3v12m12-9c0 8-12 4-12 9"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="3" r="3"/>',
  headphones: '<path d="M3 14v-3a9 9 0 0 1 18 0v3"/><rect x="3" y="12" width="4" height="9" rx="2"/><rect x="17" y="12" width="4" height="9" rx="2"/>',
  music: '<path d="M9 18V5l12-2v13M9 8l12-2"/><ellipse cx="6" cy="18" rx="3" ry="3"/><ellipse cx="18" cy="16" rx="3" ry="3"/>',
  disc: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="2"/><path d="M7 7 5 10m12 7 2-3"/>',
  tv: '<rect x="3" y="7" width="18" height="14" rx="2"/><path d="m7 2 5 5 5-5"/>',
  film: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 3v18M17 3v18M3 8h4m-4 8h4m10-8h4m-4 8h4"/>',
  user: '<circle cx="12" cy="7" r="4"/><path d="M4 21v-2a8 8 0 0 1 16 0v2"/>',
  'gamepad-2': '<path d="M7 7h10c3 0 4 3 5 10 .5 4-3 5-6 1H8c-3 4-6.5 3-6-1C3 10 4 7 7 7Z"/><path d="M6 10v6m-3-3h6m7-1h.01m3 3h.01"/>',
  crosshair: '<circle cx="12" cy="12" r="7"/><path d="M12 2v5m0 10v5M2 12h5m10 0h5"/>',
  box: '<path d="m12 3 9 5v9l-9 5-9-5V8l9-5Zm0 10 9-5m-9 5L3 8m9 5v9"/>',
  shield: '<path d="m12 2 9 4v6c0 6-9 10-9 10S3 18 3 12V6l9-4Z"/>',
  zap: '<path d="m13 2-9 12h7l-1 8 10-12h-7l1-8Z"/>',
  'message-square': '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z"/>',
  languages: '<path d="M3 5h12M9 3v2M5 5c0 5 4 8 8 10M13 5c0 5-4 8-8 10m9 6 4-10 4 10m-6-4h4"/>',
};
const icon = name => `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${iconPaths[name] || iconPaths.code}</svg>`;
document.querySelectorAll('[data-lucide]').forEach(el => { el.outerHTML = icon(el.dataset.lucide); });
const languageIcon = document.createElement('span');
languageIcon.className = 'language-icon';
languageIcon.innerHTML = icon('languages');
document.getElementById('lang-switch-container').prepend(languageIcon);

Object.assign(translations.pt, {
  skipLink: 'Pular para o conteúdo', heroTag: 'DESENVOLVEDOR WEB', heroLineOne: 'Ideias em mente.', heroLineTwo: 'Código na prática.',
  bio: 'Transformo criatividade e raciocínio lógico em experiências para a web. Desenvolvedor, entusiasta de tecnologia e gamer nas horas vagas.',
  portraitCaption: 'Entre uma ideia e a próxima.', portraitNote: 'Sempre aprendendo. Sempre criando.', projectsIntro: 'Experimentos, interfaces e soluções que saíram do papel.',
  projectsTitle: 'Projetos selecionados', skillsTitle: 'Minha caixa de ferramentas', filterAll: 'Todos', demoSoon: 'Demo em breve', codeSoon: 'Código em breve',
  projBtnLive: 'Ver projeto', aboutTitle: 'Além do código', aboutIntro: 'Minha curiosidade não termina no editor. Música, cinema e games também fazem parte de quem eu sou — e alimentam minha criatividade.',
  aboutMusicLabel: 'Na minha playlist', aboutArtistLabel: 'Artistas', aboutMovieLabel: 'Na minha tela', aboutGameLabel: 'Hora de jogar', backTop: 'Voltar ao topo ↑',
  copied: 'E-mail copiado!', copyFailed: 'Não foi possível copiar. Selecione o endereço ou use “Enviar e-mail”.', copyLabel: 'Copiar e-mail', themeLabel: 'Trocar tema', menuLabel: 'Abrir menu', closeLabel: 'Fechar menu',
});
Object.assign(translations.en, {
  skipLink: 'Skip to content', heroTag: 'WEB DEVELOPER', heroLineOne: 'Ideas in mind.', heroLineTwo: 'Code in motion.',
  bio: 'I turn creativity and logical thinking into experiences for the web. Developer, tech enthusiast and gamer in my free time.',
  portraitCaption: 'Between one idea and the next.', portraitNote: 'Always learning. Always creating.', projectsIntro: 'Experiments, interfaces and ideas brought to life.',
  projectsTitle: 'Selected projects', skillsTitle: 'My toolkit', filterAll: 'All', demoSoon: 'Demo coming soon', codeSoon: 'Code coming soon',
  projBtnLive: 'View project', aboutTitle: 'Beyond the code', aboutIntro: 'My curiosity goes beyond the editor. Music, movies and games are part of who I am — and fuel my creativity.',
  aboutMusicLabel: 'On my playlist', aboutArtistLabel: 'Artists', aboutMovieLabel: 'On my screen', aboutGameLabel: 'Time to play', backTop: 'Back to top ↑',
  copied: 'Email copied!', copyFailed: 'Could not copy. Select the address or use “Send email”.', copyLabel: 'Copy email', themeLabel: 'Switch theme', menuLabel: 'Open menu', closeLabel: 'Close menu',
});

const preferences = {
  get(key, fallback) { try { return localStorage.getItem(key) || fallback; } catch { return fallback; } },
  set(key, value) { try { localStorage.setItem(key, value); } catch { /* Storage may be blocked. */ } },
};
let language = 'pt';
function setLanguage(value, animate = false) {
  language = value === 'en' ? 'en' : 'pt';
  document.documentElement.lang = language === 'pt' ? 'pt-BR' : 'en';
  let visibleIndex = 0;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    if (translations[language][el.dataset.i18n]) el.textContent = translations[language][el.dataset.i18n];
    const rect = el.getBoundingClientRect();
    if (animate && rect.bottom > 0 && rect.top < window.innerHeight && rect.width > 0) {
      animateElement(el, [
        { opacity: 0, transform: 'translateY(8px)', filter: 'blur(3px)' },
        { opacity: 1, transform: 'translateY(0)', filter: 'blur(0)' },
      ], { duration: 420, delay: Math.min(visibleIndex++ * 18, 120), easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'backwards' });
    }
  });
  document.querySelectorAll('.lang-btn').forEach(el => {
    el.classList.toggle('active', el.dataset.lang === language);
    el.setAttribute('aria-pressed', el.dataset.lang === language);
  });
  document.getElementById('lang-switch-container').dataset.active = language;
  [['copyBtn', 'copyLabel'], ['theme-toggle', 'themeLabel'], ['mobile-menu-toggle', 'menuLabel'], ['mobile-menu-close', 'closeLabel']].forEach(([id, key]) => {
    document.getElementById(id).setAttribute('aria-label', translations[language][key]);
  });
  document.querySelector('.project-filters').setAttribute('aria-label', language === 'pt' ? 'Filtrar projetos' : 'Filter projects');
  document.getElementById('mobile-menu-overlay').setAttribute('aria-label', language === 'pt' ? 'Navegação' : 'Navigation');
  preferences.set('lang', language);
  updateMotionControl();
}
setLanguage(preferences.get('lang', 'pt'));
document.querySelectorAll('.lang-btn').forEach(el => el.addEventListener('click', () => {
  if (language === el.dataset.lang) return;
  setLanguage(el.dataset.lang, true);
  animateElement(languageIcon.querySelector('svg'), [{ transform: 'rotateY(0deg)' }, { transform: 'rotateY(180deg) scale(0.8)' }, { transform: 'rotateY(360deg)' }], { duration: 550, easing: 'ease-in-out' });
  animateElement(el, [{ transform: 'scale(0.8)' }, { transform: 'scale(1.12)' }, { transform: 'scale(1)' }], { duration: 350, easing: 'ease-out' });
}));

const themeButton = document.getElementById('theme-toggle');
function setTheme(value) {
  const light = value === 'light';
  document.body.classList.toggle('light-theme', light);
  themeButton.innerHTML = icon(light ? 'moon' : 'sun');
  themeButton.setAttribute('aria-pressed', String(light));
  document.querySelector('meta[name="theme-color"]').content = light ? '#f7f9f8' : '#0c1214';
  preferences.set('theme', light ? 'light' : 'dark');
}
setTheme(preferences.get('theme', 'dark'));
let themeTransitionTimeout;
themeButton.addEventListener('click', () => {
  clearTimeout(themeTransitionTimeout);
  document.body.classList.add('theme-switching');
  setTheme(document.body.classList.contains('light-theme') ? 'dark' : 'light');
  animateElement(themeButton.querySelector('svg'), [
    { opacity: 0, transform: 'rotate(-160deg) scale(0.3)' },
    { opacity: 1, transform: 'rotate(15deg) scale(1.18)', offset: 0.7 },
    { opacity: 1, transform: 'rotate(0deg) scale(1)' },
  ], { duration: 550, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' });
  themeTransitionTimeout = setTimeout(() => document.body.classList.remove('theme-switching'), 650);
});

const overlay = document.getElementById('mobile-menu-overlay');
const menuButton = document.getElementById('mobile-menu-toggle');
const main = document.querySelector('main');
const footer = document.querySelector('footer');
const header = document.querySelector('.site-header-wrapper');
let previousFocus;
function setMenu(open) {
  overlay.inert = !open;
  overlay.classList.toggle('open', open);
  document.body.classList.toggle('mobile-menu-open', open);
  menuButton.setAttribute('aria-expanded', String(open));
  main.inert = open;
  footer.inert = open;
  header.inert = open;
  if (open) {
    previousFocus = document.activeElement;
    document.getElementById('mobile-menu-close').focus();
    overlay.querySelectorAll('.mobile-nav-item').forEach((link, index) => animateEntrance(link, 80 + index * 50));
  } else if (previousFocus && overlay.contains(document.activeElement)) previousFocus.focus();
}
menuButton.addEventListener('click', () => setMenu(true));
document.getElementById('mobile-menu-close').addEventListener('click', () => setMenu(false));
overlay.addEventListener('click', event => { if (event.target === overlay) setMenu(false); });
overlay.querySelectorAll('a').forEach(el => el.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', event => {
  if (!overlay.classList.contains('open')) return;
  if (event.key === 'Escape') { event.preventDefault(); setMenu(false); }
  if (event.key === 'Tab') {
    const elements = [...overlay.querySelectorAll('a,button')];
    const first = elements[0], last = elements.at(-1);
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }
});
window.addEventListener('resize', () => { if (window.innerWidth > 960 && overlay.classList.contains('open')) setMenu(false); });

document.querySelectorAll('.filter-btn').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('.filter-btn').forEach(el => {
    const active = el === button;
    el.classList.toggle('active', active);
    el.setAttribute('aria-pressed', String(active));
  });
  let visibleIndex = 0;
  document.querySelectorAll('[data-category]').forEach(el => {
    entranceAnimations.get(el)?.cancel();
    el.hidden = button.dataset.filter !== 'all' && el.dataset.category !== button.dataset.filter;
    if (!el.hidden) animateEntrance(el, visibleIndex++ * 70, true);
  });
}));

let toastTimeout;
let copyFeedbackTimeout;
document.getElementById('copyBtn').addEventListener('click', async () => {
  const toast = document.getElementById('toast');
  try {
    await navigator.clipboard.writeText('Geovanne.ado@outlook.com');
    toast.textContent = translations[language].copied;
    const copyButton = document.getElementById('copyBtn');
    clearTimeout(copyFeedbackTimeout);
    copyButton.innerHTML = icon('check');
    copyButton.classList.add('copy-success');
    animateElement(copyButton.querySelector('svg'), [{ transform: 'scale(0) rotate(-45deg)' }, { transform: 'scale(1.2)' }, { transform: 'scale(1)' }], { duration: 400, easing: 'ease-out' });
    copyFeedbackTimeout = setTimeout(() => {
      copyButton.innerHTML = icon('copy');
      copyButton.classList.remove('copy-success');
    }, 2200);
  } catch { toast.textContent = translations[language].copyFailed; }
  clearTimeout(toastTimeout);
  toast.classList.add('visible');
  toastTimeout = setTimeout(() => toast.classList.remove('visible'), 4000);
});

const motionButton = document.createElement('button');
motionButton.id = 'motion-toggle';
motionButton.className = 'motion-toggle';
motionButton.type = 'button';
const footerLayout = footer.querySelector('.site-container') || footer;
footerLayout.classList.add('footer-inner');
footerLayout.appendChild(motionButton);

function updateMotionControl() {
  const control = document.getElementById('motion-toggle');
  if (!control) return;
  control.textContent = language === 'en'
    ? (shouldReduceMotion() ? 'Enable animations' : 'Pause animations')
    : (shouldReduceMotion() ? 'Ativar animações' : 'Pausar animações');
  control.setAttribute('aria-pressed', String(!shouldReduceMotion()));
}

function setMotion(setting) {
  motionSetting = ['on', 'off'].includes(setting) ? setting : 'system';
  document.body.classList.toggle('motion-enabled', motionSetting === 'on');
  document.body.classList.toggle('motion-disabled', shouldReduceMotion());
  preferences.set('motion-v2', motionSetting);
  updateMotionControl();
  if (shouldReduceMotion()) {
    entranceAnimations.forEach(animation => animation.cancel());
    entranceAnimations.clear();
    document.getAnimations?.().forEach(animation => animation.cancel());
  }
}

// The owner explicitly requested animation throughout the site. Start enabled;
// the pause control remains available and remembers the visitor's choice.
setMotion(preferences.get('motion-v2', 'on'));
motionButton.addEventListener('click', () => setMotion(shouldReduceMotion() ? 'on' : 'off'));

document.getElementById('current-year').textContent = new Date().getFullYear();
if ('IntersectionObserver' in window) {
  // Animate once on entry; content stays visible if animations are unavailable.
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const element = entry.target;
      if (element.classList.contains('hero-text-content')) {
        [...element.children].forEach((child, index) => animateEntrance(child, index * 75));
      } else if (element.classList.contains('interests-grid')) {
        [...element.children].forEach((child, index) => animateEntrance(child, index * 80, true));
      } else {
        const projectIndex = element.parentElement.classList.contains('projects-grid')
          ? [...element.parentElement.children].indexOf(element) % 2
          : 0;
        animateEntrance(element, projectIndex * 90, element.classList.contains('reveal-scale'));
      }
      revealObserver.unobserve(element);
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));

  const navigationObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      document.querySelectorAll('.nav-link-item,.mobile-nav-item').forEach(link => {
        const active = link.hash === `#${entry.target.id}`;
        link.classList.toggle('active', active);
        if (active) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-15% 0px -55% 0px', threshold: 0 });
  document.querySelectorAll('main section[id]').forEach(el => navigationObserver.observe(el));
}
