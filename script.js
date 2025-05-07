// projects.js - Dynamic project loader with fallback
document.addEventListener('DOMContentLoaded', function() {
  const container = document.getElementById('projects-container');
  
  // Try to load projects from GitHub first
  loadProjectsFromGitHub().catch(error => {
    console.error("GitHub load failed:", error);
    showManualProjects(); // Fallback if GitHub fails
  });

  // Initialize animations after loading
  initProjectCards();
});

async function loadProjectsFromGitHub() {
  const response = await fetch('https://api.github.com/repos/hq4743/hq4743.github.io/contents/assets/projects');
  const projects = await response.json();
  
  const container = document.getElementById('projects-container');
  container.innerHTML = ''; // Clear loading placeholders

  projects.forEach(project => {
    if (project.type === 'dir') {
      container.appendChild(createProjectCard(project));
    }
  });
}

function createProjectCard(project) {
  const card = document.createElement('div');
  card.className = 'project-card';
  
  // Basic card structure (customize with your actual project data)
  card.innerHTML = `
    <h3>${formatProjectName(project.name)}</h3>
    <p>${project.description || 'Data engineering project'}</p>
    <div class="project-media">
      <img src="${getProjectImage(project)}" 
           alt="${project.name} preview"
           onerror="this.src='assets/default-project.png'">
      <div class="file-links">
        <a href="https://github.com/hq4743/hq4743.github.io/tree/main/assets/projects/${project.name}" 
           class="btn" target="_blank">
          <i class="fab fa-github"></i> View on GitHub
        </a>
      </div>
    </div>
  `;
  
  return card;
}

// Fallback when GitHub loading fails
function showManualProjects() {
  const container = document.getElementById('projects-container');
  container.innerHTML = `
    <div class="project-card">
      <h3>Healthcare Analytics</h3>
      <p>Data analysis of patient records</p>
      <div class="project-media">
        <img src="assets/projects/healthcare/screenshot.png" alt="Healthcare Project">
        <div class="file-links">
          <a href="assets/projects/healthcare/report.pdf" class="btn" download>
            <i class="fas fa-file-pdf"></i> Report
          </a>
        </div>
      </div>
    </div>
    <div class="project-card">
      <h3>Sales Dashboard</h3>
      <p>Interactive Tableau dashboard</p>
      <div class="project-media">
        <img src="assets/projects/sales-dashboard/preview.jpg" alt="Sales Dashboard">
        <div class="file-links">
          <a href="assets/projects/sales-dashboard/dashboard.twb" class="btn" download>
            <i class="fas fa-download"></i> Tableau File
          </a>
        </div>
      </div>
    </div>
  `;
}

// Helper functions
function formatProjectName(name) {
  return name.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
}

function getProjectImage(project) {
  // Implement logic to find project image
  return `assets/projects/${project.name}/preview.jpg`;
}

function initProjectCards() {
  // Your existing card animation code
  const cards = document.querySelectorAll('.project-card');
  cards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
    // Add your tilt effects here...
  });
}