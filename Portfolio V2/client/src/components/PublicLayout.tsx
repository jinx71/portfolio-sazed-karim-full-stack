import { Outlet } from 'react-router-dom';
import AnimatedBackground from './AnimatedBackground.js';
import Navbar from './Navbar.js';
import Footer from './Footer.js';

export default function PublicLayout() {
  return (
    <>
      <AnimatedBackground />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
