import { useEffect, useState } from 'react';

export const useMediaQuery = (maxWidth: number) => {
  const [isMedia, setMedia] = useState(false);

  useEffect(() => {
    setMedia(window.innerWidth < maxWidth);
    const handleResize = () =>
      window.innerWidth < maxWidth ? setMedia(true) : setMedia(false);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMedia;
};
