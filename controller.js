const imgLazy = document.querySelectorAll('img[data-src]');

const swapImg = (entries, observer) => {
    const [entry] = entries;
    console.log(entry);
    if (!entry.isIntersecting) return;

    // fix for pg refresh w/ lazy el visible, not intersecting
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        // swap src
        entry.target.src = entry.target.dataset.src;

        entry.target.addEventListener('load', () =>
            entry.target.classList.remove('lazy-img')
        );
    });

    // allow garbage-collection
    observer.unobserve(entry.target);
};

const imgObsrv = new IntersectionObserver(swapImg, {
    root: null,
    threshold: 0,
    rootMargin: '100px',
});

imgLazy.forEach(img => imgObsrv.observe(img));
