import axios from 'axios';

const API = axios.create({
  baseURL: 'http://127.0.0.1:8001', // FastAPI backend
});

export const fetchPilots = () => API.get('/pilots');


export const fetchMissionTypeForPilot = async (pilotName) =>{
    try{
        const encodedPilot = encodeURIComponent(pilotName);
        const response = await API.get(`/missionTypes/${encodedPilot}`);
        console.log("Data from fetchMissionTypeForPilot-index.js", response.data);
        return response.data;
    }catch(error){
    console.log.error('Error fetching mission_type')
     }
};

export const fetchWeaponsForPilot = async (pilotName, missionType) =>{
    try{
        const encodedPilotName = encodeURIComponent(pilotName);
        const encodedMissionType = encodeURIComponent(missionType);
        const response = await API.get(`/weapons/${encodedPilotName}/${encodedMissionType}`);
        console.log("Data from fetchweapons-index.js", response.data);
        return response.data;
    }catch(error){
        console.log("Error fetching Data from fetchweapons-index.js", error);
    }

};



export const fetchPasses = async (pilotName, missionType, weapon) => {
  try {
    const encodedPilot = encodeURIComponent(pilotName);
    const encodedWeapon = encodeURIComponent(weapon);
    const encodedMissionType = encodeURIComponent(missionType);
    const response = await API.get(`/passes/${encodedPilot}/${encodedMissionType}/${encodedWeapon}`);
    console.log("Data from fetchpasses-index.js", response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching passes:', error);
  }
};


