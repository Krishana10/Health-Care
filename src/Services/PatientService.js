import apiClient from '../API/apiClient';

// Get all approved doctors
export const getDoctors = () => apiClient.get('/api/patient/doctors');

// Book new appointment
export const bookAppointment = (appointmentData) => apiClient.post('/api/patient/appointments/new', appointmentData);

// Get my appointments
export const getMyAppointments = () => apiClient.get('/api/patient/appointments/my');

// Get my prescriptions
export const getMyPrescriptions = () => apiClient.get('/api/patient/prescriptions');

// Get my profile
export const getMyProfile = () => apiClient.get('/api/patient/profile');

// Make payment
export const makePayment = (appointmentId) => apiClient.put(`/api/patient/appointments/${appointmentId}/pay`);

// Cancel appointment
export const cancelAppointment = (appointmentId) => apiClient.delete(`/api/patient/appointments/${appointmentId}/cancel`);
