import { formatDate, formatRelativeTime } from '@utils/formatters';
import { cn } from '@utils/helpers';

/**
 * OrderTimeline Component
 * Visual timeline showing order progress steps
 * 
 * @param {Array} steps - Timeline steps with status, date, description
 * @param {string} currentStatus - Current order status
 */
const OrderTimeline = ({ steps = [], currentStatus, className }) => {
  // Default steps if none provided
  const defaultSteps = [
    {
      status: 'pending',
      label: 'Order Placed',
      description: 'Your order has been received',
    },
    {
      status: 'confirmed',
      label: 'Order Confirmed',
      description: 'Your order has been confirmed',
    },
    {
      status: 'processing',
      label: 'Processing',
      description: 'We are preparing your order',
    },
    {
      status: 'shipped',
      label: 'Shipped',
      description: 'Your order is on the way',
    },
    {
      status: 'delivered',
      label: 'Delivered',
      description: 'Your order has been delivered',
    },
  ];

  const timelineSteps = steps.length > 0 ? steps : defaultSteps;

  // Status order for determining completion
  const statusOrder = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'];
  const currentIndex = statusOrder.indexOf(currentStatus);

  const getStepState = (stepStatus) => {
    const stepIndex = statusOrder.indexOf(stepStatus);
    
    if (currentStatus === 'cancelled') {
      return stepIndex === 0 ? 'completed' : 'cancelled';
    }
    
    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'current';
    return 'pending';
  };

  const getStepIcon = (state, stepStatus) => {
    if (state === 'cancelled' && stepStatus !== 'pending') {
      return (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      );
    }

    if (state === 'completed') {
      return (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      );
    }

    if (state === 'current') {
      return (
        <span className="h-2.5 w-2.5 rounded-full bg-white" />
      );
    }

    return (
      <span className="h-2.5 w-2.5 rounded-full bg-gray-300" />
    );
  };

  const getStepColor = (state) => {
    switch (state) {
      case 'completed':
        return 'bg-green-600 text-white border-green-600';
      case 'current':
        return 'bg-primary-600 text-white border-primary-600 ring-4 ring-primary-100';
      case 'cancelled':
        return 'bg-red-600 text-white border-red-600';
      default:
        return 'bg-white text-gray-400 border-gray-300';
    }
  };

  return (
    <div className={cn('py-6', className)} role="list" aria-label="Order timeline">
      <div className="space-y-8">
        {timelineSteps.map((step, index) => {
          const state = getStepState(step.status);
          const isLast = index === timelineSteps.length - 1;

          return (
            <div key={step.status} className="relative" role="listitem">
              {/* Connector Line */}
              {!isLast && (
                <div
                  className={cn(
                    'absolute left-5 top-10 -ml-px h-full w-0.5',
                    state === 'completed' || state === 'current'
                      ? 'bg-green-600'
                      : 'bg-gray-300'
                  )}
                  aria-hidden="true"
                />
              )}

              <div className="relative flex items-start space-x-4">
                {/* Step Icon */}
                <div className="flex-shrink-0">
                  <div
                    className={cn(
                      'flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors',
                      getStepColor(state)
                    )}
                    aria-label={`Step ${index + 1}: ${step.label}`}
                  >
                    {getStepIcon(state, step.status)}
                  </div>
                </div>

                {/* Step Content */}
                <div className="flex-1 min-w-0 pt-1">
                  <div>
                    <p
                      className={cn(
                        'text-base font-semibold',
                        state === 'completed' || state === 'current'
                          ? 'text-gray-900'
                          : 'text-gray-500'
                      )}
                    >
                      {step.label}
                    </p>
                    {step.description && (
                      <p
                        className={cn(
                          'mt-0.5 text-sm',
                          state === 'completed' || state === 'current'
                            ? 'text-gray-600'
                            : 'text-gray-400'
                        )}
                      >
                        {step.description}
                      </p>
                    )}
                  </div>

                  {/* Timestamp */}
                  {step.date && (
                    <div className="mt-2 text-sm text-gray-500">
                      <time dateTime={step.date}>
                        {formatRelativeTime(step.date)}
                      </time>
                      <span className="mx-2">•</span>
                      <span>{formatDate(step.date, 'datetime')}</span>
                    </div>
                  )}

                  {/* Additional Info */}
                  {step.note && (
                    <div className="mt-2 rounded-md bg-gray-50 p-3 text-sm text-gray-700">
                      {step.note}
                    </div>
                  )}

                  {/* Tracking Info */}
                  {step.trackingNumber && (
                    <div className="mt-2 flex items-center text-sm text-primary-600">
                      <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                      </svg>
                      Tracking: {step.trackingNumber}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderTimeline;
