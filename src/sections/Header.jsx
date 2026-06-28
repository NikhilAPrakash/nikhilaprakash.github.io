// src/sections/Header.jsx
import React, { useEffect, useRef, useState } from 'react';
import './Header.css';

const NAME_LINES = ['Nikhil', 'Anil Prakash'];
const TYPE_SPEED = 95;    // ms per character
const START_DELAY = 450;  // pause before the first key
const LINE_DELAY = 400;   // extra pause between lines

// total characters across all lines
const TOTAL_CHARS = NAME_LINES.reduce((sum, line) => sum + line.length, 0);

// index of the line currently being typed (last line once finished)
function activeLineIndex(count) {
  let acc = 0;
  for (let i = 0; i < NAME_LINES.length; i++) {
    acc += NAME_LINES[i].length;
    if (count < acc) return i;
  }
  return NAME_LINES.length - 1;
}

// delay before advancing to the next character, given how many are shown
function delayForCount(count) {
  if (count === 0) return START_DELAY;
  let acc = 0;
  for (let i = 0; i < NAME_LINES.length - 1; i++) {
    acc += NAME_LINES[i].length;
    if (count === acc) return LINE_DELAY; // sitting at a line boundary
  }
  return TYPE_SPEED;
}

export default function Header() {
  // track visibility of left & right halves
  const [visible, setVisible] = useState({ left: false, right: false });
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  // typewriter: how many characters of the name are revealed so far
  const reduceMotion =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const [typed, setTyped] = useState(reduceMotion ? TOTAL_CHARS : 0);

  // advance one character at a time, starting once the hero is visible
  useEffect(() => {
    if (!visible.left || reduceMotion || typed >= TOTAL_CHARS) return;
    const id = setTimeout(() => setTyped(c => c + 1), delayForCount(typed));
    return () => clearTimeout(id);
  }, [visible.left, typed, reduceMotion]);

  const active = activeLineIndex(typed);
  const typingDone = typed >= TOTAL_CHARS;

  // characters shown per line, derived from the global `typed` count
  let remaining = typed;
  const shownLines = NAME_LINES.map(line => {
    const take = Math.max(0, Math.min(line.length, remaining));
    remaining -= line.length;
    return line.slice(0, take);
  });

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
        {/* full name for assistive tech / crawlers; visual lines are animated */}
        <span className="sr-only">Nikhil Anil Prakash</span>
        {NAME_LINES.map((line, i) => (
          <h1 key={i} className="header-name header-name-tw" aria-hidden="true">
            {shownLines[i]}
            {((!typingDone && active === i) ||
              (typingDone && i === NAME_LINES.length - 1)) && (
              <span className="tw-cursor">█</span>
            )}
          </h1>
        ))}
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
