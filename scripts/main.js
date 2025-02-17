document.addEventListener('DOMContentLoaded', () => {
    let isScrolling = false;
    const navLinks = document.querySelectorAll('.nav-link');
    const homeLink = document.querySelector('a[href="#home"]');

    if (window.location.hash === "" || window.location.hash === "#home") {
        updateActiveLink("home")
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            if (isScrolling) return;
            const targetId = event.target.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                isScrolling = true;
                window.scrollTo({
                    top: targetSection.offsetTop - 20,
                    behavior: 'smooth',
                })
                updateActiveLink(targetId)
                setTimeout(() => {
                    isScrolling = false;
                }, 1000)
            }
        })
    })

    window.addEventListener("scroll", function () {
        if (isScrolling) return;
        let fromTop = window.scrollY + 100;
        navLinks.forEach(link => {
            const section = document.querySelector(link.getAttribute("href"));
            if (
                section.offsetTop <= fromTop &&
                section.offsetTop + section.offsetHeight > fromTop
            ) {
                updateActiveLink(link.getAttribute("href").substring(1));
            }
        });
    });

    function updateActiveLink(activeId) {
        navLinks.forEach(link => {
            if (link.getAttribute('href').substring(1) === activeId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        })
    }
})

