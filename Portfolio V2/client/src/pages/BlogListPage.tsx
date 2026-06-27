import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { api } from '../lib/api.js';
import type { Post } from '../lib/types.js';
import { fadeUp, stagger } from '../lib/motion.js';
import Loader from '../components/Loader.js';

// Map an accent name to a literal gradient so Tailwind can detect each class.
const accentGrad: Record<string, string> = {
  indigo: 'from-indigo to-blue',
  violet: 'from-violet to-fuchsia',
  blue: 'from-blue to-teal',
  teal: 'from-teal to-emerald',
  emerald: 'from-emerald to-amber',
  pink: 'from-pink to-amber',
  amber: 'from-amber to-pink',
  fuchsia: 'from-fuchsia to-indigo',
};

function formatDate(iso: string | null) {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-IE', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function BlogListPage() {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.listPosts().then(setPosts).catch((e: Error) => setError(e.message));
  }, []);

  return (
    <section className='shell pt-32 pb-24'>
      <motion.div variants={stagger} initial='hidden' animate='visible'>
        <motion.p variants={fadeUp} className='eyebrow mb-4 text-violet'>
          Writing
        </motion.p>
        <motion.h1 variants={fadeUp} className='font-display text-4xl font-extrabold tracking-tight text-ink sm:text-5xl'>
          The <span className='gradient-text'>build log</span>.
        </motion.h1>
        <motion.p variants={fadeUp} className='mt-4 max-w-2xl leading-relaxed text-muted'>
          Notes on building across full-stack, AI/ML and MERN — and on bringing
          a regulated-industry mindset into software.
        </motion.p>
      </motion.div>

      {!posts && !error && <Loader label='Loading posts' />}

      {error && (
        <div className='mt-10 rounded-2xl border border-line bg-white/70 p-8 text-center'>
          <p className='font-display text-lg font-bold text-ink'>Posts are waking up</p>
          <p className='mt-2 text-sm text-muted'>The API may be cold-starting. {error}.</p>
        </div>
      )}

      {posts && posts.length === 0 && (
        <p className='mt-10 text-muted'>No posts published yet. Check back soon.</p>
      )}

      {posts && posts.length > 0 && (
        <motion.div variants={stagger} initial='hidden' animate='visible' className='mt-12 grid gap-6 md:grid-cols-2'>
          {posts.map((post) => (
            <motion.article key={post.id} variants={fadeUp} whileHover={{ y: -5 }}>
              <Link
                to={`/blog/${post.slug}`}
                className='group block overflow-hidden rounded-2xl border border-line bg-white/80 backdrop-blur transition-shadow hover:shadow-xl'
              >
                <div className={`h-28 bg-gradient-to-br ${accentGrad[post.accent] ?? accentGrad.indigo}`} />
                <div className='p-6'>
                  <div className='flex flex-wrap items-center gap-2'>
                    {post.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className='rounded-full bg-paper-2 px-2.5 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.1em] text-muted'>
                        {tag}
                      </span>
                    ))}
                    {!post.published && (
                      <span className='rounded-full bg-amber/15 px-2.5 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.1em] text-amber'>
                        Draft
                      </span>
                    )}
                  </div>
                  <h2 className='mt-3 font-display text-xl font-bold leading-snug text-ink transition-colors group-hover:text-violet'>
                    {post.title}
                  </h2>
                  <p className='mt-2 text-sm leading-relaxed text-muted'>{post.excerpt}</p>
                  <p className='mt-4 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted'>
                    {formatDate(post.publishedAt)} · Read →
                  </p>
                </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>
      )}
    </section>
  );
}
