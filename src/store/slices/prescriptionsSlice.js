import { createSlice } from '@reduxjs/toolkit';

const prescriptionsSlice = createSlice({
  name: 'prescriptions',
  initialState: {
    list: [],
    loading: false,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setPrescriptions: (state, action) => {
      state.list = action.payload;
    },
    addPrescription: (state, action) => {
      state.list.push(action.payload);
    },
    updatePrescription: (state, action) => {
      const index = state.list.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
  },
});

export const { setLoading, setPrescriptions, addPrescription, updatePrescription } = prescriptionsSlice.actions;
export default prescriptionsSlice.reducer;