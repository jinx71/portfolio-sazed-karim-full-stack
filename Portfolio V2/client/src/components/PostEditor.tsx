import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { accentOptions, type Post } from '../lib/types.js';

export interface PostDraft {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  tags: string[];
  accent: string;
  published: boolean;
}

const empty: PostDraft = {
  title: '',
  slug: '',
  excerpt: '',
  content: '## Heading\n\nStart writing in Markdown…',
  tags: [],
  accent: 'indigo',
  published: false,
};

const field = 'mt-1.5 w-full rounded-lg border border-line bg-white px-3 py-2 text-sm focus:border-violet';
const labelCls = 'font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted';

export default function PostEditor({
  initial,
  onSave,
  onCancel,
  busy,
}: {
  initial?: Post;
  onSave: (draft: PostDraft) => void;
  onCancel: () => void;
  busy: boolean;
}) {
  const [draft, setDraft] = useState<PostDraft>(
    initial
      ? {
          title: initial.title,
          slug: initial.slug,
          excerpt: initial.excerpt,
          content: initial.content,
          tags: initial.tags,
          accent: initial.accent,
          published: initial.published,
        }
      : empty,
  );

  const set = <K extends keyof PostDraft>(key: K, value: PostDraft[K]) =>
    setDraft((d) => ({ ...d, [key]: value }));

  return (
    <div className='space-y-4'>
      <div className='grid gap-4 sm:grid-cols-2'>
        <div>
          <label className={labelCls}>Title</label>
          <input className={field} value={draft.title} onChange={(e) => set('title', e.target.value)} />
        </div>
        <div>
          <label className={labelCls}>Slug (auto from title if blank)</label>
          <input className={field} value={draft.slug} onChange={(e) => set('slug', e.target.value)} placeholder='my-post-slug' />
        </div>
      </div>

      <div>
        <label className={labelCls}>Excerpt</label>
        <textarea className={`${field} resize-y`} rows={2} value={draft.excerpt} onChange={(e) => set('excerpt', e.target.value)} />
      </div>

      <div className='grid gap-4 sm:grid-cols-2'>
        <div>
          <label className={labelCls}>Tags (comma-separated)</label>
          <input
            className={field}
            value={draft.tags.join(', ')}
            onChange={(e) => set('tags', e.target.value.split(',').map((t) => t.trim()).filter(Boolean))}
          />
        </div>
        <div>
          <label className={labelCls}>Cover accent</label>
          <select className={field} value={draft.accent} onChange={(e) => set('accent', e.target.value)}>
            {accentOptions.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className={labelCls}>Content (Markdown)</label>
        <div className='mt-1.5 grid gap-4 lg:grid-cols-2'>
          <textarea
            className='h-80 w-full resize-y rounded-lg border border-line bg-white px-3 py-2 font-mono text-sm focus:border-violet'
            value={draft.content}
            onChange={(e) => set('content', e.target.value)}
          />
          <div className='prose-pf h-80 overflow-y-auto rounded-lg border border-line bg-paper-2/40 px-4 py-3'>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{draft.content}</ReactMarkdown>
          </div>
        </div>
      </div>

      <label className='flex items-center gap-2 text-sm text-body'>
        <input type='checkbox' checked={draft.published} onChange={(e) => set('published', e.target.checked)} />
        Published (visible on the public blog)
      </label>

      <div className='flex gap-3 pt-2'>
        <button
          type='button'
          onClick={() => onSave(draft)}
          disabled={busy || !draft.title || !draft.excerpt || !draft.content}
          className='rounded-lg bg-gradient-to-r from-teal to-emerald px-5 py-2.5 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-white disabled:opacity-40'
        >
          {busy ? 'Saving…' : 'Save post'}
        </button>
        <button
          type='button'
          onClick={onCancel}
          className='rounded-lg border border-line px-5 py-2.5 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-muted hover:text-ink'
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
