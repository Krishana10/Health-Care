import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, Routes, Route, Link, useLocation } from "react-router-dom";
import { Search, Bell, Settings, LogOut, Menu, X } from "lucide-react";
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { setAppointments, setLoading } from '../../store/slices/appointmentsSlice';
import { setPrescriptions } from '../../store/slices/prescriptionsSlice';
import { setCurrentPatient } from '../../store/slices/patientsSlice';
import { removeToken, getUserEmail } from "../../Services/AuthService.js";
import { getMyAppointments, getMyPrescriptions, getMyProfile } from "../../Services/PatientService.js";
import logo from "../../assets/OnlyLogo.svg";
import DoctorsList from "../Patient SubComponent/DoctorsList.jsx";
import NewAppointment from "../Patient SubComponent/NewAppointment.jsx";
import AppointmentHistory from "../Patient SubComponent/AppointmentHistory.jsx";

const navItems = [
    { name: "Dashboard", path: "/patient", icon: "dashboard" },
    { name: "Find Doctors", path: "/patient/doctors", icon: "doctors" },
    { name: "Book Appointment", path: "/patient/new-appointment", icon: "calendar" },
    { name: "My Appointments", path: "/patient/appointments", icon: "appointments" },
    { name: "Prescriptions", path: "/patient/medicine", icon: "medicine" },
    { name: "Settings", path: "/patient/settings", icon: "settings" },
];

