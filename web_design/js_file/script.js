// Mobile Menu Toggle
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');
const header = document.querySelector('header');

// Create mobile nav element
const mobileNav = document.createElement('div');
mobileNav.classList.add('mobile-nav');
mobileNav.innerHTML = `
    <ul>
        <li><a href="#features">Features</a></li>
        <li><a href="#testimonials">Testimonials</a></li>
        <li><a href="#pricing">Pricing</a></li>
        <li><a href="#contact">Contact</a></li>
    </ul>
    <a href="#signup" class="btn btn-primary">Sign Up</a>
`;
document.body.appendChild(mobileNav);

// Toggle mobile menu
mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    mobileNav.classList.toggle('active');
});

// Close mobile menu when clicking on a link
mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        mobileNav.classList.remove('active');
    });
});

// Close mobile menu when scrolling
window.addEventListener('scroll', () => {
    if (mobileNav.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        mobileNav.classList.remove('active');
    }
});

// Testimonial Slider
const testimonialSlides = document.querySelectorAll('.testimonial-slide');
const testimonialDots = document.querySelectorAll('.testimonial-dot');
let currentSlide = 0;

function showSlide(index) {
    testimonialSlides.forEach(slide => slide.classList.remove('active'));
    testimonialDots.forEach(dot => dot.classList.remove('active'));
    
    testimonialSlides[index].classList.add('active');
    testimonialDots[index].classList.add('active');
    currentSlide = index;
}

// Add click event to dots
testimonialDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(index);
    });
});

// Auto slide
function autoSlide() {
    const nextSlide = (currentSlide + 1) % testimonialSlides.length;
    showSlide(nextSlide);
}

// Set interval for auto slide
let slideInterval = setInterval(autoSlide, 5000);

// Pause auto slide on hover
const testimonialSlider = document.querySelector('.testimonial-slider');
testimonialSlider.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
});

testimonialSlider.addEventListener('mouseleave', () => {
    slideInterval = setInterval(autoSlide, 5000);
});

// Pricing Toggle
const pricingToggle = document.getElementById('pricing-toggle');
const jobSeekersPricing = document.querySelector('.pricing-grid.job-seekers');
const employersPricing = document.querySelector('.pricing-grid.employers');
const pricingLabels = document.querySelectorAll('.pricing-toggle span');

pricingToggle.addEventListener('change', () => {
    if (pricingToggle.checked) {
        jobSeekersPricing.classList.add('hidden');
        employersPricing.classList.remove('hidden');
        pricingLabels[0].classList.remove('active');
        pricingLabels[1].classList.add('active');
    } else {
        jobSeekersPricing.classList.remove('hidden');
        employersPricing.classList.add('hidden');
        pricingLabels[0].classList.add('active');
        pricingLabels[1].classList.remove('active');
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = header.offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Form submission
const ctaForm = document.querySelector('.cta-form');
if (ctaForm) {
    ctaForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        
        // Simple validation
        if (!email || !email.includes('@')) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Here you would typically send the data to your server
        // For demo purposes, we'll just show an alert
        alert(`Thank you for signing up with ${email}! We'll be in touch soon.`);
        this.reset();
    });
}

// Animate elements on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.feature-card, .pricing-card, .section-header, .testimonial-slider');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Set initial styles for animation
document.querySelectorAll('.feature-card, .pricing-card, .section-header, .testimonial-slider').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

// Listen for scroll events
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);