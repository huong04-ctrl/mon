// Scroll Animation with Intersection Observer
document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));
    
    // 3D Mouse Tracking Effect for the Glass Card
    const card = document.querySelector('.glass-card');
    const heroImage = document.querySelector('.hero-image');
    
    if (card && heroImage) {
        heroImage.addEventListener('mousemove', (e) => {
            // Get the bounding rectangle of target
            const rect = heroImage.getBoundingClientRect();
            
            // Mouse position relative to the element
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Calculate center
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Rotate amounts (-20 to 20 deg)
            const rotateX = ((y - centerY) / centerY) * -15; 
            const rotateY = ((x - centerX) / centerX) * 15;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        // Reset card on mouse leave
        heroImage.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
            card.style.transition = 'transform 0.5s ease-out';
        });
        
        heroImage.addEventListener('mouseenter', () => {
            card.style.transition = 'transform 0.1s ease-out';
        });
    }
});
