import { createSlice } from '@reduxjs/toolkit';

const patientsSlice = createSlice({
  name: 'patients',
  initialState: {
    list: [],
    loading: false,
    currentPatient: null,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setPatients: (state, action) => {
      state.list = action.payload;
    },
    setCurrentPatient: (state, action) => {
      state.currentPatient = action.payload;
    },
    addPatient: (state, action) => {
      state.list.push(action.payload);
    },
  },
});

export const { setLoading, setPatients, setCurrentPatient, addPatient } = patientsSlice.actions;
export default patientsSlice.reducer;