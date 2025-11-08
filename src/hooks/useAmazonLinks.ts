import { useMemo } from 'react';

export const useAmazonLinks = () => {
  const { paperbackCode, kindleCode, audiobookCode } = useMemo(() => {
    const urlParams = new URLSearchParams(window.location.search);
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
    paperbackUrl: `https://amzn.to/${paperbackCode}`,
    kindleUrl: `https://amzn.to/${kindleCode}`,
    audiobookUrl: `https://amzn.to/${audiobookCode}`
  };
};