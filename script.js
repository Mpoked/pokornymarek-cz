(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ---------- Mobile menu ---------- */
    const toggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.top-nav');
    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            const open = nav.classList.toggle('open');
            toggle.classList.toggle('open', open);
            toggle.setAttribute('aria-expanded', String(open));
            document.body.style.overflow = open ? 'hidden' : '';
        });
        nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
            nav.classList.remove('open');
            toggle.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }));
    }

    /* ---------- Logo / #top scroll to top ---------- */
    document.querySelectorAll('a[href="#top"], a[href="#"]').forEach(a => {
        a.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
        });
    });

    /* ---------- Year ---------- */
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());

    /* ---------- Reveal on scroll ---------- */
    const targets = [
        '.strip-statement',
        '.featured-slab',
        '.work-tile',
        '.cat-label',
        '.capabilities',
        '.display-2',
        '.contact-grid',
        '.footer-grid',
    ];
    targets.forEach(sel => document.querySelectorAll(sel).forEach(el => el.classList.add('reveal')));

    const workGrid = document.querySelector('.work-grid');
    if (workGrid) workGrid.classList.add('stagger');

    if (reduce) {
        document.querySelectorAll('.reveal, .stagger').forEach(el => el.classList.add('is-visible'));
        return;
    }

    const io = 'IntersectionObserver' in window
        ? new IntersectionObserver((entries, obs) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.classList.add('is-visible');
                    obs.unobserve(e.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' })
        : null;

    if (io) document.querySelectorAll('.reveal, .stagger').forEach(el => io.observe(el));
    else document.querySelectorAll('.reveal, .stagger').forEach(el => el.classList.add('is-visible'));

    /* ---------- Subtle parallax on cropped wordmark ---------- */
    const wmEl = document.querySelector('.wordmark--clip span');
    if (wmEl && !reduce) {
        let raf = null;
        const onScroll = () => {
            if (raf) return;
            raf = requestAnimationFrame(() => {
                const y = Math.min(window.scrollY * 0.15, 80);
                wmEl.style.transform = `translateY(${-y}px)`;
                raf = null;
            });
        };
        window.addEventListener('scroll', onScroll, { passive: true });
    }
})();
