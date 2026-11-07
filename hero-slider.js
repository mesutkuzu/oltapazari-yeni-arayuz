/* One carousel instance, disposed on every storefront route render. */
let disposeHeroSlider = () => {};

function mountHeroSlider() {
  disposeHeroSlider();
  const root = document.querySelector('[data-hero-slider]');
  if (!root) return;
  const slides = [...root.querySelectorAll('[data-hero-slide]')];
  const dots = [...root.querySelectorAll('[data-hero-go]')];
  const toggle = root.querySelector('[data-hero-toggle]');
  const current = root.querySelector('[data-hero-current]');
  const caption = root.querySelector('[data-hero-caption]');
  const announcement = root.querySelector('[data-hero-status]');
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const events = new AbortController();
  const on = (target, name, fn, options = {}) =>
    target.addEventListener(name, fn, { ...options, signal: events.signal });
  const pauseIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5v14M15 5v14"/></svg>';
  toggle.innerHTML = pauseIcon;
  const togglePath = toggle.querySelector('path');
  let index = 0;
  let paused = motion.matches;
  let hovered = false;
  let focused = false;
  let pointer = null;
  let timer;

  function schedule() {
    clearTimeout(timer);
    const label = paused ? 'Otomatik geçişi başlat' : 'Otomatik geçişi duraklat';
    toggle.setAttribute('aria-label', label);
    toggle.title = label;
    togglePath.setAttribute('d', paused ? 'm9 5 10 7-10 7Z' : 'M9 5v14M15 5v14');
    root.dataset.playing = String(!paused);
    if (!paused && !hovered && !focused && !document.hidden && slides.length > 1) {
      timer = setTimeout(() => show(index + 1), 7000);
    }
  }

  function show(next, manual = false) {
    index = (next + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      const active = i === index;
      slide.classList.toggle('is-active', active);
      slide.setAttribute('aria-hidden', String(!active));
      slide.inert = !active;
      dots[i].setAttribute('aria-current', String(active));
    });
    current.textContent = String(index + 1).padStart(2, '0');
    caption.textContent = slides[index].dataset.caption;
    if (manual) {
      paused = true;
      announcement.textContent = `${index + 1} / ${slides.length}: ${slides[index].querySelector('h2').textContent}`;
    }
    schedule();
  }

  on(root, 'click', event => {
    const button = event.target.closest('button');
    if (!button) return;
    if (button.hasAttribute('data-hero-go')) show(Number(button.dataset.heroGo), true);
    if (button.hasAttribute('data-hero-prev')) show(index - 1, true);
    if (button.hasAttribute('data-hero-next')) show(index + 1, true);
    if (button === toggle) {
      paused = !paused;
      // An explicit play request takes effect even while the control has focus.
      if (!paused) { focused = false; hovered = false; }
      schedule();
    }
  });
  on(root, 'keydown', event => {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      show(index + (event.key === 'ArrowRight' ? 1 : -1), true);
    }
  });
  on(root, 'pointerenter', event => {
    if (event.pointerType !== 'mouse') return;
    hovered = true;
    schedule();
  });
  on(root, 'pointerleave', event => {
    if (event.pointerType !== 'mouse') return;
    hovered = false;
    schedule();
  });
  on(root, 'focusin', () => { focused = true; schedule(); });
  on(root, 'focusout', event => {
    if (!root.contains(event.relatedTarget)) { focused = false; schedule(); }
  });
  on(root, 'pointerdown', event => {
    if (event.pointerType !== 'touch' || event.target.closest('a,button')) return;
    pointer = { id: event.pointerId, x: event.clientX, y: event.clientY };
  }, { passive: true });
  on(root, 'pointerup', event => {
    if (!pointer || pointer.id !== event.pointerId) return;
    const dx = event.clientX - pointer.x;
    const dy = event.clientY - pointer.y;
    pointer = null;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.3) {
      show(index + (dx < 0 ? 1 : -1), true);
    }
  }, { passive: true });
  on(root, 'pointercancel', () => { pointer = null; });
  on(document, 'visibilitychange', schedule);
  on(motion, 'change', () => { if (motion.matches) paused = true; schedule(); });
  disposeHeroSlider = () => { clearTimeout(timer); events.abort(); };
  show(0);
}

mountHeroSlider();
