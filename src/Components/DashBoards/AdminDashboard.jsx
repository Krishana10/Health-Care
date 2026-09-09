import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { setDoctors, setPendingDoctors, setLoading as setDoctorsLoading, approveDoctor as approveDoctorAction } from '../../store/slices/doctorsSlice';
import { setPatients, setLoading as setPatientsLoading } from '../../store/slices/patientsSlice';
import { removeToken, getUserEmail, isAuthenticated, setupAxiosInterceptors } from "../../Services/AuthService.js";
import { getDoctors, approveDoctor, rejectDoctor, getPatients, getBilling, updateBillingStatus, getDailyRevenue, getMonthlyRevenue } from "../../Services/AdminService.js";
import logo from "../../assets/OnlyLogo.svg"

const AdminDashboard = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const userEmail = getUserEmail();
    
    // Redux state
    const { list: doctors, loading: doctorsLoading } = useAppSelector(state => state.doctors);
    const { list: patients, loading: patientsLoading } = useAppSelector(state => state.patients);
    
    // Local state
    const [billing, setBilling] = useState([]);
    const [dailyRevenue, setDailyRevenue] = useState(0);
    const [monthlyRevenue, setMonthlyRevenue] = useState(0);
    const [activeTab, setActiveTab] = useState('doctors');
    const [error, setError] = useState(null);
    const [actionLoading, setActionLoading] = useState(null);
    
    const loading = activeTab === 'doctors' ? doctorsLoading : activeTab === 'patients' ? patientsLoading : false;

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
            dispatch(setDoctorsLoading(true));
            
            const response = await getDoctors();
            dispatch(setDoctors(response.data));
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
            dispatch(setDoctorsLoading(false));
        }
    };

    const fetchPatients = async () => {
        try {
            dispatch(setPatientsLoading(true));
            const response = await getPatients();
            dispatch(setPatients(response.data));
            console.log('✅ Patients fetched successfully:', response.data.length);
        } catch (error) {
            console.error('Error fetching patients:', error);
            if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                return;
            }
            setError('Failed to load patients. Please try again.');
        } finally {
            dispatch(setPatientsLoading(false));
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
            dispatch(approveDoctorAction(id));
            
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
            const updatedDoctors = doctors.map(doctor => 
                doctor.id === id ? { ...doctor, isApproved: false } : doctor
            );
            dispatch(setDoctors(updatedDoctors));
            
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
                                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v2h8v-2zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-2a4 4 0 00-8 0v2a2 2 0 002 2h4a2 2 0 002-2z" />
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

                <div className="border-t border-slate-700/50 p-6">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-slate-300 hover:text-white hover:bg-red-600/20 transition-all duration-200"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                        </svg>
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <div className="bg-white border-b border-slate-200 px-8 py-4 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
                            <p className="text-sm text-gray-500 mt-1">Welcome back, Admin</p>
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto p-8">
                    {error && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                            <p className="text-red-700">{error}</p>
                        </div>
                    )}

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white rounded-lg shadow p-6">
                            <p className="text-gray-600 text-sm font-medium">Total Doctors</p>
                            <p className="text-3xl font-bold text-gray-800 mt-2">{doctors.length}</p>
                        </div>
                        <div className="bg-white rounded-lg shadow p-6">
                            <p className="text-gray-600 text-sm font-medium">Total Patients</p>
                            <p className="text-3xl font-bold text-gray-800 mt-2">{patients.length}</p>
                        </div>
                        <div className="bg-white rounded-lg shadow p-6">
                            <p className="text-gray-600 text-sm font-medium">Daily Revenue</p>
                            <p className="text-3xl font-bold text-green-600 mt-2">${dailyRevenue?.toFixed(2) || '0.00'}</p>
                        </div>
                        <div className="bg-white rounded-lg shadow p-6">
                            <p className="text-gray-600 text-sm font-medium">Monthly Revenue</p>
                            <p className="text-3xl font-bold text-green-600 mt-2">${monthlyRevenue?.toFixed(2) || '0.00'}</p>
                        </div>
                    </div>

                    {/* Doctors Tab */}
                    {activeTab === 'doctors' && (
                        <div className="bg-white rounded-lg shadow">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h2 className="text-xl font-bold text-gray-800">Doctors Management</h2>
                            </div>
                            <div className="overflow-x-auto">
                                {loading ? (
                                    <div className="p-6 text-center text-gray-500">Loading doctors...</div>
                                ) : doctors.length > 0 ? (
                                    <table className="w-full">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Specialty</th>
                                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {doctors.map(doctor => (
                                                <tr key={doctor.id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 text-sm text-gray-800">{doctor.firstName} {doctor.lastName}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-600">{doctor.email}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-600">{doctor.specialty}</td>
                                                    <td className="px-6 py-4 text-sm">
                                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                                            doctor.isApproved 
                                                                ? 'bg-green-100 text-green-800' 
                                                                : 'bg-yellow-100 text-yellow-800'
                                                        }`}>
                                                            {doctor.isApproved ? 'Approved' : 'Pending'}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm">
                                                        {!doctor.isApproved && (
                                                            <>
                                                                <button
                                                                    onClick={() => handleApprove(doctor.id)}
                                                                    disabled={actionLoading === `approve-${doctor.id}`}
                                                                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded mr-2 disabled:opacity-50"
                                                                >
                                                                    {actionLoading === `approve-${doctor.id}` ? 'Approving...' : 'Approve'}
                                                                </button>
                                                                <button
                                                                    onClick={() => handleReject(doctor.id)}
                                                                    disabled={actionLoading === `reject-${doctor.id}`}
                                                                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded disabled:opacity-50"
                                                                >
                                                                    {actionLoading === `reject-${doctor.id}` ? 'Rejecting...' : 'Reject'}
                                                                </button>
                                                            </>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <div className="p-6 text-center text-gray-500">No doctors found</div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Patients Tab */}
                    {activeTab === 'patients' && (
                        <div className="bg-white rounded-lg shadow">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h2 className="text-xl font-bold text-gray-800">Patients Management</h2>
                            </div>
                            <div className="overflow-x-auto">
                                {loading ? (
                                    <div className="p-6 text-center text-gray-500">Loading patients...</div>
                                ) : patients.length > 0 ? (
                                    <table className="w-full">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Phone</th>
                                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {patients.map(patient => (
                                                <tr key={patient.id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 text-sm text-gray-800">{patient.firstName} {patient.lastName}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-600">{patient.email}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-600">{patient.phoneNumber || 'N/A'}</td>
                                                    <td className="px-6 py-4 text-sm">
                                                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                            Active
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <div className="p-6 text-center text-gray-500">No patients found</div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Billing Tab */}
                    {activeTab === 'billing' && (
                        <div className="bg-white rounded-lg shadow">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h2 className="text-xl font-bold text-gray-800">Billing Management</h2>
                            </div>
                            <div className="overflow-x-auto">
                                {billing.length > 0 ? (
                                    <table className="w-full">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Invoice ID</th>
                                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Patient</th>
                                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Amount</th>
                                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {billing.map(bill => (
                                                <tr key={bill.id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 text-sm text-gray-800">#{bill.id}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-600">{bill.patientName}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-600">${bill.amount?.toFixed(2) || '0.00'}</td>
                                                    <td className="px-6 py-4 text-sm">
                                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                                            bill.billingStatus === 'PAID' 
                                                                ? 'bg-green-100 text-green-800' 
                                                                : 'bg-orange-100 text-orange-800'
                                                        }`}>
                                                            {bill.billingStatus}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm">
                                                        {bill.billingStatus !== 'PAID' && (
                                                            <button
                                                                onClick={() => handleBillingStatusUpdate(bill.id, 'PAID')}
                                                                disabled={actionLoading === `billing-${bill.id}`}
                                                                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded disabled:opacity-50"
                                                            >
                                                                {actionLoading === `billing-${bill.id}` ? 'Updating...' : 'Mark Paid'}
                                                            </button>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <div className="p-6 text-center text-gray-500">No billing records found</div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
