import { useState, useRef, useEffect } from 'react';
import playImage  from '@/images/icons/video-play.svg'
import Image from 'next/image';
import { SpeakerXMarkIcon } from '@heroicons/react/24/outline';
import { ArrowsPointingInIcon } from '@heroicons/react/24/outline';

interface IProps {
  url: string;
  onClose: () => void;
}

export const CustomVideoPlayer = ({ 
  url,
  onClose
}: IProps) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
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

  const handleTogglePlay = () => {
    if (!videoRef.current) return;
    
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };
  
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
  
    const handleTimeUpdate = () => {
      const current = video.currentTime;
      const duration = video.duration;
      const percentage = (current / duration) * 100;
      setProgress(percentage);
    };
  
    video.addEventListener('timeupdate', handleTimeUpdate);
  
    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);

  return (
    <div className="relative sm:h-auto sm:max-w-[1180px]">
      <video
        ref={videoRef}
        autoPlay
        muted
        className="rounded-[45px] w-full h-full"
          
        onClick={handlePause}
        onEnded={() => setIsPlaying(false)}
        preload="metadata"
      >
        <source src={url} type="video/mp4" />
      </video>

      <div className='flex w-full px-8 z-10 gap-4 md:gap-6 items-center absolute bottom-5 left-0'>
        <div
          className="hidden md:block bg-opacity-0 cursor-pointer"
          onClick={handleTogglePlay}
        >
          <Image
            src={playImage}
            alt="player image"
            className="h-[30px] w-[30px] md:h-[48px] md:w-[48px]"
          />
        </div>
        <div className='w-full h-[30px]'>
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            className="w-full h-[2px] focus:outline-none appearance-none rounded-full"
            style={{
              background: `linear-gradient(to right, #e6e766 ${progress}%, #ffffff ${progress}%)`,
            }}
            onChange={(e) => {
              const newTime = (Number(e.target.value) / 100) * (videoRef.current?.duration || 0);
              if (videoRef.current) {
                videoRef.current.currentTime = newTime;
              }
              setProgress(Number(e.target.value));
            }}
          />
            <style jsx>{`
              input[type='range']::-webkit-slider-thumb {
                -webkit-appearance: none;
                height: 16px;
                width: 16px;
                border-radius: 9999px;
                background-color: #DFE172;
                cursor: pointer;
                border: 2px solid #DFE172;
              }

              input[type='range']::-moz-range-thumb {
                height: 16px;
                width: 16px;
                border-radius: 9999px;
                background-color: #DFE172;
                cursor: pointer;
                border: 2px solid white;
              }
            `}</style>
        </div>

        <div className="bg-opacity-0 flex items-center cursor-pointer">
          <SpeakerXMarkIcon className="text-white h-[25px] w-[25px] md:h-[30px] md:w-[30px]" />
        </div>

        <div 
          className="hidden md:block bg-opacity-0 cursor-pointer"
          onClick={onClose}
        >
          <ArrowsPointingInIcon className="text-white h-[25px] w-[25px] md:h-[30px] md:w-[30px]" />
        </div>
      </div>

      <div 
        className="md:hidden absolute top-4 right-8 md:bottom-8 md:right-10 z-10 bg-opacity-0 cursor-pointer"
        onClick={onClose}
      >
        <ArrowsPointingInIcon className="text-white h-[25px] w-[25px] md:h-[30px] md:w-[30px]" />
      </div>

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
