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
        <style>
          .tabs{margin-top:10px}
          .tab-buttons{display:flex;gap:10px;flex-wrap:wrap;margin:10px 0}
          .tab-button{padding:8px 14px;border:1px solid var(--glass-border);border-radius:999px;background:var(--glass-bg);cursor:pointer}
          .tab-button.active{background:var(--primary);color:#fff}
          .tab-panel{display:none;margin-top:10px}
          .tab-panel.active{display:block}
          .data-toolbar{display:flex;gap:10px;align-items:center;justify-content:space-between;margin:8px 0}
          .table-wrap{max-height:55vh;overflow:auto;border:1px solid var(--glass-border);border-radius:12px}
          table.data{width:100%;border-collapse:separate;border-spacing:0}
          table.data th, table.data td{padding:8px 10px;border-bottom:1px solid var(--glass-border);font-size:0.95rem;white-space:nowrap}
          table.data thead th{position:sticky;top:0;background:var(--card-bg,#111827);z-index:1}
          .pager{display:flex;gap:8px;align-items:center}
          .pager button{padding:6px 10px;border:1px solid var(--glass-border);background:var(--glass-bg);border-radius:6px;cursor:pointer}
          .badge{display:inline-block;padding:2px 8px;border-radius:999px;background:rgba(108,99,255,.12);color:var(--primary);font-weight:600;margin-left:6px}
        </style>

        <div class="modal-header">
          <h2><i class="fas fa-shopping-cart"></i> E-commerce Analytics: 20K Records Analysis <span class="badge">Beta</span></h2>
          <p>Advanced analysis of 20,000+ transactions with ML insights and full data browse.</p>
        </div>

        <div class="tabs">
          <div class="tab-buttons">
            <button class="tab-button active" data-tab="overview">Overview</button>
            <button class="tab-button" data-tab="sales">Sales</button>
            <button class="tab-button" data-tab="customers">Customers</button>
            <button class="tab-button" data-tab="products">Products</button>
            <button class="tab-button" data-tab="data">Data</button>
          </div>

          <div id="tab-overview" class="tab-panel active">
            <div class="insights-grid">
              <div class="insight-card"><div class="insight-value">20,847</div><div class="insight-label">Records Analyzed</div></div>
              <div class="insight-card"><div class="insight-value">85%</div><div class="insight-label">ML Model Accuracy</div></div>
              <div class="insight-card"><div class="insight-value">$3.2M</div><div class="insight-label">Revenue Impact</div></div>
              <div class="insight-card"><div class="insight-value">12</div><div class="insight-label">Customer Segments</div></div>
            </div>
            <div class="analysis-summary">
              <h3><i class="fas fa-chart-line"></i> Executive Summary</h3>
              <ul>
                <li><strong>Segmentation:</strong> 12 groups identified via RFM and k-means.</li>
                <li><strong>Seasonality:</strong> Q4 outperforms Q1 by ~52% revenue.</li>
                <li><strong>Assortment:</strong> Top 20% SKUs drive 78% of revenue.</li>
                <li><strong>Retention:</strong> Churn risk reduced with CLV-based offers.</li>
              </ul>
            </div>
          </div>

          <div id="tab-sales" class="tab-panel">
            <div class="chart-container">
              <div class="chart-title">Revenue Trends (20K Transactions)</div>
              <canvas id="salesChart" class="chart-canvas"></canvas>
            </div>
          </div>

          <div id="tab-customers" class="tab-panel">
            <div class="chart-container">
              <div class="chart-title">Customer Segmentation Analysis</div>
              <canvas id="categoryChart" class="chart-canvas"></canvas>
            </div>
          </div>

          <div id="tab-products" class="tab-panel">
            <div class="chart-container">
              <div class="chart-title">Product Performance Distribution</div>
              <canvas id="channelChart" class="chart-canvas"></canvas>
            </div>
          </div>

          <div id="tab-data" class="tab-panel">
            <div class="data-toolbar">
              <div class="pager">
                <button id="ecom-prev">Prev</button>
                <span id="ecom-page-info">Page 1</span>
                <button id="ecom-next">Next</button>
              </div>
              <div>
                Rows per page:
                <select id="ecom-page-size">
                  <option value="20">20</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
              </div>
            </div>
            <div class="table-wrap">
              <table class="data" id="ecom-table"></table>
            </div>
          </div>
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
      initEcommerceTabs();
      initializeEcommerceDataTab();
      break;
  }
};

// E-commerce Charts for 20K Dataset Analysis
const createSalesChart = () => {
  const canvas = document.getElementById('salesChart');
  if (!canvas) return;
  // Lock a consistent drawing size so it doesn't stretch/clip
  canvas.width = 900;
  canvas.height = 240;
  const ctx = canvas.getContext('2d');
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
      responsive: false,
      animation: { duration: 0 },
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
  const canvas = document.getElementById('categoryChart');
  if (!canvas) return;
  canvas.width = 900;
  canvas.height = 240;
  const ctx = canvas.getContext('2d');
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['High-Value Customers', 'Frequent Buyers', 'Seasonal Shoppers', 'Price-Sensitive', 'New Customers', 'At-Risk'],
      datasets: [{
        data: [15, 22, 18, 25, 12, 8],
        backgroundColor: ['#6c63ff', '#42b883', '#ffa726', '#ff6584', '#26c6da', '#9c27b0'],
        borderWidth: 2,
        borderColor: '#fff',
        hoverOffset: 0
      }]
    },
    options: {
      responsive: false,
      animation: { duration: 0 },
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
  const canvas = document.getElementById('channelChart');
  if (!canvas) return;
  canvas.width = 900;
  canvas.height = 240;
  const ctx = canvas.getContext('2d');
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
      responsive: false,
      animation: { duration: 0 },
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

// ----- Tabs + Data (CSV) -----
let __ecomCsvRows = null;
let __ecomHeaders = null;
let __ecomPage = 1;
let __ecomPageSize = 20;

const initEcommerceTabs = () => {
  const buttons = document.querySelectorAll('.tab-button');
  const panels = document.querySelectorAll('.tab-panel');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const id = btn.dataset.tab;
      const panel = document.getElementById(`tab-${id}`);
      if (panel) panel.classList.add('active');
    });
  });
};

