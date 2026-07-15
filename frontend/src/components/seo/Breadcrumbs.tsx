import { Link } from 'react-router-dom';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="pt-28 px-6 sm:px-10 max-w-6xl mx-auto">
      <ol className="flex flex-wrap items-center gap-2 text-xs font-accent uppercase tracking-[0.14em] text-gray-500">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={item.href} className="flex items-center gap-2">
              {isLast ? (
                <span aria-current="page" className="text-bark-soil dark:text-soft-earth">
                  {item.label}
                </span>
              ) : (
                <Link to={item.href} className="hover:text-golden-hour transition-colors">
                  {item.label}
                </Link>
              )}
              {!isLast && <span aria-hidden="true">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
