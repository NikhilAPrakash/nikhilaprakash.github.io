// src/sections/Header.jsx
import React, { useEffect, useRef, useState } from 'react';
import './Header.css';
// import photo from '../assets/photo.png';

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
          src='/src/assets/photo.jpg'
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
          As a Master's student specializing in Computer Vision and Machine Learning at Northeastern University, I have developed expertise in SLAM algorithms, image processing, and statistical analysis through hands-on projects involving large-scale datasets and achieving significant improvements in model accuracy. My professional experience includes implementing end-to-end ML solutions using Python and React, developing ETL pipelines, and creating business intelligence dashboards. I am passionate about applying computer vision and machine learning to solve real-world problems, with a proven track record of delivering measurable impact through innovative technical solutions.
        </p>
      </div>

      <a href="#education" className="scroll-down">⌄</a>
    </header>
  );
}
