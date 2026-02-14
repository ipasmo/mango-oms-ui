import React from 'react';
import { format } from 'date-fns';
import {
  IoCheckmarkCircle,
  IoEllipseOutline,
  IoTimeOutline,
} from 'react-icons/io5';
import clsx from 'clsx';

const OrderTimeline = ({ order }) => {
  const timeline = [
    {
      status: 'pending',
      label: 'Order Placed',
      date: order.createdAt,
      completed: true,
    },
    {
      status: 'processing',
      label: 'Processing',
      date: order.processingDate,
      completed: ['processing', 'shipped', 'delivered'].includes(order.status),
    },
    {
      status: 'shipped',
      label: 'Shipped',
      date: order.shippedDate,
      completed: ['shipped', 'delivered'].includes(order.status),
    },
    {
      status: 'delivered',
      label: 'Delivered',
      date: order.deliveredDate,
      completed: order.status === 'delivered',
    },
  ];
  
  return (
    <div className="relative">
      {timeline.map((item, index) => (
        <div key={item.status} className="flex gap-4 pb-8 last:pb-0">
          {/* Icon */}
          <div className="flex flex-col items-center">
            <div
              className={clsx(
                'w-10 h-10 rounded-full flex items-center justify-center z-10',
                item.completed
                  ? 'bg-green-100 text-green-600'
                  : 'bg-gray-100 text-gray-400'
              )}
            >
              {item.completed ? (
                <IoCheckmarkCircle className="w-6 h-6" />
              ) : (
                <IoEllipseOutline className="w-6 h-6" />
              )}
            </div>
            {index < timeline.length - 1 && (
              <div
                className={clsx(
                  'w-0.5 h-full min-h-[3rem]',
                  item.completed ? 'bg-green-600' : 'bg-gray-200'
                )}
              />
            )}
          </div>
          
          {/* Content */}
          <div className="flex-1 pt-1">
            <h4
              className={clsx(
                'text-lg font-semibold mb-1',
                item.completed ? 'text-gray-900' : 'text-gray-400'
              )}
            >
              {item.label}
            </h4>
            {item.date && (
              <p className="text-sm text-gray-600 flex items-center gap-1">
                <IoTimeOutline className="w-4 h-4" />
                {format(new Date(item.date), 'MMM dd, yyyy - hh:mm a')}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderTimeline;