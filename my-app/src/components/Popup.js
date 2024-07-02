// src/components/Popup.jsx

import React from 'react';
import { Bar } from 'react-chartjs-2';
import './Popup.css'; // Import the CSS file

const Popup = ({ data, onClose }) => {
  return (
    <div className="popup">
      <h3>{data.datasets[0].label}</h3>
      <Bar data={data} />
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default Popup;