const initializeEcommerceDataTab = async () => {
  const prev = document.getElementById('ecom-prev');
  const next = document.getElementById('ecom-next');
  const pageInfo = document.getElementById('ecom-page-info');
  const pageSizeSel = document.getElementById('ecom-page-size');

  if (!prev || !next || !pageInfo || !pageSizeSel) return;

  pageSizeSel.addEventListener('change', () => {
    __ecomPageSize = parseInt(pageSizeSel.value, 10);
    __ecomPage = 1;
    renderEcommerceTable();
  });
  prev.addEventListener('click', () => {
    if (__ecomPage > 1) { __ecomPage -= 1; renderEcommerceTable(); }
  });
  next.addEventListener('click', () => {
    const totalPages = Math.ceil((__ecomCsvRows?.length || 0) / __ecomPageSize);
    if (__ecomPage < totalPages) { __ecomPage += 1; renderEcommerceTable(); }
  });

  if (!__ecomCsvRows) {
    await loadEcommerceCsv();
  }
  renderEcommerceTable();
};

const loadEcommerceCsv = async () => {
  // Try loading user's CSV placed in assets. Falls back silently if missing.
  try {
    const res = await fetch(`assets/cleaned_data.csv?v=${Date.now()}`);
    if (!res.ok) return;
    const text = await res.text();
    const lines = text.split(/\r?\n/).filter(l => l.trim().length > 0);
    if (lines.length === 0) return;
    __ecomHeaders = parseCsvLine(lines[0]);
    __ecomCsvRows = lines.slice(1).map(parseCsvLine);
  } catch (_) {
    // ignore
  }
};

const parseCsvLine = (line) => {
  const result = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i+1] === '"') { current += '"'; i++; }
      else { inQuotes = !inQuotes; }
    } else if (ch === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += ch;
    }
  }
  result.push(current);
  return result;
};

const renderEcommerceTable = () => {
  const table = document.getElementById('ecom-table');
  const pageInfo = document.getElementById('ecom-page-info');
  if (!table || !__ecomHeaders) {
    table && (table.innerHTML = '<tbody><tr><td>CSV not found at assets/cleaned_data.csv</td></tr></tbody>');
    return;
  }
  const start = (__ecomPage - 1) * __ecomPageSize;
  const end = Math.min(start + __ecomPageSize, __ecomCsvRows.length);
  const rows = __ecomCsvRows.slice(start, end);
  const thead = `<thead><tr>${__ecomHeaders.map(h => `<th>${escapeHtml(h)}</th>`).join('')}</tr></thead>`;
  const tbody = `<tbody>${rows.map(r => `<tr>${r.map(c => `<td>${escapeHtml(c)}</td>`).join('')}</tr>`).join('')}</tbody>`;
  table.innerHTML = thead + tbody;
  const totalPages = Math.ceil(__ecomCsvRows.length / __ecomPageSize) || 1;
  pageInfo.textContent = `Page ${__ecomPage} of ${totalPages}`;
};

const escapeHtml = (s) => String(s)
  .replace(/&/g,'&amp;')
  .replace(/</g,'&lt;')
  .replace(/>/g,'&gt;')
  .replace(/"/g,'&quot;')
  .replace(/'/g,'&#39;');

// Initialize Everything
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initTypewriter();
  initSmoothScroll();
  initCardTilt();
  initScrollAnimations();
  initContactForm();
});