import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

import Logo from "../../assets/OnlyLogo.png";
import BackgroundImage from "../../assets/BG4.jpg";

import { RegisterUser } from "../../Services/AuthService.js";


const Register = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            firstName: '',
            lastName: '',
            role: '',
            dob: '',
            contactNumber: '',
            specialty: '',
            email: '',
            password: '',
            experience: ''
        }
    });

    // Watch the role field to show conditional fields
    const selectedRole = watch('role');

    const delay = (d) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, d * 1000);
        });
    };
    const Navigator = useNavigate();
    const onSubmit = async (data) => {
        await delay(2); // Simulating network delay

        // Map role to roleId
        const roleIdMap = {
            'patient': 1,
            'doctor': 2
        };

        // Prepare data for submission
        const registerData = {
            ...data,
            roleId: roleIdMap[data.role], // Add roleId based on selected role
            // role: data.role   //  Keep original role name if needed
        };



        try {
            // eslint-disable-next-line no-unused-vars
            const response = await RegisterUser(registerData);

            // Show success Toast
            toast.success('Registration Successful ! Redirecting to login...', {
                duration: 3000,
                position: 'top-center',
            });

            // Wait 2 second then Navigate to login 
            setTimeout(() => {
                Navigator('/login');
            }, 1000);

        } catch (error) {
            // Show Error Toast 
            toast.error(error.response?.data?.message || 'Registration Failed. Please try again.', {
                duration: 4000,
                postion: 'top-center'
            });
            console.error('Registration error:', error);
        }
    };

    return (
        <div
            className="min-h-screen w-full bg-cover bg-center flex justify-center items-center p-4"
            style={{ backgroundImage: `url(${BackgroundImage})` }}
        >
            {/*Toaster Component */}
            <Toaster />
            <div className="bg-white/20 backdrop-blur-lg rounded-xl shadow-lg p-8 max-w-md w-full">
                <div className="flex flex-col items-center mb-8">
                    <img src={Logo} alt="Logo" className="w-20 h-auto mb-4 mt-4" />
                    <h2 className="text-3xl font-bold text-gray-800">Member Registration</h2>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* --- COMMON PERSONAL INFO --- */}
                    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
                        {/* First Name Input */}
                        <div className="relative mb-6">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                                </svg>
                            </div>
                            <input
                                {...register("firstName", {
                                    required: { value: true, message: "⚠️First Name is required" },
                                    minLength: { value: 2, message: "⚠️First Name must be at least 2 characters long" },
                                    maxLength: { value: 10, message: "⚠️First Name must be at most 10 characters long" }
                                })}
                                className="bg-white/50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-3 placeholder-gray-500"
                                placeholder="First Name"
                                type="text"
                            />
                            {errors.firstName && (
                                <div className="text-red-500 text-sm mt-1">
                                    {errors.firstName.message}
                                </div>
                            )}
                        </div>

                        {/* Last Name Input */}
                        <div className="relative mb-6">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                                </svg>
                            </div>
                            <input
                                {...register("lastName", {
                                    required: { value: true, message: "⚠️Last Name is required" },
                                    minLength: { value: 2, message: "⚠️Last Name must be at least 2 characters long" },
                                    maxLength: { value: 20, message: "⚠️Last Name must be at most 10 characters long" }
                                })}
                                className="bg-white/50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-3 placeholder-gray-500"
                                placeholder="Last Name"
                                type="text"
                            />
                            {errors.lastName && (
                                <div className="text-red-500 text-sm mt-1">
                                    {errors.lastName.message}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* --- ROLE SELECTION --- */}
                    <div className="relative mb-6">
                        <select
                            {...register("role", {
                                required: { value: true, message: "⚠️Please select a role" }
                            })}
                            className="bg-white/50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                        >
                            <option value="">Select a role</option>
                            <option value="patient">Patient</option>
                            <option value="doctor">Doctor</option>
                        </select>
                        {errors.role && (
                            <div className="text-red-500 text-sm mt-1">
                                {errors.role.message}
                            </div>
                        )}
                    </div>

                    {/* --- PATIENT-SPECIFIC FIELDS --- */}
                    {selectedRole === 'patient' && (
                        <>
                            <div className="relative mb-6">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path>
                                    </svg>
                                </div>
                                <input
                                    type="date"
                                    {...register("dob", {
                                        required: { value: true, message: "⚠️Date of Birth is required" },
                                        validate: (value) => {
                                            const selectedDate = new Date(value);
                                            const today = new Date();
                                            return selectedDate < today || "⚠️Date of Birth must be in the past";
                                        }
                                    })}
                                    className="bg-white/50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-3 placeholder-gray-500"
                                    placeholder="Date of Birth"
                                />
                                {errors.dob && (
                                    <div className="text-red-500 text-sm mt-1">
                                        {errors.dob.message}
                                    </div>
                                )}
                            </div>
                            <div className="relative mb-6">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                                    </svg>
                                </div>
                                <input
                                    type="tel"
                                    {...register("contactNumber", {
                                        required: { value: true, message: "⚠️Contact Number is required" },
                                        pattern: {
                                            value: /^[0-9]{10}$/,
                                            message: "⚠️Contact Number must be 10 digits"
                                        }
                                    })}
                                    className="bg-white/50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-3 placeholder-gray-500"
                                    placeholder="Contact Number"
                                />
                                {errors.contactNumber && (
                                    <div className="text-red-500 text-sm mt-1">
                                        {errors.contactNumber.message}
                                    </div>
                                )}
                            </div>
                        </>
                    )}

                    {/* --- DOCTOR-SPECIFIC FIELD --- */}
                    {selectedRole === 'doctor' && (
                        <div>
                            {/* for specialty */}
                            <div className="relative mb-6">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM4 11a1 1 0 011-1h6a1 1 0 110 2H5a1 1 0 01-1-1zM4 15a1 1 0 011-1h2a1 1 0 110 2H5a1 1 0 01-1-1z"></path>
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    {...register("specialty", {
                                        required: { value: true, message: "⚠️Specialty is required" },
                                        minLength: { value: 3, message: "⚠️Specialty must be at least 3 characters long" }
                                    })}
                                    className="bg-white/50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-3 placeholder-gray-500"
                                    placeholder="Specialty (e.g., Cardiology)"
                                />
                                {errors.specialty && (
                                    <div className="text-red-500 text-sm mt-1">
                                        {errors.specialty.message}
                                    </div>
                                )}
                            </div>

                       {/* for Experience */}
                            <div className="relative mb-6">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM4 11a1 1 0 011-1h6a1 1 0 110 2H5a1 1 0 01-1-1zM4 15a1 1 0 011-1h2a1 1 0 110 2H5a1 1 0 01-1-1z"></path>
                                    </svg>
                                </div>
                                <input
                                    type="number"
                                    {...register("experience", {
                                        required: { value: true, message: "⚠️Experience is required" },
                                        min: { value: 0, message: "⚠️Experience must be a positive number" }
                                    })}
                                    className="bg-white/50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-3 placeholder-gray-500"
                                    placeholder="Years of Experience"
                                />
                                {errors.experience && (
                                    <div className="text-red-500 text-sm mt-1">
                                        {errors.experience.message}
                                    </div>
                                )}
                            </div>
                        </div>

                    )}

                    {/* --- COMMON AUTHENTICATION FIELDS --- */}
                    <div className="relative mb-6">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                            </svg>
                        </div>
                        <input
                            type="email"
                            {...register("email", {
                                required: { value: true, message: "⚠️Email is required" },
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "⚠️Invalid email address"
                                }
                            })}
                            className="bg-white/50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-3 placeholder-gray-500"
                            placeholder="Email Address"
                        />
                        {errors.email && (
                            <div className="text-red-500 text-sm mt-1">
                                {errors.email.message}
                            </div>
                        )}
                    </div>
                    <div className="relative mb-6">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path>
                            </svg>
                        </div>
                        <input
                            type="password"
                            {...register("password", {
                                required: { value: true, message: "⚠️Password is required" },
                                minLength: { value: 8, message: "⚠️Password must be at least 8 characters long" },
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                                    message: "⚠️Password must contain uppercase, lowercase, and number"
                                }
                            })}
                            className="bg-white/50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-3 placeholder-gray-500"
                            placeholder="Password"
                        />
                        {errors.password && (
                            <div className="text-red-500 text-sm mt-1">
                                {errors.password.message}
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full text-red bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg text-md px-5 py-3 text-center transition duration-300 disabled:bg-blue-400 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? 'REGISTERING...' : 'REGISTER'}
                    </button>

                    <p className="text-sm font-medium text-center text-gray-700 mt-6">
                        Already have an account? <Link to="/login" className="text-blue-600 hover:underline font-bold">Login Here</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Register;