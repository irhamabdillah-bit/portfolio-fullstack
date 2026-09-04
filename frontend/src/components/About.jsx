import ScrollReveal from "./ScrollReveal";

function About() {
  return (
    <section className="section about" id="about">
      <ScrollReveal>
        <div className="section-header">
          <p className="section-label">About Me</p>

          <h2 className="section-title">
            Turning ideas into functional websites.
          </h2>

          <p className="section-description">
            Saya terus mengembangkan kemampuan frontend dan backend melalui
            project nyata.
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal>
        <div className="about-content">
          <div className="about-card">
            <span className="about-number">IA</span>
          </div>

          <div className="about-text">
            <p>
              Saya adalah seorang
              <strong> Web Developer </strong>
              yang sedang fokus memperdalam JavaScript, React, Node.js,
              Express.js, dan MySQL.
            </p>

            <br />

            <p>
              Saya suka membuat interface yang clean sekaligus memahami
              bagaimana frontend, backend, API, dan database bekerja bersama
              sebagai satu sistem.
            </p>

            <br />

            <p>
              Tujuan saya adalah terus membangun project yang dapat menunjukkan
              kemampuan teknis sekaligus cara saya menyelesaikan masalah.
            </p>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}

export default About;
