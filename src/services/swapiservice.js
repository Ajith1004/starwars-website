import axios from 'axios';

export const fetchPlanets = async (url = 'https://swapi.dev/api/planets/?format=json') => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching planets:', error);
    return null;
  }
};
