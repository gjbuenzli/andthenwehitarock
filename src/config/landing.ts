// Landing experiences + Amazon tracking-tag registry (single source of truth).
//
// An A/B VARIANT and a permanent TARGETED PAGE are the same idea — a "landing
// experience" defined by { layout, format focus, Associates tag, copy }. The
// home page runs a weighted A/B across experiences; permanent pages pin one
// experience at its own URL so ads can target an audience and land on the
// matching page. Each experience carries its OWN Amazon tracking tag, so Amazon
// reports clicks → orders → earnings per experience (that's how we tell KU-page
// clicks from paperback-page SALES apart — the whole point of this system).
//
// ⚠️ TAG MAP — decode the cryptic Amazon tracking-id names here. All belong to
// the same Associates account; each is a separate reporting bucket.
//   atwhar-20      → default / fallback
//   atwhar00-20    → home A/B: control (full landing page)
//   atwhar01-20    → home A/B: minimal_listing (minimal → paperback listing)
//   atwhar03-20    → home A/B: minimal_ku (minimal → Kindle Unlimited)
//   paperback067-20→ permanent /paperback audience page
//   kindle077d-20  → permanent /kindle audience page
//   atwhar05-20    → permanent /audiobook audience page
//   atwhar08/0a/0c/0ec-20 → spare pool for future experiences
// (Old amzn.to short links carried twigafloat-20; the site no longer uses it,
//  its history stays in Amazon.)

export const ASINS = {
  paperback: 'B0DP7SNN9B',
  kindle: 'B0DHR9FKV9',
  audiobook: 'B0FQXXNMTZ',
} as const;

export type BookFormat = keyof typeof ASINS;

export const DEFAULT_TAG = 'atwhar-20';

/**
 * Build a tagged full Amazon product URL. Full /dp?tag= URLs (not amzn.to short
 * links) so we control the Associates tag PER experience. `subtag` is an
 * optional free-form sub-id that appears in Amazon's Orders report (ascsubtag)
 * for extra granularity within a tag.
 */
export function amazonUrl(format: BookFormat, tag: string, subtag?: string): string {
  const base = `https://www.amazon.com/dp/${ASINS[format]}?tag=${encodeURIComponent(tag)}`;
  return subtag ? `${base}&ascsubtag=${encodeURIComponent(subtag)}` : base;
}

// ---- Home A/B variant → tag ------------------------------------------------

export const VARIANT_TAGS: Record<string, string> = {
  control: 'atwhar00-20',
  minimal_listing: 'atwhar01-20',
  minimal_ku: 'atwhar03-20',
};

/** Tag for an A/B variant id, falling back to the default tag. */
export function tagForVariant(variantId: string): string {
  return VARIANT_TAGS[variantId] ?? DEFAULT_TAG;
}

// ---- Permanent, ad-addressable landing pages -------------------------------

export interface LandingPage {
  /** URL slug → route `/<slug>` (prerendered). */
  slug: string;
  /** Human name (dashboard / internal). */
  name: string;
  /** Which format the page is built around + its Learn More target. */
  format: BookFormat;
  /** Associates tracking tag for this page. */
  tag: string;
  /** Big hook under the cover. */
  hook: string;
  /** CTA button label. */
  cta: string;
  /** Body paragraphs (the pitch). */
  description: string[];
}

const CORE_DESCRIPTION: string[] = [
  "Did you know that the remora fish will try to swim up a whale shark's butt when they poop? The crew of Twig didn't. It turns out there was an awful lot the family of five didn't know when they decided to move aboard and set off for adventure on the high seas.",
  'After decades of dreaming the explorers finally sailed off into the sunset. Yes, they found the palm trees and coconuts they had longed for, but they also glimpsed the other side of paradise. They ran from waterspouts, dodged hurricanes, got (sort of) robbed by pirates, and played chicken with naval warships.',
  "Remember: if everything had gone exactly as planned… it wouldn't have been much of an adventure.",
];

/**
 * Permanent audience-targeted pages. Point a Kindle-audience ad at /kindle, an
 * audiobook-audience ad at /audiobook, etc. Each has its own tag so its sales
 * are tracked separately, and each fires the FB InitiateCheckout pixel so the
 * ad can still optimize toward an on-page conversion.
 */
export const LANDING_PAGES: LandingPage[] = [
  {
    slug: 'kindle',
    name: 'Kindle / Kindle Unlimited',
    format: 'kindle',
    tag: 'kindle077d-20',
    hook: 'A family of five, a dog, and a cat move onto a sailboat. A hilarious true story — free in Kindle Unlimited.',
    cta: 'Read FREE in Kindle Unlimited',
    description: CORE_DESCRIPTION,
  },
  {
    slug: 'paperback',
    name: 'Paperback',
    format: 'paperback',
    tag: 'paperback067-20',
    hook: 'A family of five, a dog, and a cat move onto a sailboat. A hilarious true story — in paperback.',
    cta: 'Get the Paperback',
    description: CORE_DESCRIPTION,
  },
  {
    slug: 'audiobook',
    name: 'Audiobook',
    format: 'audiobook',
    tag: 'atwhar05-20',
    hook: 'A family of five, a dog, and a cat move onto a sailboat. A hilarious true story — now on audio.',
    cta: 'Listen on Audible',
    description: CORE_DESCRIPTION,
  },
];
