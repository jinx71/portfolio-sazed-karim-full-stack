import { motion } from 'framer-motion';
import { fadeUp, stagger, viewportOnce } from '../lib/motion.js';

const EMAIL = 'your.email@gmail.com'; // TODO: replace with your real address

const links = [
  { label: 'Email', value: EMAIL, href: `mailto:${EMAIL}` },
  { label: 'GitHub', value: 'github.com/jinx71', href: 'https://github.com/jinx71' },
  { label: 'LinkedIn', value: 'linkedin.com/in/sazed-ul-karim', href: 'https://linkedin.com/in/sazed-ul-karim' },
];

export default function Contact() {
  return (
    <section id='contact' className='scroll-mt-20 py-20 sm:py-28'>
      <motion.div variants={stagger} initial='hidden' whileInView='visible' viewport={viewportOnce} className='shell'>
        <motion.div
          variants={fadeUp}
          className='relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo via-violet to-fuchsia p-8 text-white sm:p-12'
        >
          <div className='absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-2xl' />
          <div className='relative max-w-2xl'>
            <p className='eyebrow text-white/70'>Contact</p>
            <h2 className='mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl'>
              Hiring for a full-stack or AI role in Ireland?
            </h2>
            <p className='mt-4 leading-relaxed text-white/85'>
              I'm open to full-stack and AI engineering positions, on-site in
              Ireland or remote across the EU. If a developer who already speaks
              regulated-industry sounds useful, let's talk.
            </p>

            <div className='mt-8 grid gap-3 sm:grid-cols-3'>
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target={l.href.startsWith('http') ? '_blank' : undefined}
                  rel='noreferrer'
                  className='rounded-xl bg-white/10 px-4 py-3 backdrop-blur transition-colors hover:bg-white/20'
                >
                  <p className='font-mono text-[0.6rem] uppercase tracking-[0.16em] text-white/60'>{l.label}</p>
                  <p className='mt-0.5 truncate text-sm font-medium'>{l.value}</p>
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
