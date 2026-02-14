import { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import Card from '@components/common/Card';
import { cn } from '@utils/helpers';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

/**
 * OrderChart Component
 * Line chart showing orders over time using Chart.js
 * 
 * @param {Array} data - Chart data with labels and values
 * @param {string} title - Chart title
 * @param {string} period - Time period (day, week, month, year)
 * @param {boolean} loading - Loading state
 */
const OrderChart = ({
  data = [],
  title = 'Orders Over Time',
  period = 'week',
  loading = false,
  className,
}) => {
  const chartRef = useRef(null);

  // Default data if none provided
  const defaultData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Orders',
        data: [12, 19, 15, 25, 22, 30, 28],
      },
    ],
  };

  const chartData = data.labels ? data : defaultData;

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 15,
          font: {
            size: 12,
            family: "'Inter', sans-serif",
          },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleFont: {
          size: 13,
        },
        bodyFont: {
          size: 12,
        },
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        displayColors: true,
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            label += context.parsed.y + ' orders';
            return label;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 11,
          },
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          font: {
            size: 11,
          },
          precision: 0,
        },
      },
    },
  };

  const processedData = {
    labels: chartData.labels,
    datasets: chartData.datasets.map((dataset, index) => ({
      label: dataset.label,
      data: dataset.data,
      borderColor: index === 0 ? 'rgb(79, 70, 229)' : 'rgb(16, 185, 129)',
      backgroundColor: index === 0 ? 'rgba(79, 70, 229, 0.1)' : 'rgba(16, 185, 129, 0.1)',
      borderWidth: 2,
      fill: true,
      tension: 0.4,
      pointRadius: 4,
      pointHoverRadius: 6,
      pointBackgroundColor: index === 0 ? 'rgb(79, 70, 229)' : 'rgb(16, 185, 129)',
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: index === 0 ? 'rgb(79, 70, 229)' : 'rgb(16, 185, 129)',
      pointHoverBorderWidth: 2,
    })),
  };

  useEffect(() => {
    const chart = chartRef.current;
    return () => {
      if (chart) {
        chart.destroy();
      }
    };
  }, []);

  if (loading) {
    return (
      <Card className={cn('animate-pulse', className)}>
        <div className="h-6 bg-gray-200 rounded w-48 mb-4" />
        <div className="h-64 bg-gray-100 rounded" />
      </Card>
    );
  }

  return (
    <Card className={className}>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <span className="text-sm text-gray-600 capitalize">{period}</span>
      </div>
      <div className="h-64" role="img" aria-label={`${title} chart`}>
        <Line ref={chartRef} options={options} data={processedData} />
      </div>
    </Card>
  );
};

export default OrderChart;
