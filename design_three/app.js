// Initialize Lucide Icons
lucide.createIcons();

document.addEventListener('DOMContentLoaded', () => {
    // 1. Dynamic Mouse Glow Effect for Bento Cards (Glassmorphism)
    const cards = document.querySelectorAll('.glass-panel');

    document.querySelector('.bento-grid').addEventListener('mousemove', (e) => {
        cards.forEach((card) => {
            const rect = card.getBoundingClientRect();
            // Calculate mouse position relative to the card
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Set custom properties for CSS radial gradient
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // 2. Stat Counter Animation
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // lower is slower

    const animateCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 15);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    };

    // Intersection Observer for scroll triggers
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const bentoItems = document.querySelectorAll('.bento-item');
    
    // Add initial state for animation
    bentoItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    
                    // Trigger counters if this is a stat box
                    if(entry.target.classList.contains('stat-box')) {
                        animateCounters();
                    }
                }, index * 100); // Stagger effect
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    bentoItems.forEach(item => {
        observer.observe(item);
    });
});
