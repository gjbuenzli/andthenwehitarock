import { useMemo } from 'react';

export const useAmazonLinks = () => {
  const { paperbackCode, kindleCode } = useMemo(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const pb = urlParams.get('pb');
    const kn = urlParams.get('kn');
    
    return {
      paperbackCode: pb || '3U4m4uO',
      kindleCode: kn || '3IoEvb9'
    };
  }, []);

  return {
    paperbackUrl: `https://amzn.to/${paperbackCode}`,
    kindleUrl: `https://amzn.to/${kindleCode}`
  };
};