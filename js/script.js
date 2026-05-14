document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursor-follower');

    // Custom Cursor Movement
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;

        cursor.style.transform = `translate3d(${x - 10}px, ${y - 10}px, 0)`;
        follower.style.transform = `translate3d(${x - 4}px, ${y - 4}px, 0)`;
    });

    // Button and Link Hover for Cursor
    const interactiveElements = document.querySelectorAll('a, .btn, .spec-item, .experience-visual');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform += ' scale(2.5)';
            cursor.style.borderColor = 'var(--secondary)';
            follower.style.opacity = '0';
        });

        el.addEventListener('mouseleave', () => {
            cursor.style.transform = cursor.style.transform.replace(' scale(2.5)', '');
            cursor.style.borderColor = 'var(--primary)';
            follower.style.opacity = '1';
        });
    });

    // Smooth Scroll for Navigation
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Reveal Animations on Scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('section, .spec-item, .experience-visual').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.2, 1, 0.3, 1)';
        observer.observe(el);
    });
});
