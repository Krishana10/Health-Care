import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
<<<<<<< HEAD
import { useAppSelector, useAppDispatch } from '../../store/hooks';
// eslint-disable-next-line no-unused-vars
import { setDoctors, setPendingDoctors, setLoading as setDoctorsLoading, approveDoctor as approveDoctorAction } from '../../store/slices/doctorsSlice';
import { setPatients, setLoading as setPatientsLoading } from '../../store/slices/patientsSlice';
=======
>>>>>>> e7ee58140669b1cf6ba47542fd6dfd5a84117303
import { removeToken, getUserEmail, isAuthenticated, setupAxiosInterceptors } from "../../Services/AuthService.js";
import { getDoctors, approveDoctor, rejectDoctor, getPatients, getBilling, updateBillingStatus, getDailyRevenue, getMonthlyRevenue } from "../../Services/AdminService.js";
import logo from "../../assets/OnlyLogo.svg"

const AdminDashboard = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const userEmail = getUserEmail();
<<<<<<< HEAD
    
    // Redux state
    const { list: doctors, loading: doctorsLoading } = useAppSelector(state => state.doctors);
    const { list: patients, loading: patientsLoading } = useAppSelector(state => state.patients);
    
    // Local state
=======
    const [doctors, setDoctors] = useState([]);
    const [patients, setPatients] = useState([]);
>>>>>>> e7ee58140669b1cf6ba47542fd6dfd5a84117303
    const [billing, setBilling] = useState([]);
    const [dailyRevenue, setDailyRevenue] = useState(0);
    const [monthlyRevenue, setMonthlyRevenue] = useState(0);
    const [activeTab, setActiveTab] = useState('doctors');
<<<<<<< HEAD
    const [error, setError] = useState(null);
    const [actionLoading, setActionLoading] = useState(null);
    
    const loading = activeTab === 'doctors' ? doctorsLoading : activeTab === 'patients' ? patientsLoading : false;
