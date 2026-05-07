/* ═══════════════════════════════════════════════════════════
   PreviewKit Pitch — script.js
   Renders from content.json, then initialises animations.
   Palette: Midcentury Touch — Dusty Pink / Dark Teal /
            Terracotta / Olive Green
   ═══════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── SVG Icons ─────────────────────────────────────────── */
  const ICONS = {
    clock: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
    chat: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
    'x-circle': `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`,
    zap: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
    sliders: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></svg>`,
    shield: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
    arrow: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`,
    arrow2: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`,
    send: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`,
    check: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
  };

  function icon(name) { return ICONS[name] || ''; }

  /* ── Fetch & Boot ───────────────────────────────────────── */
  fetch('./content.json')
    .then(r => r.json())
    .then(data => {
      renderNav(data.nav);
      renderHero(data.hero);
      renderTrust(data.trust);
      renderProblem(data.problem);
      renderSolution(data.solution);
      renderHowItWorks(data.howItWorks);
      renderImpact(data.impact);
      renderComparison(data.comparison);
      renderDemo();
      renderInfrastructure(data.infrastructure);
      renderContact(data.contact);
      renderFooter(data.footer);

      document.title = data.meta.title;
      document.querySelector('meta[name="description"]')
        .setAttribute('content', data.meta.description);

      initProgress();
      initNav();
      initScrollReveal();
      initCounters();
      initCarousel();
    })
    .catch(err => console.error('[PreviewKit pitch] Failed to load content.json', err));

  /* ══════════════════════════════════════════════════════════
     RENDER
     ══════════════════════════════════════════════════════════ */

  function renderNav(d) {
    document.getElementById('pk-nav').innerHTML = `
      <div class="container">
        <div class="nav-inner">
          <a href="#hero" class="nav-brand">Preview<span>Kit</span></a>
          <nav>
            <ul class="nav-links">
              ${d.links.map(l => `<li><a href="${l.href}">${l.label}</a></li>`).join('')}
            </ul>
          </nav>
          <a href="${d.cta.href}" class="nav-cta">${d.cta.label} ${icon('arrow')}</a>
        </div>
      </div>`;
  }

  function renderHero(d) {
    const sec = document.getElementById('hero');

    // Carousel slides — use <img> so the full phone case is visible
    const slides = d.images.map((img, i) => `
      <div class="hero-slide${i === 0 ? ' active' : ''}" data-index="${i}">
        <img src="${img.src}" alt="${img.alt}" loading="${i === 0 ? 'eager' : 'lazy'}">
      </div>`).join('');

    // Pill dots
    const dots = d.images.map((_, i) => `
      <button class="hero-dot${i === 0 ? ' active' : ''}" data-slide="${i}" aria-label="Slide ${i + 1}"></button>
    `).join('');

    sec.innerHTML = `
      <!-- LEFT — headline & CTA -->
      <div class="hero-left reveal reveal-left">
        <div class="hero-eyebrow-badge">
          <div class="hero-eyebrow-dot"></div>
          <span class="hero-eyebrow-label">${d.eyebrow}</span>
        </div>
        <h1 class="hero-headline">
          ${d.headline.map((line, i) => i === 0 ? `<em>${line}</em>` : `<span>${line}</span>`).join('<br>')}
        </h1>
        <p class="hero-sub">${d.sub}</p>
        <div class="hero-actions">
          <a href="${d.cta.href}" class="btn-primary">${d.cta.label} ${icon('arrow')}</a>
          <a href="${d.cta2.href}" class="btn-secondary">${d.cta2.label} ${icon('arrow2')}</a>
        </div>
      </div>

      <!-- RIGHT — full phone case carousel -->
      <div class="hero-right">
        <div class="hero-carousel">${slides}</div>
        <button class="hero-arrow hero-arrow-prev" type="button" aria-label="Previous slide">${icon('arrow2')}</button>
        <button class="hero-arrow hero-arrow-next" type="button" aria-label="Next slide">${icon('arrow2')}</button>
        <div class="hero-dots">${dots}</div>
      </div>`;
  }

  function renderTrust(d) {
    const sec = document.getElementById('trust');
    if (!sec || !d) return;
    sec.innerHTML = `
      <div class="container">
        <div class="trust-strip">
          ${d.items.map(item => `
            <div class="trust-item">
              <span class="trust-check">${icon('check')}</span>
              <span class="trust-label">${item.label}</span>
            </div>`).join('')}
        </div>
      </div>`;
  }

  function renderProblem(d) {
    document.getElementById('problem').innerHTML = `
      <div class="container">
        <div class="section-inner">
          <div class="problem-header reveal">
            <div class="eyebrow" style="margin-bottom:14px">${d.eyebrow}</div>
            <h2 class="section-headline">${d.headline}</h2>
            <p class="section-sub" style="margin-top:16px">${d.sub}</p>
          </div>
          <div class="problem-grid">
            ${d.points.map((p, i) => `
              <div class="problem-card reveal reveal-delay-${i + 1}">
                <div class="problem-icon">${icon(p.icon)}</div>
                <div class="problem-title">${p.title}</div>
                <p class="problem-body">${p.body}</p>
              </div>`).join('')}
          </div>
        </div>
      </div>`;
  }

  function renderSolution(d) {
    document.getElementById('solution').innerHTML = `
      <div class="container">
        <div class="section-inner">
          <div class="solution-header reveal">
            <div class="eyebrow" style="margin-bottom:14px">${d.eyebrow}</div>
            <h2 class="section-headline">${d.headline}</h2>
            <p class="section-sub" style="margin-top:16px">${d.sub}</p>
          </div>
          <div class="solution-pillars reveal reveal-scale">
            ${d.pillars.map((p, i) => `
              <div class="pillar">
                <div class="pillar-num">0${i + 1}</div>
                <div class="pillar-label">${p.label}</div>
                <p class="pillar-sub">${p.sub}</p>
              </div>`).join('')}
          </div>
        </div>
      </div>`;
  }

  function renderHowItWorks(d) {
    document.getElementById('how-it-works').innerHTML = `
      <div class="container">
        <div class="section-inner">
          <div class="how-header reveal">
            <div class="eyebrow" style="margin-bottom:14px">${d.eyebrow}</div>
            <h2 class="section-headline">${d.headline}</h2>
          </div>
          <div class="steps-grid">
            ${d.steps.map((s, i) => `
              <div class="step reveal reveal-delay-${i + 1}">
                <div class="step-num">${s.n}</div>
                <div class="step-label">${s.label}</div>
                <p class="step-body">${s.body}</p>
              </div>`).join('')}
          </div>
        </div>
      </div>`;
  }

  function renderDemo() {
    const sec = document.getElementById('demo');
    if (!sec) return;

    sec.innerHTML = `
    <div class="container">
      <div class="section-inner">

        <div class="demo-header reveal">
          <div class="eyebrow" style="margin-bottom:14px">Before &amp; After</div>
          <h2 class="section-headline">Same store. Completely different experience.</h2>
          <p class="section-sub" style="margin-top:16px">
            See what your product page looks like when buyers can preview their exact design — before they hit checkout.
          </p>
        </div>

        <!-- Before / After videos -->
        <div class="demo-ba-grid reveal reveal-scale">

          <!-- BEFORE -->
          <div class="demo-ba-col is-before">
            <div class="demo-ba-label is-before">
              <span class="demo-ba-label-dot"></span>Without PreviewKit
            </div>
            <div class="demo-window">
              <div class="demo-chrome">
                <div class="demo-chrome-dots"><span></span><span></span><span></span></div>
                <div class="demo-chrome-bar">yourstore.myshopify.com/products/tee</div>
              </div>
              <div class="demo-video-wrap">
                <video id="pk-video-before" src="./assets/Previewkit-Before1.mp4"
                  muted playsinline loop preload="metadata"></video>
                <div class="demo-play-overlay" id="pk-overlay-before">
                  <button class="demo-play-btn" id="pk-play-before" aria-label="Play before video">
                    <svg class="icon-play" viewBox="0 0 24 24"><polygon points="5,3 19,12 5,21"/></svg>
                    <svg class="icon-pause" viewBox="0 0 24 24">
                      <rect x="5" y="3" width="4" height="18" rx="1"/>
                      <rect x="15" y="3" width="4" height="18" rx="1"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- AFTER -->
          <div class="demo-ba-col is-after">
            <div class="demo-ba-label is-after">
              <span class="demo-ba-label-dot"></span>With PreviewKit
            </div>
            <div class="demo-window">
              <div class="demo-chrome">
                <div class="demo-chrome-dots"><span></span><span></span><span></span></div>
                <div class="demo-chrome-bar">yourstore.myshopify.com/products/tee</div>
              </div>
              <div class="demo-video-wrap">
                <video id="pk-video-after" src="./assets/Previewkit-After1.mp4"
                  muted playsinline loop preload="metadata"></video>
                <div class="demo-play-overlay" id="pk-overlay-after">
                  <button class="demo-play-btn" id="pk-play-after" aria-label="Play after video">
                    <svg class="icon-play" viewBox="0 0 24 24"><polygon points="5,3 19,12 5,21"/></svg>
                    <svg class="icon-pause" viewBox="0 0 24 24">
                      <rect x="5" y="3" width="4" height="18" rx="1"/>
                      <rect x="15" y="3" width="4" height="18" rx="1"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>

        <!-- Shopify integration strip -->
        <div class="demo-shopify-strip reveal">
          <div class="demo-shopify-eyebrow">Shopify Integration</div>
          <h3 class="demo-shopify-headline">
            <em>Paste one snippet into your theme.</em><br>That's it. You're live.
          </h3>
          <p class="demo-shopify-sub">
            No rebuilding your store. No custom dev work. Drop the snippet into your Shopify product template and PreviewKit handles everything — previews, file validation, print-ready output.
          </p>
         <div class="demo-shopify-code">
  <pre style="margin:0;white-space:pre-wrap">
<span class="code-comment">&lt;!-- Paste into your product template --&gt;</span>

<span class="code-tag">&lt;div</span> <span class="code-attr">id</span>=<span class="code-val">"pk-widget"</span><span class="code-tag">&gt;&lt;/div&gt;</span>

<span class="code-tag">&lt;script</span> <span class="code-attr">src</span>=<span class="code-val">"https://previewkit-demo.onrender.com/sdk/previewkit.js?v=2.7.0"</span><span class="code-tag">&gt;&lt;/script&gt;</span>

<span class="code-tag">&lt;script&gt;</span>
PreviewKit.init({
  container: '#pk-widget',
  templateId: '{{ product.metafields.custom.previewkit_template }}',
  apiKey: 'GET_YOUR_KEY_TODAY',
  apiUrl: 'https://previewkit-api.onrender.com',
  theme: 'auto'
});
<span class="code-tag">&lt;/script&gt;</span>
  </pre>
</div>

<a href="#contact" class="demo-shopify-cta">
  Get your snippet ${icon('arrow')}
</a>

      </div>
    </div>`;

    setTimeout(initDemoVideo, 0);
  }


  function initDemoVideo() {
    setupVideo('pk-video-before', 'pk-overlay-before', 'pk-play-before');
    setupVideo('pk-video-after', 'pk-overlay-after', 'pk-play-after');
  }

  function setupVideo(videoId, overlayId, playBtnId) {
    const video = document.getElementById(videoId);
    const overlay = document.getElementById(overlayId);
    const playBtn = document.getElementById(playBtnId);
    if (!video || !overlay || !playBtn) return;

    /* Auto-play muted when scrolled into view */
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) video.play().catch(() => { });
        else video.pause();
      });
    }, { threshold: 0.3 });
    io.observe(video);

    /* Click overlay to toggle play/pause + unmute */
    overlay.addEventListener('click', () => {
      if (video.paused) { video.muted = false; video.play().catch(() => { }); }
      else { video.pause(); }
    });

    video.addEventListener('play', () => {
      overlay.classList.add('is-playing');
      playBtn.classList.add('is-playing');
      playBtn.setAttribute('aria-label', 'Pause video');
    });
    video.addEventListener('pause', () => {
      overlay.classList.remove('is-playing');
      playBtn.classList.remove('is-playing');
      playBtn.setAttribute('aria-label', 'Play video');
    });
  }
  function renderImpact(d) {
    document.getElementById('impact').innerHTML = `
      <div class="container">
        <div class="section-inner">
          <div class="impact-header reveal">
            <div class="eyebrow" style="margin-bottom:14px">${d.eyebrow}</div>
            <h2 class="section-headline">${d.headline}</h2>
          </div>
          <div class="impact-stats reveal reveal-scale">
            ${d.sellerStats.map(s => `
              <div class="impact-stat">
                <div class="stat-value" data-count="${s.value}">
                  <span class="count-num">0</span><span class="stat-unit">${s.unit}</span>
                </div>
                <div class="stat-label">${s.label}</div>
              </div>`).join('')}
          </div>
          <div class="buyer-header reveal" style="margin-top:0; padding-top:0">
            <h3 class="section-headline" style="font-size:clamp(24px,3vw,38px)">What buyers feel.</h3>
          </div>
          <div class="buyer-values">
            ${d.buyerValues.map((v, i) => `
              <div class="buyer-card reveal reveal-delay-${i + 1}">
                <div class="buyer-icon">${icon(v.icon)}</div>
                <div class="buyer-label">${v.label}</div>
                <p class="buyer-body">${v.body}</p>
              </div>`).join('')}
          </div>
        </div>
      </div>`;
  }

  function renderComparison(d) {
    document.getElementById('comparison').innerHTML = `
      <div class="container">
        <div class="section-inner">
          <div class="comparison-header reveal">
            <div class="eyebrow" style="margin-bottom:14px">${d.eyebrow}</div>
            <h2 class="section-headline">${d.headline}</h2>
          </div>
          <div class="comparison-table-wrap reveal reveal-scale">
            <table class="comparison-table">
              <thead>
                <tr>${d.headers.map(h => `<th>${h}</th>`).join('')}</tr>
              </thead>
              <tbody>
                ${d.rows.map(r => `
                  <tr>
                    <td>${r.feature}</td>
                    <td><span class="td-before">${r.before}</span></td>
                    <td><span class="td-after">${r.after}</span></td>
                  </tr>`).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>`;
  }

  function renderInfrastructure(d) {
    document.getElementById('infrastructure').innerHTML = `
      <div class="container">
        <div class="section-inner">
          <div class="infra-header reveal">
            <div class="eyebrow" style="margin-bottom:14px">${d.eyebrow}</div>
            <h2 class="section-headline">${d.headline}</h2>
            <p class="section-sub" style="margin-top:16px">${d.sub}</p>
          </div>
          <div class="infra-grid">
            ${d.pillars.map((p, i) => `
              <div class="infra-card reveal reveal-delay-${i + 1}">
                <div class="infra-index">0${i + 1}</div>
                <div class="infra-label">${p.label}</div>
                <p class="infra-body">${p.body}</p>
              </div>`).join('')}
          </div>
        </div>
      </div>`;
  }

  function renderContact(d) {
    document.getElementById('contact').innerHTML = `
      <div class="container">
        <div class="section-inner">
          <div class="contact-inner">
            <div class="contact-left reveal reveal-left">
              <div class="eyebrow" style="margin-bottom:14px">${d.eyebrow}</div>
              <h2 class="section-headline">${d.headline}</h2>
              <p class="section-sub" style="margin-top:16px">${d.sub}</p>
              <p class="contact-email-note">
                Or email directly at<br>
                <a href="mailto:${d.email}">${d.email}</a>
              </p>
            </div>
            <div class="contact-right reveal reveal-right">
              <form class="contact-form" id="pk-contact-form">
                ${d.fields.map(f => `
                  <div class="form-field">
                    <label for="field-${f.name}">${f.label}</label>
                    ${f.type === 'textarea'
        ? `<textarea id="field-${f.name}" name="${f.name}" placeholder="${f.placeholder}" rows="4"></textarea>`
        : `<input id="field-${f.name}" type="${f.type}" name="${f.name}" placeholder="${f.placeholder}">`
      }
                  </div>`).join('')}
                <button type="submit" class="form-submit">
                  ${icon('send')} ${d.submit}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>`;

    setTimeout(() => {
      const form = document.getElementById('pk-contact-form');
      if (!form) return;
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        const fd = new FormData(form);
        const body = [...fd.entries()].map(([k, v]) => `${k}: ${v}`).join('\n\n');
        window.location.href = `mailto:${d.email}?subject=PreviewKit%20Demo%20Request&body=${encodeURIComponent(body)}`;
      });
    }, 0);
  }

  function renderFooter(d) {
    document.getElementById('pk-footer').innerHTML = `
      <div class="container">
        <div class="footer-inner">
          <div>
            <div class="footer-brand">Preview<span>Kit</span></div>
            <div class="footer-tagline">${d.tagline}</div>
          </div>
          <a href="mailto:${d.email}" class="footer-email">${d.email}</a>
        </div>
      </div>`;
  }

  /* ══════════════════════════════════════════════════════════
     INIT
     ══════════════════════════════════════════════════════════ */

  /* Scroll progress bar */
  function initProgress() {
    const bar = document.getElementById('pk-progress');
    if (!bar) return;
    window.addEventListener('scroll', () => {
      const max = document.body.scrollHeight - window.innerHeight;
      bar.style.width = max > 0 ? (window.scrollY / max * 100) + '%' : '0%';
    }, { passive: true });
  }

  /* Nav scroll class */
  function initNav() {
    const nav = document.getElementById('pk-nav');
    if (!nav) return;
    const update = () => nav.classList.toggle('scrolled', window.scrollY > 60);
    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  /* Scroll reveal */
  function initScrollReveal() {
    const els = document.querySelectorAll('.reveal');
    if (!els.length) return;
    const io = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
      }),
      { threshold: 0.12, rootMargin: '0px 0px -48px 0px' }
    );
    els.forEach(el => io.observe(el));
  }

  /* Animated counters */
  function initCounters() {
    const statEls = document.querySelectorAll('.stat-value[data-count]');
    if (!statEls.length) return;
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const target = parseInt(el.dataset.count, 10);
        const numEl = el.querySelector('.count-num');
        const dur = 1400;
        const start = performance.now();
        function tick(now) {
          const p = Math.min((now - start) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          numEl.textContent = Math.round(eased * target);
          if (p < 1) requestAnimationFrame(tick);
          else numEl.textContent = target;
        }
        requestAnimationFrame(tick);
        io.unobserve(el);
      });
    }, { threshold: 0.5 });
    statEls.forEach(el => io.observe(el));
  }

  /* Hero image carousel */
  function initCarousel() {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-dot');
    if (!slides.length) return;

    let current = 0;
    let timer = null;
    const DELAY = 4500;
    const SPEED = 1600;

    function goTo(idx) {
      slides[current].classList.remove('active');
      dots[current] && dots[current].classList.remove('active');

      current = (idx + slides.length) % slides.length;

      const s = slides[current];
      s.style.animation = 'none';
      s.offsetHeight; // reflow
      s.style.animation = '';
      s.classList.add('active');
      dots[current] && dots[current].classList.add('active');
    }

    function next() { goTo(current + 1); }

    function startAuto() {
      clearInterval(timer);
      timer = setInterval(next, DELAY);
    }

    const prevControl = document.querySelector('.hero-arrow-prev');
    const nextControl = document.querySelector('.hero-arrow-next');

    if (prevControl) {
      prevControl.addEventListener('click', () => { goTo(current - 1); startAuto(); });
    }

    if (nextControl) {
      nextControl.addEventListener('click', () => { goTo(current + 1); startAuto(); });
    }

    // Dot clicks
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => { goTo(i); startAuto(); });
    });

    startAuto();
  }

})();
