// Current Year for Footer
document.getElementById('year').textContent = new Date().getFullYear();

// Custom Cursor Glow
const cursorGlow = document.getElementById('cursorGlow');
document.addEventListener('mousemove', (e) => {
  cursorGlow.style.left = e.clientX + 'px';
  cursorGlow.style.top = e.clientY + 'px';
});

// Navigation Scroll Effect
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');



// Vehicle Tabs
const tabs = document.querySelectorAll('.vtab');
const cards = document.querySelectorAll('.vcard');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    // Remove active class from all tabs
    tabs.forEach(t => t.classList.remove('active'));
    // Add active class to clicked tab
    tab.classList.add('active');
    
    const cat = tab.getAttribute('data-cat');
    
    cards.forEach(card => {
      // Reset animation
      card.style.animation = 'none';
      card.offsetHeight; // Trigger reflow
      
      if (cat === 'all' || card.getAttribute('data-cat') === cat) {
        card.style.display = 'block';
        card.style.animation = 'fadeUp 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// Number Counter Animation for Hero Stats
function animateCounters() {
  const counters = document.querySelectorAll('.hstat-num');
  const speed = 200; // The lower the slower

  counters.forEach(counter => {
    const updateCount = () => {
      const target = +counter.getAttribute('data-target');
      const count = +counter.innerText;
      const inc = target / speed;

      if (count < target) {
        counter.innerText = Math.ceil(count + inc);
        setTimeout(updateCount, 10);
      } else {
        counter.innerText = target;
      }
    };
    updateCount();
  });
}

// Scroll Reveal Animations using Framer Motion logic equivalent via Intersection Observer
const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

// Add animation styles dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(40px); }
    to { opacity: 1; transform: translateY(0); visibility: visible; }
  }
  @keyframes fadeLeft {
    from { opacity: 0; transform: translateX(-40px); }
    to { opacity: 1; transform: translateX(0); visibility: visible; }
  }
  @keyframes fadeRight {
    from { opacity: 0; transform: translateX(40px); }
    to { opacity: 1; transform: translateX(0); visibility: visible; }
  }
  
  .is-revealed {
    animation: fadeUp 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
  }
  .is-revealed.reveal-left {
    animation-name: fadeLeft;
  }
  .is-revealed.reveal-right {
    animation-name: fadeRight;
  }
`;
document.head.appendChild(style);

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Apply delay if specified in inline style
      const delay = entry.target.style.getPropertyValue('--delay') || '0s';
      entry.target.style.animationDelay = delay;
      entry.target.classList.add('is-revealed');
      
      // Trigger counters if hero stats are revealed
      if (entry.target.classList.contains('hero-stats')) {
        animateCounters();
      }
      
      observer.unobserve(entry.target);
    }
  });
}, {
  root: null,
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => {
  revealObserver.observe(el);
});

// Form Submission
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = contactForm.querySelector('button[type="submit"]');
  btn.innerHTML = 'Sending...';
  btn.style.opacity = '0.7';
  
  setTimeout(() => {
    btn.innerHTML = 'Send Message →';
    btn.style.opacity = '1';
    formSuccess.style.display = 'block';
    contactForm.reset();
    
    setTimeout(() => {
      formSuccess.style.display = 'none';
    }, 5000);
  }, 1500);
});
