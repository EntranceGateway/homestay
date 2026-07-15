import { Link } from 'react-router-dom';
import { PageSeo } from '@/components/seo/PageSeo';

export function NotFoundPage() {
  return (
    <>
      <PageSeo
        title="Page Not Found"
        description="The page you are looking for could not be found at Bardia Eco-Friendly Homestay."
        path="/404"
        noindex
      />
      <div className="min-h-screen flex items-center justify-center px-6 text-center bg-background-light dark:bg-background-dark">
        <section className="max-w-2xl">
          <p className="font-accent text-[11px] tracking-[0.25em] uppercase text-golden-hour mb-6">
            404
          </p>
          <h1 className="font-display text-4xl sm:text-6xl font-light text-bark-soil dark:text-soft-earth mb-6">
            Page not found
          </h1>
          <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-10">
            This URL does not match an available homestay, safari, gallery, or contact page.
          </p>
          <Link to="/" className="btn-brush btn-brush-primary">
            Return Home
          </Link>
        </section>
      </div>
    </>
  );
}
