// Theme Management
const initTheme = () => {
  const themeToggle = document.getElementById('theme-toggle');
  const icon = themeToggle.querySelector('i');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  
  // Check localStorage for saved theme
  const savedTheme = localStorage.getItem('theme');
  
  // Set initial theme
  let currentTheme = savedTheme || (prefersDark.matches ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', currentTheme);
  
  // Set initial icon
  if (currentTheme === 'dark') {
    icon.classList.replace('fa-moon', 'fa-sun');
  }

  // Toggle function
  themeToggle.addEventListener('click', () => {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
    
    // Update icon
    icon.classList.toggle('fa-sun');
    icon.classList.toggle('fa-moon');
  });
};

// Typewriter Effect
const initTypewriter = () => {
  const title = document.querySelector('.hero h1');
  const subtitle = document.querySelector('.hero p');
  const titleText = "Hi, I'm Swathi";
  const subtitleText = "Data Engineer | Open Source Contributor";
  
  // Reset for animation
  title.textContent = '';
  subtitle.textContent = '';
  
  // Animate title
  let i = 0;
  const typing = setInterval(() => {
    if (i < titleText.length) {
      title.textContent += titleText[i];
      i++;
    } else {
      clearInterval(typing);
      // Animate subtitle
      let j = 0;
      const subtitleTyping = setInterval(() => {
        if (j < subtitleText.length) {
          subtitle.textContent += subtitleText[j];
          j++;
        } else {
          clearInterval(subtitleTyping);
        }
      }, 50);
    }
  }, 100);
};

// Animate Skills
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

// Smooth Scrolling
const initSmoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
};

// Initialize Everything
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initTypewriter();
  animateSkills();
  initSmoothScroll();
});