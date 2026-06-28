// Agni Group Nepal - Interactive UI/UX Scripts

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();

    // 1. Header Scroll State
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    // 1.5 Hero Section Slider Logic
    const heroSlides = document.querySelectorAll('.hero-slide');
    const heroDots = document.querySelectorAll('.hero-dot');
    let currentHeroIndex = 0;
    let heroSliderTimer = null;

    function showHeroSlide(index) {
        currentHeroIndex = index;
        
        // Remove active class from all slides and dots
        heroSlides.forEach(slide => slide.classList.remove('active'));
        heroDots.forEach(dot => dot.classList.remove('active'));

        // Add active class to selected slide and dot
        heroSlides[currentHeroIndex].classList.add('active');
        heroDots[currentHeroIndex].classList.add('active');
    }

    function nextHeroSlide() {
        let nextIndex = (currentHeroIndex + 1) % heroSlides.length;
        showHeroSlide(nextIndex);
    }

    function startHeroAutoplay() {
        stopHeroAutoplay();
        heroSliderTimer = setInterval(nextHeroSlide, 6000); // Change slides every 6 seconds
    }

    function stopHeroAutoplay() {
        if (heroSliderTimer) {
            clearInterval(heroSliderTimer);
        }
    }

    // Set click handlers for hero dots
    heroDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showHeroSlide(index);
            startHeroAutoplay(); // Restart autoplay timer
        });
    });

    // Start Autoplay immediately
    if (heroSlides.length > 0) {
        startHeroAutoplay();
    }
    // 2. Ember Particle System (HTML5 Canvas with Interactive Mouse Motion)
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    class Ember {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * width;
            this.y = height + Math.random() * 100;
            this.size = Math.random() * 3 + 1;
            this.speedY = -(Math.random() * 1.5 + 0.5);
            this.speedX = Math.random() * 1 - 0.5;
            this.alpha = 1;
            this.fade = Math.random() * 0.005 + 0.002;
            this.isMouseSpawned = false;
            // Flame gold/orange/red variations
            const colors = [
                'rgba(255, 77, 0, ',
                'rgba(200, 16, 46, ',
                'rgba(255, 165, 0, '
            ];
            this.colorBase = colors[Math.floor(Math.random() * colors.length)];
        }

        update() {
            this.y += this.speedY;
            this.x += this.speedX + Math.sin(this.y / 30) * 0.2; // organic drift
            this.alpha -= this.fade;

            if (this.alpha <= 0 || this.x < 0 || this.x > width || this.y < 0) {
                if (this.isMouseSpawned) {
                    return false; // mark for removal
                } else {
                    this.reset();
                }
            }
            return true; // keep alive
        }

        draw() {
            ctx.shadowBlur = this.size * 2;
            ctx.shadowColor = 'rgba(255, 77, 0, 0.5)';
            ctx.fillStyle = this.colorBase + this.alpha + ')';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    const embers = Array.from({ length: 45 }, () => new Ember());

    // Mouse movement spawns embers
    window.addEventListener('mousemove', (e) => {
        // Only spawn on the hero section area to avoid overloading resources
        if (e.clientY < window.innerHeight) {
            for (let i = 0; i < 2; i++) {
                const spawned = new Ember();
                spawned.x = e.clientX + (Math.random() * 20 - 10);
                spawned.y = e.clientY + (Math.random() * 20 - 10);
                spawned.alpha = 1;
                spawned.size = Math.random() * 4 + 1.5;
                spawned.speedY = -(Math.random() * 1.8 + 0.8);
                spawned.speedX = Math.random() * 1.5 - 0.75;
                spawned.isMouseSpawned = true;
                embers.push(spawned);
            }
        }
    });

    function animateParticles() {
        ctx.clearRect(0, 0, width, height);
        ctx.shadowBlur = 0;
        
        for (let i = embers.length - 1; i >= 0; i--) {
            const ember = embers[i];
            const alive = ember.update();
            if (!alive) {
                embers.splice(i, 1);
            } else {
                ember.draw();
            }
        }

        // Maintain ambient background count
        const bgEmberCount = embers.filter(e => !e.isMouseSpawned).length;
        if (bgEmberCount < 45) {
            embers.push(new Ember());
        }
        
        requestAnimationFrame(animateParticles);
    }
    animateParticles();

    // 3. Stats Counter
    const stats = document.querySelectorAll('.stat-number');
    const statsObserverOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const targetNumber = parseInt(target.getAttribute('data-target'), 10);
                let current = 0;
                const duration = 2000; // 2 seconds duration
                const stepTime = Math.max(Math.floor(duration / targetNumber), 15);
                
                const counter = setInterval(() => {
                    current += Math.ceil(targetNumber / 100);
                    if (current >= targetNumber) {
                        target.textContent = targetNumber + (target.id === 'years' ? '+' : '+');
                        clearInterval(counter);
                    } else {
                        target.textContent = current + '+';
                    }
                }, stepTime);

                observer.unobserve(target);
            }
        });
    }, statsObserverOptions);

    stats.forEach(stat => statsObserver.observe(stat));

    // 4. Scroll Reveal Animations
    const reveals = document.querySelectorAll('.reveal');
    const revealObserverOptions = {
        threshold: 0.15,
        rootMargin: '0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, revealObserverOptions);

    reveals.forEach(reveal => revealObserver.observe(reveal));

    // 5. Interactive Nepal Abstract Network Map
    const cityData = {
        kathmandu: {
            city: 'Kathmandu',
            office: 'Agni Corporate HQ',
            address: 'Panipokhari, Kathmandu, Nepal',
            dealers: '18 Dedicated Branches & Showrooms',
            services: 'Full Sales, Spares, and Balaju Auto Works HQ support.'
        },
        kohalpur: {
            city: 'Kohalpur',
            office: 'Kohalpur Regional Branch',
            address: 'New Highway Crossing, Kohalpur',
            dealers: '10+ Local Dealership outlets',
            services: 'Mid-Western regional distribution & spares depot.'
        },
        birgunj: {
            city: 'Birgunj',
            office: 'Birgunj Port Gateway Branch',
            address: 'Main Industrial Corridor, Birgunj',
            dealers: '15+ Commercial Outlets',
            services: 'Import logistics node & primary heavy utility service hub.'
        },
        itahari: {
            city: 'Itahari',
            office: 'East Nepal Regional Hub',
            address: 'Dharan Road, Itahari',
            dealers: '12+ Dealers & Service Centers',
            services: 'Eastern region automotive sales, tractor distribution center.'
        },
        bhairahawa: {
            city: 'Bhairahawa',
            office: 'Lumbini Regional Depot',
            address: 'Siddhartha Highway, Bhairahawa',
            dealers: '14+ Dealers & Agriculture Centers',
            services: 'Mahindra Farm Equipment (Tractor) regional logistics gateway.'
        }
    };

    const mapNodes = document.querySelectorAll('.map-node');
    const cityNameEl = document.getElementById('net-city');
    const officeNameEl = document.getElementById('net-office');
    const addressNameEl = document.getElementById('net-address');
    const dealersNameEl = document.getElementById('net-dealers');
    const servicesNameEl = document.getElementById('net-services');

    mapNodes.forEach(node => {
        node.addEventListener('click', () => {
            // Remove active state
            mapNodes.forEach(n => n.classList.remove('active'));
            node.classList.add('active');

            const cityKey = node.getAttribute('data-city');
            const data = cityData[cityKey];

            if (data) {
                cityNameEl.textContent = data.city;
                officeNameEl.textContent = data.office;
                addressNameEl.textContent = data.address;
                dealersNameEl.textContent = data.dealers;
                servicesNameEl.textContent = data.services;

                // Subtle visual animation to the info panel
                const panel = document.getElementById('net-info-card');
                panel.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    panel.style.transform = 'scale(1)';
                }, 100);
            }
        });
    });

    // 6. CSR / Brand Stories Slider
    const slider = document.querySelector('.stories-slider');
    const prevBtns = [document.getElementById('prev-story'), document.getElementById('prev-story-2')];
    const nextBtns = [document.getElementById('next-story'), document.getElementById('next-story-2')];
    let currentSlide = 0;

    function updateSlider() {
        slider.style.transform = `translateX(-${currentSlide * 50}%)`;
    }

    nextBtns.forEach(btn => {
        if (btn) {
            btn.addEventListener('click', () => {
                currentSlide = (currentSlide + 1) % 2;
                updateSlider();
            });
        }
    });

    prevBtns.forEach(btn => {
        if (btn) {
            btn.addEventListener('click', () => {
                currentSlide = (currentSlide - 1 + 2) % 2;
                updateSlider();
            });
        }
    });

    // 7. Interactive Online Payment Modal
    const paymentModal = document.getElementById('payment-modal-overlay');
    const payCTAs = document.querySelectorAll('.trigger-payment');
    const closeBtn = document.getElementById('close-payment');
    const paymentForm = document.getElementById('billing-form');

    payCTAs.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            paymentModal.classList.add('active');
        });
    });

    closeBtn.addEventListener('click', () => {
        paymentModal.classList.remove('active');
    });

    paymentModal.addEventListener('click', (e) => {
        if (e.target === paymentModal) {
            paymentModal.classList.remove('active');
        }
    });

    paymentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = paymentForm.querySelector('button[type="submit"]');
        submitBtn.innerHTML = '<span class="loading-spinner"></span> Processing Secure Payment...';
        submitBtn.disabled = true;

        setTimeout(() => {
            alert('Payment successfully verified! Receipt reference Agni-' + Math.floor(Math.random() * 89999 + 10000) + ' sent to your email.');
            paymentForm.reset();
            submitBtn.textContent = 'Proceed with Payment';
            submitBtn.disabled = false;
            paymentModal.classList.remove('active');
        }, 2500);
    });

    // 8. 3D Card Hover Effect for Companies
    const cards = document.querySelectorAll('.company-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const xRotation = ((y - rect.height / 2) / (rect.height / 2)) * 6; // max 6 deg
            const yRotation = -((x - rect.width / 2) / (rect.width / 2)) * 6;

            card.style.transform = `perspective(1000px) rotateX(${xRotation}deg) rotateY(${yRotation}deg) translateY(-8px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
        });
    });

    // 9. Mobile Menu Toggle Action
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.querySelector('nav');
    const navLinks = document.querySelectorAll('.nav-link, .dropdown-link');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
});
