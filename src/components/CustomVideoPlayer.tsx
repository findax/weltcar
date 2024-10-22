import { useState, useRef } from 'react';
import playImage  from '@/images/icons/video-play.svg'
import Image from 'next/image';

interface IProps {
  url: string;
  size?: string;
}

export const CustomVideoPlayer = ({ 
  url, 
  size
}: IProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handlePause = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="relative max-w-[1180px] w-full">
      <video
        ref={videoRef}
        className="rounded-[45px]"
        onClick={handlePause}
        onEnded={() => setIsPlaying(false)}
        
      >
        <source src={url} type="video/mp4" />
      </video>

      {!isPlaying && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-opacity-0 cursor-pointer"
          onClick={handlePlay}
        >
          <button className='focus:outline-none'>
            <Image
              src={playImage}
              alt='player image'
              className='h-[52px] w-[52px] md:h-[78px] md:w-[78px] lg:h-[104px] lg:w-[104px]'
            />
          </button>
        </div>
      )}
    </div>
  );
};
