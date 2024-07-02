// src/App.jsx
import React from 'react';
import Heatmap from './components/Heatmap';
import AdvisorProductsChart from './components/charts/AdvisorProductsChart';

const App = () => {
  return (
    <div>
      <h1>Wells Fargo Advisor Dashboard</h1>
      <AdvisorProductsChart />
    </div>
  );
};

export default App;
