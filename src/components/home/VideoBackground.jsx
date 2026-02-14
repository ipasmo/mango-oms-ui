import React, { useState } from 'react';

const VideoBackground = ({ videoUrl, fallbackImage, children }) => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        onLoadedData={() => setVideoLoaded(true)}
        className="absolute inset-0 w-full h-full object-cover"
        poster={fallbackImage}
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40" />
      
      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default VideoBackground;