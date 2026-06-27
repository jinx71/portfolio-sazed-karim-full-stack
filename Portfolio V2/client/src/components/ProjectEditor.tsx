import { useState } from 'react';
import type { Project, Track, Status } from '../lib/types.js';

export interface ProjectDraft {
  code: string;
  title: string;
  track: Track;
  status: Status;
  summary: string;
  stack: string[];
  month: number | null;
  repoUrl: string | null;
  liveUrl: string | null;
  featured: boolean;
  order: number;
}

const empty: ProjectDraft = {
  code: '',
  title: '',
  track: 'fullstack',
  status: 'planned',
  summary: '',
  stack: [],
  month: null,
  repoUrl: '',
  liveUrl: '',
  featured: false,
  order: 0,
};

const field = 'mt-1.5 w-full rounded-lg border border-line bg-white px-3 py-2 text-sm focus:border-violet';
const labelCls = 'font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted';

export default function ProjectEditor({
  initial,
  onSave,
  onCancel,
  busy,
}: {
  initial?: Project;
  onSave: (draft: ProjectDraft) => void;
  onCancel: () => void;
  busy: boolean;
}) {
  const [draft, setDraft] = useState<ProjectDraft>(
    initial
      ? {
          code: initial.code,
          title: initial.title,
          track: initial.track,
          status: initial.status,
          summary: initial.summary,
          stack: initial.stack,
          month: initial.month,
          repoUrl: initial.repoUrl ?? '',
          liveUrl: initial.liveUrl ?? '',
          featured: initial.featured,
          order: initial.order,
        }
      : empty,
  );

  const set = <K extends keyof ProjectDraft>(key: K, value: ProjectDraft[K]) =>
    setDraft((d) => ({ ...d, [key]: value }));

  return (
    <div className='space-y-4'>
      <div className='grid gap-4 sm:grid-cols-2'>
        <div>
          <label className={labelCls}>Code</label>
          <input className={field} value={draft.code} onChange={(e) => set('code', e.target.value)} placeholder='FS-01' />
        </div>
        <div>
          <label className={labelCls}>Title</label>
          <input className={field} value={draft.title} onChange={(e) => set('title', e.target.value)} />
        </div>
      </div>

      <div className='grid gap-4 sm:grid-cols-3'>
        <div>
          <label className={labelCls}>Track</label>
          <select className={field} value={draft.track} onChange={(e) => set('track', e.target.value as Track)}>
            <option value='fullstack'>Full-Stack</option>
            <option value='aiml'>AI / ML</option>
            <option value='mern'>MERN</option>
          </select>
        </div>
        <div>
          <label className={labelCls}>Status</label>
          <select className={field} value={draft.status} onChange={(e) => set('status', e.target.value as Status)}>
            <option value='shipped'>Shipped</option>
            <option value='in-progress'>In progress</option>
            <option value='planned'>Planned</option>
          </select>
        </div>
        <div>
          <label className={labelCls}>Month (1–12, optional)</label>
          <input
            className={field}
            type='number'
            min={1}
            max={12}
            value={draft.month ?? ''}
            onChange={(e) => set('month', e.target.value ? Number(e.target.value) : null)}
          />
        </div>
      </div>

      <div>
        <label className={labelCls}>Summary</label>
        <textarea className={`${field} resize-y`} rows={3} value={draft.summary} onChange={(e) => set('summary', e.target.value)} />
      </div>

      <div>
        <label className={labelCls}>Stack (comma-separated)</label>
        <input
          className={field}
          value={draft.stack.join(', ')}
          onChange={(e) => set('stack', e.target.value.split(',').map((s) => s.trim()).filter(Boolean))}
          placeholder='React, Node.js, PostgreSQL'
        />
      </div>

      <div className='grid gap-4 sm:grid-cols-2'>
        <div>
          <label className={labelCls}>Live URL</label>
          <input className={field} value={draft.liveUrl ?? ''} onChange={(e) => set('liveUrl', e.target.value)} placeholder='https://…' />
        </div>
        <div>
          <label className={labelCls}>Repo URL</label>
          <input className={field} value={draft.repoUrl ?? ''} onChange={(e) => set('repoUrl', e.target.value)} placeholder='https://github.com/…' />
        </div>
      </div>

      <div className='flex items-center gap-6'>
        <label className='flex items-center gap-2 text-sm text-body'>
          <input type='checkbox' checked={draft.featured} onChange={(e) => set('featured', e.target.checked)} />
          Featured
        </label>
        <div className='flex items-center gap-2'>
          <label className={labelCls}>Order</label>
          <input
            className='w-20 rounded-lg border border-line bg-white px-3 py-2 text-sm focus:border-violet'
            type='number'
            value={draft.order}
            onChange={(e) => set('order', Number(e.target.value))}
          />
        </div>
      </div>

      <div className='flex gap-3 pt-2'>
        <button
          type='button'
          onClick={() => onSave(draft)}
          disabled={busy || !draft.code || !draft.title || !draft.summary}
          className='rounded-lg bg-gradient-to-r from-indigo to-violet px-5 py-2.5 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-white disabled:opacity-40'
        >
          {busy ? 'Saving…' : 'Save project'}
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
