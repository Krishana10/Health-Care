import React from 'react';
import { useAppDispatch } from '../../store/hooks';
import { setAuth } from '../../store/slices/authSlice';
import Logo from "../../assets/OnlyLogo.png";
import BackgroundImage from "../../assets/BG4.jpg";
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { LoginUser, saveToken, getDashboardRoute, getToken, getUserRole, getUserEmail } from "../../Services/AuthService.js";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const onSubmit = async (data) => {
    console.log('Login data:', data);

    try {
      // Call the login API
      const response = await LoginUser(data);

      console.log('Login response:', response);

      // Extract JWT token from response
      const token = response.data.jwt;
      console.log('Extracted token:', token);

      if (token) {
        // Save token to localStorage
        saveToken(token);
        console.log('Token saved to localStorage');

        // Verify token was saved
        const savedToken = getToken();
        console.log('Retrieved token from localStorage:', savedToken);

        // Get user role and email
        const userRole = getUserRole();
        const userEmail = getUserEmail();
        console.log('User role extracted:', userRole);
        console.log('User email extracted:', userEmail);

        // Update Redux state
        dispatch(setAuth({
          user: userEmail,
          token: token,
          role: userRole
        }));

        // Get dashboard route
        const dashboardRoute = getDashboardRoute();
        console.log('Dashboard route determined:', dashboardRoute);

        // Show success toast
        toast.success('Login Successful! Redirecting to Dashboard...', {
          duration: 2000,
          position: 'top-center',
        });


        // Navigate after 1.5 seconds
        console.log('Setting timeout to navigate...');
        setTimeout(() => {
          console.log('Timeout executed, navigating to:', dashboardRoute);
          navigate(dashboardRoute, { replace: true });
          console.log('Navigate called');
        }, 1500);
      } else {
        toast.error('Login failed. No token received.', {
          duration: 3000,
          position: 'top-center',
        });
      }

    } catch (error) {
      console.error('Login error:', error);

      // Handle different error types
      let errorMessage = 'Login failed. Please check your credentials.';

      if (error.code === 'ERR_NETWORK') {
        errorMessage = '❌ Cannot connect to server. Please check if backend is running.';
      } else if (error.response) {
        if (error.response.status === 401) {
          // Unauthorized - wrong credentials or unapproved doctor
          errorMessage = error.response.data?.jwt ||
            error.response.data?.message ||
            'Invalid email or password.';
        } else {
          errorMessage = error.response.data?.message ||
            `Error: ${error.response.status}`;
        }
      }

      // Show error toast
      toast.error(errorMessage, {
        duration: 4000,
        position: 'top-center',
      });
    }
  };

  return (
    <div
      className="h-screen w-full bg-cover bg-center flex justify-center items-center p-4"
      style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
      {/* Toaster Component */}
      <Toaster />

      {/* Login Card */}
      <div className="bg-white/20 backdrop-blur-lg rounded-xl shadow-lg p-8 max-w-md w-full">

        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <img src={Logo} alt="Logo" className="w-20 h-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-800">Member Login</h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email Input */}
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path>
              </svg>
            </div>
            <input
              type="email"
              {...register("email", {
                required: {
                  value: true,
                  message: "⚠️ Email is required"
                },
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "⚠️ Invalid email address"
                }
              })}
              className="bg-white/50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-3 placeholder-gray-500"
              placeholder="Email Address"
            />
            {errors.email && (
              <span className="text-red-600 text-sm mt-1 block">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Password Input */}
          <div className="relative mb-4">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
            </div>
            <input
              {...register("password", {
                required: {
                  value: true,
                  message: "⚠️ Password is required"
                },
                minLength: {
                  value: 6,
                  message: "⚠️ Password must be at least 6 characters"
                }
              })}
              type="password"
              className="bg-white/50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-3 placeholder-gray-500"
              placeholder="Password"
              autoComplete="current-password"
            />
            {errors.password && (
              <div className="text-red-600 text-sm mt-1">
                {errors.password.message}
              </div>
            )}
          </div>

          {/* Options */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="remember-me" className="ml-2 text-sm font-medium text-gray-800">
                Remember me
              </label>
            </div>
            <Link to="/forgot-password" className="text-sm font-medium text-blue-600 hover:underline">
              Forgot Password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full text-red bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg text-md px-5 py-3 text-center transition duration-300 disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Logging in...' : 'LOGIN'}
          </button>

          {/* Register Link */}
          <p className="text-sm font-medium text-center text-gray-700 mt-6">
            Not a member? <Link to="/register" className="text-blue-600 hover:underline font-bold">Register Now</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;