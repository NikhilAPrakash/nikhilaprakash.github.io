// src/sections/Projects.jsx
import React, { useState } from "react";
import "./Projects.css";
import projects from "../data/projectdata";
// Example image imports (optional)
// import bluebikesImg from "../assets/bluebikes.png";
// import linsImg from "../assets/lins.png";



const Projects = () => {
  const [activeProject, setActiveProject] = useState(null);

  const openModal = (project) => {
    setActiveProject(project);
    // optional: prevent background scroll
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setActiveProject(null);
    document.body.style.overflow = "";
  };

  return (
    <section id="projects" className="projects-section">
      <h2 className="projects-heading">Projects</h2>

      <div className="projects-grid">
        {projects.map((proj) => (
          <article key={proj.id} className="project-card">
            <h3 className="project-title">{proj.title}</h3>
            <p className="project-role">{proj.role}</p>
            <p className="project-summary">{proj.summary}</p>

            <ul className="project-bullets">
              {proj.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>

            <div className="project-tech">
              {proj.tech.map((t) => (
                <span key={t} className="project-chip">
                  {t}
                </span>
              ))}
            </div>

            <div className="project-links">
              {proj.github && (
                <a
                  href={proj.github}
                  target="_blank"
                  rel="noreferrer"
                  className="project-btn"
                >
                  GitHub
                </a>
              )}
              {proj.demo && (
                <a
                  href={proj.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="project-btn project-btn-secondary"
                >
                  Live Demo
                </a>
              )}
                {proj.docs && (
                <a
                href={proj.docs}
                target="_blank"
                rel="noreferrer"
                className="project-btn project-btn-secondary"
                >
                Documentation
                </a>
            )}

              {proj.details && (
                <button
                  type="button"
                  className="project-btn project-btn-secondary"
                  onClick={() => openModal(proj)}
                >
                  More info
                </button>
              )}
            </div>
          </article>
        ))}
      </div>

      {/* Modal */}
      {activeProject && (
        <div className="project-modal-backdrop" onClick={closeModal}>
          <div
            className="project-modal"
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
          >
            <button
              type="button"
              className="project-modal-close"
              onClick={closeModal}
            >
              ✕
            </button>

            <h3 className="project-modal-title">{activeProject.title}</h3>
            <p className="project-modal-role">{activeProject.role}</p>

            {activeProject.details?.overview && (
              <p className="project-modal-overview">
                {activeProject.details.overview}
              </p>
            )}

            {activeProject.details?.highlights && (
              <ul className="project-modal-list">
                {activeProject.details.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
            {activeProject.docs && (
                <div style={{ marginBottom: "1rem" }}>
                    <a
                    href={activeProject.docs}
                    target="_blank"
                    rel="noreferrer"
                    className="project-btn project-btn-secondary"
                    >
                    View Documentation
                    </a>
                </div>
                )}

            {activeProject.details?.images?.length > 0 && (
              <div className="project-modal-images">
                {activeProject.details.images.map((imgSrc, idx) => (
                  <img
                    key={idx}
                    src={imgSrc}
                    alt={`${activeProject.title} screenshot ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
