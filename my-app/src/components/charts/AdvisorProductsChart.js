// src/components/charts/AdvisorProductsChart.jsx

import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import 'chart.js/auto';
import Popup from '../Popup'; // Import the Popup component

// Register the required components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdvisorProductsChart = () => {
  const [popupData, setPopupData] = useState(null); // State to manage popup data

  // Mock data for demonstration
  const data = {
    labels: ['Product Category 1', 'Product Category 2', 'Product Category 3'],
    datasets: [
      {
        label: 'Number of Advisors',
        data: [10, 15, 8], // Mock data
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        enabled: false, // Disable tooltip
      },
    },
    onClick: (_, elements) => {
      if (elements && elements.length > 0) {
        const clickedIndex = elements[0].index;
        const productLabel = data.labels[clickedIndex];
        // Mock data for subproducts
        const subproductData = {
          labels: ['Subproduct 1', 'Subproduct 2', 'Subproduct 3'],
          datasets: [
            {
              label: `Subproducts for ${productLabel}`,
              data: [20, 30, 15], // Mock data
              backgroundColor: [
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 159, 64, 0.6)',
              ],
              borderColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
              borderWidth: 1,
            },
          ],
        };
        setPopupData(subproductData); // Set popup data state
      }
    },
  };

  return (
    <div>
      <h2>Advisor vs. Product Categories</h2>
      <Bar data={data} options={options} />
      {popupData && <Popup data={popupData} onClose={() => setPopupData(null)} />}
    </div>
  );
};

export default AdvisorProductsChart;
