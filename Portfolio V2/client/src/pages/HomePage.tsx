import { useEffect, useState } from 'react';
import { api } from '../lib/api.js';
import type { Project } from '../lib/types.js';
import Hero from '../components/Hero.js';
import About from '../components/About.js';
import ProjectShowcase from '../components/ProjectShowcase.js';
import Skills from '../components/Skills.js';
import Experience from '../components/Experience.js';
import Contact from '../components/Contact.js';
import Loader from '../components/Loader.js';

export default function HomePage() {
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api
      .listProjects()
      .then(setProjects)
      .catch((e: Error) => setError(e.message));
  }, []);

  const counts = {
    fullstack: projects?.filter((p) => p.track === 'fullstack').length ?? 0,
    aiml: projects?.filter((p) => p.track === 'aiml').length ?? 0,
    mern: projects?.filter((p) => p.track === 'mern').length ?? 0,
  };

  return (
    <>
      <Hero counts={counts} />
      <About />
      {projects ? (
        <ProjectShowcase projects={projects} />
      ) : error ? (
        <div className='shell py-16'>
          <div className='rounded-2xl border border-line bg-white/70 p-8 text-center'>
            <p className='font-display text-lg font-bold text-ink'>Projects are waking up</p>
            <p className='mt-2 text-sm text-muted'>
              The API may be cold-starting. {error}. Refresh in a moment.
            </p>
          </div>
        </div>
      ) : (
        <div id='projects'>
          <Loader label='Loading projects' />
        </div>
      )}
      <Skills />
      <Experience />
      <Contact />
    </>
  );
}
