import axios from 'axios';

const API = axios.create({
  baseURL: 'http://127.0.0.1:8000', // FastAPI backend
});

export const fetchPilots = () => API.get('/pilots');

export const fetchWeaponsForPilot = (pilotName) =>
  API.get('/weapons/', { params: { pilots: pilotName } });

export const fetchPasses = async (pilotName, weapon) => {
  try {
    const response = await API.get(`/passes/${pilotName}/${weapon}`);
    console.log("Data from fetchpasses-index.js",response.data);  // Logs the passes data returned from the backend
    return response.data;  // return this data to use elsewhere if needed
  } catch (error) {
    console.error('Error fetching passes:', error);
  }
};


