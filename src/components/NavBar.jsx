import React, {useEffect, useState} from "react";
import './NavBar.css';

const SECTIONS = [
    { id: 'home', label: 'Home' },
    { id: 'education', label: 'Education' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'contact', label: 'Contact' }
]

export default function NavBar() {
  const [active, setActive] = useState('home')

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActive(entry.target.id)
          }
        })
      },
      { rootMargin: '-50% 0px -50% 0px' }
    )

    SECTIONS.forEach(sec => {
      const el = document.getElementById(sec.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <nav className="navbar">
      <ul className="nav-list">
        {SECTIONS.map(sec => (
          <li key={sec.id}>
            <a
              href={`#${sec.id}`}
              className={
                'nav-link' + (active === sec.id ? ' active' : '')
              }
            >
              {sec.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}