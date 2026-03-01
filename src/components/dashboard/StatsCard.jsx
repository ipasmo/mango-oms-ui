import { cn } from '@utils/helpers';
import { formatNumber, formatPercentage } from '@utils/formatters';
import Card from '@components/common/Card';

/**
 * StatsCard Component
 * Card displaying a statistic with icon, title, value, and change percentage
 * 
 * @param {string} title - Card title
 * @param {string|number} value - Main value to display
 * @param {number} change - Percentage change (positive or negative)
 * @param {string} changeLabel - Label for the change (e.g., "vs last month")
 * @param {string} icon - Icon component or name
 * @param {string} iconColor - Icon background color class
 * @param {string} trend - Trend direction ('up', 'down', 'neutral')
 */
const StatsCard = ({
  title,
  value,
  change,
  changeLabel = 'vs last month',
  icon,
  iconColor = 'bg-primary-600',
  trend,
  loading = false,
  className,
}) => {
  // Auto-detect trend from change if not provided
  const trendDirection = trend || (change > 0 ? 'up' : change < 0 ? 'down' : 'neutral');

  const trendConfig = {
    up: {
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      icon: (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      ),
    },
    down: {
      color: 'text-red-600',
      bgColor: 'bg-red-100',
      icon: (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      ),
    },
    neutral: {
      color: 'text-gray-600',
      bgColor: 'bg-gray-100',
      icon: (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
        </svg>
      ),
    },
  };

  const currentTrend = trendConfig[trendDirection];

  // Default icons based on common stat types
  const defaultIcons = {
    orders: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    ),
    revenue: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    customers: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    products: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
  };

  const displayIcon = typeof icon === 'string' ? defaultIcons[icon] : icon;

  if (loading) {
    return (
      <Card className={cn('animate-pulse', className)}>
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded w-24 mb-3" />
            <div className="h-8 bg-gray-200 rounded w-32" />
          </div>
          <div className="h-12 w-12 bg-gray-200 rounded-lg" />
        </div>
        <div className="h-4 bg-gray-200 rounded w-28 mt-4" />
      </Card>
    );
  }

  return (
    <Card className={className} role="article" aria-label={`${title}: ${value}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">
            {typeof value === 'number' ? formatNumber(value) : value}
          </p>
          
          {change !== undefined && (
            <div className="mt-4 flex items-center">
              <span
                className={cn(
                  'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-sm font-medium',
                  currentTrend.bgColor,
                  currentTrend.color
                )}
              >
                {currentTrend.icon}
                <span>{formatPercentage(Math.abs(change), 1)}</span>
              </span>
              <span className="ml-2 text-sm text-gray-600">{changeLabel}</span>
            </div>
          )}
        </div>

        {/* Icon */}
        <div
          className={cn(
            'flex h-12 w-12 items-center justify-center rounded-lg text-white',
            iconColor
          )}
          aria-hidden="true"
        >
          {displayIcon}
        </div>
      </div>
    </Card>
  );
};

export default StatsCard;
