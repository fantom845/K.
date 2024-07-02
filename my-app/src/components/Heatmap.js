// src/components/Heatmap.jsx
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat';

const HeatmapLayer = ({ points }) => {
  const map = useMap();

  useEffect(() => {
    const heat = L.heatLayer(points, { radius: 20, blur: 15 }).addTo(map);
    return () => {
      map.removeLayer(heat);
    };
  }, [points, map]);

  return null;
};

const Heatmap = () => {
  const mockAdvisorData = [
    { id: 1, name: 'Advisor 1', state: 'CA', latitude: 36.7783, longitude: -119.4179, count: 10 },
    { id: 2, name: 'Advisor 2', state: 'TX', latitude: 31.9686, longitude: -99.9018, count: 15 },
    { id: 3, name: 'Advisor 3', state: 'FL', latitude: 27.9944, longitude: -81.7603, count: 20 },
    { id: 4, name: 'Advisor 4', state: 'NY', latitude: 40.7128, longitude: -74.0060, count: 25 },
    { id: 5, name: 'Advisor 5', state: 'IL', latitude: 40.6331, longitude: -89.3985, count: 5 },
  ];

  const [selectedState, setSelectedState] = useState(null);
  const [filteredAdvisors, setFilteredAdvisors] = useState([]);

  useEffect(() => {
    if (selectedState) {
      const advisorsInState = mockAdvisorData.filter(advisor => advisor.state === selectedState);
      setFilteredAdvisors(advisorsInState);
    }
  }, [selectedState]);

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
  };

  const heatmapPoints = mockAdvisorData.map(advisor => [advisor.latitude, advisor.longitude, advisor.count]);

  return (
    <div>
      <h2>Advisor Heatmap</h2>
      <div>
        <label>Select State: </label>
        <select onChange={handleStateChange}>
          <option value="">--Select a state--</option>
          {Array.from(new Set(mockAdvisorData.map(advisor => advisor.state))).map(state => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>
      </div>
      <MapContainer center={[37.8, -96]} zoom={4} style={{ height: "500px", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <HeatmapLayer points={heatmapPoints} />
      </MapContainer>
      {selectedState && (
        <div>
          <h3>Advisors in {selectedState}</h3>
          <ul>
            {filteredAdvisors.map(advisor => (
              <li key={advisor.id}>{advisor.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Heatmap;
