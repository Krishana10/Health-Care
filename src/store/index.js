import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import appointmentsSlice from './slices/appointmentsSlice';
import prescriptionsSlice from './slices/prescriptionsSlice';
import doctorsSlice from './slices/doctorsSlice';
import patientsSlice from './slices/patientsSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    appointments: appointmentsSlice,
    prescriptions: prescriptionsSlice,
    doctors: doctorsSlice,
    patients: patientsSlice,
  },
});

export default store;