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
          <h2><i class="fas fa-shopping-cart"></i> E-commerce Analytics: 20K Records Analysis</h2>
          <p>Advanced data analysis of 20,000+ transactions with machine learning insights and predictive modeling</p>
        </div>
        
        <div class="insights-grid">
          <div class="insight-card">
            <div class="insight-value">20,847</div>
            <div class="insight-label">Records Analyzed</div>
          </div>
          <div class="insight-card">
            <div class="insight-value">85%</div>
            <div class="insight-label">ML Model Accuracy</div>
          </div>
          <div class="insight-card">
            <div class="insight-value">$3.2M</div>
            <div class="insight-label">Revenue Impact</div>
          </div>
          <div class="insight-card">
            <div class="insight-value">12</div>
            <div class="insight-label">Customer Segments</div>
          </div>
        </div>
        
        <div class="analysis-summary">
          <h3><i class="fas fa-chart-line"></i> Key Findings from 20K Dataset:</h3>
          <ul>
            <li><strong>Customer Segmentation:</strong> Identified 12 distinct customer groups using RFM analysis</li>
            <li><strong>Predictive Modeling:</strong> Built ML model to predict customer lifetime value with 85% accuracy</li>
            <li><strong>Seasonal Patterns:</strong> Discovered 34% revenue increase during holiday seasons</li>
            <li><strong>Product Performance:</strong> Top 20% of products generate 78% of total revenue</li>
            <li><strong>Churn Prediction:</strong> Developed early warning system for customer retention</li>
          </ul>
        </div>
        
        <div class="chart-container">
          <div class="chart-title">Revenue Trends (20K Transactions)</div>
          <canvas id="salesChart" class="chart-canvas"></canvas>
        </div>
        
        <div class="chart-container">
          <div class="chart-title">Customer Segmentation Analysis</div>
          <canvas id="categoryChart" class="chart-canvas"></canvas>
        </div>
        
        <div class="chart-container">
          <div class="chart-title">Product Performance Distribution</div>
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

// E-commerce Charts for 20K Dataset Analysis
const createSalesChart = () => {
  const ctx = document.getElementById('salesChart').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      datasets: [{
        label: 'Revenue ($M)',
        data: [2.1, 2.8, 2.4, 3.2],
        borderColor: '#6c63ff',
        backgroundColor: 'rgba(108, 99, 255, 0.1)',
        tension: 0.4,
        fill: true,
        borderWidth: 3
      }, {
        label: 'Transactions (K)',
        data: [4.2, 5.8, 4.9, 6.8],
        borderColor: '#ff6584',
        backgroundColor: 'rgba(255, 101, 132, 0.1)',
        tension: 0.4,
        fill: false,
        borderWidth: 2,
        yAxisID: 'y1'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'top'
        }
      },
      scales: {
        y: {
          type: 'linear',
          display: true,
          position: 'left',
          beginAtZero: true,
          title: {
            display: true,
            text: 'Revenue ($M)'
          }
        },
        y1: {
          type: 'linear',
          display: true,
          position: 'right',
          beginAtZero: true,
          title: {
            display: true,
            text: 'Transactions (K)'
          },
          grid: {
            drawOnChartArea: false,
          },
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
      labels: ['High-Value Customers', 'Frequent Buyers', 'Seasonal Shoppers', 'Price-Sensitive', 'New Customers', 'At-Risk'],
      datasets: [{
        data: [15, 22, 18, 25, 12, 8],
        backgroundColor: ['#6c63ff', '#42b883', '#ffa726', '#ff6584', '#26c6da', '#9c27b0'],
        borderWidth: 2,
        borderColor: '#fff'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            padding: 20,
            usePointStyle: true
          }
        },
        title: {
          display: true,
          text: 'Customer Segments (12 groups identified)'
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
      labels: ['Electronics', 'Fashion', 'Home & Garden', 'Sports', 'Books', 'Beauty', 'Toys', 'Automotive'],
      datasets: [{
        label: 'Revenue Share (%)',
        data: [28, 22, 18, 12, 8, 6, 4, 2],
        backgroundColor: ['#6c63ff', '#ff6584', '#42b883', '#ffa726', '#26c6da', '#9c27b0', '#795548', '#607d8b'],
        borderRadius: 8,
        borderSkipped: false,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        title: {
          display: true,
          text: 'Product Category Revenue Distribution (20K transactions)'
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 30,
          title: {
            display: true,
            text: 'Revenue Share (%)'
          }
        },
        x: {
          title: {
            display: true,
            text: 'Product Categories'
          }
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