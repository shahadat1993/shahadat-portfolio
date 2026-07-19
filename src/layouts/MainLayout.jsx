import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Cursor from '../components/Cursor';
import ScrollTopButton from '../components/ScrollTopButton';
import useSmoothScroll from '../hooks/useSmoothScroll';

export default function MainLayout() {
  useSmoothScroll();
  return (
    <div className="min-h-screen flex flex-col">
      <Cursor />
      <Navbar />
      <main className="flex-1 pt-24">
        <Outlet />
      </main>
      <Footer />
      <ScrollTopButton />
    </div>
  );
}
