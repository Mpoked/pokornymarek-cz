(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const header = document.querySelector('.site-header');
    if (header) {
        const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 8);
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

    const y = document.getElementById('year');
    if (y) y.textContent = new Date().getFullYear();

    ['.section-head', '.anna-photo', '.anna > .container > div', '.recenze h2', '.rezervace-form', '.hours'].forEach(sel =>
        document.querySelectorAll(sel).forEach(el => el.classList.add('reveal'))
    );
    [['.bento', '.b-card'], ['.quotes', 'blockquote'], ['.price-list', 'li'], ['.creds', 'li']].forEach(([gridSel, childSel]) => {
        const g = document.querySelector(gridSel);
        if (!g) return;
        g.classList.add('stagger');
        g.querySelectorAll(childSel).forEach(c => c.classList.add('reveal'));
    });

    if (reduce) {
        document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
        return;
    }
    const io = 'IntersectionObserver' in window
        ? new IntersectionObserver((entries, obs) => entries.forEach(e => {
            if (e.isIntersecting) { e.target.classList.add('is-visible'); obs.unobserve(e.target); }
        }), { threshold: 0.1, rootMargin: '0px 0px -50px 0px' })
        : null;
    if (io) document.querySelectorAll('.reveal, .stagger').forEach(el => io.observe(el));
    else document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));

    const form = document.querySelector('.rezervace-form');
    if (form) form.addEventListener('submit', e => {
        e.preventDefault();
        const d = Object.fromEntries(new FormData(form).entries());
        if (!d.jmeno || !d.telefon) return alert('Vyplňte jméno a telefon.');
        const body = encodeURIComponent(
            `Jméno: ${d.jmeno}\nTelefon: ${d.telefon}\nOšetření: ${d.osetreni}\nPreferovaný čas: ${d.preferovane || '—'}\nPoznámka: ${d.poznamka || '—'}`
        );
        window.location.href = `mailto:anna@studio-anna.cz?subject=Objednávka termínu&body=${body}`;
    });
})();
