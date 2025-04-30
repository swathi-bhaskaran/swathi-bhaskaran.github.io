// script.js
document.addEventListener('DOMContentLoaded', function() {
  // Initialize Particles.js
  particlesJS.load('particles-js', 'assets/particles.json', function() {
    console.log('Particles.js loaded');
  });

  // Theme Toggle
  const themeToggle = document.getElementById('theme-toggle');
  const currentTheme = localStorage.getItem('theme');
  
  if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
  }

  themeToggle.addEventListener('click', function() {
    let theme = 'light';
    if (document.documentElement.getAttribute('data-theme') === 'light') {
      theme = 'dark';
    }
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    updateThemeIcon(theme);
  });

  function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
      icon.classList.replace('fa-moon', 'fa-sun');
    } else {
      icon.classList.replace('fa-sun', 'fa-moon');
    }
  }

  // Typewriter Effect
  const typewriterText = "Hi, I'm Swathi";
  const subtitleText = "Data Engineer | Open Source Contributor";
  const heroTitle = document.querySelector('.hero h1');
  const heroSubtitle = document.querySelector('.hero p');
  
  // Reset for animation
  heroTitle.textContent = '';
  heroSubtitle.textContent = '';
  
  // Animate title
  let i = 0;
  const typing = setInterval(() => {
    if (i < typewriterText.length) {
      heroTitle.textContent += typewriterText.charAt(i);
      i++;
    } else {
      clearInterval(typing);
      // Animate subtitle
      let j = 0;
      const subtitleTyping = setInterval(() => {
        if (j < subtitleText.length) {
          heroSubtitle.textContent += subtitleText.charAt(j);
          j++;
        } else {
          clearInterval(subtitleTyping);
        }
      }, 50);
    }
  }, 100);

  // Animate skills
  const skills = document.querySelectorAll('.skill');
  skills.forEach(skill => {
    const level = skill.getAttribute('data-level');
    const skillBar = document.createElement('div');
    skillBar.className = 'skill-bar';
    const skillLevel = document.createElement('div');
    skillLevel.className = 'skill-level';
    skillLevel.style.width = '0';
    skillBar.appendChild(skillLevel);
    skill.appendChild(skillBar);
    
    // Animate after a delay
    setTimeout(() => {
      skillLevel.style.width = `${level}%`;
    }, 500);
  });

  // Fetch GitHub Projects
  async function fetchProjects() {
    try {
      const response = await fetch('https://api.github.com/users/hq4743/repos?sort=updated&per_page=6');
      const projects = await response.json();
      const container = document.getElementById('projects-container');
      
      projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card fade-in';
        card.innerHTML = `
          <h3>${project.name.replace(/-/g, ' ').replace(/_/g, ' ')}</h3>
          <p>${project.description || 'No description available'}</p>
          <div class="project-links">
            <a href="${project.html_url}" target="_blank" class="btn">
              <i class="fab fa-github"></i> View Code
            </a>
            ${project.homepage ? `
            <a href="${project.homepage}" target="_blank" class="btn-outline">
              <i class="fas fa-external-link-alt"></i> Live Demo
            </a>` : ''}
          </div>
        `;
        container.appendChild(card);
        
        // Add staggered animation
        card.style.animationDelay = `${projects.indexOf(project) * 0.2}s`;
      });
    } catch (error) {
      console.error('Error fetching projects:', error);
      document.getElementById('projects-container').innerHTML = `
        <div class="error-message">
          <p>Failed to load projects. Please check my <a href="https://github.com/hq4743" target="_blank">GitHub profile</a>.</p>
        </div>
      `;
    }
  }

  fetchProjects();

  // Smooth scrolling for anchor links
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

  // Intersection Observer for scroll animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
  });

  // 3D tilt effect for project cards
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
      const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
      card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'rotateY(0deg) rotateX(0deg)';
      card.style.transition = 'all 0.5s ease';
    });
  });
});