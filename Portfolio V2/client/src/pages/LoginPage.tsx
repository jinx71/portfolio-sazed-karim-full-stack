import { useState } from 'react';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext.js';

export default function LoginPage() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  if (user) return <Navigate to='/admin' replace />;

  const submit = async () => {
    setError(null);
    setBusy(true);
    try {
      await login(email, password);
      navigate('/admin', { replace: true });
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className='grid min-h-screen place-items-center px-5'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className='w-full max-w-sm rounded-3xl border border-line bg-white/90 p-8 backdrop-blur'
      >
        <div className='flex items-center gap-2.5'>
          <span className='grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-indigo via-fuchsia to-amber font-display text-sm font-bold text-white'>
            S
          </span>
          <div>
            <p className='font-display text-base font-bold text-ink'>CMS Sign in</p>
            <p className='font-mono text-[0.6rem] uppercase tracking-[0.14em] text-muted'>Portfolio admin</p>
          </div>
        </div>

        <div className='mt-7 space-y-4'>
          <div>
            <label htmlFor='email' className='font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted'>
              Email
            </label>
            <input
              id='email'
              type='email'
              autoComplete='username'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && submit()}
              className='mt-2 w-full rounded-lg border border-line bg-white px-4 py-2.5 text-sm focus:border-violet'
              placeholder='admin@example.com'
            />
          </div>
          <div>
            <label htmlFor='password' className='font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted'>
              Password
            </label>
            <input
              id='password'
              type='password'
              autoComplete='current-password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && submit()}
              className='mt-2 w-full rounded-lg border border-line bg-white px-4 py-2.5 text-sm focus:border-violet'
              placeholder='••••••••'
            />
          </div>

          {error && <p className='font-mono text-xs text-pink'>{error}</p>}

          <button
            type='button'
            onClick={submit}
            disabled={busy || !email || !password}
            className='w-full rounded-lg bg-gradient-to-r from-indigo to-violet px-5 py-2.5 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-white transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40'
          >
            {busy ? 'Signing in…' : 'Sign in'}
          </button>
        </div>

        <Link to='/' className='mt-6 block text-center font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted hover:text-violet'>
          ← Back to site
        </Link>
      </motion.div>
    </section>
  );
}
