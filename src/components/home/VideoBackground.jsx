import { useEffect, useRef, useState } from 'react';
import { cn } from '@utils/helpers';

/**
 * VideoBackground Component
 * Full-screen background video component with fallback image and controls
 * 
 * @param {string} videoUrl - Video URL (MP4 format)
 * @param {string} fallbackImage - Fallback image URL if video fails to load
 * @param {string} posterImage - Poster image shown before video loads
 * @param {boolean} autoplay - Auto-play video
 * @param {boolean} loop - Loop video
 * @param {boolean} muted - Mute video
 * @param {boolean} controls - Show video controls
 * @param {ReactNode} children - Content to overlay on video
 * @param {string} overlay - Overlay color/gradient
 */
const VideoBackground = ({
  videoUrl = 'https://videos.pexels.com/video-files/3044127/3044127-hd_1920_1080_30fps.mp4',
  fallbackImage = '/hero-bg.jpg',
  posterImage,
  autoplay = true,
  loop = true,
  muted = true,
  controls = false,
  children,
  overlay = 'bg-black/40',
  className,
}) => {
  const videoRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(muted);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => {
      setIsLoaded(true);
    };

    const handleError = () => {
      setHasError(true);
      console.error('Video failed to load');
    };

    const handlePlay = () => {
      setIsPlaying(true);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('error', handleError);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('error', handleError);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, []);

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  return (
    <div
      className={cn('relative h-screen w-full overflow-hidden', className)}
      role="region"
      aria-label="Video background"
    >
      {/* Video Element */}
      {!hasError && (
        <video
          ref={videoRef}
          className={cn(
            'absolute inset-0 h-full w-full object-cover transition-opacity duration-500',
            isLoaded ? 'opacity-100' : 'opacity-0'
          )}
          autoPlay={autoplay}
          loop={loop}
          muted={muted}
          playsInline
          poster={posterImage}
          aria-hidden="true"
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      {/* Fallback Image */}
      {(hasError || !videoUrl) && fallbackImage && (
        <img
          src={fallbackImage}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
        />
      )}

      {/* Loading Placeholder */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 animate-pulse bg-gray-900" />
      )}

      {/* Overlay */}
      <div className={cn('absolute inset-0', overlay)} aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 h-full">
        {children}
      </div>

      {/* Custom Play/Pause Button */}
      {!controls && isLoaded && !hasError && (
        <button
          onClick={togglePlayPause}
          className={cn(
            'absolute bottom-8 right-8 z-20',
            'flex h-12 w-12 items-center justify-center',
            'rounded-full bg-white/20 backdrop-blur-sm',
            'text-white transition-all hover:bg-white/30',
            'focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent'
          )}
          aria-label={isPlaying ? 'Pause video' : 'Play video'}
        >
          {isPlaying ? (
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          ) : (
            <svg className="h-6 w-6 ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
      )}

      {/* Mute/Unmute Button */}
      {isLoaded && !hasError && (
        <button
          onClick={toggleMute}
          className={cn(
            'absolute bottom-8 right-24 z-20',
            'flex h-12 w-12 items-center justify-center',
            'rounded-full bg-white/20 backdrop-blur-sm',
            'text-white transition-all hover:bg-white/30',
            'focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent'
          )}
          aria-label={isMuted ? "Unmute video" : "Mute video"}
        >
          {isMuted ? (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
              />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
              />
            </svg>
          )}
        </button>
      )}

      {/* Video Controls (if enabled) */}
      {controls && (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          controls
          autoPlay={autoplay}
          loop={loop}
          muted={muted}
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
      )}
    </div>
  );
};

export default VideoBackground;
