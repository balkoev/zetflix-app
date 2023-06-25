import { useEffect, useState } from 'react';

const useIsIFrameLoaded = (iframeRef) => {
  const [isIFrameLoaded, setIsIFrameLoaded] = useState(false);
  const iframeCurrent = iframeRef.current;

  useEffect(() => {
    if (iframeCurrent) {
      setIsIFrameLoaded(true);
      const script = document.createElement('script');
      script.src = 'https://yohoho.cc/yo.js';
      document.body.appendChild(script);
    }
  }, [iframeCurrent]);

  return isIFrameLoaded;
};

export default useIsIFrameLoaded;
