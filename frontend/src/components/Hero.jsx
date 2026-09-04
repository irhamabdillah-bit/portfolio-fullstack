function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <p className="hero-intro">Full Stack Web Developer</p>

        <h1>
          Irham <span>Abdillah</span>
        </h1>

        <h2>Building modern digital experiences.</h2>

        <p className="hero-description">
          Saya fokus membangun website yang modern, responsive, dan memiliki
          pengalaman pengguna yang baik menggunakan React, Node.js, Express.js,
          dan MySQL.
        </p>

        <div className="hero-buttons">
          <a href="#projects" className="btn primary">
            View My Work
          </a>

          <a href="#contact" className="btn secondary">
            Let's Talk
          </a>
        </div>

        {/* SOCIAL LINKS */}

        <div className="hero-socials">
          <a href="https://github.com/" target="_blank" rel="noreferrer">
            GitHub
          </a>

          <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">
            LinkedIn
          </a>

          <a href="/cv.pdf" target="_blank" rel="noreferrer">
            Download CV
          </a>
        </div>
      </div>

      <div className="hero-decoration">
        <div className="hero-card">
          <div>
            <div className="hero-avatar">IA</div>

            <h3>Irham Abdillah</h3>

            <p>
              Full Stack Web Developer yang sedang membangun skill melalui
              project nyata.
            </p>
          </div>

          <div className="hero-stack">
            <span>React</span>
            <span>Node.js</span>
            <span>Express.js</span>
            <span>MySQL</span>
            <span>JavaScript</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
