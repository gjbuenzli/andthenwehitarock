import type { useAmazonLinks } from '@/hooks/useAmazonLinks';
import type { OfferKind } from '@/lib/track';

type Links = ReturnType<typeof useAmazonLinks>;

export interface BuyOption {
  id: string;
  /** Button / link text. */
  label: string;
  retailer: string; // 'Amazon' | 'Barnes & Noble'
  format: string;   // 'Kindle' | 'Paperback' | 'Audible' | 'Audiobook'
  offer?: OfferKind;
  /** Resolves the destination URL from the (override-aware) links hook. */
  href: (l: Links) => string;
}

/**
 * Single source of truth for the buy hierarchy. Both the hero and the bottom
 * CTA render from this, so the primary offer can be swapped (or A/B-tested) in
 * one place instead of across ~11 hardcoded buttons.
 *
 * The primary is the lowest-friction "yes" for cold ad traffic: read FREE in
 * Kindle Unlimited (KU page-reads still pay royalties). Everything else is
 * demoted so a first-time visitor faces one obvious action, not a wall of
 * format × retailer choices.
 */
export const PRIMARY_CTA: BuyOption & { ctaLine1: string; ctaLine2: string; subLabel: string } = {
  id: 'kindle-ku',
  label: 'Read FREE with Kindle Unlimited',
  // Rendered as a tidy two-line button (big top line, small sub-line) — Amazon-style.
  ctaLine1: 'Read FREE',
  ctaLine2: 'in Kindle Unlimited',
  subLabel: 'Free for Kindle Unlimited members — not a member? Start a free trial.',
  retailer: 'Amazon',
  format: 'Kindle',
  offer: 'ku_free',
  href: (l) => l.amazon.kindleUrl,
};

export const SECONDARY: BuyOption[] = [
  { id: 'paperback-amazon', label: 'Paperback', retailer: 'Amazon', format: 'Paperback', href: (l) => l.amazon.paperbackUrl },
  { id: 'audible', label: 'Audiobook', retailer: 'Amazon', format: 'Audible', href: (l) => l.amazon.audiobookUrl },
];

export const MORE: BuyOption[] = [
  { id: 'kindle-buy', label: 'Buy the Kindle edition', retailer: 'Amazon', format: 'Kindle', href: (l) => l.amazon.kindleUrl },
  { id: 'paperback-bn', label: 'Paperback at Barnes & Noble', retailer: 'Barnes & Noble', format: 'Paperback', href: (l) => l.barnesAndNoble.paperbackUrl },
  { id: 'audiobook-bn', label: 'Audiobook at Barnes & Noble', retailer: 'Barnes & Noble', format: 'Audiobook', href: (l) => l.barnesAndNoble.audiobookUrl },
];
