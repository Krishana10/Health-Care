import { createSlice } from '@reduxjs/toolkit';

const appointmentsSlice = createSlice({
  name: 'appointments',
  initialState: {
    list: [],
    loading: false,
    patients: [],
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setAppointments: (state, action) => {
      state.list = action.payload;
    },
    updateAppointment: (state, action) => {
      const index = state.list.findIndex(apt => apt.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
    setPatients: (state, action) => {
      state.patients = action.payload;
    },
    addAppointment: (state, action) => {
      state.list.push(action.payload);
    },
  },
});

export const { setLoading, setAppointments, updateAppointment, setPatients, addAppointment } = appointmentsSlice.actions;
export default appointmentsSlice.reducer;