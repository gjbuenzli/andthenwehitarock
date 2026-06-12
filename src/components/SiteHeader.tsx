import { Link, useLocation } from 'react-router-dom';
import { trackNav } from '@/lib/analytics';

// Content-site nav. NOT used on the focused ad lander ("/") — only on the
// explorable content pages. Add Photos / Gear / Blog here as they ship.
const NAV: { label: string; to: string }[] = [
  { label: 'Home', to: '/' },
  { label: 'Chapters', to: '/chapters' },
];

export function SiteHeader() {
  const { pathname } = useLocation();
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between gap-3">
        <Link
          to="/"
          onClick={() => trackNav('/', pathname)}
          className="font-bold text-slate-900 text-sm sm:text-base truncate"
        >
          And Then We Hit a Rock
        </Link>
        <nav className="flex items-center gap-3 sm:gap-4 text-sm shrink-0">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              onClick={() => trackNav(n.to, pathname)}
              className={`hidden sm:inline hover:text-blue-700 ${
                pathname === n.to ? 'text-blue-700 font-semibold' : 'text-slate-600'
              }`}
            >
              {n.label}
            </Link>
          ))}
          <Link
            to="/"
            onClick={() => trackNav('/ (get the book)', pathname)}
            className="bg-[#FFD814] hover:bg-[#F7CA00] text-slate-900 font-bold text-sm px-3 py-1.5 rounded border border-[#FCD200] whitespace-nowrap"
          >
            Get the Book
          </Link>
        </nav>
      </div>
    </header>
  );
}
