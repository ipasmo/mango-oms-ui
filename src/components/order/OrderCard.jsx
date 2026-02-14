import React from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { IoChevronForwardOutline } from 'react-icons/io5';
import OrderStatusBadge from './OrderStatusBadge';
import Card from '@components/common/Card';
import { formatCurrency } from '@utils/formatters';

const OrderCard = ({ order }) => {
  const navigate = useNavigate();
  
  return (
    <Card
      hover
      onClick={() => navigate(`/orders/${order.id}`)}
      className="cursor-pointer"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm text-gray-600 mb-1">Order ID</p>
          <p className="text-lg font-semibold text-gray-900">#{order.id}</p>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-600 mb-1">Date</p>
          <p className="font-medium text-gray-900">
            {format(new Date(order.createdAt), 'MMM dd, yyyy')}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-600 mb-1">Total</p>
          <p className="font-semibold text-primary-600 text-lg">
            {formatCurrency(order.total)}
          </p>
        </div>
      </div>
      
      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-2">Items ({order.items?.length})</p>
        <div className="flex -space-x-2">
          {order.items?.slice(0, 4).map((item, index) => (
            <img
              key={index}
              src={item.product.image}
              alt={item.product.name}
              className="w-10 h-10 rounded-full border-2 border-white object-cover"
            />
          ))}
          {order.items?.length > 4 && (
            <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-sm font-medium text-gray-600">
              +{order.items.length - 4}
            </div>
          )}
        </div>
      </div>
      
      <div className="flex items-center justify-between pt-4 border-t">
        <span className="text-sm text-gray-600">
          Delivery to: {order.shippingAddress?.city}
        </span>
        <IoChevronForwardOutline className="w-5 h-5 text-gray-400" />
      </div>
    </Card>
  );
};

export default OrderCard;