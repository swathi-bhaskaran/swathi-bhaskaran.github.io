// Fetch GitHub Projects
async function fetchProjects() {
  try {
    const response = await fetch("https://api.github.com/users/hq4743/repos?sort=updated");
    const projects = await response.json();
    const container = document.getElementById("projects-container");
    
    // Show 6 most recently updated projects
    projects.slice(0, 6).forEach(project => {
      const card = document.createElement("div");
      card.className = "project-card";
      card.innerHTML = `
        <h3>${project.name.replace(/-/g, " ")}</h3>
        <p>${project.description || "No description available"}</p>
        <div class="project-links">
          <a href="${project.html_url}" target="_blank" class="btn">View Code</a>
          ${project.homepage ? `<a href="${project.homepage}" target="_blank" class="btn">Live Demo</a>` : ""}
        </div>
      `;
      container.appendChild(card);
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    document.getElementById("projects-container").innerHTML = 
      "<p>Failed to load projects. Please check back later.</p>";
  }
}

// Initialize when page loads
document.addEventListener("DOMContentLoaded", () => {
  fetchProjects();
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth"
      });
    });
  });
});