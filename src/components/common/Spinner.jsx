import React from 'react';
import clsx from 'clsx';

const Spinner = ({ size = 'md', fullScreen = false, text }) => {
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };
  
  const spinner = (
    <div className="flex flex-col items-center justify-center gap-4">
      <div
        className={clsx(
          'border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin',
          sizes[size]
        )}
        role="status"
        aria-label="Loading"
      />
      {text && <p className="text-gray-600 font-medium">{text}</p>}
    </div>
  );
  
  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-90 z-50">
        {spinner}
      </div>
    );
  }
  
  return spinner;
};

export default Spinner;