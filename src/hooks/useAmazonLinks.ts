import { useMemo } from 'react';
import { amazonUrl, DEFAULT_TAG } from '@/config/landing';

/**
 * Build the Amazon buy links for a given Associates tracking `tag`.
 *
 * Full `amazon.com/dp/<ASIN>?tag=` URLs (not `amzn.to` short links) so the tag
 * is set PER landing experience — that's what lets Amazon report sales per
 * variant / per targeted page. Callers pass the tag for their experience:
 *   - control components → VARIANT_TAGS.control
 *   - a permanent page   → that page's tag
 * Defaults to DEFAULT_TAG when omitted.
 */
export const useAmazonLinks = (tag: string = DEFAULT_TAG) => {
  return useMemo(() => {
    const amazon = {
      paperbackUrl: amazonUrl('paperback', tag),
      kindleUrl: amazonUrl('kindle', tag),
      audiobookUrl: amazonUrl('audiobook', tag),
    };
    return {
      tag,
      amazon,
      barnesAndNoble: {
        paperbackUrl:
          'https://www.barnesandnoble.com/w/and-then-we-hit-a-rock-greg-buenzli/1146629184?ean=9798218789398',
        audiobookUrl:
          'https://www.barnesandnoble.com/w/and-then-we-hit-a-rock-greg-buenzli/1148249612?ean=2940203322081',
      },
      // Legacy flat accessors (kept for backward compatibility).
      paperbackUrl: amazon.paperbackUrl,
      kindleUrl: amazon.kindleUrl,
      audiobookUrl: amazon.audiobookUrl,
    };
  }, [tag]);
};
