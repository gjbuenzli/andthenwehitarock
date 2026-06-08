import { useMemo } from 'react';

export const useAmazonLinks = () => {
  const { paperbackCode, kindleCode, audiobookCode } = useMemo(() => {
    // `window` is undefined during the static prerender (Node) pass — fall back
    // to the default short codes there; the real query string is read on the
    // client at hydration, so ?pb=/?kn=/?ab= overrides still work for ads.
    const search = typeof window !== 'undefined' ? window.location.search : '';
    const urlParams = new URLSearchParams(search);
    const pb = urlParams.get('pb');
    const kn = urlParams.get('kn');
    const ab = urlParams.get('ab');

    return {
      paperbackCode: pb || '3U4m4uO',
      kindleCode: kn || '3IoEvb9',
      audiobookCode: ab || '4qOwiOZ'
    };
  }, []);

  return {
    amazon: {
      paperbackUrl: `https://amzn.to/${paperbackCode}`,
      kindleUrl: `https://amzn.to/${kindleCode}`,
      audiobookUrl: `https://amzn.to/${audiobookCode}`
    },
    barnesAndNoble: {
      paperbackUrl: 'https://www.barnesandnoble.com/w/and-then-we-hit-a-rock-greg-buenzli/1146629184?ean=9798218789398',
      audiobookUrl: 'https://www.barnesandnoble.com/w/and-then-we-hit-a-rock-greg-buenzli/1148249612?ean=2940203322081'
    },
    // Legacy support - keep old format for backward compatibility
    paperbackUrl: `https://amzn.to/${paperbackCode}`,
    kindleUrl: `https://amzn.to/${kindleCode}`,
    audiobookUrl: `https://amzn.to/${audiobookCode}`
  };
};