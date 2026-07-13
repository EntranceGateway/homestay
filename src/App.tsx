import { HashRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HomePage } from '@/features/dashboard/pages/HomePage';
import { GalleryPage } from '@/features/dashboard/pages/GalleryPage';
import { BlogPage } from '@/features/dashboard/pages/BlogPage';
import { FarmToTablePage } from '@/features/dashboard/pages/FarmToTablePage';
import { PackagesPage } from '@/features/dashboard/pages/PackagesPage';
import { ContactPage } from '@/features/dashboard/pages/ContactPage';
import { ScrollToTop } from '@/components/common/ScrollToTop';
import { ScrollToTopOnNavigate } from '@/components/common/ScrollToTopOnNavigate';
import { ContactButtons } from '@/components/common/ContactButtons';
import { Reviews } from '@/components/common/Reviews';

function App() {
  return (
    <HashRouter>
      <ScrollToTopOnNavigate />
      <div className="bg-background-light dark:bg-background-dark text-gray-800 dark:text-gray-200 font-body antialiased transition-colors duration-300">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/farm-to-table" element={<FarmToTablePage />} />
          <Route path="/packages" element={<PackagesPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
        <Reviews />
        <Footer />
        <ScrollToTop />
        <ContactButtons />
      </div>
    </HashRouter>
  );
}

export default App;

