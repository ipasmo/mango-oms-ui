import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@components/common/Button';
import VideoBackground from './VideoBackground';

const Hero = () => {
  const navigate = useNavigate();
  
  // Free stock video URLs from Pexels
  const videoUrl = 'https://videos.pexels.com/video-files/3049373/3049373-uhd_2560_1440_25fps.mp4';
  const fallbackImage = 'https://images.pexels.com/photos/2294471/pexels-photo-2294471.jpeg';
  
  return (
    <VideoBackground videoUrl={videoUrl} fallbackImage={fallbackImage}>
      <div className="text-center px-4 max-w-4xl mx-auto animate-fade-in">
        <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 drop-shadow-lg">
          Premium Mangoes
          <span className="block text-primary-400">Delivered Fresh</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-100 mb-8 max-w-2xl mx-auto">
          Experience the sweetest mangoes from our farm to your doorstep.
          Available in 3kg, 5kg, and 10kg carton lots.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            onClick={() => navigate('/products')}
            className="text-lg"
          >
            Shop Now
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => navigate('/about')}
            className="text-lg bg-white bg-opacity-20 backdrop-blur-sm border-white text-white hover:bg-opacity-30"
          >
            Learn More
          </Button>
        </div>
      </div>
    </VideoBackground>
  );
};

export default Hero;