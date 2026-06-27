import { motion } from 'framer-motion';
import { fadeUp, stagger, viewportOnce } from '../lib/motion.js';

const facts = [
  { label: '8+ yrs', detail: 'GMP manufacturing engineering — SOPs, CAPA plans, validation protocols.', grad: 'from-indigo to-blue' },
  { label: 'MSc CS', detail: 'Thesis on Explainable AI: CNN ensemble, Grad-CAM, SHAP, LLM clinical reports.', grad: 'from-teal to-emerald' },
  { label: '3 tracks', detail: 'Full-stack, AI/ML and MERN — built in public, documented end to end.', grad: 'from-pink to-amber' },
];

export default function About() {
  return (
    <section id='about' className='scroll-mt-20 py-20 sm:py-28'>
      <motion.div
        variants={stagger}
        initial='hidden'
        whileInView='visible'
        viewport={viewportOnce}
        className='shell'
      >
        <motion.p variants={fadeUp} className='eyebrow mb-4 text-violet'>
          About
        </motion.p>
        <div className='grid gap-12 lg:grid-cols-[1.2fr_1fr]'>
          <div>
            <motion.h2
              variants={fadeUp}
              className='font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl'
            >
              Most developers learn the domain after they join. I'm bringing the{' '}
              <span className='gradient-text'>domain</span> with me.
            </motion.h2>
            <motion.div variants={fadeUp} className='mt-6 space-y-4 leading-relaxed text-muted'>
              <p>
                In a pharmaceutical plant, nothing ships without evidence: every
                change documented, every system validated, every failure traced
                to a root cause. I've spent eight years working that way through
                FDA, TGA and MHRA audits — and it's exactly how good software is
                built.
              </p>
              <p>
                My MSc research took that discipline into AI: a model that
                doesn't just classify medical images but explains itself with
                heatmaps and plain-language reports. Now I combine both —
                regulated-industry judgement and modern AI-integrated
                development — into software for the problems I know first-hand.
              </p>
            </motion.div>
          </div>

          <motion.ul variants={stagger} className='grid content-start gap-4'>
            {facts.map((f) => (
              <motion.li
                key={f.label}
                variants={fadeUp}
                className='rounded-2xl border border-line bg-white/70 p-5 backdrop-blur'
              >
                <p className={`bg-gradient-to-r ${f.grad} bg-clip-text font-display text-2xl font-extrabold text-transparent`}>
                  {f.label}
                </p>
                <p className='mt-1.5 text-sm leading-relaxed text-muted'>{f.detail}</p>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </motion.div>
    </section>
  );
}
