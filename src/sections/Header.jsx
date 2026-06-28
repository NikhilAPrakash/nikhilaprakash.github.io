// src/sections/Header.jsx
import React, { useEffect, useRef, useState } from 'react';
import './Header.css';

export default function Header() {
  // track visibility of left & right halves
  const [visible, setVisible] = useState({ left: false, right: false });
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.target === leftRef.current && entry.isIntersecting) {
            setVisible(v => ({ ...v, left: true }));
            observer.unobserve(leftRef.current);
          }
          if (entry.target === rightRef.current && entry.isIntersecting) {
            setVisible(v => ({ ...v, right: true }));
            observer.unobserve(rightRef.current);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (leftRef.current)  observer.observe(leftRef.current);
    if (rightRef.current) observer.observe(rightRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <header className="header-container" id="home">
      <div
        ref={leftRef}
        className={`header-left ${visible.left ? 'visible' : ''}`}
      >
        <img
          src='/assets/photo.jpg'
          alt="Nikhil Anil Prakash"
          className="header-photo"
        />
        <h1 className="header-name">Nikhil</h1>
        <h1 className="header-name">Anil Prakash</h1>
        <h2 className="header-title">Software Engineer</h2>
      </div>

      <div
        ref={rightRef}
        className={`header-right ${visible.right ? 'visible' : ''}`}
      >
        <p className="header-about">
          I'm an ML/AI engineer focused on building systems that hold up in
          production, not prototypes that stall in a notebook. The assistant on
          this site is one of mine - a retrieval-augmented application I built
          end to end. Before that, I designed an MLOps pipeline for Boston's
          Bluebikes bike-share: an end-to-end system that automates training,
          drift detection, and deployment on GCP, with CI/CD and configurable
          retraining.
        </p>
        <p className="header-about">
          I hold an MS in Electrical &amp; Computer Engineering from
          Northeastern. Across my work - ETL pipelines, ML-based anomaly
          detection, BI dashboards - I keep gravitating to the unglamorous half
          of the job: monitoring, retraining, and the failure modes nobody
          planned for, because that's where a model becomes a product.
        </p>
      </div>

      <a href="#education" className="scroll-down">⌄</a>
    </header>
  );
}
