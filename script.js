// ===== Theme Management =====
const initTheme = () => {
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = themeToggle.querySelector('i');
  const html = document.documentElement;
  
  // Theme configurations
  const themes = {
    light: {
      icon: 'fa-moon',
      label: 'Switch to Dark Mode'
    },
    dark: {
      icon: 'fa-sun',
      label: 'Switch to Light Mode'
    }
  };
  
  // Get user preference or fallback to system preference
  const getPreferredTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme;
    
    return window.matchMedia('(prefers-color-scheme: dark)').matches 
      ? 'dark' 
      : 'light';
  };
  
  // Apply theme
  const setTheme = (theme) => {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    themeIcon.className = `fas ${themes[theme].icon}`;
    themeToggle.setAttribute('aria-label', themes[theme].label);
    
    // Update mobile browser UI
    const themeColor = getComputedStyle(html)
      .getPropertyValue('--nav-bg')
      .trim();
    document.querySelector('meta[name="theme-color"]')
      .setAttribute('content', themeColor);
  };
  
  // Initialize
  const preferredTheme = getPreferredTheme();
  setTheme(preferredTheme);
  
  // Watch for system changes (only if no manual preference)
  if (!localStorage.getItem('theme')) {
    window.matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (e) => {
        const newTheme = e.matches ? 'dark' : 'light';
        setTheme(newTheme);
      });
  }
  
  // Toggle on click
  themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
  });
};

// ===== Animate Skills =====
const animateSkills = () => {
  document.querySelectorAll('.skill').forEach(skill => {
    const level = skill.dataset.level;
    const bar = document.createElement('div');
    bar.className = 'skill-bar';
    bar.innerHTML = `<div class="skill-level" style="width: 0"></div>`;
    skill.appendChild(bar);
    
    setTimeout(() => {
      bar.querySelector('.skill-level').style.width = `${level}%`;
    }, 500);
  });
};

// ===== Rest of your existing JavaScript =====
// Keep all other functions EXACTLY as they are:
// initTypewriter(), initSmoothScroll(), initCardTilt(), initScrollAnimations()

// Initialize Everything
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initTypewriter();
  animateSkills();
  initSmoothScroll();
  initCardTilt();
  initScrollAnimations();
});