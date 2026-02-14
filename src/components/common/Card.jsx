import React from 'react';
import clsx from 'clsx';

const Card = ({
  children,
  hover = false,
  padding = 'default',
  className,
  onClick,
  ...props
}) => {
  const paddingStyles = {
    none: '',
    sm: 'p-4',
    default: 'p-6',
    lg: 'p-8',
  };
  
  return (
    <div
      className={clsx(
        'bg-white rounded-xl shadow-card transition-all duration-300',
        paddingStyles[padding],
        hover && 'hover:shadow-lg hover:-translate-y-1 cursor-pointer',
        className
      )}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick(e) : undefined}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;