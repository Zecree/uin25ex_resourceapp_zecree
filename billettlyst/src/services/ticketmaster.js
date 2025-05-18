import axios from 'axios';

export const getEvents = async (params = {}) => {
  const res = await axios.get('http://localhost:5000/api/events', { params });
  return res.data;
};

export const getEventById = async (id) => {
  const res = await axios.get(`http://localhost:5000/api/event/${id}`);
  return res.data;
};
