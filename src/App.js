import React, { useState, useEffect } from 'react';
import { fetchPlanets } from './services/swapiservice';
import PlanetList from './components/planetlist';
import './App.css';
const App = () => {
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPlanets();
      if (data) {
        setPlanets(data.results);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="app">
      <h1>STAR WARS PLANETS DIRECTORY</h1>
      <PlanetList planets={planets} />
    </div>
  );
};

export default App;
