import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { SiteLayout } from '@/components/SiteLayout';
import { HACKS } from '@/data/hacks';
import { trackAffiliateClick, trackContent } from '@/lib/analytics';

export default function CruisingHackDetail() {
  const { slug } = useParams<{ slug: string }>();
  const hack = HACKS.find((h) => h.slug === slug);

  useEffect(() => {
    if (hack) trackContent('hack_view', { slug: hack.slug });
  }, [hack]);

  // Unknown slug — keep it friendly and route people back to the index.
  if (!hack) {
    return (
      <SiteLayout
        title="Hack not found — And Then We Hit a Rock"
        description="That cruising hack moved. Browse all the field-tested boating gear and tips."
      >
        <div className="container mx-auto px-4 py-20 max-w-xl text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-3">We couldn&apos;t find that hack</h1>
          <p className="text-slate-600 mb-6">It may have sailed off. Here are all of them:</p>
          <Link
            to="/cruising-hacks"
            className="inline-block bg-[#FFD814] hover:bg-[#F7CA00] text-slate-900 font-bold px-6 py-3 rounded-lg border border-[#FCD200]"
          >
            ← All Cruising Hacks
          </Link>
        </div>
      </SiteLayout>
    );
  }

  // A few siblings for cross-navigation (wrap around the list).
  const idx = HACKS.findIndex((h) => h.slug === hack.slug);
  const related = [HACKS[(idx + 1) % HACKS.length], HACKS[(idx + 2) % HACKS.length], HACKS[(idx + 3) % HACKS.length]];

  return (
    <SiteLayout
      title={`${hack.title} — Cruising Hacks — And Then We Hit a Rock`}
      description={hack.blurb.slice(0, 155)}
    >
      <div className="container mx-auto px-4 py-8 sm:py-12 max-w-3xl">
        <Link
          to="/cruising-hacks"
          className="inline-flex items-center gap-1 text-sm text-blue-700 hover:text-blue-900 mb-6"
        >
          ← All Cruising Hacks
        </Link>

        <article>
          <img
            src={hack.image}
            alt={hack.title}
            className="w-full max-h-[28rem] object-cover rounded-2xl border border-slate-200 bg-slate-100 mb-6"
          />
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">{hack.title}</h1>
          <p className="text-lg text-slate-700 leading-relaxed whitespace-pre-line">{hack.blurb}</p>

          {hack.affiliateUrl ? (
            <div className="mt-8">
              <a
                href={hack.affiliateUrl}
                target="_blank"
                rel="noopener noreferrer sponsored"
                onPointerDown={() =>
                  trackAffiliateClick({ item: hack.slug, section: 'cruising-hacks-detail' })
                }
                className="inline-flex items-center justify-center gap-1.5 bg-[#FFD814] hover:bg-[#F7CA00] text-slate-900 font-bold text-base px-6 py-3 rounded-lg border border-[#FCD200]"
              >
                🛒 Get it on Amazon →
              </a>
              <p className="text-xs text-slate-500 mt-3">
                As an Amazon Associate I earn from qualifying purchases.
              </p>
            </div>
          ) : (
            <p className="mt-8 text-sm font-semibold text-slate-400">
              Just a tip — no gadget required.
            </p>
          )}
        </article>

        {/* More hacks */}
        <div className="mt-14 pt-10 border-t border-slate-200">
          <h2 className="text-lg font-bold text-slate-900 mb-4">More cruising hacks</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {related.map((r) => (
              <Link
                key={r.slug}
                to={`/cruising-hacks/${r.slug}`}
                className="flex flex-col rounded-xl border border-slate-200 bg-white overflow-hidden transition hover:shadow-md hover:border-blue-300"
              >
                <img
                  src={r.image}
                  alt={r.title}
                  loading="lazy"
                  className="w-full h-28 object-cover bg-slate-100"
                />
                <span className="font-semibold text-slate-900 text-sm p-3">{r.title}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Cross-sell to the book */}
        <div className="bg-gradient-to-br from-sky-100 to-amber-100 border border-slate-200 rounded-2xl p-7 text-center mt-12">
          <p className="text-lg font-bold text-slate-900 mb-1">Where these hacks were born</p>
          <p className="text-sm text-slate-600 mb-4">
            The full true story of a family of five who moved onto a sailboat — paperback, Kindle &amp;
            Audiobook.
          </p>
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
