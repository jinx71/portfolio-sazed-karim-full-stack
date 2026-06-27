import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { api } from '../lib/api.js';
import type { Post } from '../lib/types.js';
import { fadeUp } from '../lib/motion.js';
import Loader from '../components/Loader.js';

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

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    setPost(null);
    setError(null);
    api.getPost(slug).then(setPost).catch((e: Error) => setError(e.message));
  }, [slug]);

  if (error) {
    return (
      <section className='shell pt-32 pb-24'>
        <p className='font-display text-2xl font-bold text-ink'>Post not found</p>
        <p className='mt-2 text-muted'>{error}</p>
        <Link to='/blog' className='mt-6 inline-block font-mono text-sm text-violet hover:underline'>
          ← Back to the blog
        </Link>
      </section>
    );
  }

  if (!post) return <Loader label='Loading post' />;

  return (
    <article className='pb-24 pt-24'>
      <div className={`h-44 bg-gradient-to-br ${accentGrad[post.accent] ?? accentGrad.indigo}`} />
      <motion.div
        variants={fadeUp}
        initial='hidden'
        animate='visible'
        className='shell -mt-16'
      >
        <div className='mx-auto max-w-3xl rounded-3xl border border-line bg-white/90 p-7 backdrop-blur sm:p-10'>
          <Link to='/blog' className='font-mono text-xs uppercase tracking-[0.14em] text-violet hover:underline'>
            ← The build log
          </Link>
          <div className='mt-5 flex flex-wrap gap-2'>
            {post.tags.map((tag) => (
              <span key={tag} className='rounded-full bg-paper-2 px-2.5 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.1em] text-muted'>
                {tag}
              </span>
            ))}
          </div>
          <h1 className='mt-4 font-display text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl'>
            {post.title}
          </h1>
          {post.publishedAt && (
            <p className='mt-3 font-mono text-xs uppercase tracking-[0.14em] text-muted'>
              {new Date(post.publishedAt).toLocaleDateString('en-IE', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </p>
          )}
          <div className='prose-pf mt-8'>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
          </div>
        </div>
      </motion.div>
    </article>
  );
}