=======
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [actionLoading, setActionLoading] = useState(null);
>>>>>>> e7ee58140669b1cf6ba47542fd6dfd5a84117303

    useEffect(() => {
        // Set up axios interceptors first
        setupAxiosInterceptors();
        
        // Check authentication before fetching
        if (!isAuthenticated()) {
            console.log('⚠️ Not authenticated, redirecting...');
            handleLogout();
            return;
        }
        
        fetchDoctors();
        fetchPatients();
        fetchBilling();
        fetchRevenue();
    }, []);

    const fetchDoctors = async () => {
        try {
            setError(null);
<<<<<<< HEAD
            dispatch(setDoctorsLoading(true));
            
            const response = await getDoctors();
            dispatch(setDoctors(response.data));
=======
            setLoading(true);
            
            const response = await getDoctors();
            setDoctors(response.data);
>>>>>>> e7ee58140669b1cf6ba47542fd6dfd5a84117303
            console.log('✅ Doctors fetched successfully:', response.data.length);
        } catch (error) {
            console.error('Error fetching doctors:', error);
            
            // Don't show error for auth failures (interceptor handles it)
            if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                console.log('🔒 Auth error, interceptor will handle redirect');
                return;
            }
            
            setError('Failed to load doctors. Please try again.');
        } finally {
<<<<<<< HEAD
            dispatch(setDoctorsLoading(false));
=======
            setLoading(false);
>>>>>>> e7ee58140669b1cf6ba47542fd6dfd5a84117303
        }
    };

    const fetchPatients = async () => {
        try {
<<<<<<< HEAD
            dispatch(setPatientsLoading(true));
            const response = await getPatients();
            dispatch(setPatients(response.data));
=======
            const response = await getPatients();
            setPatients(response.data);
>>>>>>> e7ee58140669b1cf6ba47542fd6dfd5a84117303
            console.log('✅ Patients fetched successfully:', response.data.length);
        } catch (error) {
            console.error('Error fetching patients:', error);
            if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                return;
            }
            setError('Failed to load patients. Please try again.');
<<<<<<< HEAD
        } finally {
            dispatch(setPatientsLoading(false));
=======
>>>>>>> e7ee58140669b1cf6ba47542fd6dfd5a84117303
        }
    };

    const fetchBilling = async () => {
        try {
            const response = await getBilling();
            setBilling(response.data);
        } catch (error) {
            console.error('Error fetching billing:', error);
        }
    };

    const fetchRevenue = async () => {
        try {
            const [daily, monthly] = await Promise.all([getDailyRevenue(), getMonthlyRevenue()]);
            setDailyRevenue(daily.data);
            setMonthlyRevenue(monthly.data);
        } catch (error) {
            console.error('Error fetching revenue:', error);
        }
    };

    const handleBillingStatusUpdate = async (id, status) => {
        try {
            setActionLoading(`billing-${id}`);
            await updateBillingStatus(id, status);
            setBilling(prev => prev.map(bill => 
                bill.id === id ? { ...bill, billingStatus: status } : bill
            ));
            fetchRevenue(); // Refresh revenue stats
        } catch (error) {
            console.error('Error updating billing status:', error);
        } finally {
            setActionLoading(null);
        }
    };

    const handleApprove = async (id) => {
        try {
            setActionLoading(`approve-${id}`);
            console.log('🔄 Approving doctor ID:', id);
            
            const response = await approveDoctor(id);
            console.log('✅ Approve response:', response.data);
            
            // Update the specific doctor in state immediately
<<<<<<< HEAD
            dispatch(approveDoctorAction(id));
=======
            setDoctors(prevDoctors => 
                prevDoctors.map(doctor => 
                    doctor.id === id ? { ...doctor, isApproved: true } : doctor
                )
            );
>>>>>>> e7ee58140669b1cf6ba47542fd6dfd5a84117303
            
            console.log('✅ Doctor approved successfully');
            showNotification('Doctor approved successfully!', 'success');
        } catch (error) {
            console.error('❌ Error approving doctor:', error);
            console.error('Error details:', error.response?.data);
            
            if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                console.error('🔒 Auth error during approve operation');
                return;
            }
            
            showNotification('Failed to approve doctor. Please try again.', 'error');
        } finally {
            setActionLoading(null);
        }
    };

    const handleReject = async (id) => {
        try {
            setActionLoading(`reject-${id}`);
            await rejectDoctor(id);
            
            // Update the specific doctor in state immediately
<<<<<<< HEAD
            const updatedDoctors = doctors.map(doctor => 
                doctor.id === id ? { ...doctor, isApproved: false } : doctor
            );
            dispatch(setDoctors(updatedDoctors));
=======
            setDoctors(prevDoctors => 
                prevDoctors.map(doctor => 
                    doctor.id === id ? { ...doctor, isApproved: false } : doctor
                )
            );
>>>>>>> e7ee58140669b1cf6ba47542fd6dfd5a84117303
            
            console.log('✅ Doctor status updated successfully');
            
            // Show success notification
            showNotification('Doctor status updated successfully!', 'success');
        } catch (error) {
            console.error('Error rejecting doctor:', error);
            
            // Don't show error for auth failures
            if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                return;
            }
            
            showNotification('Failed to update doctor status. Please try again.', 'error');
        } finally {
            setActionLoading(null);
        }
    };

    const showNotification = (message, type) => {
        // Simple notification (you can replace with a toast library)
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 ${
            type === 'success' ? 'bg-green-500' : 'bg-red-500'
        } text-white`;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    };

    const handleLogout = () => {
        console.log('🚪 Logging out...');
        removeToken();
        navigate('/login', { replace: true });
    };

    return (
        <div className="flex h-screen bg-slate-50">
            {/* Sidebar */}
            <div className="w-72 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col shadow-2xl border-r border-slate-700">
                <div className="p-8 border-b border-slate-700/50">
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                                <img src={logo} alt="HealthCare Logo" className="w-8 h-8" />
                            </div>
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-slate-900"></div>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white">HealthCare</h2>
                            <p className="text-sm text-slate-400 font-medium">Admin Portal</p>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 px-6 py-6 space-y-3">
                    <div className="mb-4">
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Main Menu</p>
                    </div>
                    
                    <div 
                        onClick={() => setActiveTab('doctors')}
                        className={`group relative rounded-xl px-4 py-3.5 flex items-center space-x-3 cursor-pointer transition-all duration-200 ${
                            activeTab === 'doctors' 
                                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/25' 
                                : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                        }`}
                    >
                        <div className={`p-2 rounded-lg transition-colors ${
                            activeTab === 'doctors' ? 'bg-white/20' : 'bg-slate-700/50 group-hover:bg-slate-600/50'
                        }`}>
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <span className="font-medium">Doctors</span>
                        {activeTab === 'doctors' && <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-white rounded-l-full"></div>}
                    </div>
                    
                    <div 
                        onClick={() => setActiveTab('patients')}
                        className={`group relative rounded-xl px-4 py-3.5 flex items-center space-x-3 cursor-pointer transition-all duration-200 ${
                            activeTab === 'patients' 
                                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/25' 
                                : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                        }`}
                    >
                        <div className={`p-2 rounded-lg transition-colors ${
                            activeTab === 'patients' ? 'bg-white/20' : 'bg-slate-700/50 group-hover:bg-slate-600/50'
                        }`}>
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <span className="font-medium">Patients</span>
                        {activeTab === 'patients' && <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-white rounded-l-full"></div>}
                    </div>

                    <div 
                        onClick={() => setActiveTab('billing')}
                        className={`group relative rounded-xl px-4 py-3.5 flex items-center space-x-3 cursor-pointer transition-all duration-200 ${
                            activeTab === 'billing' 
                                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/25' 
                                : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                        }`}
                    >
                        <div className={`p-2 rounded-lg transition-colors ${
                            activeTab === 'billing' ? 'bg-white/20' : 'bg-slate-700/50 group-hover:bg-slate-600/50'
                        }`}>
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <span className="font-medium">Billing</span>
                        {activeTab === 'billing' && <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-white rounded-l-full"></div>}
                    </div>
                </nav>

                <div className="p-6 border-t border-slate-700/50 bg-slate-800/30">
                    <div className="flex items-center space-x-4 mb-6">
                        <div className="relative">
                            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-slate-800"></div>
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-semibold text-white">Admin {userEmail}</p>
                            <p className="text-xs text-slate-400">System Administrator</p>
                        </div>
                    </div>
                    
                    <button
                        onClick={handleLogout}
                        className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] flex items-center justify-center space-x-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span>Logout</span>
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="bg-gradient-to-r from-white via-purple-50 to-indigo-50 shadow-lg border-b border-purple-100 px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-purple-600 bg-clip-text text-transparent">Admin Dashboard</h1>
                            <p className="text-slate-600 font-medium mt-1">Welcome back, Admin {userEmail}</p>
                        </div>
                        <div className="bg-white/70 backdrop-blur-sm px-4 py-2 rounded-xl border border-purple-200 shadow-sm">
                            <p className="text-sm font-semibold text-slate-700">
                                {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                            </p>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <main className="flex-1 overflow-y-auto p-6">

                    {activeTab === 'doctors' && (
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 mb-6">
                            <h2 className="text-3xl font-bold text-white flex items-center space-x-3">
                                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                </svg>
                                <span>Doctor Management</span>
                            </h2>
                            <p className="text-blue-100 mt-2">Approve and manage doctor registrations</p>
                        </div>
                    )}
                    
                    {activeTab === 'patients' && (
                        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 mb-6">
                            <h2 className="text-3xl font-bold text-white flex items-center space-x-3">
                                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" clipRule="evenodd" />
                                </svg>
                                <span>Patient Management</span>
                            </h2>
                            <p className="text-green-100 mt-2">View and manage patient records</p>
                        </div>
                    )}
                    
                    {activeTab === 'billing' && (
                        <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-8 mb-6">
                            <h2 className="text-3xl font-bold text-white flex items-center space-x-3">
                                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                </svg>
                                <span>Billing Management</span>
                            </h2>
                            <p className="text-orange-100 mt-2">Manage payments and revenue tracking</p>
                            <div className="flex gap-4 mt-4">
                                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/30">
                                    <p className="text-sm text-orange-100">Daily Revenue</p>
                                    <p className="text-xl font-bold text-white">₹{dailyRevenue}</p>
                                </div>
                                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/30">
                                    <p className="text-sm text-orange-100">Monthly Revenue</p>
                                    <p className="text-xl font-bold text-white">₹{monthlyRevenue}</p>
                                </div>
                            </div>
                        </div>
                    )}
                    
                    <div className="flex justify-between items-center mb-6">
                        <button
                            onClick={activeTab === 'doctors' ? fetchDoctors : activeTab === 'patients' ? fetchPatients : fetchBilling}
                            className="bg-blue-600 hover:bg-blue-700 text-blue-600 px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                                    </svg>
                                    <span>Refreshing...</span>
                                </>
                            ) : (
                                <>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                    </svg>
                                    <span>Refresh Data</span>
                                </>
                            )}
                        </button>
                    </div>
                    
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 flex justify-between items-center">
                            <span>{error}</span>
                            <button 
                                onClick={() => setError(null)}
                                className="text-red-700 hover:text-red-900 font-bold"
                            >
                                ×
                            </button>
                        </div>
                    )}
                    
                    {loading ? (
                        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-12">
                            <div className="text-center">
                                <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mb-4"></div>
                                <div className="text-gray-600 text-lg font-medium">Loading {activeTab}...</div>
                            </div>
                        </div>
                    ) : activeTab === 'doctors' ? (
                        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full table-auto">
                                    <thead className="bg-gradient-to-r from-slate-50 to-blue-50">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">ID</th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Doctor Name</th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Specialty</th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {doctors.length > 0 ? (
                                            doctors.map((doctor) => (
                                                <tr key={doctor.id} className="hover:bg-blue-50/50 transition-colors">
                                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{doctor.id}</td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center">
                                                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                                                <span className="text-white font-semibold text-sm">
                                                                    {(doctor.firstName?.[0] || '') + (doctor.lastName?.[0] || '')}
                                                                </span>
                                                            </div>
                                                            <div className="ml-3">
                                                                <p className="text-sm font-medium text-gray-900">{doctor.firstName} {doctor.lastName}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-700">{doctor.specialty}</td>
                                                    <td className="px-6 py-4">
                                                        <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                                                            doctor.isApproved 
                                                                ? 'bg-green-100 text-green-800' 
                                                                : 'bg-yellow-100 text-yellow-800'
                                                        }`}>
                                                            {doctor.isApproved ? '✓ Approved' : '⏳ Pending'}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex gap-2">
                                                            {!doctor.isApproved && (
                                                                <button
                                                                    onClick={() => handleApprove(doctor.id)}
                                                                    disabled={actionLoading === `approve-${doctor.id}`}
                                                                    className="bg-green-600 hover:bg-green-700 text-green-600 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                                                                >
                                                                    {actionLoading === `approve-${doctor.id}` ? 'Approving...' : 'Approve'}
                                                                </button>
                                                            )}
                                                            <button
                                                                onClick={() => handleReject(doctor.id)}
                                                                disabled={actionLoading === `reject-${doctor.id}`}
                                                                className="bg-red-600 hover:bg-red-700 text-red-600 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                                                            >
                                                                {actionLoading === `reject-${doctor.id}` 
                                                                    ? 'Processing...' 
                                                                    : doctor.isApproved ? 'Revoke' : 'Reject'}
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="5" className="px-6 py-12 text-center">
                                                    <div className="text-gray-400">
                                                        <svg className="mx-auto h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                                                        </svg>
                                                        <h3 className="text-lg font-medium text-gray-900 mb-1">No doctors found</h3>
                                                        <p className="text-sm text-gray-500">No doctor registrations available</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : activeTab === 'patients' ? (
                        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full table-auto">
                                    <thead className="bg-gradient-to-r from-slate-50 to-green-50">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">ID</th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Patient Name</th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Contact</th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Date of Birth</th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {patients.length > 0 ? (
                                            patients.map((patient) => (
                                                <tr key={patient.id} className="hover:bg-green-50/50 transition-colors">
                                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{patient.id}</td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center">
                                                            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                                                                <span className="text-white font-semibold text-sm">
                                                                    {(patient.firstName?.[0] || '') + (patient.lastName?.[0] || '')}
                                                                </span>
                                                            </div>
                                                            <div className="ml-3">
                                                                <p className="text-sm font-medium text-gray-900">{patient.firstName} {patient.lastName}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-700">{patient.contactNumber}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-700">{patient.dob}</td>
                                                    <td className="px-6 py-4">
                                                        <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                                                            Active
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="5" className="px-6 py-12 text-center">
                                                    <div className="text-gray-400">
                                                        <svg className="mx-auto h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                                        </svg>
                                                        <h3 className="text-lg font-medium text-gray-900 mb-1">No patients found</h3>
                                                        <p className="text-sm text-gray-500">No patient records available</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full table-auto">
                                    <thead className="bg-gradient-to-r from-slate-50 to-orange-50">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Billing ID</th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Appointment ID</th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Amount</th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {billing.length > 0 ? (
                                            billing.map((bill) => (
                                                <tr key={bill.id} className="hover:bg-orange-50/50 transition-colors">
                                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{bill.id}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-900">{bill.appointmentId}</td>
                                                    <td className="px-6 py-4">
                                                        <span className="text-lg font-bold text-gray-900">₹{bill.amount}</span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                                                            bill.billingStatus === 'PAID' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                                        }`}>
                                                            {bill.billingStatus}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex gap-2">
                                                            <button
                                                                onClick={() => handleBillingStatusUpdate(bill.id, 'PAID')}
                                                                disabled={actionLoading === `billing-${bill.id}` || bill.billingStatus === 'PAID'}
                                                                className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 shadow-sm"
                                                            >
                                                                Mark Paid
                                                            </button>
                                                            <button
                                                                onClick={() => handleBillingStatusUpdate(bill.id, 'UNPAID')}
                                                                disabled={actionLoading === `billing-${bill.id}` || bill.billingStatus === 'UNPAID'}
                                                                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 shadow-sm"
                                                            >
                                                                Mark Unpaid
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="5" className="px-6 py-12 text-center">
                                                    <div className="text-gray-400">
                                                        <svg className="mx-auto h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" />
                                                        </svg>
                                                        <h3 className="text-lg font-medium text-gray-900 mb-1">No billing records found</h3>
                                                        <p className="text-sm text-gray-500">No billing data available</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;