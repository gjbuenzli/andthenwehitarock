import { Link } from 'react-router-dom';
import { SiteLayout } from '@/components/SiteLayout';
import { CHAPTERS } from '@/data/chapters';

export default function Chapters() {
  const chapterCount = CHAPTERS.reduce((n, p) => n + p.chapters.length, 0);

  return (
    <SiteLayout
      title="Chapters — And Then We Hit a Rock"
      description="A chapter-by-chapter peek at the hilarious true story of a family of five (plus a dog and a cat) who moved onto a sailboat: waterspouts, marine toilets, pirates, and a whole lot of trouble."
    >
      <article className="container mx-auto px-4 py-10 max-w-3xl">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3">Inside the Book</h1>
        <p className="text-slate-600 mb-10 leading-relaxed">
          {chapterCount}-ish short chapters of waterspouts, marine toilets, pirates, and a family
          slowly losing — and finding — their minds at sea. Here&apos;s a taste of each: no major
          spoilers, just enough to know what you&apos;re getting into.
        </p>

        {CHAPTERS.map((part) => (
          <section key={part.part} className="mb-10">
            <h2 className="text-xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">
              {part.part}
            </h2>
            <ul className="space-y-4">
              {part.chapters.map((ch) => (
                <li key={ch.title}>
                  <div className="font-semibold text-slate-900">{ch.title}</div>
                  <div className="text-sm text-slate-600 leading-relaxed">{ch.teaser}</div>
                </li>
              ))}
            </ul>
          </section>
        ))}

        <div className="bg-gradient-to-br from-sky-50 to-amber-50 border border-slate-200 rounded-2xl p-7 text-center mt-12">
          <p className="text-lg font-bold text-slate-900 mb-1">Ready for the whole adventure?</p>
          <p className="text-sm text-slate-600 mb-4">Paperback, Kindle (free on Kindle Unlimited) &amp; Audiobook.</p>
          <Link
            to="/"
            className="inline-block bg-[#FFD814] hover:bg-[#F7CA00] text-slate-900 font-bold px-6 py-3 rounded-lg border border-[#FCD200]"
          >
            Get the Book →
          </Link>
        </div>
      </article>
    </SiteLayout>
  );
}
