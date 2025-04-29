// Fetch GitHub Projects
async function fetchGitHubProjects() {
  const username = "hq4743"; // Replace with your GitHub username
  const response = await fetch(`https://api.github.com/users/${username}/repos`);
  const projects = await response.json();
  
  const projectsContainer = document.getElementById("projects-container");
  
  projects.slice(0, 6).forEach(project => {
    const projectCard = document.createElement("div");
    projectCard.className = "project-card";
    projectCard.innerHTML = `
      <h3>${project.name}</h3>
      <p>${project.description || "No description"}</p>
      <a href="${project.html_url}" target="_blank" class="btn">View on GitHub</a>
    `;
    projectsContainer.appendChild(projectCard);
  });
}

fetchGitHubProjects();