import { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import ScrollReveal from "./ScrollReveal";
import { api } from "../utils/api";

function Projects() {
  const [projects, setProjects] = useState([]);

  const [selectedProject, setSelectedProject] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const getProjects = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.getProjects();

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));

        throw new Error(data.message || "Gagal mengambil data projects");
      }

      const data = await response.json();

      setProjects(data);
    } catch (error) {
      console.error("Error get projects:", error);

      setError(error.message || "Terjadi kesalahan saat mengambil project");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  // =========================
  // OPEN MODAL
  // =========================

  const handleViewProject = (project) => {
    setSelectedProject(project);

    document.body.style.overflow = "hidden";
  };

  // =========================
  // CLOSE MODAL
  // =========================

  const handleCloseModal = () => {
    setSelectedProject(null);

    document.body.style.overflow = "";
  };

  return (
    <section className="section projects" id="projects">
      <div className="section-header">
        <p className="section-label">Selected Work</p>

        <h2 className="section-title">Projects I'm proud of.</h2>

        <p className="section-description">
          Beberapa project yang saya buat untuk melatih kemampuan frontend dan
          backend.
        </p>
      </div>

      {loading && <p className="projects-status">Loading projects...</p>}

      {error && <p className="projects-error">{error}</p>}

      {!loading && !error && projects.length === 0 && (
        <p className="projects-status">Belum ada project yang tersedia.</p>
      )}

      {!loading && !error && projects.length > 0 && (
        <ScrollReveal>
          <div className="projects-container">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                title={project.title}
                description={project.description}
                technologies={
                  project.technologies
                    ? project.technologies
                        .split(",")
                        .map((item) => item.trim())
                        .filter(Boolean)
                    : []
                }
                projectUrl={project.project_url}
                githubUrl={project.github_url}
                onView={() => handleViewProject(project)}
              />
            ))}
          </div>
        </ScrollReveal>
      )}

      {/* MODAL */}

      <ProjectModal project={selectedProject} onClose={handleCloseModal} />
    </section>
  );
}

export default Projects;
