// Agni Group Nepal - Interactive UI/UX Scripts

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();

    // 0. Theme Toggle
    const themeToggleBtn = document.getElementById('theme-toggle');
    const sunIcon = document.querySelector('.sun-icon');
    const moonIcon = document.querySelector('.moon-icon');
    
    if (themeToggleBtn) {
        // Check saved theme
        const savedTheme = localStorage.getItem('agni-theme');
        if (savedTheme === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
            if(sunIcon) sunIcon.style.display = 'none';
            if(moonIcon) moonIcon.style.display = 'block';
        }

        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            if (currentTheme === 'light') {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('agni-theme', 'dark');
                if(sunIcon) sunIcon.style.display = 'block';
                if(moonIcon) moonIcon.style.display = 'none';
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('agni-theme', 'light');
                if(sunIcon) sunIcon.style.display = 'none';
                if(moonIcon) moonIcon.style.display = 'block';
            }
        });
    }

    // 1. Header Scroll State
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    // 1.5 Cinematic Full-Screen Slide-Up Logic
    const heroSlides = document.querySelectorAll('.hero-slide');
    const heroDots = document.querySelectorAll('.slide-up-dot');
    const prevHeroBtn = document.getElementById('cinematic-prev');
    const nextHeroBtn = document.getElementById('cinematic-next');
    const progressBar = document.querySelector('.slide-progress-bar');
    let currentHeroIndex = 0;
    let heroSliderTimer = null;

    function resetProgressBar() {
        if (progressBar) {
            progressBar.classList.remove('animate');
            void progressBar.offsetWidth; // Force DOM reflow to reset CSS transition
            progressBar.classList.add('animate');
        }
    }

    const companyNames = [
        "AGNI INCORPORATE", "MOTO INC", "HIRE PURCHASE", "HOLDING", "LOGISTICS", 
        "EQUIPMENT", "TECHNICAL INSTITUTE", "VERDA", "AASTHA FOUNDATION", "ENERGY"
    ];

    function updateCinematicNav() {
        const prevNameEl = document.getElementById('prev-company-name');
        const nextNameEl = document.getElementById('next-company-name');
        if (prevNameEl && nextNameEl) {
            let prevIndex = (currentHeroIndex - 1 + heroSlides.length) % heroSlides.length;
            let nextIndex = (currentHeroIndex + 1) % heroSlides.length;
            prevNameEl.textContent = companyNames[prevIndex];
            nextNameEl.textContent = companyNames[nextIndex];
        }
    }

    function showHeroSlide(index) {
        if(heroSlides.length === 0 || index === currentHeroIndex) return;
        
        const prevIndex = currentHeroIndex;
        let direction = 'right';
        if (index < prevIndex) direction = 'left';
        if (prevIndex === heroSlides.length - 1 && index === 0) direction = 'right';
        if (prevIndex === 0 && index === heroSlides.length - 1) direction = 'left';
        
        heroSlides.forEach((slide, i) => {
            slide.classList.remove('entering-left', 'entering-right', 'leaving-left', 'leaving-right');
            
            if (i === prevIndex) {
                slide.classList.add(`leaving-${direction}`);
                slide.classList.remove('active');
                setTimeout(() => { slide.classList.remove(`leaving-${direction}`); }, 1200);
            } else if (i !== index) {
                slide.classList.remove('active');
            }
        });
        
        currentHeroIndex = index;

        setTimeout(() => {
            heroSlides[currentHeroIndex].classList.add(`entering-${direction}`);
            heroSlides[currentHeroIndex].classList.add('active');
            setTimeout(() => { heroSlides[currentHeroIndex].classList.remove(`entering-${direction}`); }, 50);
        }, 20);
        
        updateCinematicNav();
    }

    function nextHeroSlide() {
        if(heroSlides.length === 0) return;
        let nextIndex = (currentHeroIndex + 1) % heroSlides.length;
        showHeroSlide(nextIndex);
    }
    
    function prevHeroSlide() {
        if(heroSlides.length === 0) return;
        let nextIndex = (currentHeroIndex - 1 + heroSlides.length) % heroSlides.length;
        showHeroSlide(nextIndex);
    }

    function startHeroAutoplay() {
        stopHeroAutoplay();
        resetProgressBar();
        heroSliderTimer = setInterval(() => {
            nextHeroSlide();
            resetProgressBar();
        }, 7000); 
    }

    function stopHeroAutoplay() {
        if (heroSliderTimer) {
            clearInterval(heroSliderTimer);
            if (progressBar) progressBar.classList.remove('animate');
        }
    }

    if (prevHeroBtn) {
        prevHeroBtn.addEventListener('click', () => { 
            prevHeroSlide(); 
            startHeroAutoplay(); 
        });
    }
    
    if (nextHeroBtn) {
        nextHeroBtn.addEventListener('click', () => { 
            nextHeroSlide(); 
            startHeroAutoplay(); 
        });
    }

    updateCinematicNav();

    heroDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showHeroSlide(index);
            startHeroAutoplay(); 
        });
    });

    if (heroSlides.length > 0) {
        startHeroAutoplay();
    }

    // 1.8 Interactive 3D Mouse Parallax Effect
    window.addEventListener('mousemove', (e) => {
        // Shift range is from -10px to 10px
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        document.documentElement.style.setProperty('--mouse-x', `${x}px`);
        document.documentElement.style.setProperty('--mouse-y', `${y}px`);
    });

    // 2. Ember Particle System (HTML5 Canvas with Interactive Mouse Motion)
    const canvas = document.getElementById('particle-canvas');
    if (canvas) {
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
    }

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

    // 8. Interactive Accordion for Companies
    const accordionItems = document.querySelectorAll('.accordion-item');
    accordionItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            accordionItems.forEach(acc => acc.classList.remove('active'));
            item.classList.add('active');
        });
    });

    // 10. Scroll Parallax Effect
    const parallaxNodes = document.querySelectorAll('[data-parallax]');
    if (parallaxNodes.length > 0) {
        window.addEventListener('scroll', () => {
            const scrollY = window.pageYOffset;
            parallaxNodes.forEach(el => {
                const speed = parseFloat(el.getAttribute('data-parallax')) || 0.05;
                const rect = el.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    el.style.transform = `translateY(${-(scrollY * speed)}px)`;
                }
            });
        });
    }

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

    // 11. Leaflet Interactive Map
    const mapElement = document.getElementById('leaflet-map');
    if (mapElement && typeof L !== 'undefined') {
        const map = L.map('leaflet-map').setView([28.3949, 84.1240], 6); // Centered on Nepal

        // Determine if light or dark theme based on html data-theme
        const isLight = document.documentElement.getAttribute('data-theme') === 'light';
        const tileUrl = isLight ? 
            'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png' : 
            'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';

        L.tileLayer(tileUrl, {
            attribution: '&copy; OpenStreetMap contributors &copy; CARTO'
        }).addTo(map);

        const mapData = [
            { city: 'Kathmandu', type: 'Agni Corporate HQ', lat: 27.7172, lng: 85.3240, address: 'Panipokhari, Kathmandu', dealers: '18 Dedicated Branches & Showrooms', services: 'Full Sales, Spares, and Balaju Auto Works HQ' },
            { city: 'Kohalpur', type: 'Regional Branch', lat: 28.1873, lng: 81.7169, address: 'Main Highway, Kohalpur', dealers: '4 Dedicated Branches', services: 'Sales and Service Support' },
            { city: 'Birgunj', type: 'Regional Branch', lat: 27.0135, lng: 84.8778, address: 'Link Road, Birgunj', dealers: '6 Dedicated Branches', services: 'Sales, Spares, Service' },
            { city: 'Itahari', type: 'Regional Branch', lat: 26.6646, lng: 87.2718, address: 'Highway Area, Itahari', dealers: '5 Dedicated Branches', services: 'Sales and Service' },
            { city: 'Bhairahawa', type: 'Regional Branch', lat: 27.5065, lng: 83.4496, address: 'Lumbini Road, Bhairahawa', dealers: '3 Dedicated Branches', services: 'Sales and Service' }
        ];

        // Custom icon
        const agniIcon = L.divIcon({
            html: `<div style="background-color: var(--brand-orange); width: 16px; height: 16px; border-radius: 50%; border: 3px solid #fff; box-shadow: 0 0 10px rgba(255, 77, 0, 0.8);"></div>`,
            className: 'agni-map-marker',
            iconSize: [22, 22],
            iconAnchor: [11, 11]
        });

        const netCity = document.getElementById('net-city');
        const netOffice = document.getElementById('net-office');
        const netAddress = document.getElementById('net-address');
        const netDealers = document.getElementById('net-dealers');
        const netServices = document.getElementById('net-services');

        mapData.forEach(loc => {
            const marker = L.marker([loc.lat, loc.lng], { icon: agniIcon }).addTo(map);
            marker.on('click', () => {
                netCity.textContent = loc.city;
                netOffice.textContent = loc.type;
                netAddress.textContent = loc.address;
                netDealers.textContent = loc.dealers;
                netServices.textContent = loc.services;
                map.flyTo([loc.lat, loc.lng], 9, { animate: true, duration: 1.5 });
            });
        });

        // Handle Theme Toggle for Map
        document.getElementById('theme-toggle').addEventListener('click', () => {
            setTimeout(() => {
                const newIsLight = document.documentElement.getAttribute('data-theme') === 'light';
                const newTileUrl = newIsLight ? 
                    'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png' : 
                    'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
                L.tileLayer(newTileUrl, {
                    attribution: '&copy; OpenStreetMap contributors &copy; CARTO'
                }).addTo(map);
            }, 100);
        });
    }

    // 12. Infinite Auto-Scroll for Timeline Infographic
    const timelineSlider = document.getElementById('timeline-scroll');
    if (timelineSlider) {
        const track = timelineSlider.querySelector('.infographic-track');
        if (track) {
            const nodes = track.querySelectorAll('.info-node');
            nodes.forEach(node => {
                const clone = node.cloneNode(true);
                const currentLeft = parseInt(clone.style.left || 0, 10);
                clone.style.left = (currentLeft + 2600) + 'px';
                track.appendChild(clone);
            });

            const trackLine = track.querySelector('.track-line');
            if (trackLine) trackLine.style.width = '6000px';
            
            const paddingDiv = track.querySelector('div[style*="width: 2500px"]');
            if (paddingDiv) paddingDiv.style.width = '5200px';
        }

        let isHovered = false;

        timelineSlider.addEventListener('mouseenter', () => isHovered = true);
        timelineSlider.addEventListener('mouseleave', () => isHovered = false);
        timelineSlider.addEventListener('touchstart', () => isHovered = true);
        timelineSlider.addEventListener('touchend', () => isHovered = false);

        function autoScroll() {
            if (!isHovered) {
                timelineSlider.scrollLeft += 1;
                if (timelineSlider.scrollLeft >= 2600) {
                    timelineSlider.scrollLeft = 0;
                }
            }
            requestAnimationFrame(autoScroll);
        }
        autoScroll();
    }

    // 13. Affiliation Filtering Logic
    const filterBtns = document.querySelectorAll('.filter-btn');
    const affiliations = document.querySelectorAll('.glass-badge[data-category]');

    if (filterBtns.length > 0 && affiliations.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                affiliations.forEach(item => {
                    const category = item.getAttribute('data-category');
                    if (filterValue === 'all' || filterValue === category) {
                        item.style.display = 'flex';
                        // Add a small animation effect
                        item.style.opacity = '0';
                        setTimeout(() => {
                            item.style.transition = 'opacity 0.3s ease';
                            item.style.opacity = '1';
                        }, 50);
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

});
