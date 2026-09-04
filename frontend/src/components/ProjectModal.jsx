function ProjectModal({ project, onClose }) {
  if (!project) {
    return null;
  }

  const technologies = project.technologies
    ? project.technologies
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
    : [];

  return (
    <div className="project-modal-overlay" onClick={onClose}>
      <div
        className="project-modal"
        onClick={(event) => event.stopPropagation()}
      >
        {/* CLOSE BUTTON */}

        <button
          type="button"
          className="project-modal-close"
          onClick={onClose}
          aria-label="Close project details"
        >
          ×
        </button>

        {/* PROJECT HEADER */}

        <div className="project-modal-visual">
          <span>PROJECT</span>

          <h2>{project.title}</h2>
        </div>

        {/* PROJECT CONTENT */}

        <div className="project-modal-content">
          <p className="project-modal-label">PROJECT DETAILS</p>

          {/* OVERVIEW */}

          <div className="project-detail-overview">
            <h3>Overview</h3>

            <p>{project.description}</p>
          </div>

          {/* DETAIL GRID */}

          <div className="project-detail-grid">
            {/* ROLE */}

            {project.role && (
              <div className="detail-box">
                <span className="detail-label">MY ROLE</span>

                <h3>{project.role}</h3>
              </div>
            )}

            {/* TECHNOLOGIES */}

            {technologies.length > 0 && (
              <div className="detail-box">
                <span className="detail-label">TECHNOLOGIES</span>

                <div className="project-modal-technologies">
                  {technologies.map((technology) => (
                    <span key={technology}>{technology}</span>
                  ))}
                </div>
              </div>
            )}

            {/* CHALLENGE */}

            {project.challenge && (
              <div className="detail-box">
                <span className="detail-label">CHALLENGE</span>

                <p>{project.challenge}</p>
              </div>
            )}

            {/* SOLUTION */}

            {project.solution && (
              <div className="detail-box">
                <span className="detail-label">SOLUTION</span>

                <p>{project.solution}</p>
              </div>
            )}
          </div>

          {/* RESULT */}

          {project.result && (
            <div className="project-result">
              <span className="detail-label">RESULT</span>

              <p>{project.result}</p>
            </div>
          )}

          {/* LINKS */}

          {(project.project_url || project.github_url) && (
            <div className="project-modal-links">
              {project.project_url && (
                <a
                  href={project.project_url}
                  target="_blank"
                  rel="noreferrer"
                  className="project-modal-btn primary"
                >
                  Live Demo ↗
                </a>
              )}

              {project.github_url && (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noreferrer"
                  className="project-modal-btn secondary"
                >
                  GitHub ↗
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectModal;
