(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const header = document.querySelector('.site-header');
    if (header) {
        const onScroll = () => {
            header.classList.toggle('scrolled', window.scrollY > 8);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    const toggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.main-nav');
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
            document.body.style.overflow = '';
        }));
    }

    document.querySelectorAll('a[href="#top"]').forEach(a => {
        a.addEventListener('click', e => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
        });
    });

    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    const reveal = sel => document.querySelectorAll(sel).forEach(el => el.classList.add('reveal'));
    ['.pribeh-image', '.pribeh-text', '.section-head', '.wine-card', '.terroir-content', '.navsteva-list li', '.rezervace', '.kontakt-grid > *'].forEach(reveal);
    const winesGrid = document.querySelector('.wines');
    if (winesGrid) winesGrid.classList.add('stagger');

    if (reduce) {
        document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
        return;
    }
    const io = 'IntersectionObserver' in window
        ? new IntersectionObserver((entries, obs) => entries.forEach(e => {
            if (e.isIntersecting) { e.target.classList.add('is-visible'); obs.unobserve(e.target); }
        }), { threshold: 0.1, rootMargin: '0px 0px -60px 0px' })
        : null;
    if (io) document.querySelectorAll('.reveal, .stagger').forEach(el => io.observe(el));
    else document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));

    const form = document.querySelector('.rezervace');
    if (form) form.addEventListener('submit', e => {
        e.preventDefault();
        const d = Object.fromEntries(new FormData(form).entries());
        if (!d.jmeno || !d.email || !d.termin) return alert('Vyplňte jméno, e-mail a termín.');
        const body = encodeURIComponent(
            `Jméno: ${d.jmeno}\nE-mail: ${d.email}\nPočet osob: ${d.osob}\nTermín: ${d.termin}\nForma: ${d.format}`
        );
        window.location.href = `mailto:info@vinarstvi-novak.cz?subject=Rezervace návštěvy&body=${body}`;
    });
})();
