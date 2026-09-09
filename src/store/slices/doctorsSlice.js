import { createSlice } from '@reduxjs/toolkit';

const doctorsSlice = createSlice({
  name: 'doctors',
  initialState: {
    list: [],
    loading: false,
    pendingDoctors: [],
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setDoctors: (state, action) => {
      state.list = action.payload;
    },
    setPendingDoctors: (state, action) => {
      state.pendingDoctors = action.payload;
    },
    approveDoctor: (state, action) => {
      const doctorId = action.payload;
      state.pendingDoctors = state.pendingDoctors.filter(doc => doc.id !== doctorId);
      const approvedDoctor = state.pendingDoctors.find(doc => doc.id === doctorId);
      if (approvedDoctor) {
        state.list.push(approvedDoctor);
      }
    },
  },
});

export const { setLoading, setDoctors, setPendingDoctors, approveDoctor } = doctorsSlice.actions;
export default doctorsSlice.reducer;