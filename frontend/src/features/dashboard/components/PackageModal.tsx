import { useEffect, type FC } from 'react';
import { PackageIcon } from '@/components/common/PackageIcon';
import { Link } from 'react-router-dom';
import { parsePackageDetails, type Package } from './packageUtils';

interface PackageModalProps {
  pkg: Package | null;
  isOpen: boolean;
  onClose: () => void;
}

export const PackageModal: FC<PackageModalProps> = ({ pkg, isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !pkg) return null;

  const { summary, itinerary, highlights } = parsePackageDetails(pkg);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 pt-20 sm:pt-24 pb-6 bg-black/75 backdrop-blur-md animate-fade-in overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop overlay click */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative w-full max-w-3xl bg-white dark:bg-bark-soil rounded-3xl shadow-2xl border border-golden-hour/30 overflow-hidden z-10 my-auto max-h-[90vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          aria-label="Close modal"
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/10 dark:bg-white/10 hover:bg-golden-hour hover:text-white transition-all duration-300 text-gray-700 dark:text-gray-200"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Modal Header */}
        <div className="p-6 sm:p-8 bg-gradient-to-r from-golden-hour/10 via-transparent to-burnt-rust/10 border-b border-gray-200 dark:border-gray-800 shrink-0 relative">
          <div className="flex items-start gap-4 pr-8">
            <div className="w-16 h-16 rounded-2xl bg-white dark:bg-bark-soil p-3 shadow-md border border-golden-hour/30 flex items-center justify-center shrink-0">
              <PackageIcon icon={pkg.icon || '🥾'} className="w-10 h-10 text-golden-hour" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                {pkg.category_name && (
                  <span className="text-[10px] font-accent uppercase tracking-widest px-3 py-1 rounded-full bg-golden-hour/15 text-golden-hour font-bold">
                    {pkg.category_name}
                  </span>
                )}
                {pkg.duration && (
                  <span className="text-[10px] font-accent uppercase tracking-widest px-3 py-1 rounded-full bg-bark-soil/10 dark:bg-white/10 text-bark-soil dark:text-soft-earth font-bold">
                    {pkg.duration}
                  </span>
                )}
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-bark-soil dark:text-soft-earth">
                {pkg.name}
              </h2>
            </div>
          </div>
        </div>

        {/* Modal Body - Scrollable */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 scroll-hide flex-1">
          {/* Summary / Overview */}
          {summary && (
            <div className="bg-golden-hour/5 dark:bg-white/5 p-4 sm:p-5 rounded-2xl border border-golden-hour/20">
              <h3 className="font-accent text-xs uppercase tracking-widest text-golden-hour font-bold mb-2">
                Overview
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed font-medium">
                {summary}
              </p>
            </div>
          )}

          {/* Highlights */}
          {highlights.length > 0 && (
            <div>
              <h3 className="font-display text-lg font-bold text-bark-soil dark:text-soft-earth mb-3 flex items-center gap-2">
                <span className="text-golden-hour">✨</span> Included Highlights
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {highlights.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 p-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200/60 dark:border-gray-800 text-xs sm:text-sm text-gray-800 dark:text-gray-200"
                  >
                    <span className="text-golden-hour font-bold shrink-0">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Day by Day Itinerary Timeline */}
          {itinerary.length > 0 && (
            <div>
              <h3 className="font-display text-lg font-bold text-bark-soil dark:text-soft-earth mb-4 flex items-center gap-2">
                <span className="text-golden-hour">🗓️</span> Day-by-Day Itinerary
              </h3>
              <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-2.5 sm:before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-golden-hour/30">
                {itinerary.map((day, idx) => (
                  <div key={idx} className="relative group">
                    {/* Timeline dot */}
                    <div className="absolute -left-6 sm:-left-8 top-0.5 w-5 h-5 rounded-full bg-golden-hour text-white flex items-center justify-center text-[10px] font-bold shadow-md">
                      {idx + 1}
                    </div>

                    <div className="bg-gray-50 dark:bg-white/5 p-4 sm:p-5 rounded-2xl border border-gray-200/80 dark:border-gray-800">
                      <h4 className="font-display text-base sm:text-lg font-bold text-bark-soil dark:text-soft-earth mb-2 text-golden-hour">
                        {day.title}
                      </h4>
                      {day.items.length > 0 && (
                        <ul className="space-y-1.5 pl-2">
                          {day.items.map((act, aIdx) => (
                            <li
                              key={aIdx}
                              className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2"
                            >
                              <span className="text-golden-hour shrink-0">•</span>
                              <span>{act}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-6 bg-gray-50 dark:bg-bark-soil/95 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
          <div>
            {pkg.price && pkg.price > 0 ? (
              <div className="flex items-baseline gap-1">
                <span className="text-xs text-gray-500 uppercase font-accent font-bold">Price:</span>
                <span className="text-xl font-bold font-display text-golden-hour">
                  {pkg.currency || '₹'}{pkg.price.toLocaleString()}
                </span>
                {pkg.price_note && (
                  <span className="text-xs text-gray-400 font-normal">/ {pkg.price_note}</span>
                )}
              </div>
            ) : (
              <span className="text-xs sm:text-sm text-golden-hour font-bold font-accent uppercase tracking-wider">
                Custom Homestay & Safari Package
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              type="button"
              className="px-5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-xs sm:text-sm font-bold uppercase tracking-wider hover:bg-gray-100 dark:hover:bg-white/10 transition-colors w-1/2 sm:w-auto"
            >
              Close
            </button>
            <Link
              to={`/contact?package=${encodeURIComponent(pkg.slug || pkg.name)}`}
              onClick={onClose}
              className="btn-brush btn-brush-gold text-xs sm:text-sm py-2.5 px-6 text-center w-1/2 sm:w-auto"
            >
              Inquire Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageModal;
