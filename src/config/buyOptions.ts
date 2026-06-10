import type { useAmazonLinks } from '@/hooks/useAmazonLinks';
import type { OfferKind } from '@/lib/track';

type Links = ReturnType<typeof useAmazonLinks>;

export interface BuyOption {
  id: string;
  label: string;
  /** Small supporting note shown under the label (full variant only). */
  perk?: string;
  /** Tiny corner pill, e.g. "FREE" on the Kindle Unlimited option. */
  badge?: string;
  retailer: string; // 'Amazon' | 'Barnes & Noble'
  format: string;   // 'Paperback' | 'Kindle' | 'Audible' | 'Audiobook'
  offer?: OfferKind;
  href: (l: Links) => string;
}

/**
 * The three formats, surfaced EQUALLY. Paperback is the majority of sales so it
 * is never demoted, audiobook is always visible, and Kindle simply notes the
 * Kindle-Unlimited "read free" perk rather than dominating the whole CTA.
 * Default retailer = Amazon; Barnes & Noble lives under "Other stores".
 */
export const FORMATS: BuyOption[] = [
  { id: 'paperback', label: 'Paperback', perk: 'Physical book', retailer: 'Amazon', format: 'Paperback', href: (l) => l.amazon.paperbackUrl },
  { id: 'kindle', label: 'Kindle', perk: 'Kindle Unlimited', badge: 'FREE', retailer: 'Amazon', format: 'Kindle', offer: 'ku_free', href: (l) => l.amazon.kindleUrl },
  { id: 'audiobook', label: 'Audiobook', perk: 'On Audible', retailer: 'Amazon', format: 'Audible', href: (l) => l.amazon.audiobookUrl },
];

export const OTHER_STORES: BuyOption[] = [
  { id: 'paperback-bn', label: 'Paperback at Barnes & Noble', retailer: 'Barnes & Noble', format: 'Paperback', href: (l) => l.barnesAndNoble.paperbackUrl },
  { id: 'audiobook-bn', label: 'Audiobook at Barnes & Noble', retailer: 'Barnes & Noble', format: 'Audiobook', href: (l) => l.barnesAndNoble.audiobookUrl },
];
