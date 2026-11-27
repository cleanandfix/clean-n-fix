/* =========================================================
   CLEAN & FIX — Motion Layer (main.js 다음에 로드)
   ========================================================= */
(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  /* ---------- 1. 리빌 대상 지정 ---------- */
  const mark = (el, type = 'up', delay = 0) => {
    if (!el.dataset.reveal) el.dataset.reveal = type;
    if (delay) el.style.setProperty('--d', `${delay}s`);
  };

  $$('.section-head').forEach((el) => mark(el, 'up'));

  $$('.grid-3, .grid-4').forEach((grid) => {
    const cols = grid.classList.contains('grid-4') ? 4 : 3;
    [...grid.children].forEach((child, i) => {
      mark(child, grid.closest('#pricing') ? 'zoom' : 'up', (i % cols) * 0.12);
    });
  });

  $$('.faq-item').forEach((el, i) => mark(el, i % 2 ? 'right' : 'left', i * 0.08));
  $$('.footer-inner').forEach((el) => mark(el, 'fade'));

  /* 히어로 칩 순서 인덱스 */
  $$('.hero-list span').forEach((el, i) => el.style.setProperty('--i', i));

  const revealItems = $$('[data-reveal]');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach((el) => el.classList.add('is-visible'));
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );
    revealItems.forEach((el) => io.observe(el));
  }

  /* ---------- 2. 마키 무한 루프용 복제 ---------- */
  const track = $('.marquee-track');
  const set = $('.marquee-set', track || document);
  if (track && set) {
    track.appendChild(set.cloneNode(true));
  }

  /* ---------- 3. 스크롤 연동: 진행바 / 헤더 / 패럴랙스 / FAB ---------- */
  const progress = $('.scroll-progress');
  const header = $('.site-header');
  const hero = $('.hero-full');
  const heroBg = $('.hero-bg');
  const heroInner = $('.hero-inner');
  const fab = $('.fab-call');
  const modal = $('#quoteModal');

  let lastY = window.scrollY;
  let ticking = false;

  const onScroll = () => {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;

    if (progress) progress.style.transform = `scaleX(${max > 0 ? y / max : 0})`;

    if (header) {
      header.classList.toggle('is-scrolled', y > 10);
      const goingDown = y > lastY + 4;
      const goingUp = y < lastY - 4;
      if (goingDown && y > 320 && !modal?.classList.contains('open')) header.classList.add('is-hidden');
      else if (goingUp || y < 320) header.classList.remove('is-hidden');
    }

    if (!reduceMotion && hero) {
      const h = hero.offsetHeight;
      if (y < h) {
        if (heroBg) heroBg.style.translate = `0 ${y * 0.35}px`;
        if (heroInner) {
          heroInner.style.transform = `translateY(${y * 0.18}px)`;
          heroInner.style.opacity = String(Math.max(0, 1 - y / (h * 0.75)));
        }
      }
    }

    if (fab) fab.classList.toggle('is-shown', y > window.innerHeight * 0.5);

    lastY = y;
    ticking = false;
  };

  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        requestAnimationFrame(onScroll);
        ticking = true;
      }
    },
    { passive: true }
  );
  onScroll();

  /* ---------- 4. 현재 섹션 메뉴 하이라이트 ---------- */
  const navLinks = $$('.main-nav a[href^="#"]');
  if ('IntersectionObserver' in window && navLinks.length) {
    const map = new Map();
    navLinks.forEach((a) => {
      const target = document.getElementById(a.getAttribute('href').slice(1));
      if (target) map.set(target, a);
    });
    const navIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            navLinks.forEach((a) => a.classList.remove('is-active'));
            map.get(entry.target)?.classList.add('is-active');
          }
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    map.forEach((_, section) => navIO.observe(section));
  }

  /* ---------- 5. 히어로 포인터 반응 (오브 이동) ---------- */
  if (!reduceMotion && finePointer && hero) {
    hero.addEventListener('pointermove', (e) => {
      const r = hero.getBoundingClientRect();
      hero.style.setProperty('--hx', ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
      hero.style.setProperty('--hy', ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
    });
    hero.addEventListener('pointerleave', () => {
      hero.style.setProperty('--hx', 0);
      hero.style.setProperty('--hy', 0);
    });
  }

  /* ---------- 6. 카드 3D 틸트 + 글레어 ---------- */
  if (!reduceMotion && finePointer) {
    $$('.card, .pricing-card').forEach((card) => {
      card.addEventListener('pointerenter', () => {
        card.style.transition = 'transform 0.15s ease-out, box-shadow 0.3s ease, border-color 0.3s ease';
      });
      card.addEventListener('pointermove', (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        card.style.setProperty('--mx', `${px * 100}%`);
        card.style.setProperty('--my', `${py * 100}%`);
        const rx = (0.5 - py) * 8;
        const ry = (px - 0.5) * 10;
        card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
      });
      card.addEventListener('pointerleave', () => {
        card.style.transition = 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease, border-color 0.3s ease';
        card.style.transform = '';
      });
    });
  }

  /* ---------- 7. 마그네틱 버튼 ---------- */
  if (!reduceMotion && finePointer) {
    $$('.hero-cta, .header-actions .btn-primary, .fab-call').forEach((btn) => {
      const strength = btn.classList.contains('hero-cta') ? 0.3 : 0.2;
      btn.addEventListener('pointermove', (e) => {
        const r = btn.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        btn.style.translate = `${dx * strength}px ${dy * strength}px`;
      });
      btn.addEventListener('pointerleave', () => {
        btn.style.translate = '';
      });
    });
  }

  /* ---------- 8. 클릭 리플 ---------- */
  if (!reduceMotion) {
    document.addEventListener('pointerdown', (e) => {
      const btn = e.target.closest('.btn-primary, .btn-outline, .hero-cta');
      if (!btn) return;
      const r = btn.getBoundingClientRect();
      const size = Math.max(r.width, r.height);
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - r.left - size / 2}px`;
      ripple.style.top = `${e.clientY - r.top - size / 2}px`;
      btn.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  }

  /* ---------- 9. 가격 카운트업 ---------- */
  const prices = $$('.price').filter((el) => /\d/.test(el.textContent));
  const runCount = (el) => {
    const text = el.textContent;
    const match = text.match(/[\d,]+/);
    if (!match) return;
    const target = parseInt(match[0].replace(/,/g, ''), 10);
    const [before, after] = [text.slice(0, match.index), text.slice(match.index + match[0].length)];
    const duration = 1400;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 4);
      const value = Math.round((target * eased) / 1000) * 1000;
      el.textContent = before + (t < 1 ? value : target).toLocaleString('ko-KR') + after;
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  if (!reduceMotion && 'IntersectionObserver' in window) {
    const priceIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            runCount(entry.target);
            priceIO.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    prices.forEach((el) => priceIO.observe(el));
  }

  /* ---------- 10. FAQ 부드러운 열림을 위한 래핑 ---------- */
  $$('.faq-answer').forEach((answer) => {
    if (answer.querySelector('.faq-answer-inner')) return;
    const inner = document.createElement('div');
    inner.className = 'faq-answer-inner';
    while (answer.firstChild) inner.appendChild(answer.firstChild);
    answer.appendChild(inner);
  });

  /* ---------- 11. 히어로 CTA: 문의 섹션이 없으면 견적 모달 열기 ---------- */
  const heroCta = $('.hero-cta');
  heroCta?.addEventListener('click', (e) => {
    const id = (heroCta.getAttribute('href') || '').slice(1);
    if (!id || !document.getElementById(id)) {
      e.preventDefault();
      $('#openQuoteModal')?.click();
    }
  });
})();
