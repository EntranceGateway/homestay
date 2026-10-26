import type { FaqItem } from '@/lib/seo';

interface FaqSectionProps {
  items: FaqItem[];
}

export function FaqSection({ items }: FaqSectionProps) {
  return (
    <section className="px-5 sm:px-10 pb-24 max-w-4xl mx-auto">
      <div className="divider-organic mb-12" />
      <h2 className="font-display text-3xl sm:text-4xl font-light text-bark-soil mb-8 text-center">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {items.map((item) => (
          <details key={item.question} className="border border-bark-soil/10 rounded-card bg-white/70 p-5">
            <summary className="cursor-pointer font-accent text-sm uppercase tracking-[0.12em] text-bark-soil">
              {item.question}
            </summary>
            <p className="mt-4 text-gray-600 leading-relaxed">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
