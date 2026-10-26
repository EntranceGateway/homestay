import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HomePage } from '@/features/site/pages/HomePage';
import { AboutPage } from '@/features/site/pages/AboutPage';
import { GalleryPage } from '@/features/site/pages/GalleryPage';
import { ActivitiesPage } from '@/features/site/pages/ActivitiesPage';
import { BlogPage } from '@/features/site/pages/BlogPage';
import { BlogPostPage } from '@/features/site/pages/BlogPostPage';
import { FarmToTablePage } from '@/features/site/pages/FarmToTablePage';
import { PackagesPage } from '@/features/site/pages/PackagesPage';
import { ContactPage } from '@/features/site/pages/ContactPage';
import { NotFoundPage } from '@/features/site/pages/NotFoundPage';
import { ScrollToTop } from '@/components/common/ScrollToTop';
import { ScrollToTopOnNavigate } from '@/components/common/ScrollToTopOnNavigate';
import { ContactButtons } from '@/components/common/ContactButtons';
import { Reviews } from '@/components/common/Reviews';
import { Analytics } from '@/components/seo/Analytics';

export function AppContent() {
  return (
    <>
      <Analytics />
      <ScrollToTopOnNavigate />
      <div className="bg-soft-earth text-gray-800 font-body antialiased transition-colors duration-300">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/activities" element={<ActivitiesPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/farm-to-table" element={<FarmToTablePage />} />
            <Route path="/packages" element={<PackagesPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Reviews />
        <Footer />
        <ScrollToTop />
        <ContactButtons />
      </div>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
