import { Link } from 'react-router-dom';
import { SiteLayout } from '@/components/SiteLayout';
import { CHAPTERS } from '@/data/chapters';
import bookCover from '@/assets/actual-book-cover.jpg';

// A nautical icon + accent per part — turns a flat list into a journey.
const PART_STYLE: { icon: string; ring: string; badge: string }[] = [
  { icon: '🍹', ring: 'ring-amber-200', badge: 'bg-amber-100' }, // Damn you Lisa
  { icon: '⛵', ring: 'ring-sky-200', badge: 'bg-sky-100' }, // Afloat
  { icon: '🏝️', ring: 'ring-teal-200', badge: 'bg-teal-100' }, // The Bahamas
  { icon: '🦀', ring: 'ring-orange-200', badge: 'bg-orange-100' }, // The East Coast
  { icon: '🧭', ring: 'ring-blue-200', badge: 'bg-blue-100' }, // Due South
  { icon: '🏠', ring: 'ring-rose-200', badge: 'bg-rose-100' }, // Epilogue
  { icon: '📖', ring: 'ring-slate-200', badge: 'bg-slate-100' }, // Glossary
];

export default function Chapters() {
  const chapterCount = CHAPTERS.reduce((n, p) => n + p.chapters.length, 0) - 1; // minus glossary

  return (
    <SiteLayout
      title="Chapters — And Then We Hit a Rock"
      description="A chapter-by-chapter peek at the hilarious true story of a family of five (plus a dog and a cat) who moved onto a sailboat: waterspouts, marine toilets, pirates, and a whole lot of trouble."
    >
      {/* Hero */}
      <div className="bg-gradient-to-br from-sky-100 via-amber-50 to-blue-100 border-b border-slate-200">
        <div className="container mx-auto px-4 py-10 sm:py-14 max-w-3xl text-center">
          <img
            src={bookCover}
            alt="And Then We Hit a Rock — book cover"
            className="w-24 sm:w-28 mx-auto rounded-lg shadow-xl border-4 border-white mb-5"
          />
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 mb-3">Inside the Book</h1>
          <p className="text-slate-700 leading-relaxed max-w-2xl mx-auto">
            Waterspouts, marine toilets, pirates, and a family slowly losing — and finding — their
            minds at sea. Here&apos;s a taste of every chapter: no major spoilers, just enough to
            know what you&apos;re getting into.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1 mt-6 text-sm font-semibold text-slate-500">
            <span>{chapterCount} chapters</span>
            <span className="text-slate-300">•</span>
            <span>337 days at sea</span>
            <span className="text-slate-300">•</span>
            <span>1 sailboat named Twig</span>
          </div>
        </div>
      </div>

      {/* Parts */}
      <div className="container mx-auto px-4 py-10 max-w-3xl">
        {CHAPTERS.map((part, i) => {
          const s = PART_STYLE[i] ?? PART_STYLE[PART_STYLE.length - 1];
          return (
            <section key={part.part} className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <span
                  className={`flex items-center justify-center w-10 h-10 rounded-full text-xl ${s.badge} ring-2 ${s.ring} shrink-0`}
                  aria-hidden
                >
                  {s.icon}
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900">{part.part}</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {part.chapters.map((ch) => (
                  <div
                    key={ch.title}
                    className="rounded-xl border border-slate-200 bg-white p-4 transition hover:shadow-md hover:border-blue-300"
                  >
                    <div className="font-bold text-slate-900 leading-snug">{ch.title}</div>
                    <div className="text-sm text-slate-600 leading-relaxed mt-1.5">{ch.teaser}</div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}

        <div className="bg-gradient-to-br from-sky-100 to-amber-100 border border-slate-200 rounded-2xl p-7 text-center mt-12">
          <p className="text-lg font-bold text-slate-900 mb-1">Ready for the whole adventure?</p>
          <p className="text-sm text-slate-600 mb-4">Paperback, Kindle (free on Kindle Unlimited) &amp; Audiobook.</p>
          <Link
            to="/"
            className="inline-block bg-[#FFD814] hover:bg-[#F7CA00] text-slate-900 font-bold px-6 py-3 rounded-lg border border-[#FCD200]"
          >
            Get the Book →
          </Link>
        </div>
      </div>
    </SiteLayout>
  );
}