const DashboardHome = () => {
    const { list: appointments } = useAppSelector(state => state.appointments);
    const { currentPatient: patientProfile } = useAppSelector(state => state.patients);
    const userEmail = getUserEmail();
    const upcomingAppointments = appointments?.filter(a => new Date(a.appointmentDate) > new Date()).sort((a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate));
    const nextAppointment = upcomingAppointments?.[0];

    return (
        <>
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 mb-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-2">Welcome Back!</h2>
                        <p className="text-emerald-100 text-lg">
                            {patientProfile ? `${patientProfile.firstName} ${patientProfile.lastName}` : userEmail || "Patient"}
                        </p>
                        <p className="text-emerald-200 text-sm mt-1">Patient ID: P{patientProfile?.id || '----'}</p>
                    </div>
                    <div className="hidden md:block">
                        <img
                            src={localStorage.getItem('profilePicture') || "https://i.pravatar.cc/100?img=5"}
                            alt="Patient"
                            className="w-24 h-24 rounded-2xl border-4 border-white/30 object-cover shadow-xl"
                        />
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-2xl p-6 shadow-xl border border-slate-200">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0V6a2 2 0 012-2h4a2 2 0 012 2v1m-6 0h8m-8 0l1 12a2 2 0 002 2h6a2 2 0 002-2l1-12m-8 0V9a2 2 0 012-2h4a2 2 0 012 2v0" />
                            </svg>
                        </div>
                    </div>
                    <h3 className="text-sm font-semibold text-gray-600 mb-2">Next Appointment</h3>
                    <p className="text-2xl font-bold text-gray-900 mb-1">
                        {nextAppointment ? new Date(nextAppointment.appointmentDate).toLocaleDateString() : "None"}
                    </p>
                    <p className="text-sm text-gray-500">
                        {nextAppointment ? `Dr. ${nextAppointment.doctorFirstName} ${nextAppointment.doctorLastName}` : "No upcoming appointments"}
                    </p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-xl border border-slate-200">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                        </div>
                    </div>
                    <h3 className="text-sm font-semibold text-gray-600 mb-2">Upcoming Appointments</h3>
                    <p className="text-2xl font-bold text-gray-900 mb-1">{upcomingAppointments?.length || 0}</p>
                    <p className="text-sm text-gray-500">Scheduled</p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-xl border border-slate-200">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl">
                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                    <h3 className="text-sm font-semibold text-gray-600 mb-2">Total Appointments</h3>
                    <p className="text-2xl font-bold text-gray-900 mb-1">{appointments.length}</p>
                    <p className="text-sm text-gray-500">All Time</p>
                </div>
            </div>

            {/* Upcoming Appointments Section */}
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-slate-200 mb-8">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-gray-800">Upcoming Appointments</h3>
                    <Link 
                        to="/patient/appointments" 
                        className="text-emerald-600 hover:text-emerald-700 font-semibold text-sm flex items-center space-x-1"
                    >
                        <span>View All</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>
                {upcomingAppointments?.length > 0 ? (
                    <div className="space-y-4">
                        {upcomingAppointments.slice(0, 3).map((appointment) => (
                            <div key={appointment.id} className="border border-slate-200 rounded-xl p-6 bg-gradient-to-r from-slate-50 to-emerald-50 hover:from-emerald-50 hover:to-teal-50 transition-all duration-200 shadow-sm hover:shadow-md">
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-bold text-gray-900 text-lg">
                                                Dr. {appointment.doctorFirstName} {appointment.doctorLastName}
                                            </h4>
                                            <p className="text-emerald-600 font-medium">{appointment.doctorSpecialty}</p>
                                            <p className="text-slate-600 font-medium mt-1">
                                                {new Date(appointment.appointmentDate).toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                    <span className={`px-4 py-2 rounded-xl text-sm font-semibold ${
                                        appointment.status === 'SCHEDULED' ? 'bg-green-100 text-green-800' : 
                                        appointment.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-gray-100 text-gray-800'
                                    }`}>
                                        {appointment.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                        {upcomingAppointments.length > 3 && (
                            <div className="text-center pt-4">
                                <p className="text-slate-600 font-medium">+{upcomingAppointments.length - 3} more appointments</p>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <div className="text-gray-400">
                            <svg className="mx-auto h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0V6a2 2 0 012-2h4a2 2 0 012 2v1m-6 0h8m-8 0l1 12a2 2 0 002 2h6a2 2 0 002-2l1-12m-8 0V9a2 2 0 012-2h4a2 2 0 012 2v0" />
                            </svg>
                            <h4 className="text-xl font-semibold text-gray-900 mb-2">No upcoming appointments</h4>
                            <p className="text-gray-500 mb-6">Book a new appointment to get started</p>
                            <Link 
                                to="/patient/new-appointment" 
                                className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] inline-flex items-center space-x-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                <span>Book Appointment</span>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Link to="/patient/doctors" className="bg-white rounded-2xl p-6 shadow-xl border border-slate-200 hover:shadow-2xl transition-all duration-200 transform hover:scale-[1.02] group">
                    <div className="flex items-center space-x-4">
                        <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl group-hover:from-blue-600 group-hover:to-blue-700 transition-all">
                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900">Find Doctors</h4>
                            <p className="text-sm text-gray-500">Browse specialists</p>
                        </div>
                    </div>
                </Link>

                <Link to="/patient/new-appointment" className="bg-white rounded-2xl p-6 shadow-xl border border-slate-200 hover:shadow-2xl transition-all duration-200 transform hover:scale-[1.02] group">
                    <div className="flex items-center space-x-4">
                        <div className="p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl group-hover:from-emerald-600 group-hover:to-emerald-700 transition-all">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900">Book Appointment</h4>
                            <p className="text-sm text-gray-500">Schedule visit</p>
                        </div>
                    </div>
                </Link>

                <Link to="/patient/medicine" className="bg-white rounded-2xl p-6 shadow-xl border border-slate-200 hover:shadow-2xl transition-all duration-200 transform hover:scale-[1.02] group">
                    <div className="flex items-center space-x-4">
                        <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl group-hover:from-purple-600 group-hover:to-purple-700 transition-all">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900">Prescriptions</h4>
                            <p className="text-sm text-gray-500">View medicines</p>
                        </div>
                    </div>
                </Link>

                <Link to="/patient/settings" className="bg-white rounded-2xl p-6 shadow-xl border border-slate-200 hover:shadow-2xl transition-all duration-200 transform hover:scale-[1.02] group">
                    <div className="flex items-center space-x-4">
                        <div className="p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl group-hover:from-orange-600 group-hover:to-orange-700 transition-all">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900">Settings</h4>
                            <p className="text-sm text-gray-500">Manage profile</p>
                        </div>
                    </div>
                </Link>
            </div>
        </>
    );
};

const PatientDashboard = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();
    const userEmail = getUserEmail();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [error, setError] = useState(null);

    // Redux state
    const { loading } = useAppSelector(state => state.appointments);
    const { list: prescriptions } = useAppSelector(state => state.prescriptions);
    const { currentPatient: patientProfile } = useAppSelector(state => state.patients);

    useEffect(() => {
        fetchProfile();
        fetchAppointments();
        fetchPrescriptions();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await getMyProfile();
            dispatch(setCurrentPatient(response.data));
        } catch (error) {
            console.error('Error fetching profile:', error);
            setError('Failed to load profile');
        }
    };

    const fetchAppointments = async () => {
        try {
            dispatch(setLoading(true));
            const response = await getMyAppointments();
            dispatch(setAppointments(response.data));
        } catch (error) {
            console.error('Error fetching appointments:', error);
        } finally {
            dispatch(setLoading(false));
        }
    };

    const fetchPrescriptions = async () => {
        try {
            const response = await getMyPrescriptions();
            dispatch(setPrescriptions(response.data || []));
        } catch (error) {
            console.error('Error fetching prescriptions:', error);
            dispatch(setPrescriptions([]));
        }
    };

    const handleLogout = () => {
        removeToken();
        navigate('/login');
    };

    return (
        <div className="flex h-screen bg-slate-50">
            {/* Sidebar */}
            <div className="w-72 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col shadow-2xl border-r border-slate-700">
                <div className="p-8 border-b border-slate-700/50">
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                                <img src={logo} alt="HealthCare Logo" className="w-8 h-8" />
                            </div>
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-slate-900"></div>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white">HealthCare</h2>
                            <p className="text-sm text-slate-400 font-medium">Patient Portal</p>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 px-6 py-6 space-y-3 overflow-y-auto">
                    {navItems.map((item, index) => {
                        const isActive = location.pathname === item.path || (location.pathname.startsWith('/patient') && item.path === '/patient');
                        return (
                            <Link
                                key={index}
                                to={item.path}
                                onClick={() => setIsSidebarOpen(false)}
                                className={`group relative rounded-xl px-4 py-3.5 flex items-center space-x-3 transition-all duration-200 ${
                                    isActive
                                        ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-500/25'
                                        : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                                }`}
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                                </svg>
                                <span className="font-medium">{item.name}</span>
                                {isActive && <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-white rounded-l-full"></div>}
                            </Link>
                        );
                    })}
                </nav>

                <div className="border-t border-slate-700/50 p-6">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-slate-300 hover:text-white hover:bg-red-600/20 transition-all duration-200 group"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <div className="bg-white border-b border-slate-200 px-8 py-4 shadow-sm">
                    <div className="flex items-center justify-between">
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="md:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                            {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
                        <div className="flex items-center space-x-4">
                            <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                                <Bell className="w-5 h-5 text-slate-600" />
                            </button>
                            <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                                <Settings className="w-5 h-5 text-slate-600" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto">
                    <Routes>
                        <Route path="/" element={<DashboardHome />} />
                        <Route path="/doctors" element={<DoctorsList />} />
                        <Route path="/new-appointment" element={<NewAppointment />} />
                        <Route path="/appointments" element={<AppointmentHistory />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default PatientDashboard;
