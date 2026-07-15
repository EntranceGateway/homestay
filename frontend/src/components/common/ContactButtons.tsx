import { Link } from 'react-router-dom';

export function ContactButtons() {
  return (
    <div className="fixed bottom-8 right-8 z-50 flex items-center gap-4">
      <Link
        className="bg-white text-secondary font-bold text-xs uppercase px-6 py-3 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
        to="/contact"
      >
        Contact Us!
      </Link>
      <button
        aria-label="Open chat"
        className="bg-[#5c7a45] p-3 rounded-full text-white shadow-lg hover:bg-[#4a6338] transition-colors"
        type="button"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
        </svg>
      </button>
    </div>
  );
}
