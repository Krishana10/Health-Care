import { createAsyncThunk } from '@reduxjs/toolkit';
import { setDoctors, setLoading, approveDoctor as approveDoctorAction } from '../slices/doctorsSlice';
import { getDoctors as getPatientDoctors } from '../../Services/PatientService';
import { getDoctors, approveDoctor, rejectDoctor } from '../../Services/AdminService';

export const fetchDoctorsForPatients = createAsyncThunk(
  'doctors/fetchForPatients',
  async (_, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const response = await getPatientDoctors();
      dispatch(setDoctors(response.data));
      return response.data;
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const fetchDoctorsForAdmin = createAsyncThunk(
  'doctors/fetchForAdmin',
  async (_, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const response = await getDoctors();
      dispatch(setDoctors(response.data));
      return response.data;
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const approveDoctorThunk = createAsyncThunk(
  'doctors/approve',
  async (doctorId, { dispatch }) => {
    const response = await approveDoctor(doctorId);
    dispatch(approveDoctorAction(doctorId));
    return response.data;
  }
);

export const rejectDoctorThunk = createAsyncThunk(
  'doctors/reject',
  async (doctorId, { dispatch, getState }) => {
    const response = await rejectDoctor(doctorId);
    const updatedDoctors = getState().doctors.list.map(doctor => 
      doctor.id === doctorId ? { ...doctor, isApproved: false } : doctor
    );
    dispatch(setDoctors(updatedDoctors));
    return response.data;
  }
);