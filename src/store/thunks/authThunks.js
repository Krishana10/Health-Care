import { createAsyncThunk } from '@reduxjs/toolkit';
import { setAuth, clearAuth } from '../slices/authSlice';
import { getToken, getUserEmail, removeToken } from '../../Services/AuthService';

export const initializeAuth = createAsyncThunk(
  'auth/initialize',
  async (_, { dispatch }) => {
    const token = getToken();
    const userEmail = getUserEmail();
    
    if (token && userEmail) {
      dispatch(setAuth({
        user: userEmail,
        token,
        role: 'DOCTOR', // You can decode this from JWT
      }));
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { dispatch }) => {
    removeToken();
    dispatch(clearAuth());
  }
);