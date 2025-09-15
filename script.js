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

  // Watch for system changes (only if no saved preference)
  if (!savedTheme) {
    prefersDark.addEventListener('change', e => {
      currentTheme = e.matches ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', currentTheme);
      icon.className = e.matches ? 'fas fa-sun' : 'fas fa-moon';
    });
  }
};

// Typewriter Effect
const initTypewriter = () => {
  const title = document.querySelector('.hero h1');
  const subtitle = document.querySelector('.hero p');
  const titleText = "Hi, I'm Swathi";
  const subtitleText = "Data Analyst | Business Intelligence Specialist";
  
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


// Scroll Animations
const initScrollAnimations = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.project-card, .section-header').forEach(el => {
    observer.observe(el);
  });
};

// Contact Form Handler
const initContactForm = () => {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('contact-status');
  
  if (!form || !status) return;

  function setStatus(message, isSuccess = true) {
    status.textContent = message;
    status.style.color = isSuccess ? '#2e7d32' : '#c62828';
    status.style.display = 'block';
  }

  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    setStatus('Sending message...', true);
    
    const formData = new FormData(form);
    
    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        setStatus('Thanks! Your message was sent successfully.', true);
        form.reset();
        // Track form submission
        if (window.gtag) {
          gtag('event', 'form_submit', {
            event_category: 'engagement',
            event_label: 'contact_form'
          });
        }
      } else {
        setStatus('Oops! There was a problem sending your message. Please try again.', false);
      }
    } catch (error) {
      setStatus('Network error. Please check your connection and try again.', false);
    }
  });
};

// 3D Card Tilt Effect
const initCardTilt = () => {
  document.querySelectorAll('.project-card').forEach(card => {
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
      card.style.transition = 'transform 0.5s ease';
      setTimeout(() => card.style.transition = '', 500);
    });
  });
};

// Modal Functions
const openModal = (projectType) => {
  const modal = document.getElementById('modal-overlay');
  const modalBody = document.getElementById('modal-body');
  
  modalBody.innerHTML = getProjectVisualization(projectType);
  modal.classList.add('show');
  document.body.style.overflow = 'hidden';
  
  // Initialize charts after modal is shown
  setTimeout(() => {
    initializeCharts(projectType);
  }, 100);
};

const closeModal = () => {
  const modal = document.getElementById('modal-overlay');
  modal.classList.remove('show');
  document.body.style.overflow = 'auto';
};

const getProjectVisualization = (projectType) => {
  switch(projectType) {
    case 'ecommerce':
      return `
        <div class="modal-header">
          <h2><i class="fas fa-shopping-cart"></i> E-commerce Sales Analysis</h2>
          <p>Comprehensive analysis of online retail performance and customer behavior</p>
        </div>
        
        <div class="insights-grid">
          <div class="insight-card">
            <div class="insight-value">+23%</div>
            <div class="insight-label">Revenue Growth</div>
          </div>
          <div class="insight-card">
            <div class="insight-value">15%</div>
            <div class="insight-label">Conversion Rate</div>
          </div>
          <div class="insight-card">
            <div class="insight-value">$2.4M</div>
            <div class="insight-label">Total Sales</div>
          </div>
          <div class="insight-card">
            <div class="insight-value">4.2</div>
            <div class="insight-label">Avg Order Value</div>
          </div>
        </div>
        
        <div class="chart-container">
          <div class="chart-title">Monthly Sales Trend</div>
          <canvas id="salesChart" class="chart-canvas"></canvas>
        </div>
        
        <div class="chart-container">
          <div class="chart-title">Product Category Performance</div>
          <canvas id="categoryChart" class="chart-canvas"></canvas>
        </div>
        
        <div class="chart-container">
          <div class="chart-title">Customer Acquisition Channels</div>
          <canvas id="channelChart" class="chart-canvas"></canvas>
        </div>
      `;
      
    default:
      return '<p>Visualization not available</p>';
  }
};

const initializeCharts = (projectType) => {
  switch(projectType) {
    case 'ecommerce':
      createSalesChart();
      createCategoryChart();
      createChannelChart();
      break;
  }
};

// E-commerce Charts
const createSalesChart = () => {
  const ctx = document.getElementById('salesChart').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [{
        label: 'Sales ($M)',
        data: [1.2, 1.4, 1.1, 1.6, 1.8, 2.0, 1.9, 2.1, 2.3, 2.4, 2.6, 2.4],
        borderColor: '#6c63ff',
        backgroundColor: 'rgba(108, 99, 255, 0.1)',
        tension: 0.4,
        fill: true
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: 'rgba(0,0,0,0.1)'
          }
        }
      }
    }
  });
};

const createCategoryChart = () => {
  const ctx = document.getElementById('categoryChart').getContext('2d');
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Electronics', 'Clothing', 'Home & Garden', 'Books', 'Sports'],
      datasets: [{
        data: [35, 25, 20, 12, 8],
        backgroundColor: ['#6c63ff', '#ff6584', '#42b883', '#ffa726', '#26c6da']
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom'
        }
      }
    }
  });
};

const createChannelChart = () => {
  const ctx = document.getElementById('channelChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Organic Search', 'Social Media', 'Email', 'Direct', 'Paid Ads'],
      datasets: [{
        label: 'Traffic (%)',
        data: [40, 25, 15, 12, 8],
        backgroundColor: '#6c63ff'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 50
        }
      }
    }
  });
};

// Close modal when clicking outside
document.addEventListener('click', (e) => {
  if (e.target.id === 'modal-overlay') {
    closeModal();
  }
});

// Initialize Everything
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initTypewriter();
  initSmoothScroll();
  initCardTilt();
  initScrollAnimations();
  initContactForm();
});