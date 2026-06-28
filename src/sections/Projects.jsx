// src/sections/Projects.jsx
import React, { useState, useEffect, useRef } from "react";
import "./Projects.css";
import projects from "../data/projectdata";
// Example image imports (optional)
// import bluebikesImg from "../assets/bluebikes.png";
// import linsImg from "../assets/lins.png";



const Projects = () => {
  const [activeProject, setActiveProject] = useState(null);
  const sectionRef = useRef(null);

  const openModal = (project) => {
    setActiveProject(project);
    document.body.style.overflow = "hidden"; // prevent background scroll
  };

  const closeModal = () => {
    setActiveProject(null);
    document.body.style.overflow = "";
  };

  // Fade in / out cards on scroll
  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    const cards = sectionEl.querySelectorAll(".project-card");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          } else {
            entry.target.classList.remove("visible");
          }
        });
      },
      {
        threshold: 0.2
      }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" className="projects-section" ref={sectionRef}>
      <h2 className="projects-heading">Projects</h2>

      <div className="projects-grid">
        {projects.map((proj) => (
          <article
            key={proj.id}
            className={`project-card${proj.details ? " project-card-clickable" : ""}`}
            onClick={proj.details ? () => openModal(proj) : undefined}
            onKeyDown={
              proj.details
                ? (e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      openModal(proj);
                    }
                  }
                : undefined
            }
            role={proj.details ? "button" : undefined}
            tabIndex={proj.details ? 0 : undefined}
            aria-label={proj.details ? `${proj.title} — view details` : undefined}
          >
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
                  onClick={(e) => e.stopPropagation()}
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
                  onClick={(e) => e.stopPropagation()}
                >
                  Live Demo
                </a>
              )}

              {proj.details && (
                <span className="project-more-hint" aria-hidden="true">
                  More info →
                </span>
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
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="project-modal-close"
              onClick={closeModal}
            >
              ✕
            </button>
            {activeProject.wip && <span className="project-wip-badge">WIP</span>}
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
