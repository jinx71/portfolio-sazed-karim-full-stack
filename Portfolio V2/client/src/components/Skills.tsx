import { motion } from 'framer-motion';
import { fadeUp, stagger, viewportOnce } from '../lib/motion.js';

const groups = [
  { name: 'Frontend', grad: 'from-indigo to-blue', skills: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Recharts', 'Vite'] },
  { name: 'Backend', grad: 'from-violet to-fuchsia', skills: ['Node.js', 'Express', 'Python', 'FastAPI', 'REST / OpenAPI', 'Prisma'] },
  { name: 'Databases', grad: 'from-blue to-teal', skills: ['PostgreSQL', 'MongoDB', 'Redis', 'Qdrant', 'ChromaDB'] },
  { name: 'AI & ML', grad: 'from-teal to-emerald', skills: ['Anthropic / OpenAI', 'LangGraph', 'RAG', 'Grad-CAM & SHAP', 'Prompt engineering', 'Model serving'] },
  { name: 'Cloud & DevOps', grad: 'from-emerald to-amber', skills: ['Docker', 'GitHub Actions', 'AWS EC2', 'Kubernetes', 'Vercel', 'Render'] },
  { name: 'Auth & Security', grad: 'from-pink to-amber', skills: ['JWT', 'bcrypt', 'OAuth2', 'RBAC', 'CORS'] },
];

export default function Skills() {
  return (
    <section id='skills' className='scroll-mt-20 py-20 sm:py-28'>
      <motion.div variants={stagger} initial='hidden' whileInView='visible' viewport={viewportOnce} className='shell'>
        <motion.p variants={fadeUp} className='eyebrow mb-4 text-violet'>
          Capabilities
        </motion.p>
        <motion.h2 variants={fadeUp} className='font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl'>
          The stack, <span className='gradient-text'>layer by layer</span>.
        </motion.h2>

        <motion.div variants={stagger} className='mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3'>
          {groups.map((g) => (
            <motion.div
              key={g.name}
              variants={fadeUp}
              className='rounded-2xl border border-line bg-white/70 p-5 backdrop-blur'
            >
              <div className='flex items-center gap-2.5 border-b border-line pb-3'>
                <span className={`h-3 w-3 rounded-full bg-gradient-to-br ${g.grad}`} />
                <h3 className='font-display text-base font-bold text-ink'>{g.name}</h3>
              </div>
              <ul className='mt-3.5 flex flex-wrap gap-1.5'>
                {g.skills.map((skill) => (
                  <li key={skill} className='rounded-md bg-paper-2 px-2.5 py-1 font-mono text-xs text-body'>
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
