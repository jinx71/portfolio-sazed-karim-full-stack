import { motion } from 'framer-motion';

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.21, 0.68, 0.35, 1] } },
};

interface HeroProps {
  counts: { fullstack: number; aiml: number; mern: number };
}

export default function Hero({ counts }: HeroProps) {
  const stats = [
    { label: 'Full-Stack', value: counts.fullstack, grad: 'from-indigo to-blue' },
    { label: 'AI / ML', value: counts.aiml, grad: 'from-teal to-emerald' },
    { label: 'MERN', value: counts.mern, grad: 'from-pink to-amber' },
  ];

  return (
    <section id='top' className='relative pb-20 pt-32 sm:pt-40'>
      <motion.div variants={container} initial='hidden' animate='visible' className='shell'>
        <motion.div
          variants={item}
          className='mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-white/70 px-3.5 py-1.5 backdrop-blur'
        >
          <span className='h-2 w-2 animate-pulse rounded-full bg-emerald' />
          <span className='eyebrow text-muted'>Open to roles · Ireland & remote EU</span>
        </motion.div>

        <motion.h1
          variants={item}
          className='max-w-4xl font-display text-4xl font-extrabold leading-[1.04] tracking-tight text-ink sm:text-6xl lg:text-7xl'
        >
          I build <span className='gradient-text'>full-stack</span> and{' '}
          <span className='bg-gradient-to-r from-teal to-emerald bg-clip-text text-transparent'>
            AI-powered
          </span>{' '}
          software — with a pharma engineer's discipline.
        </motion.h1>

        <motion.p
          variants={item}
          className='mt-7 max-w-2xl text-base leading-relaxed text-muted sm:text-lg'
        >
          I'm Md. Sazed Ul Karim. After eight years keeping pharmaceutical plants
          audit-ready for the FDA, TGA and MHRA, I now ship across three tracks —
          full-stack web apps, AI/ML systems and MERN products — and document it
          all here.
        </motion.p>

        <motion.div variants={item} className='mt-9 flex flex-wrap gap-3'>
          <a
            href='/#projects'
            className='rounded-xl bg-gradient-to-r from-indigo via-violet to-fuchsia px-6 py-3 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-white shadow-lg shadow-violet/25 transition-transform hover:-translate-y-0.5'
          >
            Explore projects
          </a>
          <a
            href='/#contact'
            className='rounded-xl border border-line bg-white/70 px-6 py-3 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-ink backdrop-blur transition-colors hover:border-violet hover:text-violet'
          >
            Get in touch
          </a>
        </motion.div>

        <motion.dl variants={item} className='mt-16 grid max-w-2xl grid-cols-3 gap-4'>
          {stats.map((s) => (
            <div
              key={s.label}
              className='rounded-2xl border border-line bg-white/60 p-5 backdrop-blur'
            >
              <dt className='font-mono text-[0.62rem] font-medium uppercase tracking-[0.16em] text-muted'>
                {s.label}
              </dt>
              <dd
                className={`mt-1 bg-gradient-to-r ${s.grad} bg-clip-text font-display text-3xl font-extrabold text-transparent sm:text-4xl`}
              >
                {s.value}
              </dd>
            </div>
          ))}
        </motion.dl>
      </motion.div>
    </section>
  );
}
