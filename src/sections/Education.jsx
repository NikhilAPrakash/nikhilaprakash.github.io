import React, { useEffect, useRef, useState } from 'react';
import experienceData from '../data/edudata';
import './Education.css';

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
    <section id="education" className="edu-section">
      <h2 className="edu-heading">Education</h2>
      <div className="edu-list">
        {experienceData.map((exp, idx) => (
          <div
            key={idx}
            ref={el => (itemRefs.current[idx] = el)}
            data-idx={idx}
            className={`edu-entry ${visibleItems[idx] ? 'visible' : ''}`}
          >
            <h3 className="edu-company">{exp.company}</h3>
            <p className="edu-duration">{exp.duration}</p>
            <h4 className="edu-role">{exp.role}</h4>
            <ul className="edu-details">
              {exp.details.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
        <a></a>
      </div>
    </section>
  );
}
