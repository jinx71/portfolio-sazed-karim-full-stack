import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.js';
import { api } from '../lib/api.js';
import { trackTheme, statusTheme, type Post, type Project } from '../lib/types.js';
import ProjectEditor, { type ProjectDraft } from '../components/ProjectEditor.js';
import PostEditor, { type PostDraft } from '../components/PostEditor.js';
import Loader from '../components/Loader.js';

type View = 'projects' | 'posts';
type ProjectMode = { kind: 'list' } | { kind: 'new' } | { kind: 'edit'; project: Project };
type PostMode = { kind: 'list' } | { kind: 'new' } | { kind: 'edit'; post: Post };

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const [view, setView] = useState<View>('projects');

  const [projects, setProjects] = useState<Project[] | null>(null);
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [pMode, setPMode] = useState<ProjectMode>({ kind: 'list' });
  const [postMode, setPostMode] = useState<PostMode>({ kind: 'list' });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadProjects = () => api.listProjects().then(setProjects).catch((e: Error) => setError(e.message));
  const loadPosts = () => api.listPosts().then(setPosts).catch((e: Error) => setError(e.message));

  useEffect(() => {
    loadProjects();
    loadPosts();
  }, []);

  // --- Project handlers ---
  const saveProject = async (draft: ProjectDraft) => {
    setBusy(true);
    setError(null);
    try {
      if (pMode.kind === 'edit') await api.updateProject(pMode.project.id, draft);
      else await api.createProject(draft);
      await loadProjects();
      setPMode({ kind: 'list' });
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  const removeProject = async (p: Project) => {
    if (!confirm(`Delete ${p.code} — ${p.title}?`)) return;
    setError(null);
    try {
      await api.deleteProject(p.id);
      await loadProjects();
    } catch (e) {
      setError((e as Error).message);
    }
  };

  // --- Post handlers ---
  const savePost = async (draft: PostDraft) => {
    setBusy(true);
    setError(null);
    try {
      if (postMode.kind === 'edit') await api.updatePost(postMode.post.id, draft);
      else await api.createPost(draft);
      await loadPosts();
      setPostMode({ kind: 'list' });
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  const removePost = async (p: Post) => {
    if (!confirm(`Delete "${p.title}"?`)) return;
    setError(null);
    try {
      await api.deletePost(p.id);
      await loadPosts();
    } catch (e) {
      setError((e as Error).message);
    }
  };

  return (
    <div className='min-h-screen'>
      <header className='border-b border-line bg-white/80 backdrop-blur'>
        <div className='shell flex h-16 items-center justify-between'>
          <div className='flex items-center gap-2.5'>
            <span className='grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-indigo via-fuchsia to-amber font-display text-sm font-bold text-white'>
              S
            </span>
            <span className='font-display text-base font-bold text-ink'>Portfolio CMS</span>
          </div>
          <div className='flex items-center gap-4'>
            <Link to='/' className='font-mono text-xs uppercase tracking-[0.14em] text-muted hover:text-violet'>
              View site ↗
            </Link>
            <span className='hidden font-mono text-xs text-muted sm:inline'>{user?.email}</span>
            <button
              type='button'
              onClick={logout}
              className='rounded-lg border border-line px-3 py-1.5 font-mono text-xs uppercase tracking-[0.12em] text-muted hover:text-ink'
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className='shell py-10'>
        <div className='mb-8 flex gap-2'>
          {(['projects', 'posts'] as View[]).map((v) => (
            <button
              key={v}
              type='button'
              onClick={() => setView(v)}
              className={`rounded-full px-4 py-2 font-mono text-xs font-semibold uppercase tracking-[0.12em] transition-colors ${
                view === v ? 'bg-ink text-white' : 'border border-line bg-white text-muted hover:text-ink'
              }`}
            >
              {v}
            </button>
          ))}
        </div>

        {error && (
          <p className='mb-6 rounded-lg bg-pink/10 px-4 py-3 font-mono text-xs text-pink'>{error}</p>
        )}

        {view === 'projects' && (
          <section>
            {pMode.kind === 'list' && (
              <>
                <div className='mb-5 flex items-center justify-between'>
                  <h1 className='font-display text-2xl font-bold text-ink'>
                    Projects {projects && <span className='text-muted'>({projects.length})</span>}
                  </h1>
                  <button
                    type='button'
                    onClick={() => setPMode({ kind: 'new' })}
                    className='rounded-lg bg-gradient-to-r from-indigo to-violet px-4 py-2 font-mono text-xs font-semibold uppercase tracking-[0.12em] text-white'
                  >
                    + New project
                  </button>
                </div>
                {!projects ? (
                  <Loader label='Loading' />
                ) : (
                  <div className='overflow-hidden rounded-2xl border border-line bg-white'>
                    {projects.map((p) => (
                      <div key={p.id} className='flex items-center gap-4 border-b border-line px-4 py-3 last:border-0'>
                        <span className={`font-mono text-xs font-semibold ${trackTheme[p.track].text}`}>{p.code}</span>
                        <span className='flex-1 truncate text-sm font-medium text-ink'>{p.title}</span>
                        <span className={`hidden rounded-full px-2 py-0.5 font-mono text-[0.58rem] uppercase tracking-[0.1em] sm:inline ${statusTheme[p.status].chip}`}>
                          {statusTheme[p.status].label}
                        </span>
                        <button
                          type='button'
                          onClick={() => setPMode({ kind: 'edit', project: p })}
                          className='font-mono text-xs text-violet hover:underline'
                        >
                          Edit
                        </button>
                        <button
                          type='button'
                          onClick={() => removeProject(p)}
                          className='font-mono text-xs text-pink hover:underline'
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {(pMode.kind === 'new' || pMode.kind === 'edit') && (
              <div className='rounded-2xl border border-line bg-white p-6'>
                <h1 className='mb-5 font-display text-xl font-bold text-ink'>
                  {pMode.kind === 'edit' ? `Edit ${pMode.project.code}` : 'New project'}
                </h1>
                <ProjectEditor
                  initial={pMode.kind === 'edit' ? pMode.project : undefined}
                  onSave={saveProject}
                  onCancel={() => setPMode({ kind: 'list' })}
                  busy={busy}
                />
              </div>
            )}
          </section>
        )}

        {view === 'posts' && (
          <section>
            {postMode.kind === 'list' && (
              <>
                <div className='mb-5 flex items-center justify-between'>
                  <h1 className='font-display text-2xl font-bold text-ink'>
                    Posts {posts && <span className='text-muted'>({posts.length})</span>}
                  </h1>
                  <button
                    type='button'
                    onClick={() => setPostMode({ kind: 'new' })}
                    className='rounded-lg bg-gradient-to-r from-teal to-emerald px-4 py-2 font-mono text-xs font-semibold uppercase tracking-[0.12em] text-white'
                  >
                    + New post
                  </button>
                </div>
                {!posts ? (
                  <Loader label='Loading' />
                ) : posts.length === 0 ? (
                  <p className='text-muted'>No posts yet.</p>
                ) : (
                  <div className='overflow-hidden rounded-2xl border border-line bg-white'>
                    {posts.map((p) => (
                      <div key={p.id} className='flex items-center gap-4 border-b border-line px-4 py-3 last:border-0'>
                        <span className='flex-1 truncate text-sm font-medium text-ink'>{p.title}</span>
                        <span
                          className={`rounded-full px-2 py-0.5 font-mono text-[0.58rem] uppercase tracking-[0.1em] ${
                            p.published ? 'bg-emerald/15 text-emerald' : 'bg-amber/15 text-amber'
                          }`}
                        >
                          {p.published ? 'Published' : 'Draft'}
                        </span>
                        <button
                          type='button'
                          onClick={() => setPostMode({ kind: 'edit', post: p })}
                          className='font-mono text-xs text-violet hover:underline'
                        >
                          Edit
                        </button>
                        <button
                          type='button'
                          onClick={() => removePost(p)}
                          className='font-mono text-xs text-pink hover:underline'
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {(postMode.kind === 'new' || postMode.kind === 'edit') && (
              <div className='rounded-2xl border border-line bg-white p-6'>
                <h1 className='mb-5 font-display text-xl font-bold text-ink'>
                  {postMode.kind === 'edit' ? 'Edit post' : 'New post'}
                </h1>
                <PostEditor
                  initial={postMode.kind === 'edit' ? postMode.post : undefined}
                  onSave={savePost}
                  onCancel={() => setPostMode({ kind: 'list' })}
                  busy={busy}
                />
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
}
