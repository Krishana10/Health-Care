import { createAsyncThunk } from '@reduxjs/toolkit';
import { setAppointments, setLoading, updateAppointment, addAppointment } from '../slices/appointmentsSlice';
import { getMyAppointments, updateAppointmentStatus } from '../../Services/DoctorService';
import { getMyAppointments as getPatientAppointments, bookAppointment } from '../../Services/PatientService';

export const fetchDoctorAppointments = createAsyncThunk(
  'appointments/fetchDoctorAppointments',
  async (_, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const response = await getMyAppointments();
      dispatch(setAppointments(response.data));
      return response.data;
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const fetchPatientAppointments = createAsyncThunk(
  'appointments/fetchPatientAppointments',
  async (_, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const response = await getPatientAppointments();
      dispatch(setAppointments(response.data));
      return response.data;
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const updateAppointmentStatusThunk = createAsyncThunk(
  'appointments/updateStatus',
  async ({ appointmentId, status }, { dispatch }) => {
    const response = await updateAppointmentStatus(appointmentId, status);
    dispatch(updateAppointment(response.data));
    return response.data;
  }
);

export const bookAppointmentThunk = createAsyncThunk(
  'appointments/bookAppointment',
  async (appointmentData, { dispatch }) => {
    const response = await bookAppointment(appointmentData);
    dispatch(addAppointment(response.data));
    return response.data;
  }
);