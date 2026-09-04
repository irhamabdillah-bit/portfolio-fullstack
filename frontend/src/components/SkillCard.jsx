function SkillCard({ name, level, description }) {
  return (
    <div className="skill-card">
      <h3>{name}</h3>

      <p>{description}</p>

      <span>{level}</span>
    </div>
  );
}

export default SkillCard;
