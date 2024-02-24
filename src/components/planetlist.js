import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PlanetCard from './planetcard';

const PlanetList = () => {
  const [planets, setPlanets] = useState([]);
  const [nextPage, setNextPage] = useState('');
  const [prevPage, setPrevPage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchPlanets = async () => {
      try {
        const response = await axios.get(`https://swapi.dev/api/planets/?page=${currentPage}`);
        setPlanets(response.data.results);
        setNextPage(response.data.next);
        setPrevPage(response.data.previous);
      } catch (error) {
        console.error('Error fetching planets:', error);
      }
    };

    fetchPlanets();
  }, [currentPage]);

  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const goToPrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div>
      <div className="planet-list">
        {planets.map(planet => (
          <PlanetCard key={planet.url} planet={planet} />
        ))}
      </div>
      <div className="pagination">
        {prevPage && <button onClick={goToPrevPage} className="pagination-btn">Previous</button>}
        {nextPage && <button onClick={goToNextPage} className="pagination-btn">Next</button>}
      </div>
    </div>
  );
};

export default PlanetList;
