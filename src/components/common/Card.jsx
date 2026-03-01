import { cn } from '@utils/helpers';

/**
 * Card Component
 * Reusable card container with optional header and footer
 */
const Card = ({
  children,
  title,
  subtitle,
  footer,
  bordered = false,
  hoverable = false,
  className,
  ...props
}) => {
  const hoverClass = hoverable ? 'hover:shadow-xl cursor-pointer' : '';
  const borderClass = bordered ? 'card-bordered' : '';
  
  return (
    <div
      className={cn('card', hoverClass, borderClass, className)}
      {...props}
    >
      {(title || subtitle) && (
        <div className="mb-4">
          {title && (
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          )}
          {subtitle && (
            <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
          )}
        </div>
      )}
      
      <div className="card-body">{children}</div>
      
      {footer && (
        <div className="mt-4 pt-4 border-t border-gray-200">{footer}</div>
      )}
    </div>
  );
};

export default Card;
