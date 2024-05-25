document.addEventListener('DOMContentLoaded', function() {
    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Animated Navbar Visibility
    let lastScrollTop = 0;
    const navBar = document.getElementById('nav-bar');
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop) {
            navBar.style.top = '-100px';
        } else {
            navBar.style.top = '0';
        }
        lastScrollTop = scrollTop;
    });

    // Dynamic Content Loading with Scroll
    const faders = document.querySelectorAll('.fade-in');
    const appearOptions = {
        threshold: 0.5,
        rootMargin: "0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // Parallax Effects for Backgrounds
    const parallax = document.querySelectorAll(".parallax");
    window.addEventListener("scroll", function() {
        let offset = window.pageYOffset;
        parallax.forEach(function(prllx) {
            prllx.style.backgroundPositionY = (offset - prllx.offsetTop) * 0.7 + "px";
        });
    });
});

// Additional Functions for Menus and Interactions
function toggleMenu() {
    const sideMenu = document.getElementById('side-menu');
    sideMenu.style.width = sideMenu.style.width === '250px' ? '0' : '250px';
}

function closeMenu() {
    document.getElementById('side-menu').style.width = '0';
}

function openChat() {
    alert("Chat window functionality is not implemented yet.");
}
