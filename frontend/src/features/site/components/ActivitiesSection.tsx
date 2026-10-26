import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useApi } from '@/hooks/useApi';
import { getApiBaseUrl } from '@/lib/apiBase';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import type { ActivityItem } from '@/types/activity';
import { fetchActivityDetail } from '@/services/activityService';
import { ActivityModal } from './ActivityModal';
import { PackageIcon } from '@/components/common/PackageIcon';

export function ActivitiesSection() {
  const [headingRef, headingVisible] = useScrollAnimation();
  const [gridRef, gridVisible] = useScrollAnimation({ threshold: 0.05 });

  const { data, loading } = useApi<ActivityItem[]>({ url: `${getApiBaseUrl()}/activities/list`});
  const activities = Array.isArray(data) ? data : [];
  const [selectedActivity, setSelectedActivity] = useState<ActivityItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleOpenModal = async (activity: ActivityItem) => {
    // Show current card data immediately for zero lag
    setSelectedActivity(activity);
    setIsModalOpen(true);

    // Also fetch fresh detail data from API /api/activities/get?slug={slug}
    if (activity.slug) {
      try {
        const freshDetail = await fetchActivityDetail(activity.slug);
        if (freshDetail) {
          setSelectedActivity(freshDetail);
        }
      } catch (err) {
        console.warn('Using card data for modal detail:', err);
      }
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedActivity(null);
  };

  // This section is the whole Activities page, so never render it empty
  if (!loading && activities.length === 0) {
    return (
      <section className="pt-40 pb-24 px-6 text-center max-w-lg mx-auto">
        <h1 className="font-display text-3xl font-bold text-bark-soil mb-3">Activities are being updated</h1>
        <p className="text-gray-700 leading-relaxed mb-8">
          We couldn't load our activities just now. Ask us directly about jungle safaris, river trips and birdwatching.
        </p>
        <Link to="/contact" className="btn-brush btn-brush-gold">
          Ask About Activities
        </Link>
      </section>
    );
  }

  return (
    <section
      id="activities"
      className="py-24 bg-moonlight/40 relative overflow-hidden transition-colors duration-300 border-y border-gray-200/50"
    >
      {/* Ambient background glow elements */}
      <div className="absolute top-1/3 -left-20 w-[450px] h-[450px] bg-golden-hour/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-20 w-[450px] h-[450px] bg-living-canopy/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div
          ref={headingRef}
          className={`text-center mb-16 relative scroll-fade-in ${headingVisible ? 'visible' : ''}`}
        >
          {/* Elephant & Wilderness Icon */}
          <div className="flex justify-center mb-4">
            <span className="text-5xl filter drop-shadow-md transform hover:scale-110 transition-transform duration-300 cursor-default">
              🐘
            </span>
          </div>

          <span className="font-accent text-xs uppercase tracking-widest text-golden-hour font-bold block mb-2">
            Explore Bardia Wilderness
          </span>

          <h2 className="font-display font-bold text-3xl md:text-5xl text-gray-900 mb-2">
            Activities & Wildlife Experiences
          </h2>

          <h3 className="font-script text-golden-hour text-4xl md:text-5xl my-1">
            Wildlife Experiences
          </h3>

          <div className="divider-organic" />

          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto mt-4 leading-relaxed">
            Immerse yourself in Nepal’s wildest national park with customized safaris, river expeditions, and birdwatching tours guided by veteran local naturalists.
          </p>
        </div>

        {/* Card Grid Container */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="bg-white/60 h-64 rounded-2xl animate-pulse p-6 border border-gray-200/50 flex flex-col justify-between"
              >
                <div className="w-12 h-12 rounded-xl bg-gray-300" />
                <div className="space-y-2">
                  <div className="h-5 bg-gray-300 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-full" />
                  <div className="h-4 bg-gray-200 rounded w-2/3" />
                </div>
                <div className="h-4 bg-golden-hour/20 rounded w-1/3" />
              </div>
            ))}
          </div>
        ) : (
          <div
            ref={gridRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto"
          >
            {activities.map((activity, index) => {
              const staggerClass = `stagger-${(index % 4) + 1}`;
              return (
                <div
                  key={activity.id || activity.slug}
                  onClick={() => handleOpenModal(activity)}
                  className={`group bg-white p-6 sm:p-7 rounded-2xl border border-gray-200/80 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer flex flex-col justify-between hover-shine scroll-scale-in ${staggerClass} ${
                    gridVisible ? 'visible' : ''
                  }`}
                >
                  <div>
                    {/* Top row: Icon badge & order number */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-14 h-14 rounded-2xl bg-golden-hour/10 group-hover:bg-golden-hour group-hover:text-white text-2xl sm:text-3xl flex items-center justify-center transition-all duration-300 shadow-sm border border-golden-hour/20">
                        <PackageIcon icon={activity.icon || '🌿'} className="w-8 h-8 flex items-center justify-center" />
                      </div>
                      <span className="text-xs font-accent uppercase tracking-widest text-gray-400 group-hover:text-golden-hour transition-colors font-bold">
                        #{(index + 1).toString().padStart(2, '0')}
                      </span>
                    </div>

                    {/* Title */}
                    <h4 className="font-display font-bold text-xl text-gray-900 mb-2 group-hover:text-golden-hour transition-colors leading-snug">
                      {activity.title}
                    </h4>

                    {/* Short Description */}
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-6">
                      {activity.short_description || activity.description}
                    </p>
                  </div>

                  {/* Bottom action trigger */}
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-accent font-bold uppercase tracking-wider text-golden-hour">
                    <span>Explore Experience</span>
                    <svg
                      className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Popup Modal Screen */}
      <ActivityModal
        activity={selectedActivity}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
}
