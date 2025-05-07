// Initialize Project Cards
const initProjectCards = () => {
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach((card, index) => {
    // Add animation delay
    card.style.animationDelay = `${index * 0.1}s`;
    
    // Initialize tilt effect
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const angleX = (y - centerY) / 20;
      const angleY = (centerX - x) / 20;
      
      card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
  });
};

// Update the initialization at the bottom of the file:
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initTypewriter();
  initProjectCards(); // Replaced loadProjects()
  animateSkills();
  initSmoothScroll();
  initScrollAnimations();
});