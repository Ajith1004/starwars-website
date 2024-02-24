import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PlanetCard = ({ planet, colorClass }) => {
  const [residents, setResidents] = useState([]);
  const [showResidents, setShowResidents] = useState(false);

  useEffect(() => {
    const fetchResidents = async () => {
      try {
        const residentRequests = planet.residents.map(residentURL => axios.get(residentURL));
        const responses = await Promise.all(residentRequests);
        const residentData = responses.map(response => response.data);
        setResidents(residentData);
      } catch (error) {
        console.error('Error fetching residents:', error);
      }
    };

    fetchResidents();
  }, [planet.residents]);

  const handleMouseEnter = () => {
    setShowResidents(true);
  };

  const handleMouseLeave = () => {
    setShowResidents(false);
  };

  return (
    <div className={`planet-card ${colorClass}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <h2>{planet.name}</h2>
      <p>Climate: {planet.climate}</p>
      <p>Population: {planet.population}</p>
      <p>Terrain: {planet.terrain}</p>
      {showResidents && (
        <div>
          <h3>Residents:</h3>
          <ul>
            {residents.map(resident => (
              <li key={resident.url}>
                <p>Name: {resident.name}</p>
                <p>Height: {resident.height}</p>
                <p>Mass: {resident.mass}</p>
                <p>Gender: {resident.gender}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PlanetCard;
