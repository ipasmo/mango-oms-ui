import { cn } from '@utils/helpers';
import Button from '@components/common/Button';

/**
 * Hero Component
 * Hero section with heading, subheading, CTA buttons, and background image
 * 
 * @param {string} title - Main heading text
 * @param {string} subtitle - Subheading text
 * @param {string} backgroundImage - Background image URL
 * @param {string} primaryCta - Primary CTA button text
 * @param {string} secondaryCta - Secondary CTA button text
 * @param {Function} onPrimaryClick - Primary button click handler
 * @param {Function} onSecondaryClick - Secondary button click handler
 * @param {string} height - Hero section height
 */
const Hero = ({
  title = 'Welcome to Mango OMS',
  subtitle = 'Fresh, delicious mangoes delivered to your doorstep',
  backgroundImage,
  primaryCta = 'Shop Now',
  secondaryCta = 'Learn More',
  onPrimaryClick,
  onSecondaryClick,
  height = 'min-h-[600px]',
  overlay = true,
  className,
}) => {
  const hasBackground = !!backgroundImage;

  return (
    <section
      className={cn(
        'relative flex items-center justify-center overflow-hidden',
        height,
        className
      )}
      aria-labelledby="hero-title"
    >
      {/* Background Image */}
      {hasBackground && (
        <div className="absolute inset-0 z-0">
          <img
            src={backgroundImage}
            alt=""
            className="h-full w-full object-cover"
            loading="eager"
          />
          {overlay && (
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40" />
          )}
        </div>
      )}

      {/* Gradient Background (if no image) */}
      {!hasBackground && (
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary-600 via-primary-500 to-primary-700" />
      )}

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-6">
          {/* Title */}
          <h1
            id="hero-title"
            className={cn(
              'text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl',
              hasBackground || !overlay ? 'text-white' : 'text-white',
              'animate-fade-in'
            )}
          >
            <span className="block">{title}</span>
          </h1>

          {/* Subtitle */}
          {subtitle && (
            <p
              className={cn(
                'mx-auto max-w-2xl text-lg sm:text-xl md:text-2xl',
                hasBackground || !overlay ? 'text-gray-100' : 'text-white/90',
                'animate-fade-in-delay'
              )}
            >
              {subtitle}
            </p>
          )}

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 animate-fade-in-delay-2">
            {primaryCta && (
              <Button
                variant="primary"
                size="lg"
                onClick={onPrimaryClick}
                className="min-w-[200px] bg-primary-600 hover:bg-primary-700 text-white shadow-xl"
              >
                {primaryCta}
              </Button>
            )}
            {secondaryCta && (
              <Button
                variant="outline"
                size="lg"
                onClick={onSecondaryClick}
                className="min-w-[200px] border-white text-white hover:bg-white/10"
              >
                {secondaryCta}
              </Button>
            )}
          </div>

          {/* Optional Features/Benefits */}
          <div className="pt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 mx-auto max-w-3xl">
            <div className="flex flex-col items-center text-white">
              <svg className="h-12 w-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <p className="font-semibold">Premium Quality</p>
              <p className="text-sm text-gray-200">Handpicked mangoes</p>
            </div>
            <div className="flex flex-col items-center text-white">
              <svg className="h-12 w-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <p className="font-semibold">Fast Delivery</p>
              <p className="text-sm text-gray-200">Same day shipping</p>
            </div>
            <div className="flex flex-col items-center text-white">
              <svg className="h-12 w-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="font-semibold">Best Prices</p>
              <p className="text-sm text-gray-200">Value for money</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg
          className="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
