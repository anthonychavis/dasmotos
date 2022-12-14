const imgLazy = document.querySelectorAll('img[data-src]');

const swapImg = (entries, observer) => {
    // fix for pg refresh w/ lazy el visible, not intersecting
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        // swap src
        entry.target.src = entry.target.dataset.src;

        entry.target.addEventListener('load', () =>
            entry.target.classList.remove('lazy-img')
        );

        // allow garbage-collection
        observer.unobserve(entry.target);
    });
};

const imgObsrv = new IntersectionObserver(swapImg, {
    root: null,
    threshold: 0,
    rootMargin: '100px',
});

imgLazy.forEach(img => imgObsrv.observe(img));

// cursor
const cursorFxn = () => {
    const cursor = document.querySelector('.cursor');
    if (cursor.style.display === 'none') return;

    document.addEventListener('mousemove', e => {
        cursor.setAttribute(
            'style',
            `inset-block-start: ${e.pageY + 1}px; inset-inline-start: ${
                e.pageX + 1
            }px;`
        );
    });
};
cursorFxn();
