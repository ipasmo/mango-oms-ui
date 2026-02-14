import { cn } from '@utils/helpers';

/**
 * Spinner Component
 * Loading spinner with different sizes and colors
 */
const Spinner = ({
  size = 'md',
  color = 'primary',
  fullScreen = false,
  text = '',
  className,
}) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const colors = {
    primary: 'border-primary-600',
    secondary: 'border-gray-600',
    white: 'border-white',
  };

  const spinner = (
    <div className="flex flex-col items-center justify-center">
      <div
        className={cn(
          'animate-spin rounded-full border-4 border-gray-200',
          sizes[size],
          colors[color],
          'border-t-transparent',
          className
        )}
        role="status"
        aria-label="Loading"
      />
      {text && <p className="mt-2 text-sm text-gray-600">{text}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-90">
        {spinner}
      </div>
    );
  }

  return spinner;
};

export default Spinner;
