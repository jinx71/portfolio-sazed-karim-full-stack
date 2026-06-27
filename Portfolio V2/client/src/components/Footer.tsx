import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className='border-t border-line py-10'>
      <div className='shell flex flex-col items-center justify-between gap-4 sm:flex-row'>
        <p className='font-mono text-xs text-muted'>
          © {new Date().getFullYear()} Md. Sazed Ul Karim
        </p>
        <nav className='flex items-center gap-5 font-mono text-xs uppercase tracking-[0.14em] text-muted'>
          <Link to='/' className='hover:text-violet'>Home</Link>
          <Link to='/blog' className='hover:text-violet'>Blog</Link>
          <a href='https://github.com/jinx71' target='_blank' rel='noreferrer' className='hover:text-violet'>GitHub</a>
          <Link to='/admin' className='hover:text-violet'>Admin</Link>
        </nav>
      </div>
    </footer>
  );
}
