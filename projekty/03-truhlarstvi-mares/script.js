(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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

    ['.section-head', '.spec-sheet', '.process li', '.contact-block', '.poptavka-form'].forEach(sel =>
        document.querySelectorAll(sel).forEach(el => el.classList.add('reveal'))
    );
    [['.services', '.service'], ['.gallery', 'figure']].forEach(([gridSel, childSel]) => {
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
        }), { threshold: 0.1, rootMargin: '0px 0px -40px 0px' })
        : null;
    if (io) document.querySelectorAll('.reveal, .stagger').forEach(el => io.observe(el));
    else document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));

    const form = document.querySelector('.poptavka-form');
    if (form) form.addEventListener('submit', e => {
        e.preventDefault();
        const d = Object.fromEntries(new FormData(form).entries());
        if (!d.jmeno || !d.email || !d.popis) return alert('Vyplňte jméno, e-mail a popis.');
        const body = encodeURIComponent(
            `Jméno: ${d.jmeno}\nE-mail: ${d.email}\nTyp: ${d.typ}\nMateriál: ${d.material}\n\n${d.popis}`
        );
        window.location.href = `mailto:dilna@truhlarstvi-mares.cz?subject=Poptávka zakázky&body=${body}`;
    });
})();
