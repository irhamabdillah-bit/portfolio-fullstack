function ProjectCard({
  title,
  description,
  technologies = [],
  projectUrl,
  githubUrl,
  onView,
}) {
  return (
    <article className="project-card">
      {/* PROJECT VISUAL */}

      <div className="project-image project-placeholder">
        <div className="project-placeholder-content">
          <span>PROJECT</span>
          <strong>{title}</strong>
        </div>
      </div>

      {/* CONTENT */}

      <div className="project-content">
        <h3>{title}</h3>

        <p>{description}</p>

        {technologies.length > 0 && (
          <div className="project-technologies">
            {technologies.map((technology) => (
              <span key={technology}>{technology}</span>
            ))}
          </div>
        )}

        <button type="button" className="project-view-btn" onClick={onView}>
          View Details →
        </button>
      </div>
    </article>
  );
}

export default ProjectCard;
