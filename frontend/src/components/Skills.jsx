import { useEffect, useState } from "react";
import SkillCard from "./SkillCard";
import { api } from "../utils/api";
import ScrollReveal from "./ScrollReveal";

function Skills() {
  const [skills, setSkills] = useState([]);

  const getSkills = async () => {
    try {
      const response = await api.getSkills();

      if (!response.ok) {
        throw new Error("Gagal mengambil data skills");
      }

      const data = await response.json();

      setSkills(data);
    } catch (error) {
      console.error("Error get skills:", error);
    }
  };

  useEffect(() => {
    getSkills();
  }, []);

  return (
    <section className="section" id="skills">
      <div className="section-header">
        <p className="section-label">Skills</p>

        <h2 className="section-title">Tools I work with.</h2>

        <p className="section-description">
          Teknologi yang sedang saya pelajari dan gunakan dalam project.
        </p>
      </div>

      <ScrollReveal>
        <div className="skills-container">
          {skills.map((skill) => (
            <SkillCard
              key={skill.id}
              name={skill.name}
              level={skill.level}
              description={skill.description}
            />
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}

export default Skills;
