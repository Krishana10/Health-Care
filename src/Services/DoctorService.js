import apiClient from '../API/apiClient';

// Get my appointments as a doctor
export const getMyAppointments = () => apiClient.get('/api/doctor/appointments/my');

// Update appointment status
export const updateAppointmentStatus = (appointmentId, status) => 
    apiClient.put(`/api/doctor/appointments/${appointmentId}/status`, { status });

// Create prescription for a patient
export const createPrescription = (prescriptionData) => 
    apiClient.post('/api/doctor/prescription', prescriptionData);

// Get all patients for the doctor
export const getMyPatients = () => apiClient.get('/api/doctor/patients');

// Get all prescriptions created by the doctor
export const getMyPrescriptions = () => apiClient.get('/api/doctor/prescriptions');

// Get prescriptions for an appointment (if needed later)
export const getPrescriptions = (appointmentId) => 
    apiClient.get(`/api/doctor/prescriptions/appointment/${appointmentId}`);
