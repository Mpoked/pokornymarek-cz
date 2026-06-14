(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ---------- Sticky nav border state ---------- */
    const header = document.querySelector('.site-header');
    if (header) {
        const onScroll = () => {
            if (window.scrollY > 8) header.classList.add('scrolled');
            else header.classList.remove('scrolled');
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    /* ---------- Mobile menu ---------- */
    const toggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.main-nav');
    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            const open = nav.classList.toggle('open');
            toggle.classList.toggle('open', open);
            toggle.setAttribute('aria-expanded', String(open));
            document.body.style.overflow = open ? 'hidden' : '';
        });
        nav.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => {
                nav.classList.remove('open');
                toggle.classList.remove('open');
                toggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });
    }

    /* ---------- Logo: smooth scroll to top ---------- */
    document.querySelectorAll('a[href="#top"], a[href="#"]').forEach(a => {
        a.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
            history.replaceState(null, '', window.location.pathname);
        });
    });

    /* ---------- Year ---------- */
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());

    /* ---------- Reveal on scroll — gentle, IntersectionObserver-only ---------- */
    const revealTargets = [
        '.section-head',
        '.o-mne .col-text',
        '.o-mne .col-visual',
        '.kontakt .col-text',
        '.kontakt .form-bezel',
        '.cenik-disclaimer',
    ];
    revealTargets.forEach(sel => {
        document.querySelectorAll(sel).forEach(el => el.classList.add('reveal'));
    });

    const staggerGrids = [
        '.services-grid',
        '.audience-grid',
        '.process-steps',
        '.pricing-grid',
        '.references-grid',
        '.faq-list',
    ];
    staggerGrids.forEach(sel => {
        const grid = document.querySelector(sel);
        if (!grid) return;
        grid.classList.add('stagger');
        Array.from(grid.children).forEach(child => child.classList.add('reveal'));
    });

    if (prefersReducedMotion) {
        document.querySelectorAll('.reveal, .stagger').forEach(el => el.classList.add('is-visible'));
        return;
    }

    const io = ('IntersectionObserver' in window)
        ? new IntersectionObserver((entries, obs) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.classList.add('is-visible');
                    obs.unobserve(e.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' })
        : null;

    if (io) {
        document.querySelectorAll('.reveal').forEach(el => io.observe(el));
        document.querySelectorAll('.stagger').forEach(el => io.observe(el));
    } else {
        document.querySelectorAll('.reveal, .stagger').forEach(el => el.classList.add('is-visible'));
    }

    /* ---------- Contact form → mailto fallback ---------- */
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const data = Object.fromEntries(new FormData(form).entries());
            if (!data.jmeno || !data.email || !data.zprava) {
                alert('Vyplňte prosím jméno, e-mail a zprávu.');
                return;
            }
            const balickyMap = {
                jednoduchy: 'Jednoduchý web',
                standard: 'Standard',
                premium: 'Prémiový',
                poradit: 'Ještě nevím / poradit',
            };
            const balicekLabel = balickyMap[data.balicek] || '—';
            const subject = encodeURIComponent('Poptávka z webu — ' + data.jmeno);
            const body = encodeURIComponent(
                `Jméno: ${data.jmeno}\nE-mail: ${data.email}\nTelefon: ${data.telefon || '—'}\nBalíček: ${balicekLabel}\n\n${data.zprava}`
            );
            window.location.href = `mailto:kontakt@pokornymarek.cz?subject=${subject}&body=${body}`;
        });
    }
})();
