// projects.js - New file to handle dynamic loading
const loadProjects = async () => {
  try {
    // GitHub API endpoint for your projects folder
    const response = await fetch('https://api.github.com/repos/hq4743/hq4743.github.io/contents/assets/projects');
    const projects = await response.json();
    
    const container = document.getElementById('projects-container');
    
    // Clear existing placeholder cards
    container.innerHTML = '';
    
    projects.forEach(async (projectDir) => {
      if (projectDir.type === 'dir') {
        // Get project details
        const projResponse = await fetch(projectDir.url);
        const projContents = await projResponse.json();
        
        // Find assets
        const screenshot = projContents.find(file => 
          file.name.match(/screenshot|preview|thumbnail/i)
        );
        const report = projContents.find(file => 
          file.name.match(/report|documentation|readme/i)
        );
        const notebook = projContents.find(file => 
          file.name.endsWith('.ipynb')
        );
        const dataFile = projContents.find(file => 
          file.name.match(/\.csv|\.twb|\.xlsx/i)
        );
        
        // Create card
        const card = document.createElement('div');
        card.className = 'project-card';
        
        card.innerHTML = `
          <h3>${formatName(projectDir.name)}</h3>
          <p>${getDescription(projContents)}</p>
          <div class="project-media">
            ${screenshot ? `
              <img src="${screenshot.download_url}" 
                   alt="${projectDir.name} Screenshot"
                   onerror="this.src='assets/default-project.png'">` : ''}
            <div class="file-links">
              ${report ? `
                <a href="${report.download_url}" class="btn" download>
                  <i class="fas fa-file-pdf"></i> Download Report
                </a>` : ''}
              ${notebook ? `
                <a href="${notebook.download_url}" class="btn btn-secondary" download>
                  <i class="fab fa-python"></i> Jupyter Notebook
                </a>` : ''}
              ${dataFile ? `
                <a href="${dataFile.download_url}" class="btn btn-secondary" download>
                  <i class="${getFileIcon(dataFile.name)}"></i> ${dataFile.name}
                </a>` : ''}
            </div>
          </div>
        `;
        
        container.appendChild(card);
      }
    });
    
    // Reinitialize animations after loading
    initProjectCards();
    
  } catch (error) {
    console.error("Failed to load projects:", error);
    document.getElementById('projects-container').innerHTML = `
      <div class="error-message">
        <i class="fas fa-exclamation-triangle"></i>
        <p>Projects failed to load. Please visit my <a href="https://github.com/hq4743">GitHub</a> directly.</p>
      </div>
    `;
  }
};

// Helper functions
function formatName(name) {
  return name.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
}

function getDescription(contents) {
  const readme = contents.find(file => file.name.toLowerCase() === 'readme.md');
  return readme ? "Description loaded from README" : "Data engineering project";
}

function getFileIcon(filename) {
  if (filename.endsWith('.csv')) return 'fas fa-file-csv';
  if (filename.endsWith('.twb')) return 'fas fa-chart-bar';
  if (filename.endsWith('.xlsx')) return 'fas fa-file-excel';
  return 'fas fa-file-download';
}

// Update your initialization
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initTypewriter();
  loadProjects(); // Replaced initProjectCards()
  animateSkills();
  initSmoothScroll();
  initScrollAnimations();
});