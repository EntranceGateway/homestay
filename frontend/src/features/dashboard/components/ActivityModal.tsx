import { useEffect } from 'react';
import type { ActivityItem } from '@/types/activity';
import { Link } from 'react-router-dom';
import { PackageIcon } from '@/components/common/PackageIcon';

interface ActivityModalProps {
  activity: ActivityItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ActivityModal({ activity, isOpen, onClose }: ActivityModalProps) {
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

  if (!isOpen || !activity) return null;

  const whatsappMessage = encodeURIComponent(
    `Hello! I am interested in booking or inquiring about the "${activity.title}" experience.`
  );
  const whatsappUrl = `https://api.whatsapp.com/send/?phone=9779842364787&text=${whatsappMessage}&type=phone_number&app_absent=0`;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 pt-20 sm:pt-24 pb-6 animate-fade-in-up overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="activity-modal-title"
    >
      {/* Semi-transparent dark backdrop with blur */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card Window */}
      <div className="relative w-full max-w-2xl max-h-[82vh] sm:max-h-[85vh] bg-moonlight dark:bg-bark-soil rounded-2xl shadow-2xl border border-accent-gold/40 overflow-hidden flex flex-col z-10 my-auto">
        {/* Header decoration bar */}
        <div className="h-2 bg-gradient-to-r from-living-canopy via-accent-gold to-golden-hour w-full shrink-0" />

        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          aria-label="Close modal"
          className="absolute top-3.5 right-3.5 z-20 p-2 rounded-full bg-black/10 dark:bg-white/10 hover:bg-accent-gold hover:text-white transition-all duration-300 text-gray-700 dark:text-gray-200"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Scrollable Content Container */}
        <div className="p-5 sm:p-8 overflow-y-auto space-y-5 sm:space-y-6 scroll-hide">
          {/* Activity Header */}
          <div className="flex items-start gap-3.5 sm:gap-4 pr-10">
            <div className="w-14 h-14 sm:w-18 sm:h-18 rounded-2xl bg-accent-gold/15 dark:bg-accent-gold/25 border border-accent-gold/30 flex items-center justify-center text-2xl sm:text-4xl shadow-inner shrink-0">
              <PackageIcon icon={activity.icon || '🐘'} className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center" />
            </div>
            <div>
              <span className="inline-block text-[10px] sm:text-[11px] font-accent uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-living-canopy/10 dark:bg-living-canopy/30 text-living-canopy dark:text-gray-200 font-semibold mb-1">
                Wildlife Experience #{activity.display_order || activity.id}
              </span>
              <h2
                id="activity-modal-title"
                className="font-display text-xl sm:text-3xl font-bold text-gray-900 dark:text-white leading-tight"
              >
                {activity.title}
              </h2>
            </div>
          </div>

          <div className="divider-organic my-2" />

          {/* Short Description Quote Box */}
          {activity.short_description && (
            <div className="bg-accent-gold/10 dark:bg-accent-gold/15 border-l-4 border-accent-gold p-3.5 sm:p-4 rounded-r-xl">
              <p className="text-gray-800 dark:text-gray-200 font-medium italic text-sm sm:text-base leading-relaxed">
                "{activity.short_description}"
              </p>
            </div>
          )}

          {/* Detailed Full Description */}
          <div className="space-y-2 sm:space-y-3">
            <h3 className="font-accent text-[11px] sm:text-xs uppercase tracking-widest text-accent-gold font-bold">
              About This Experience
            </h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed whitespace-pre-line">
              {activity.description}
            </p>
          </div>

          {/* Highlights & Badges */}
          <div className="flex flex-wrap gap-2 pt-1">
            <span className="text-xs px-3 py-1 rounded-full bg-gray-200/80 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium">
              🌿 Bardia National Park
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-gray-200/80 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium">
              🧭 Expert Naturalist Guide
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-gray-200/80 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium">
              📸 Eco-Friendly Tour
            </span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 bg-gray-100/90 dark:bg-black/40 border-t border-gray-200 dark:border-gray-800 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 shrink-0">
          <button
            onClick={onClose}
            type="button"
            className="w-full sm:w-auto px-5 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 font-medium transition-colors text-xs sm:text-sm text-center"
          >
            Close
          </button>

          <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-2.5 sm:gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium text-xs sm:text-sm transition-colors shadow-md"
            >
              <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
              </svg>
              WhatsApp Inquiry
            </a>
            <Link
              to="/contact"
              onClick={onClose}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-accent-gold hover:bg-amber-600 text-white font-medium text-xs sm:text-sm transition-colors shadow-md text-center"
            >
              Inquire / Book
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
