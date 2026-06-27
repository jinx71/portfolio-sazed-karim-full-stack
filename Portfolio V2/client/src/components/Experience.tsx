import { motion } from 'framer-motion';
import { fadeUp, stagger, viewportOnce } from '../lib/motion.js';

const entries = [
  {
    period: '2017 — Present',
    title: 'Sr. Executive — Engineering',
    org: 'Square Pharmaceuticals Ltd., Dhaka',
    dot: 'from-indigo to-blue',
    points: [
      'Directed maintenance engineering across cGMP-regulated plants to ISO and ICH-aligned standards.',
      'Participated in FDA, TGA and MHRA audits; authored SOPs, NCRs, CAPA plans and validation protocols.',
      'Assessed WFI systems to ASME BPE and ISPE standards; led data-driven CAPA cycles cutting downtime.',
    ],
  },
  {
    period: '2024 — 2025',
    title: 'MSc, Computer Science & Engineering',
    org: 'Bangladesh University of Professionals',
    dot: 'from-teal to-emerald',
    points: [
      'Thesis: Explainable AI for cervical cell classification — stacked CNN ensemble (VGG16 + EfficientNetV2L), Grad-CAM, SHAP and LLM-generated clinical reports on SIPaKMeD.',
    ],
  },
  {
    period: '2010 — 2014',
    title: 'BSc, Electrical & Electronic Engineering',
    org: 'Chittagong University of Engineering and Technology',
    dot: 'from-pink to-amber',
    points: [],
  },
];

export default function Experience() {
  return (
    <section id='experience' className='scroll-mt-20 py-20 sm:py-28'>
      <motion.div variants={stagger} initial='hidden' whileInView='visible' viewport={viewportOnce} className='shell'>
        <motion.p variants={fadeUp} className='eyebrow mb-4 text-violet'>
          Track record
        </motion.p>
        <motion.h2 variants={fadeUp} className='font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl'>
          Experience & education.
        </motion.h2>

        <motion.ol variants={stagger} className='mt-10 space-y-0 border-l-2 border-line'>
          {entries.map((e) => (
            <motion.li key={e.title} variants={fadeUp} className='relative pb-10 pl-7 last:pb-0'>
              <span className={`absolute -left-[9px] top-1.5 h-4 w-4 rounded-full bg-gradient-to-br ${e.dot} ring-4 ring-paper`} />
              <p className='font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted'>{e.period}</p>
              <h3 className='mt-1.5 font-display text-lg font-bold text-ink'>{e.title}</h3>
              <p className='mt-0.5 text-sm font-medium text-violet'>{e.org}</p>
              {e.points.length > 0 && (
                <ul className='mt-3 space-y-2'>
                  {e.points.map((p) => (
                    <li key={p} className='text-sm leading-relaxed text-muted'>
                      {p}
                    </li>
                  ))}
                </ul>
              )}
            </motion.li>
          ))}
        </motion.ol>
      </motion.div>
    </section>
  );
}
