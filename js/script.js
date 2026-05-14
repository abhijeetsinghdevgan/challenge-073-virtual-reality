document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursor-follower');
    const heroImg = document.getElementById('hero-img');
    const cards = document.querySelectorAll('.card');

    // Custom Cursor Movement
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;

        cursor.style.transform = `translate3d(${x - 10}px, ${y - 10}px, 0)`;
        follower.style.transform = `translate3d(${x - 4}px, ${y - 4}px, 0)`;

        // Hero Image Parallax (Tilt)
        if (heroImg) {
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            const moveX = (x - centerX) / 50;
            const moveY = (y - centerY) / 50;
            heroImg.style.transform = `rotateY(${moveX}deg) rotateX(${-moveY}deg)`;
        }
    });

    // Button and Link Hover for Cursor
    const interactiveElements = document.querySelectorAll('a, .btn, .card');
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

    // Card 3D Effect
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) translateY(0) rotateX(0) rotateY(0)';
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
});
