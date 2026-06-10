import type { useAmazonLinks } from '@/hooks/useAmazonLinks';
import type { OfferKind } from '@/lib/track';

type Links = ReturnType<typeof useAmazonLinks>;

export type Brand = 'amazon' | 'audible' | 'bn';

export interface Retailer {
  id: string;
  name: string;
  brand: Brand;
  offer?: OfferKind;
  /** Amazon hrefs all resolve to amzn.to links that carry the Associates tag. */
  href: (l: Links) => string;
}

export interface Format {
  id: string;
  label: string;
  /** Tracking format string sent on PurchaseClick. */
  format: string;
  /** Tiny corner pill, e.g. "FREE" on Kindle (Kindle Unlimited). */
  badge?: string;
  /** One retailer → opens directly; multiple → opens a retailer chooser. */
  retailers: Retailer[];
}

/**
 * Three equal formats. Paperback and audiobook are sold at multiple stores, so
 * those buttons show each retailer's mark and open a chooser; Kindle is
 * Amazon-only. Every Amazon link goes through useAmazonLinks (amzn.to +
 * Associates tag twigafloat-20).
 */
export const FORMATS: Format[] = [
  {
    id: 'paperback',
    label: 'Paperback',
    format: 'Paperback',
    retailers: [
      { id: 'amazon', name: 'Amazon', brand: 'amazon', href: (l) => l.amazon.paperbackUrl },
      { id: 'bn', name: 'Barnes & Noble', brand: 'bn', href: (l) => l.barnesAndNoble.paperbackUrl },
    ],
  },
  {
    id: 'kindle',
    label: 'Kindle',
    format: 'Kindle',
    badge: 'FREE',
    retailers: [
      { id: 'amazon', name: 'Amazon Kindle', brand: 'amazon', offer: 'ku_free', href: (l) => l.amazon.kindleUrl },
    ],
  },
  {
    id: 'audiobook',
    label: 'Audiobook',
    format: 'Audiobook',
    retailers: [
      { id: 'audible', name: 'Audible', brand: 'audible', href: (l) => l.amazon.audiobookUrl },
      { id: 'bn', name: 'Barnes & Noble', brand: 'bn', href: (l) => l.barnesAndNoble.audiobookUrl },
    ],
  },
];
