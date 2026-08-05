import type { FC } from 'react';
import { PackageIcon } from '@/components/common/PackageIcon';
import { Link } from 'react-router-dom';
import { parsePackageDetails, type Package } from './packageUtils';

interface PackageCardProps {
  pkg: Package;
  onOpenItinerary?: (pkg: Package) => void;
  featuredScale?: boolean;
}

export const PackageCard: FC<PackageCardProps> = ({
  pkg,
  onOpenItinerary,
  featuredScale = true,
}) => {
  const { summary, itinerary, highlights } = parsePackageDetails(pkg);
  const displayHighlights = highlights.length > 0 ? highlights.slice(0, 4) : [];

  return (
    <div
      className={`bg-white dark:bg-bark-soil/90 rounded-3xl overflow-hidden shadow-lg border border-gray-200/80 dark:border-gray-700/60 card-lift flex flex-col justify-between relative group transition-all duration-300 ${
        pkg.is_featured && featuredScale
          ? 'border-2 border-golden-hour ring-4 ring-golden-hour/15 lg:scale-105'
          : 'hover:border-golden-hour/50'
      }`}
    >
      {/* Featured Badge */}
      {pkg.is_featured && (
        <div className="absolute top-5 right-5 bg-gradient-to-r from-golden-hour to-burnt-rust text-white px-3.5 py-1 rounded-full font-accent text-[10px] tracking-[0.2em] uppercase font-bold z-10 shadow-md flex items-center gap-1.5">
          <span>★</span> Most Popular
        </div>
      )}

      <div>
        {/* Header Section */}
        <div className="p-7 sm:p-8 bg-gradient-to-b from-golden-hour/10 via-golden-hour/5 to-transparent relative overflow-hidden">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-white dark:bg-bark-soil p-3 shadow-md border border-golden-hour/30 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
              <PackageIcon icon={pkg.icon || '🥾'} className="w-8 h-8 text-golden-hour" />
            </div>
            <div>
              {pkg.duration && (
                <span className="font-accent text-[11px] tracking-widest uppercase text-golden-hour font-bold block mb-1">
                  {pkg.duration}
                </span>
              )}
              {pkg.category_name && (
                <span className="text-[10px] font-accent uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold">
                  {pkg.category_name}
                </span>
              )}
            </div>
          </div>

          <h3 className="font-display text-2xl sm:text-3xl font-bold text-bark-soil dark:text-soft-earth leading-tight group-hover:text-golden-hour transition-colors">
            {pkg.name}
          </h3>
        </div>

        {/* Card Content Body */}
        <div className="px-7 sm:px-8 pb-4">
          {/* Summary */}
          {summary && (
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6 font-medium line-clamp-3">
              {summary}
            </p>
          )}

          {/* Highlights Preview */}
          {displayHighlights.length > 0 && (
            <div className="space-y-2 mb-6">
              <span className="text-[10px] font-accent uppercase tracking-widest text-gray-400 dark:text-gray-500 font-bold block mb-2">
                Package Highlights
              </span>
              {displayHighlights.map((feat, j) => (
                <div
                  key={j}
                  className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700 dark:text-gray-200 font-medium"
                >
                  <span className="text-golden-hour font-bold shrink-0">✓</span>
                  <span className="line-clamp-1">{feat}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer & Actions */}
      <div className="px-7 sm:px-8 pb-7 sm:pb-8 pt-2 mt-auto border-t border-gray-100 dark:border-gray-800/80">
        {/* Pricing Info */}
        <div className="flex items-center justify-between mb-5 pt-3">
          <div>
            {pkg.price && pkg.price > 0 ? (
              <div className="flex items-baseline gap-1">
                <span className="text-xs text-gray-400 uppercase font-accent font-bold">From</span>
                <span className="text-xl font-bold font-display text-bark-soil dark:text-soft-earth">
                  {pkg.currency || '₹'}{pkg.price.toLocaleString()}
                </span>
              </div>
            ) : (
              <span className="text-xs font-accent font-bold uppercase tracking-wider text-golden-hour">
                Tailored Eco Safari
              </span>
            )}
          </div>

          {(itinerary.length > 0 || highlights.length > 4) && onOpenItinerary && (
            <button
              onClick={() => onOpenItinerary(pkg)}
              type="button"
              className="text-xs font-accent font-bold text-golden-hour hover:text-burnt-rust uppercase tracking-wider underline underline-offset-4 transition-colors flex items-center gap-1"
            >
              View Itinerary &rarr;
            </button>
          )}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {onOpenItinerary && (
            <button
              onClick={() => onOpenItinerary(pkg)}
              type="button"
              className="w-full py-2.5 px-3 rounded-xl border border-golden-hour/40 text-golden-hour hover:bg-golden-hour hover:text-white transition-all duration-300 font-accent text-xs uppercase tracking-wider font-bold text-center flex items-center justify-center gap-1.5"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Itinerary
            </button>
          )}

          <Link
            to={`/contact?package=${encodeURIComponent(pkg.slug || pkg.name)}`}
            className={`btn-brush btn-brush-gold w-full text-center text-xs py-2.5 ${
              !onOpenItinerary ? 'col-span-2' : ''
            }`}
          >
            Inquire Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;
