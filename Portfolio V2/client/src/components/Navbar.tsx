import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const sections = [
  { href: '/#about', label: 'About' },
  { href: '/#projects', label: 'Projects' },
  { href: '/#skills', label: 'Skills' },
  { href: '/#experience', label: 'Experience' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -18, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors ${
        scrolled ? 'border-b border-line bg-paper/85 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <nav className='shell flex h-16 items-center justify-between'>
        <Link to='/' className='group flex items-center gap-2.5'>
          <span className='grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-indigo via-fuchsia to-amber font-display text-sm font-bold text-white'>
            S
          </span>
          <span className='font-display text-base font-bold tracking-tight text-ink'>
            Sazed Ul Karim
          </span>
        </Link>

        <ul className='hidden items-center gap-7 md:flex'>
          {sections.map((s) => (
            <li key={s.href}>
              <a
                href={s.href}
                className='font-mono text-xs uppercase tracking-[0.14em] text-muted transition-colors hover:text-violet'
              >
                {s.label}
              </a>
            </li>
          ))}
          <li>
            <Link
              to='/blog'
              className={`font-mono text-xs uppercase tracking-[0.14em] transition-colors hover:text-violet ${
                pathname.startsWith('/blog') ? 'text-violet' : 'text-muted'
              }`}
            >
              Blog
            </Link>
          </li>
          <li>
            <a
              href='https://github.com/jinx71'
              target='_blank'
              rel='noreferrer'
              className='rounded-lg bg-gradient-to-r from-indigo to-violet px-3.5 py-2 font-mono text-xs font-semibold uppercase tracking-[0.12em] text-white transition-transform hover:-translate-y-0.5'
            >
              GitHub
            </a>
          </li>
        </ul>

        <button
          type='button'
          aria-expanded={open}
          aria-label='Toggle navigation'
          onClick={() => setOpen((v) => !v)}
          className='flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden'
        >
          <span className={`h-0.5 w-5 bg-ink transition-transform ${open ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`h-0.5 w-5 bg-ink transition-opacity ${open ? 'opacity-0' : ''}`} />
          <span className={`h-0.5 w-5 bg-ink transition-transform ${open ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>
      </nav>

      {open && (
        <ul className='border-t border-line bg-paper px-5 py-4 md:hidden'>
          {sections.map((s) => (
            <li key={s.href}>
              <a
                href={s.href}
                onClick={() => setOpen(false)}
                className='block py-2.5 font-mono text-sm uppercase tracking-[0.14em] text-body'
              >
                {s.label}
              </a>
            </li>
          ))}
          <li>
            <Link
              to='/blog'
              onClick={() => setOpen(false)}
              className='block py-2.5 font-mono text-sm uppercase tracking-[0.14em] text-violet'
            >
              Blog
            </Link>
          </li>
          <li>
            <a
              href='https://github.com/jinx71'
              target='_blank'
              rel='noreferrer'
              className='block py-2.5 font-mono text-sm uppercase tracking-[0.14em] text-indigo'
            >
              GitHub ↗
            </a>
          </li>
        </ul>
      )}
    </motion.header>
  );
}
