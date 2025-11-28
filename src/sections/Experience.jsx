import React, { useEffect, useRef, useState } from 'react';
import experienceData from '../data/expdata';
import './Experience.css';

export default function ExperienceSection() {
  const [visibleItems, setVisibleItems] = useState({});
  const itemRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          const idx = Number(entry.target.dataset.idx);
          setVisibleItems(prev => ({
            ...prev,
            [idx]: entry.isIntersecting,
          }));
        });
      },
      { threshold: 0.5 }
    );

    itemRefs.current.forEach(el => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="experience" className="exp-section">
      <h2 className="exp-heading">Experience</h2>
      <div className="exp-list">
        {experienceData.map((exp, idx) => (
          <div
            key={idx}
            ref={el => (itemRefs.current[idx] = el)}
            data-idx={idx} 
            className={`exp-entry ${visibleItems[idx] ? 'visible' : ''}`}
          >
            <h3 className="exp-company">{exp.company}</h3>
            <p className="exp-duration">{exp.duration}</p>
            <p className="exp-location">{exp.location}</p>
            <h4 className="exp-role">{exp.role}</h4>
            <ul className="exp-details">
              {exp.details.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
