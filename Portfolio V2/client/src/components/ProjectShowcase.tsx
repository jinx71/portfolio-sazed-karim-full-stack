import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeUp, stagger, viewportOnce } from '../lib/motion.js';
import { trackTheme, type Project, type Track } from '../lib/types.js';
import ProjectCard from './ProjectCard.js';

type Tab = 'all' | Track;

const tabs: { value: Tab; label: string; grad: string }[] = [
  { value: 'all', label: 'All', grad: 'from-indigo via-fuchsia to-amber' },
  { value: 'fullstack', label: trackTheme.fullstack.label, grad: 'from-indigo to-blue' },
  { value: 'aiml', label: trackTheme.aiml.label, grad: 'from-teal to-emerald' },
  { value: 'mern', label: trackTheme.mern.label, grad: 'from-pink to-amber' },
];

export default function ProjectShowcase({ projects }: { projects: Project[] }) {
  const [tab, setTab] = useState<Tab>('all');

  const visible =
    tab === 'all'
      ? [...projects].sort((a, b) => Number(b.featured) - Number(a.featured))
      : projects.filter((p) => p.track === tab);

  return (
    <section id='projects' className='scroll-mt-20 py-20 sm:py-28'>
      <div className='shell'>
        <motion.div variants={stagger} initial='hidden' whileInView='visible' viewport={viewportOnce}>
          <motion.p variants={fadeUp} className='eyebrow mb-4 text-violet'>
            The work
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className='max-w-3xl font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl'
          >
            Three tracks, <span className='gradient-text'>{projects.length} projects</span>, built in public.
          </motion.h2>
          <motion.p variants={fadeUp} className='mt-4 max-w-2xl leading-relaxed text-muted'>
            Each card links to its live demo and source. Colour marks the track:
            indigo for full-stack, teal for AI/ML, pink for MERN.
          </motion.p>

          <motion.div variants={fadeUp} className='mt-8 flex flex-wrap gap-2' role='tablist' aria-label='Filter projects by track'>
            {tabs.map((t) => {
              const active = tab === t.value;
              return (
                <button
                  key={t.value}
                  type='button'
                  role='tab'
                  aria-selected={active}
                  onClick={() => setTab(t.value)}
                  className={`relative rounded-full px-4 py-2 font-mono text-xs font-semibold uppercase tracking-[0.12em] transition-colors ${
                    active ? 'text-white' : 'text-muted hover:text-ink'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId='tab-pill'
                      className={`absolute inset-0 -z-10 rounded-full bg-gradient-to-r ${t.grad}`}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {!active && <span className='absolute inset-0 -z-10 rounded-full border border-line bg-white/60' />}
                  {t.label}
                </button>
              );
            })}
          </motion.div>
        </motion.div>

        <AnimatePresence mode='wait'>
          <motion.div
            key={tab}
            variants={stagger}
            initial='hidden'
            animate='visible'
            exit={{ opacity: 0, y: 8, transition: { duration: 0.15 } }}
            className='mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3'
          >
            {visible.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
