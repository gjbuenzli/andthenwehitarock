import { SiteLayout } from '@/components/SiteLayout';
import { HACKS } from '@/data/hacks';
import { trackAffiliateClick } from '@/lib/analytics';

export default function CruisingHacks() {
  return (
    <SiteLayout
      title="Cruising Hacks — gear & tips from And Then We Hit a Rock"
      description="Field-tested boating gadgets and tips that kept a family of five (plus a dog and a cat) sane on a sailboat — the gear that actually works."
    >
      {/* Hero */}
      <div className="bg-gradient-to-br from-sky-100 via-amber-50 to-blue-100 border-b border-slate-200">
        <div className="container mx-auto px-4 py-10 sm:py-14 max-w-3xl text-center">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 mb-3">Cruising Hacks</h1>
          <p className="text-slate-700 leading-relaxed max-w-2xl mx-auto">
            {HACKS.length} field-tested gadgets and tips that kept a family of five (plus a dog and a
            cat) sane on a sailboat — the stuff that actually works, proven in waterspouts, the
            Bahamas, and one very small galley.
          </p>
          <p className="text-xs text-slate-500 mt-4">
            As an Amazon Associate I earn from qualifying purchases.
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="container mx-auto px-4 py-10 max-w-5xl">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {HACKS.map((hack) => (
            <div
              key={hack.slug}
              className="flex flex-col rounded-2xl border border-slate-200 bg-white overflow-hidden transition hover:shadow-md"
            >
              <img
                src={hack.image}
                alt={hack.title}
                loading="lazy"
                className="w-full h-44 object-cover bg-slate-100"
              />
              <div className="flex flex-col flex-1 p-4">
                <h3 className="font-bold text-slate-900 mb-1.5">{hack.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed flex-1">{hack.blurb}</p>
                {hack.affiliateUrl ? (
                  <a
                    href={hack.affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    onPointerDown={() =>
                      trackAffiliateClick({ item: hack.slug, section: 'cruising-hacks' })
                    }
                    className="mt-4 inline-flex items-center justify-center gap-1.5 bg-[#FFD814] hover:bg-[#F7CA00] text-slate-900 font-bold text-sm px-4 py-2 rounded-lg border border-[#FCD200]"
                  >
                    🛒 Get it on Amazon →
                  </a>
                ) : (
                  <span className="mt-4 text-xs font-semibold text-slate-400">
                    Just a tip — no gadget required
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </SiteLayout>
  );
}
