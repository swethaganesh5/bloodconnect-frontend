import axios from 'axios';

const API_BASE_URL = 'https://bloodconnect-backend-production.up.railway.app/api';
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Donor APIs
export const registerDonor = (donorData) =>
  api.post('/donors/register', donorData);

export const getAllDonors = () =>
  api.get('/donors');

export const getLeaderboard = () =>
  api.get('/donors/leaderboard');

export const updateAvailability = (id, available) =>
  api.put(`/donors/${id}/availability`, { available });

// Blood Request APIs
export const createBloodRequest = (requestData) =>
  api.post('/requests/create', requestData);

export const getAllRequests = () =>
  api.get('/requests');

export const confirmDonation = (donorId, requestId) =>
  api.post('/requests/confirm-donation', { donorId, requestId });

// Pledge APIs
export const createPledge = (pledgeData) =>
  api.post('/pledges/create', pledgeData);

export const fulfillPledge = (id) =>
  api.put(`/pledges/${id}/fulfill`);

// Pre-Surgery API
export const preSurgeryCheck = (data) =>
  api.post('/presurgery/check', data);

export default api;