import { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import Card from '@components/common/Card';
import { cn } from '@utils/helpers';
import { formatCurrency } from '@utils/formatters';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

/**
 * SpendingChart Component
 * Doughnut/Pie chart showing spending by category using Chart.js
 * 
 * @param {Array} data - Chart data with labels and values
 * @param {string} title - Chart title
 * @param {string} currency - Currency code
 * @param {string} type - Chart type ('doughnut' or 'pie')
 * @param {boolean} loading - Loading state
 */
const SpendingChart = ({
  data = [],
  title = 'Spending by Category',
  currency = 'USD',
  type = 'doughnut',
  loading = false,
  className,
}) => {
  const chartRef = useRef(null);

  // Default data if none provided
  const defaultData = {
    labels: ['Alphonso', 'Kesar', 'Langra', 'Dasheri', 'Others'],
    datasets: [
      {
        data: [300, 250, 200, 150, 100],
      },
    ],
  };

  const chartData = data.labels ? data : defaultData;

  const colors = [
    'rgba(79, 70, 229, 0.8)',   // primary
    'rgba(16, 185, 129, 0.8)',  // green
    'rgba(245, 158, 11, 0.8)',  // amber
    'rgba(239, 68, 68, 0.8)',   // red
    'rgba(139, 92, 246, 0.8)',  // purple
    'rgba(236, 72, 153, 0.8)',  // pink
    'rgba(14, 165, 233, 0.8)',  // sky
  ];

  const borderColors = [
    'rgb(79, 70, 229)',
    'rgb(16, 185, 129)',
    'rgb(245, 158, 11)',
    'rgb(239, 68, 68)',
    'rgb(139, 92, 246)',
    'rgb(236, 72, 153)',
    'rgb(14, 165, 233)',
  ];

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'right',
        labels: {
          usePointStyle: true,
          padding: 15,
          font: {
            size: 12,
            family: "'Inter', sans-serif",
          },
          generateLabels: function(chart) {
            const data = chart.data;
            if (data.labels.length && data.datasets.length) {
              const dataset = data.datasets[0];
              const total = dataset.data.reduce((sum, value) => sum + value, 0);
              
              return data.labels.map((label, i) => {
                const value = dataset.data[i];
                const percentage = ((value / total) * 100).toFixed(1);
                
                return {
                  text: `${label} (${percentage}%)`,
                  fillStyle: dataset.backgroundColor[i],
                  hidden: false,
                  index: i,
                };
              });
            }
            return [];
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
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.parsed;
            const total = context.dataset.data.reduce((sum, val) => sum + val, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            
            return [
              `${label}`,
              `Amount: ${formatCurrency(value, currency)}`,
              `Percentage: ${percentage}%`,
            ];
          },
        },
      },
    },
    cutout: type === 'doughnut' ? '60%' : '0%',
  };

  const processedData = {
    labels: chartData.labels,
    datasets: chartData.datasets.map((dataset) => ({
      data: dataset.data,
      backgroundColor: colors.slice(0, dataset.data.length),
      borderColor: borderColors.slice(0, dataset.data.length),
      borderWidth: 2,
      hoverOffset: 10,
    })),
  };

  // Calculate total for center text
  const total = chartData.datasets[0]?.data.reduce((sum, value) => sum + value, 0) || 0;

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
        <div className="h-64 bg-gray-100 rounded-full mx-auto w-64" />
      </Card>
    );
  }

  return (
    <Card className={className}>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600 mt-1">
          Total: {formatCurrency(total, currency)}
        </p>
      </div>
      <div className="relative h-64" role="img" aria-label={`${title} chart`}>
        <Doughnut ref={chartRef} options={options} data={processedData} />
        
        {/* Center Text for Doughnut */}
        {type === 'doughnut' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <p className="text-2xl font-bold text-gray-900">
              {formatCurrency(total, currency)}
            </p>
            <p className="text-sm text-gray-600">Total Spent</p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default SpendingChart;
