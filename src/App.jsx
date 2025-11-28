import React from 'react';
// import './App.css';
import './index.css'; // Ensure this is imported to apply global styles
import Header from './sections/Header';
import Education from './sections/Education'
import Experience from './sections/Experience';
import NavBar from './components/NavBar';
import Projects from './sections/Projects';
// import ExperienceSection from './sections/ExperienceSection';
// …other imports

function App() {
  return (
    <>
    <NavBar />
    <Header />
    <Education />
    <Experience/>
    <Projects />
    </>

  );
}

export default App;
