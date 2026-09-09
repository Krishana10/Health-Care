import apiClient from '../API/apiClient';

// Get all doctors
export const getDoctors = () => apiClient.get('/api/admin/doctors');

// Approve doctor
export const approveDoctor = (id) => apiClient.put(`/api/admin/doctors/${id}/approve`);

// Reject doctor
export const rejectDoctor = (id) => apiClient.put(`/api/admin/doctors/${id}/reject`);

// Get all patients
export const getPatients = () => apiClient.get('/api/admin/patients');

// Get all billing records
export const getBilling = () => apiClient.get('/api/admin/billing');

// Update billing status
export const updateBillingStatus = (id, status) => apiClient.put(`/api/admin/billing/${id}/status`, status);

// Get revenue stats
export const getDailyRevenue = () => apiClient.get('/api/admin/revenue/daily');
export const getMonthlyRevenue = () => apiClient.get('/api/admin/revenue/monthly');
