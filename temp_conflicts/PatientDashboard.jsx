<<<<<<< HEAD
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, Routes, Route, Link, useLocation } from "react-router-dom";
import { Search, Bell, Settings, LogOut, Menu, X } from "lucide-react";
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { setAppointments, setLoading } from '../../store/slices/appointmentsSlice';
import { setPrescriptions } from '../../store/slices/prescriptionsSlice';
import { setCurrentPatient } from '../../store/slices/patientsSlice';
=======
import React, { useState, useEffect } from "react";
import { useNavigate, Routes, Route, Link, useLocation } from "react-router-dom";
import { Search, Bell, Settings, LogOut, Menu, X } from "lucide-react";
>>>>>>> e7ee58140669b1cf6ba47542fd6dfd5a84117303
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

<<<<<<< HEAD
const DashboardHome = () => {
    const { list: appointments } = useAppSelector(state => state.appointments);
    const { currentPatient: patientProfile } = useAppSelector(state => state.patients);
=======
const DashboardHome = ({ appointments, patientProfile }) => {
>>>>>>> e7ee58140669b1cf6ba47542fd6dfd5a84117303
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
<<<<<<< HEAD
                        <div className="p-3 bg-linear-to-br from-blue-500 to-blue-600 rounded-xl group-hover:from-blue-600 group-hover:to-blue-700 transition-all">
=======
                        <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl group-hover:from-blue-600 group-hover:to-blue-700 transition-all">
>>>>>>> e7ee58140669b1cf6ba47542fd6dfd5a84117303
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
<<<<<<< HEAD
                        <div className="p-3 bg-linear-to-br from-emerald-500 to-emerald-600 rounded-xl group-hover:from-emerald-600 group-hover:to-emerald-700 transition-all">
=======
                        <div className="p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl group-hover:from-emerald-600 group-hover:to-emerald-700 transition-all">
>>>>>>> e7ee58140669b1cf6ba47542fd6dfd5a84117303
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
<<<<<<< HEAD
                        <div className="p-3 bg-linear-to-br from-purple-500 to-purple-600 rounded-xl group-hover:from-purple-600 group-hover:to-purple-700 transition-all">
=======
                        <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl group-hover:from-purple-600 group-hover:to-purple-700 transition-all">
>>>>>>> e7ee58140669b1cf6ba47542fd6dfd5a84117303
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
<<<<<<< HEAD
                        <div className="p-3 bg-linear-to-br from-orange-500 to-orange-600 rounded-xl group-hover:from-orange-600 group-hover:to-orange-700 transition-all">
=======
                        <div className="p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl group-hover:from-orange-600 group-hover:to-orange-700 transition-all">
>>>>>>> e7ee58140669b1cf6ba47542fd6dfd5a84117303
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
<<<<<<< HEAD
    const dispatch = useAppDispatch();
    const userEmail = getUserEmail();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [error, setError] = useState(null);

    // Redux state
    const { loading } = useAppSelector(state => state.appointments);
    const { list: prescriptions } = useAppSelector(state => state.prescriptions);
    const { currentPatient: patientProfile } = useAppSelector(state => state.patients);

    const handlePrintPrescription = (prescription) => {
        const printWindow = window.open('', '_blank');
        const printContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Prescription - ${prescription.id}</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
                    .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 20px; margin-bottom: 30px; }
                    .prescription-info { margin-bottom: 30px; }
                    .section { margin-bottom: 20px; }
                    .label { font-weight: bold; color: #333; }
                    .value { margin-left: 10px; }
                    .medication-box { border: 1px solid #ddd; padding: 15px; border-radius: 8px; background-color: #f9f9f9; }
                    .footer { margin-top: 40px; text-align: center; font-size: 12px; color: #666; }
                    @media print { body { margin: 20px; } }
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>HealthCare System</h1>
                    <h2>Medical Prescription</h2>
                </div>
                
                <div class="prescription-info">
                    <div class="section">
                        <span class="label">Prescription ID:</span>
                        <span class="value">#${prescription.id}</span>
                    </div>
                    <div class="section">
                        <span class="label">Appointment ID:</span>
                        <span class="value">#${prescription.appointmentId}</span>
                    </div>
                    <div class="section">
                        <span class="label">Patient:</span>
                        <span class="value">${patientProfile ? `${patientProfile.firstName} ${patientProfile.lastName}` : userEmail}</span>
                    </div>
                    <div class="section">
                        <span class="label">Patient ID:</span>
                        <span class="value">P${patientProfile?.id || '----'}</span>
                    </div>
                    <div class="section">
                        <span class="label">Date:</span>
                        <span class="value">${new Date().toLocaleDateString()}</span>
                    </div>
                </div>
                
                <div class="medication-box">
                    <h3>Prescribed Medication</h3>
                    <div class="section">
                        <span class="label">Medication Details:</span>
                        <div class="value">${prescription.medicationDetails}</div>
                    </div>
                    <div class="section">
                        <span class="label">Dosage Instructions:</span>
                        <div class="value">${prescription.dosages}</div>
                    </div>
                </div>
                
                <div class="footer">
                    <p>This prescription was generated electronically by HealthCare System</p>
                    <p>For any queries, please contact our support team</p>
                </div>
            </body>
            </html>
        `;
        
        printWindow.document.write(printContent);
        printWindow.document.close();
        
        // Wait for content to load before printing
        printWindow.onload = function() {
            printWindow.focus();
            printWindow.print();
            
            // Close window after print dialog is handled
            setTimeout(() => {
                printWindow.close();
            }, 1000);
        };
        
        // Fallback for browsers that don't support onload
        setTimeout(() => {
            printWindow.focus();
            printWindow.print();
            setTimeout(() => {
                printWindow.close();
            }, 1000);
        }, 500);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch(setLoading(true));
                const appointmentsRes = await getMyAppointments().catch(() => ({ data: [] }));
                const prescriptionsRes = await getMyPrescriptions().catch(() => ({ data: [] }));
                const profileRes = await getMyProfile().catch(() => ({ data: null }));
                dispatch(setAppointments(appointmentsRes.data || []));
                dispatch(setPrescriptions(prescriptionsRes.data || []));
                dispatch(setCurrentPatient(profileRes.data));
                setError(null);
            } catch (err) {
                console.error("Failed to fetch patient data:", err);
                dispatch(setAppointments([]));
                dispatch(setPrescriptions([]));
                dispatch(setCurrentPatient(null));
                if (err.response && (err.response.status === 401 || err.response.status === 403)) {
                    handleLogout();
                } else {
                    setError("Some data could not be loaded. Please check your connection.");
                }
            } finally {
                dispatch(setLoading(false));
            }
        };

        fetchData();
    }, [dispatch, handleLogout]);

    const handleLogout = useCallback(() => {
        removeToken();
        navigate("/login");
    }, [navigate]);

=======
    const userEmail = getUserEmail();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const [appointments, setAppointments] = useState([]);
    const [prescriptions, setPrescriptions] = useState([]);
    const [patientProfile, setPatientProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handlePrintPrescription = (prescription) => {
        const printWindow = window.open('', '_blank');
        const printContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Prescription - ${prescription.id}</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
                    .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 20px; margin-bottom: 30px; }
                    .prescription-info { margin-bottom: 30px; }
                    .section { margin-bottom: 20px; }
                    .label { font-weight: bold; color: #333; }
                    .value { margin-left: 10px; }
                    .medication-box { border: 1px solid #ddd; padding: 15px; border-radius: 8px; background-color: #f9f9f9; }
                    .footer { margin-top: 40px; text-align: center; font-size: 12px; color: #666; }
                    @media print { body { margin: 20px; } }
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>HealthCare System</h1>
                    <h2>Medical Prescription</h2>
                </div>
                
                <div class="prescription-info">
                    <div class="section">
                        <span class="label">Prescription ID:</span>
                        <span class="value">#${prescription.id}</span>
                    </div>
                    <div class="section">
                        <span class="label">Appointment ID:</span>
                        <span class="value">#${prescription.appointmentId}</span>
                    </div>
                    <div class="section">
                        <span class="label">Patient:</span>
                        <span class="value">${patientProfile ? `${patientProfile.firstName} ${patientProfile.lastName}` : userEmail}</span>
                    </div>
                    <div class="section">
                        <span class="label">Patient ID:</span>
                        <span class="value">P${patientProfile?.id || '----'}</span>
                    </div>
                    <div class="section">
                        <span class="label">Date:</span>
                        <span class="value">${new Date().toLocaleDateString()}</span>
                    </div>
                </div>
                
                <div class="medication-box">
                    <h3>Prescribed Medication</h3>
                    <div class="section">
                        <span class="label">Medication Details:</span>
                        <div class="value">${prescription.medicationDetails}</div>
                    </div>
                    <div class="section">
                        <span class="label">Dosage Instructions:</span>
                        <div class="value">${prescription.dosages}</div>
                    </div>
                </div>
                
                <div class="footer">
                    <p>This prescription was generated electronically by HealthCare System</p>
                    <p>For any queries, please contact our support team</p>
                </div>
            </body>
            </html>
        `;
        
        printWindow.document.write(printContent);
        printWindow.document.close();
        
        // Wait for content to load before printing
        printWindow.onload = function() {
            printWindow.focus();
            printWindow.print();
            
            // Close window after print dialog is handled
            setTimeout(() => {
                printWindow.close();
            }, 1000);
        };
        
        // Fallback for browsers that don't support onload
        setTimeout(() => {
            printWindow.focus();
            printWindow.print();
            setTimeout(() => {
                printWindow.close();
            }, 1000);
        }, 500);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const appointmentsRes = await getMyAppointments().catch(() => ({ data: [] }));
                const prescriptionsRes = await getMyPrescriptions().catch(() => ({ data: [] }));
                const profileRes = await getMyProfile().catch(() => ({ data: null }));
                setAppointments(appointmentsRes.data || []);
                setPrescriptions(prescriptionsRes.data || []);
                setPatientProfile(profileRes.data);
                setError(null);
            } catch (err) {
                console.error("Failed to fetch patient data:", err);
                setAppointments([]);
                setPrescriptions([]);
                setPatientProfile(null);
                if (err.response && (err.response.status === 401 || err.response.status === 403)) {
                    handleLogout();
                } else {
                    setError("Some data could not be loaded. Please check your connection.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleLogout = () => {
        removeToken();
        navigate("/login");
    };

>>>>>>> e7ee58140669b1cf6ba47542fd6dfd5a84117303
    const getIcon = (iconName) => {
        const iconProps = { className: "w-5 h-5" };
        switch (iconName) {
            case 'dashboard':
                return <svg {...iconProps} fill="currentColor" viewBox="0 0 20 20"><path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" /></svg>;
            case 'doctors':
                return <svg {...iconProps} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>;
            case 'calendar':
                return <svg {...iconProps} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0V6a2 2 0 012-2h4a2 2 0 012 2v1m-6 0h8m-8 0l1 12a2 2 0 002 2h6a2 2 0 002-2l1-12m-8 0V9a2 2 0 012-2h4a2 2 0 012 2v0" /></svg>;
            case 'appointments':
                return <svg {...iconProps} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>;
            case 'medicine':
                return <svg {...iconProps} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;
            case 'settings':
                return <svg {...iconProps} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
            default:
                return <div className="w-5 h-5 bg-gray-400 rounded"></div>;
        }
    };

    const Sidebar = () => (
<<<<<<< HEAD
        <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-gray-50 text-gray-800 flex flex-col shadow-2xl border-r border-gray-200 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 transition-transform duration-300 ease-in-out`}>
            <div className="p-8 border-b border-gray-200">
                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                            <img src={logo} alt="HealthCare Logo" className="w-8 h-8" />
                        </div>
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-gray-50"></div>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">HealthCare</h2>
                        <p className="text-sm text-gray-600 font-medium">Patient Portal</p>
=======
        <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col shadow-2xl border-r border-slate-700 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 transition-transform duration-300 ease-in-out`}>
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
>>>>>>> e7ee58140669b1cf6ba47542fd6dfd5a84117303
                    </div>
                </div>
            </div>

            <nav className="flex-1 px-6 py-6 space-y-3">
                <div className="mb-4">
<<<<<<< HEAD
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Main Menu</p>
=======
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Main Menu</p>
>>>>>>> e7ee58140669b1cf6ba47542fd6dfd5a84117303
                </div>
                
                {navItems.map((item, i) => (
                    <Link
                        key={i}
                        to={item.path}
                        onClick={() => setIsSidebarOpen(false)}
                        className={`group relative rounded-xl px-4 py-3.5 flex items-center space-x-3 cursor-pointer transition-all duration-200 ${
                            location.pathname === item.path
<<<<<<< HEAD
                                ? 'bg-cyan-300 text-white shadow-lg shadow-blue-600/25'
                                : 'text-gray-700 hover:text-gray-900 hover:bg-white'
                        }`}
                    >
                        <div className={`p-2 rounded-lg transition-colors ${
                            location.pathname === item.path ? 'bg-amber-100 ' : 'bg-white group-hover:bg-gray-100'
=======
                                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-500/25'
                                : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                        }`}
                    >
                        <div className={`p-2 rounded-lg transition-colors ${
                            location.pathname === item.path ? 'bg-white/20' : 'bg-slate-700/50 group-hover:bg-slate-600/50'
>>>>>>> e7ee58140669b1cf6ba47542fd6dfd5a84117303
                        }`}>
                            {getIcon(item.icon)}
                        </div>
                        <span className="font-medium">{item.name}</span>
                        {location.pathname === item.path && <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-white rounded-l-full"></div>}
                    </Link>
                ))}
            </nav>

<<<<<<< HEAD
            <div className="p-6 border-t border-gray-200 bg-white">
                <div className="flex items-center space-x-4 mb-6">
                    <div className="relative">
                        <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
=======
            <div className="p-6 border-t border-slate-700/50 bg-slate-800/30">
                <div className="flex items-center space-x-4 mb-6">
                    <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
>>>>>>> e7ee58140669b1cf6ba47542fd6dfd5a84117303
                            <img
                                src={localStorage.getItem('profilePicture') || "https://i.pravatar.cc/48?img=5"}
                                alt="Profile"
                                className="w-10 h-10 rounded-lg object-cover"
                            />
                        </div>
<<<<<<< HEAD
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-800">{patientProfile ? `${patientProfile.firstName} ${patientProfile.lastName}` : userEmail}</p>
                        <p className="text-xs text-gray-600">Patient ID: P{patientProfile?.id || '----'}</p>
=======
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-slate-800"></div>
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-semibold text-white">{patientProfile ? `${patientProfile.firstName} ${patientProfile.lastName}` : userEmail}</p>
                        <p className="text-xs text-slate-400">Patient ID: P{patientProfile?.id || '----'}</p>
>>>>>>> e7ee58140669b1cf6ba47542fd6dfd5a84117303
                    </div>
                </div>
                
                <button
                    onClick={handleLogout}
<<<<<<< HEAD
                    className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] flex items-center justify-center space-x-2"
=======
                    className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] flex items-center justify-center space-x-2"
>>>>>>> e7ee58140669b1cf6ba47542fd6dfd5a84117303
                >
                    <LogOut size={16} />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );

    return (
        <div className="flex h-screen bg-slate-50">
            {/* Overlay for mobile */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-40 z-40 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}

            <Sidebar />

            {/* Main Section */}
            <main className="flex-1 md:ml-72 p-4 sm:p-6 lg:p-8 min-w-0 overflow-y-auto">
                {/* Header */}
                <header className="bg-gradient-to-r from-white via-emerald-50 to-teal-50 shadow-lg border-b border-emerald-100 px-8 py-6 rounded-2xl mb-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <button
                                className="md:hidden mr-4 text-gray-600"
                                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                                aria-label="Open menu"
                            >
                                {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                            <div>
                                <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-emerald-600 bg-clip-text text-transparent">Patient Portal</h1>
                                <p className="text-slate-600 font-medium mt-1">Welcome back, {userEmail}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="bg-white/70 backdrop-blur-sm px-4 py-2 rounded-xl border border-emerald-200 shadow-sm">
                                <p className="text-sm font-semibold text-slate-700">
                                    {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                </p>
                            </div>
<<<<<<< HEAD
                            <button
                                onClick={handleLogout}
                                className="bg-red-600 hover:bg-red-700 text-red-600 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] flex items-center space-x-2"
                                title="Logout"
                            >
                                <LogOut size={16} />
                                <span className="hidden sm:inline">Logout</span>
                            </button>
=======
>>>>>>> e7ee58140669b1cf6ba47542fd6dfd5a84117303
                            <div className="flex items-center space-x-3">
                                <img
                                    src={localStorage.getItem('profilePicture') || "https://i.pravatar.cc/40?img=5"}
                                    alt="Profile"
                                    className="w-10 h-10 rounded-full border-2 border-emerald-200 object-cover shadow-sm"
                                />
                                <div className="hidden sm:block">
                                    <p className="text-sm font-semibold text-gray-800">
                                        {patientProfile ? `${patientProfile.firstName} ${patientProfile.lastName}` : userEmail || "Patient"}
                                    </p>
                                    <p className="text-xs text-emerald-600 font-medium">Patient ID: P{patientProfile?.id || '----'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <Routes>
                    <Route index element={
                        loading ? (
                            <div className="text-center p-10">Loading...</div>
                        ) : error ? (
                            <div className="text-center p-10 text-red-500">{error}</div>
                        ) : (
<<<<<<< HEAD
                            <DashboardHome />
=======
                            <DashboardHome appointments={appointments} patientProfile={patientProfile} />
>>>>>>> e7ee58140669b1cf6ba47542fd6dfd5a84117303
                        )
                    } />
                    <Route path="doctors" element={<DoctorsList />} />
                    <Route path="new-appointment" element={<NewAppointment />} />
                    <Route path="appointments" element={<AppointmentHistory />} />
                    <Route path="medicine" element={
                        <>
                            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 mb-8">
                                <h2 className="text-3xl font-bold text-white flex items-center space-x-3">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    <span>My Prescriptions</span>
                                </h2>
                                <p className="text-purple-100 mt-2">View and manage your prescribed medications</p>
                            </div>
                            
                            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
                                {prescriptions.length > 0 ? (
                                    <div className="divide-y divide-gray-200">
                                        {prescriptions.map((prescription) => (
                                            <div key={prescription.id} className="p-6 hover:bg-purple-50/50 transition-colors">
                                                <div className="flex items-start justify-between mb-4">
                                                    <div className="flex items-center space-x-4">
<<<<<<< HEAD
                                                        <div className="w-12 h-12 bg-linear-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
=======
                                                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
>>>>>>> e7ee58140669b1cf6ba47542fd6dfd5a84117303
                                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                            </svg>
                                                        </div>
                                                        <div>
                                                            <h4 className="text-lg font-bold text-gray-900">Prescription #{prescription.id}</h4>
                                                            <p className="text-sm text-purple-600 font-medium">Appointment #{prescription.appointmentId}</p>
                                                        </div>
                                                    </div>
                                                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                                                        Active
                                                    </span>
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                                                    <div className="bg-gray-50 rounded-xl p-4">
                                                        <p className="text-sm font-semibold text-gray-700 mb-2">Medication Details:</p>
                                                        <p className="text-gray-900 font-medium">{prescription.medicationDetails}</p>
                                                    </div>
                                                    <div className="bg-gray-50 rounded-xl p-4">
                                                        <p className="text-sm font-semibold text-gray-700 mb-2">Dosage Instructions:</p>
                                                        <p className="text-gray-900 font-medium">{prescription.dosages}</p>
                                                    </div>
                                                </div>
                                                <div className="flex justify-end">
                                                    <button
                                                        onClick={() => handlePrintPrescription(prescription)}
                                                        className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] flex items-center space-x-2"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                                                        </svg>
                                                        <span>Print Prescription</span>
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-16">
                                        <div className="text-gray-400">
                                            <svg className="mx-auto h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                            <h4 className="text-xl font-semibold text-gray-900 mb-2">No prescriptions found</h4>
                                            <p className="text-gray-500">Your prescribed medications will appear here</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </>
                    } />
                    <Route path="settings" element={
                        <>
                            <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-8 mb-8">
                                <h2 className="text-3xl font-bold text-white flex items-center space-x-3">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span>Profile Settings</span>
                                </h2>
                                <p className="text-orange-100 mt-2">Manage your profile and account preferences</p>
                            </div>
                            
                            <div className="space-y-8">
                                {/* Profile Picture Section */}
                                <div className="bg-white rounded-2xl p-8 shadow-xl border border-slate-200">
                                    <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-3">
                                        <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <span>Profile Picture</span>
                                    </h4>
                                    <div className="flex items-center space-x-8">
                                        <div className="relative">
                                            <img
                                                src={localStorage.getItem('profilePicture') || "https://i.pravatar.cc/120?img=5"}
                                                alt="Profile"
                                                className="w-32 h-32 rounded-2xl border-4 border-orange-200 object-cover shadow-lg"
                                            />
                                            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white"></div>
                                        </div>
                                        <div className="flex-1">
                                            <div className="space-y-4">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => {
                                                        const file = e.target.files[0];
                                                        if (file) {
                                                            const reader = new FileReader();
                                                            reader.onload = (event) => {
                                                                localStorage.setItem('profilePicture', event.target.result);
                                                                window.location.reload();
                                                            };
                                                            reader.readAsDataURL(file);
                                                        }
                                                    }}
                                                    className="hidden"
                                                    id="profilePicture"
                                                />
                                                <label
                                                    htmlFor="profilePicture"
                                                    className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-6 py-3 rounded-xl cursor-pointer transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] inline-flex items-center space-x-2 font-semibold"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                                    </svg>
                                                    <span>Upload New Picture</span>
                                                </label>
                                                <button
                                                    onClick={() => {
                                                        localStorage.removeItem('profilePicture');
                                                        window.location.reload();
                                                    }}
                                                    className="ml-4 bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-xl transition-all duration-200 font-semibold inline-flex items-center space-x-2"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                    <span>Remove</span>
                                                </button>
                                            </div>
                                            <p className="text-sm text-gray-500 mt-4">Upload a profile picture to personalize your account. Recommended size: 400x400px</p>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Account Information */}
                                <div className="bg-white rounded-2xl p-8 shadow-xl border border-slate-200">
                                    <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-3">
                                        <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        <span>Account Information</span>
                                    </h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="bg-gray-50 rounded-xl p-4">
                                            <p className="text-sm font-semibold text-gray-700 mb-2">Full Name:</p>
                                            <p className="text-gray-900 font-medium">
                                                {patientProfile ? `${patientProfile.firstName} ${patientProfile.lastName}` : 'Not available'}
                                            </p>
                                        </div>
                                        <div className="bg-gray-50 rounded-xl p-4">
                                            <p className="text-sm font-semibold text-gray-700 mb-2">Patient ID:</p>
                                            <p className="text-gray-900 font-medium">P{patientProfile?.id || '----'}</p>
                                        </div>
                                        <div className="bg-gray-50 rounded-xl p-4">
                                            <p className="text-sm font-semibold text-gray-700 mb-2">Email:</p>
                                            <p className="text-gray-900 font-medium">{userEmail || 'Not available'}</p>
                                        </div>
                                        <div className="bg-gray-50 rounded-xl p-4">
                                            <p className="text-sm font-semibold text-gray-700 mb-2">Date of Birth:</p>
                                            <p className="text-gray-900 font-medium">{patientProfile?.dob || 'Not available'}</p>
                                        </div>
                                    </div>
                                    <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                                        <p className="text-sm text-blue-800">
                                            <svg className="w-4 h-4 inline mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                            </svg>
                                            To update your personal information, please contact our support team.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </>
                    } />
                </Routes>
            </main>
        </div>
    );
};

export default PatientDashboard;
