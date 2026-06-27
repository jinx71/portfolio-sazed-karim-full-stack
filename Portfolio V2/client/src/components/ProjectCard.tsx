import { motion } from 'framer-motion';
import { fadeUp } from '../lib/motion.js';
import { trackTheme, statusTheme, type Project } from '../lib/types.js';

export default function ProjectCard({ project }: { project: Project }) {
  const theme = trackTheme[project.track];
  const status = statusTheme[project.status];

  return (
    <motion.article
      variants={fadeUp}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className='group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-white/80 p-5 backdrop-blur transition-shadow hover:shadow-xl'
    >
      {/* Top gradient seam keyed to the track. */}
      <span className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${theme.from} ${theme.to}`} />

      <header className='flex items-center justify-between gap-3'>
        <span className={`font-mono text-xs font-semibold tracking-[0.1em] ${theme.text}`}>
          {project.code}
        </span>
        <div className='flex items-center gap-2'>
          {project.featured && (
            <span className='rounded-full bg-gradient-to-r from-amber to-pink px-2 py-0.5 font-mono text-[0.58rem] font-semibold uppercase tracking-[0.14em] text-white'>
              Featured
            </span>
          )}
          <span className={`rounded-full px-2.5 py-0.5 font-mono text-[0.6rem] font-medium uppercase tracking-[0.12em] ${status.chip}`}>
            {status.label}
          </span>
        </div>
      </header>

      <h3 className='mt-3 font-display text-lg font-bold leading-snug tracking-tight text-ink'>
        {project.title}
      </h3>

      <p className='mt-2.5 flex-1 text-sm leading-relaxed text-muted'>{project.summary}</p>

      <ul className='mt-4 flex flex-wrap gap-1.5'>
        {project.stack.map((tech) => (
          <li key={tech} className={`rounded-md ${theme.soft} px-2 py-1 font-mono text-[0.62rem] ${theme.text}`}>
            {tech}
          </li>
        ))}
      </ul>

      <footer className='mt-4 flex items-center justify-between border-t border-line pt-3.5'>
        <span className='font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted'>
          {project.month ? `Month ${String(project.month).padStart(2, '0')}` : theme.label}
        </span>
        <span className='flex gap-3'>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target='_blank'
              rel='noreferrer'
              className={`font-mono text-xs font-semibold ${theme.text} hover:underline`}
            >
              Live ↗
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target='_blank'
              rel='noreferrer'
              className='font-mono text-xs font-semibold text-muted hover:text-ink hover:underline'
            >
              Repo ↗
            </a>
          )}
        </span>
      </footer>
    </motion.article>
  );
}
