import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
<<<<<<< HEAD
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { setAppointments, setLoading, updateAppointment, setPatients } from '../../store/slices/appointmentsSlice';
import { setPrescriptions, addPrescription } from '../../store/slices/prescriptionsSlice';
import { selectCompletedAppointments, selectPendingAppointments, selectScheduledAppointments, selectTodayAppointments } from '../../store/selectors';
=======
>>>>>>> e7ee58140669b1cf6ba47542fd6dfd5a84117303
import { removeToken, getUserEmail, setupAxiosInterceptors } from "../../Services/AuthService.js";
// eslint-disable-next-line no-unused-vars
import { getMyAppointments, updateAppointmentStatus, createPrescription, getMyPatients, getMyPrescriptions } from "../../Services/DoctorService.js";
import logo from "../../assets/OnlyLogo.svg"
import totalPatient from  "../../assets/totalPatient.svg"
import scheduled from "../../assets/scheduled.svg"
import completed from "../../assets/completed.svg"
import pending from "../../assets/pending.svg"
import today from "../../assets/today.svg"

const DoctorDashboard = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const userEmail = getUserEmail();
<<<<<<< HEAD
    
    // Redux state
    const { list: appointments, loading, patients } = useAppSelector(state => state.appointments);
    const { list: prescriptions } = useAppSelector(state => state.prescriptions);
    
    // Local state
=======
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
>>>>>>> e7ee58140669b1cf6ba47542fd6dfd5a84117303
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [prescriptionData, setPrescriptionData] = useState({ medicationDetails: '', dosages: '' });
    const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
    const [activeView, setActiveView] = useState('dashboard');
    const [currentDate, setCurrentDate] = useState(new Date());
<<<<<<< HEAD
=======
    const [patients, setPatients] = useState([]);
    const [prescriptions, setPrescriptions] = useState([]);
>>>>>>> e7ee58140669b1cf6ba47542fd6dfd5a84117303
    const [searchTerm, setSearchTerm] = useState('');
    const [editingPrescription, setEditingPrescription] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);

    useEffect(() => {
        setupAxiosInterceptors();
        fetchAppointments();
        fetchPrescriptions();
    }, []);
    
    useEffect(() => {
        if (appointments.length > 0) {
            fetchPatients();
        }
    }, [appointments]);

    const fetchPatients = async () => {
        // Get patients from completed appointments
        const completedAppts = appointments.filter(apt => apt.status === 'COMPLETED');
        const uniquePatients = [];
        const seenPatientIds = new Set();
        
        completedAppts.forEach(apt => {
            if (!seenPatientIds.has(apt.patientId)) {
                seenPatientIds.add(apt.patientId);
                uniquePatients.push({
                    id: apt.patientId,
                    firstName: apt.patientFirstName || 'Patient',
                    lastName: apt.patientLastName || `#${apt.patientId}`,
                    appointmentDate: apt.appointmentDate,
                    appointmentCount: completedAppts.filter(a => a.patientId === apt.patientId).length
                });
            }
        });
        
<<<<<<< HEAD
        dispatch(setPatients(uniquePatients));
=======
        setPatients(uniquePatients);
>>>>>>> e7ee58140669b1cf6ba47542fd6dfd5a84117303
    };

    const fetchPrescriptions = async () => {
        try {
            console.log('Fetching prescriptions...');
            const response = await getMyPrescriptions();
            console.log('Prescriptions response:', response.data);
<<<<<<< HEAD
            dispatch(setPrescriptions(response.data || []));
        } catch (error) {
            console.error('Error fetching prescriptions:', error);
            dispatch(setPrescriptions([]));
=======
            setPrescriptions(response.data || []);
        } catch (error) {
            console.error('Error fetching prescriptions:', error);
            setPrescriptions([]);
>>>>>>> e7ee58140669b1cf6ba47542fd6dfd5a84117303
        }
    };

    const filteredPatients = patients.filter(patient => 
        patient && (
            ((patient.firstName || '') + ' ' + (patient.lastName || '')).toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const filteredPrescriptions = prescriptions.filter(prescription => 
        prescription && (
            ((prescription.patientFirstName || '') + ' ' + (prescription.patientLastName || '')).toLowerCase().includes(searchTerm.toLowerCase()) ||
            (prescription.medicationDetails || '').toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const fetchAppointments = async () => {
        try {
<<<<<<< HEAD
            dispatch(setLoading(true));
            const response = await getMyAppointments();
            dispatch(setAppointments(response.data));
        } catch (error) {
            console.error('Error fetching appointments:', error);
        } finally {
            dispatch(setLoading(false));
=======
            const response = await getMyAppointments();
            setAppointments(response.data);
        } catch (error) {
            console.error('Error fetching appointments:', error);
        } finally {
            setLoading(false);
>>>>>>> e7ee58140669b1cf6ba47542fd6dfd5a84117303
        }
    };

    const handleStatusUpdate = async (appointmentId, newStatus) => {
        try {
<<<<<<< HEAD
            const response = await updateAppointmentStatus(appointmentId, newStatus);
            dispatch(updateAppointment(response.data));
=======
            await updateAppointmentStatus(appointmentId, newStatus);
            fetchAppointments();
>>>>>>> e7ee58140669b1cf6ba47542fd6dfd5a84117303
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const handleCreatePrescription = async () => {
        try {
            const prescription = {
                appointmentId: selectedAppointment.id,
                medicationDetails: prescriptionData.medicationDetails,
                dosages: prescriptionData.dosages
            };
            
<<<<<<< HEAD
            const response = await createPrescription(prescription);
            dispatch(addPrescription(response.data));
            setShowPrescriptionModal(false);
            setPrescriptionData({ medicationDetails: '', dosages: '' });
=======
            await createPrescription(prescription);
            setShowPrescriptionModal(false);
            setPrescriptionData({ medicationDetails: '', dosages: '' });
            fetchPrescriptions();
>>>>>>> e7ee58140669b1cf6ba47542fd6dfd5a84117303
            alert('Prescription created successfully!');
        } catch (error) {
            console.error('Error creating prescription:', error);
            alert('Failed to create prescription');
        }
    };
    
    const handleEditPrescription = (prescription) => {
        setEditingPrescription(prescription);
        setPrescriptionData({
            medicationDetails: prescription.medicationDetails,
            dosages: prescription.dosages
        });
        setShowEditModal(true);
    };
    
    const handleUpdatePrescription = async () => {
        try {
            // Update prescription logic here
            alert('Prescription updated successfully!');
            setShowEditModal(false);
            setEditingPrescription(null);
            setPrescriptionData({ medicationDetails: '', dosages: '' });
            fetchPrescriptions();
        } catch (error) {
            console.error('Error updating prescription:', error);
            alert('Failed to update prescription');
        }
    };
    
    const handlePrintPrescription = (prescription) => {
        const printContent = `
            PRESCRIPTION
            ============
            Patient: ${prescription.patientFirstName} ${prescription.patientLastName}
            Date: ${new Date(prescription.createdAt).toLocaleDateString()}
            
            Medication: ${prescription.medicationDetails}
            Dosage: ${prescription.dosages}
            
            Doctor: Dr. ${userEmail}
        `;
        
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
                <head><title>Prescription</title></head>
                <body style="font-family: Arial; padding: 20px;">
                    <pre>${printContent}</pre>
                </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    };

    const handleLogout = () => {
        removeToken();
        navigate('/login');
    };

<<<<<<< HEAD
    const completedAppointments = useAppSelector(selectCompletedAppointments).length;
    const pendingAppointments = useAppSelector(selectPendingAppointments).length;
    const scheduledAppointments = useAppSelector(selectScheduledAppointments).length;
    const todayAppointments = useAppSelector(selectTodayAppointments).length;
=======
    const completedAppointments = appointments.filter(apt => apt.status === 'COMPLETED').length;
    const pendingAppointments = appointments.filter(apt => apt.status === 'PENDING').length;
    const scheduledAppointments = appointments.filter(apt => apt.status === 'SCHEDULED').length;
    const todayAppointments = appointments.filter(apt => 
        new Date(apt.appointmentDate).toDateString() === new Date().toDateString()
    ).length;
>>>>>>> e7ee58140669b1cf6ba47542fd6dfd5a84117303

    // Calendar helper functions
    const getDaysInMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const getAppointmentsForDate = (date) => {
        return appointments.filter(apt => 
            new Date(apt.appointmentDate).toDateString() === date.toDateString()
        );
    };

    const renderCalendar = () => {
        const daysInMonth = getDaysInMonth(currentDate);
        const firstDay = getFirstDayOfMonth(currentDate);
        const days = [];
        
        // Empty cells for days before month starts
        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="h-8"></div>);
        }
        
        // Days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
            const dayAppointments = getAppointmentsForDate(date);
            const isToday = date.toDateString() === new Date().toDateString();
            
            days.push(
                <div key={day} className={`h-10 bg-amber-50 text-xs flex items-center justify-center relative ${
                    isToday ? 'bg-blue-600 text-white rounded' : 'text-gray-600 border-b-blue-500 hover:text-orange-800'
                }`}>
                    {day}
                    {dayAppointments.length > 0 && (
                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full"></div>
                    )}
                </div>
            );
        }
        
        return days;
    };

    return (
        <div className="flex h-screen bg-slate-50">
            {/* Sidebar */}
            <div className="w-72 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col shadow-2xl border-r border-slate-700">
                <div className="p-8 border-b border-slate-700/50">
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                                <img src={logo} alt="HealthCare Logo" className="w-8 h-8" />
                            </div>
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-slate-900"></div>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white">HealthCare</h2>
                            <p className="text-sm text-slate-400 font-medium">Doctor Portal</p>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 px-6 py-6 space-y-3">
                    <div className="mb-4">
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Main Menu</p>
                    </div>
                    
                    <div 
                        onClick={() => setActiveView('dashboard')}
                        className={`group relative rounded-xl px-4 py-3.5 flex items-center space-x-3 cursor-pointer transition-all duration-200 ${
                            activeView === 'dashboard' 
                                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25' 
                                : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                        }`}
                    >
                        <div className={`p-2 rounded-lg transition-colors ${
                            activeView === 'dashboard' ? 'bg-white/20' : 'bg-slate-700/50 group-hover:bg-slate-600/50'
                        }`}>
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                            </svg>
                        </div>
                        <span className="font-medium">Dashboard</span>
                        {activeView === 'dashboard' && <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-white rounded-l-full"></div>}
                    </div>
                    
                    <div 
                        onClick={() => setActiveView('appointments')}
                        className={`group relative rounded-xl px-4 py-3.5 flex items-center space-x-3 cursor-pointer transition-all duration-200 ${
                            activeView === 'appointments' 
                                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25' 
                                : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                        }`}
                    >
                        <div className={`p-2 rounded-lg transition-colors ${
                            activeView === 'appointments' ? 'bg-white/20' : 'bg-slate-700/50 group-hover:bg-slate-600/50'
                        }`}>
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <span className="font-medium">Appointments</span>
                        {activeView === 'appointments' && <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-white rounded-l-full"></div>}
                    </div>

                    <div 
                        onClick={() => { setActiveView('patients'); setSearchTerm(''); }}
                        className={`group relative rounded-xl px-4 py-3.5 flex items-center space-x-3 cursor-pointer transition-all duration-200 ${
                            activeView === 'patients' 
                                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25' 
                                : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                        }`}
                    >
                        <div className={`p-2 rounded-lg transition-colors ${
                            activeView === 'patients' ? 'bg-white/20' : 'bg-slate-700/50 group-hover:bg-slate-600/50'
                        }`}>
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <span className="font-medium">Patients</span>
                        {activeView === 'patients' && <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-white rounded-l-full"></div>}
                    </div>

                    <div 
                        onClick={() => { setActiveView('prescriptions'); setSearchTerm(''); }}
                        className={`group relative rounded-xl px-4 py-3.5 flex items-center space-x-3 cursor-pointer transition-all duration-200 ${
                            activeView === 'prescriptions' 
                                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25' 
                                : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                        }`}
                    >
                        <div className={`p-2 rounded-lg transition-colors ${
                            activeView === 'prescriptions' ? 'bg-white/20' : 'bg-slate-700/50 group-hover:bg-slate-600/50'
                        }`}>
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 011 1v1a1 1 0 01-1 1H4a1 1 0 01-1-1v-1zM3.293 7.707A1 1 0 014 7h12a1 1 0 01.707.293l2 2a1 1 0 010 1.414l-2 2A1 1 0 0116 13H4a1 1 0 01-.707-.293l-2-2a1 1 0 010-1.414l2-2z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <span className="font-medium">Prescriptions</span>
                        {activeView === 'prescriptions' && <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-white rounded-l-full"></div>}
                    </div>
                </nav>

                <div className="p-6 border-t border-slate-700/50 bg-slate-800/30">
                    <div className="flex items-center space-x-4 mb-6">
                        <div className="relative">
                            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-slate-800"></div>
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-semibold text-white">Dr. {userEmail}</p>
                            <p className="text-xs text-slate-400">Medical Doctor</p>
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
                <header className="bg-gradient-to-r from-white via-blue-50 to-indigo-50 shadow-lg border-b border-blue-100 px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-blue-600 bg-clip-text text-transparent">Medical Dashboard</h1>
                            <p className="text-slate-600 font-medium mt-1">Welcome back, Dr. {userEmail}</p>
                        </div>
                        <div className="bg-white/70 backdrop-blur-sm px-4 py-2 rounded-xl border border-blue-200 shadow-sm">
                            <p className="text-sm font-semibold text-slate-700">
                                {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                            </p>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <main className="flex-1 overflow-y-auto p-6">
                    {activeView === 'dashboard' ? (
                        <>
                            {/* Statistics Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
                        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-blue-100 text-sm font-bold">Total Appointments</p>
                                    <p className="text-3xl font-bold">{appointments.length}</p>
                                </div>
                                <div className="">
                                    <img className="h-auto w-15" src={totalPatient} alt="totalPatient" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-green-100 text-sm font-bold">Scheduled</p>
                                    <p className="text-3xl font-bold">{scheduledAppointments}</p>
                                </div>
                                <div className="">
                                    <img className='h-auto w-15' src={scheduled} alt="scheduled" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl p-6 text-white">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-yellow-100 text-sm font-bold">Completed</p>
                                    <p className="text-3xl font-bold">{completedAppointments}</p>
                                </div>
                                <div className="">
                                    <img className='h-auto w-15' src={completed} alt="completed" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-purple-100 text-sm font-bold">Pending</p>
                                    <p className="text-3xl font-bold">{pendingAppointments}</p>
                                </div>
                                <div className="">
                                    <img className='h-auto w-15' src={pending} alt="pending" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl p-6 text-white">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-indigo-100 text-sm font-bold">Today</p>
                                    <p className="text-3xl font-bold">{todayAppointments}</p>
                                </div>
                                <div className="">
                                    <img src={today} alt="today" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Appointments Table */}
                    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
                            <h2 className="text-xl font-bold text-white flex items-center space-x-3">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                </svg>
                                <span>Recent Appointments</span>
                            </h2>
                            <p className="text-blue-100 mt-1">Manage your patient appointments</p>
                        </div>
                        
                        <div className="overflow-x-auto">
                            {loading ? (
                                <div className="flex items-center justify-center py-12">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                                    <span className="ml-3 text-gray-600">Loading appointments...</span>
                                </div>
                            ) : appointments.length > 0 ? (
                                <table className="w-full">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Patient</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {appointments.map((appointment) => (
                                            <tr key={appointment.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center">
                                                        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                                                            <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                                                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                                            </svg>
                                                        </div>
                                                        <div className="ml-3">
                                                            <p className="text-sm font-medium text-gray-900">Patient #{appointment.patientId}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-900">
                                                    {new Date(appointment.appointmentDate).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                        appointment.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                                                        appointment.status === 'SCHEDULED' ? 'bg-blue-100 text-blue-800' :
                                                        appointment.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                                                        'bg-red-100 text-red-800'
                                                    }`}>
                                                        {appointment.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex space-x-2">
                                                        {appointment.status === 'PENDING' && (
                                                            <button
                                                                onClick={() => handleStatusUpdate(appointment.id, 'SCHEDULED')}
                                                                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-green-600 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 shadow-sm"
                                                            >
                                                                Accept
                                                            </button>
                                                        )}
                                                        {appointment.status === 'SCHEDULED' && (
                                                            <button
                                                                onClick={() => handleStatusUpdate(appointment.id, 'COMPLETED')}
                                                                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-green-600 bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200 shadow-sm"
                                                            >
                                                                Complete
                                                            </button>
                                                        )}
                                                        {appointment.status === 'COMPLETED' && (
                                                            <button
                                                                onClick={() => {
                                                                    setSelectedAppointment(appointment);
                                                                    setShowPrescriptionModal(true);
                                                                }}
                                                                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-blue-600 bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200 shadow-sm"
                                                            >
                                                                Prescribe
                                                            </button>
                                                        )}
                                                        {(appointment.status === 'PENDING' || appointment.status === 'SCHEDULED') && (
                                                            <button
                                                                onClick={() => handleStatusUpdate(appointment.id, 'CANCELED')}
                                                                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-red-600 bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200 shadow-sm"
                                                            >
                                                                Cancel
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div className="text-center py-12">
                                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <h3 className="mt-2 text-sm font-medium text-gray-900">No appointments</h3>
                                    <p className="mt-1 text-sm text-gray-500">You don't have any appointments scheduled yet.</p>
                                </div>
                            )}
                        </div>
                    </div>
                        </>
                    ) : activeView === 'appointments' ? (
                        <>
                            {/* Calendar View */}
                            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
                                <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-6 mb-6">
                                    <h2 className="text-2xl font-bold text-white flex items-center space-x-3">
                                        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                        </svg>
                                        <span>Appointments Calendar</span>
                                    </h2>
                                    <p className="text-emerald-100 mt-1">View and manage your schedule</p>
                                </div>
                                <div className="px-8">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center space-x-4">
                                        <button 
                                            onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
                                            className="p-2 hover:bg-gray-100 rounded"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                            </svg>
                                        </button>
                                        <h3 className="text-lg font-medium">
                                            {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                        </h3>
                                        <button 
                                            onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
                                            className="p-2 hover:bg-gray-100 rounded"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-7 gap-1 mb-4">
                                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                                        <div key={day} className="h-8 flex items-center justify-center text-sm font-medium text-gray-500">
                                            {day}
                                        </div>
                                    ))}
                                </div>
                                
                                <div className="grid grid-cols-7 gap-1">
                                    {renderCalendar()}
                                </div>
                                
                                <div className="mt-6 flex items-center space-x-4 text-sm">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-3 h-3 bg-blue-600 rounded"></div>
                                        <span>Today</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                                        <span>Has Appointments</span>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </>
                    ) : activeView === 'patients' ? (
                        <>
                            {/* Patients Management */}
                            <div className="space-y-6">
                                <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 mb-6">
                                    <h2 className="text-3xl font-bold text-white flex items-center space-x-3">
                                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                        </svg>
                                        <span>Patient Management</span>
                                    </h2>
                                    <p className="text-purple-100 mt-2">Manage and view your patient records</p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <div className="relative">
                                            <input
                                                type="text"
                                                placeholder="Search patients..."
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                            <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {filteredPatients.length} patients
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {filteredPatients.length === 0 ? (
                                        <div className="col-span-full text-center py-12">
                                            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                            </svg>
                                            <h3 className="mt-2 text-sm font-medium text-gray-900">No patients found</h3>
                                            <p className="mt-1 text-sm text-gray-500">Total patients: {patients.length}, Filtered: {filteredPatients.length}</p>
                                        </div>
                                    ) : filteredPatients.map((patient) => (
                                        <div key={patient.id} className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow">
                                            <div className="p-6">
                                                <div className="flex items-center space-x-4 mb-4">
                                                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                                        <span className="text-white font-semibold text-lg">
                                                            {(patient.firstName?.[0] || '') + (patient.lastName?.[0] || '')}
                                                        </span>
                                                    </div>
                                                    <div className="flex-1">
                                                        <h3 className="text-lg font-semibold text-gray-900">{patient.firstName} {patient.lastName}</h3>
                                                        <p className="text-sm text-gray-500">ID: {patient.id}</p>
                                                    </div>
                                                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                                                        Active
                                                    </span>
                                                </div>
                                                
                                                <div className="space-y-2 text-sm">
                                                    <div className="flex items-center space-x-2">
                                                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                        </svg>
                                                        <span className="text-gray-600">Last Visit: {new Date(patient.appointmentDate).toLocaleDateString()}</span>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                        </svg>
                                                        <span className="text-gray-600">Total Appointments: {patient.appointmentCount}</span>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        <span className="text-gray-600">Status: Completed Treatment</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    ) : activeView === 'prescriptions' ? (
                        <>
                            {/* Prescriptions Management */}
                            <div className="space-y-6">
                                <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-8 mb-6">
                                    <h2 className="text-3xl font-bold text-white flex items-center space-x-3">
                                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 011 1v1a1 1 0 01-1 1H4a1 1 0 01-1-1v-1zM3.293 7.707A1 1 0 014 7h12a1 1 0 01.707.293l2 2a1 1 0 010 1.414l-2 2A1 1 0 0116 13H4a1 1 0 01-.707-.293l-2-2a1 1 0 010-1.414l2-2z" clipRule="evenodd" />
                                        </svg>
                                        <span>Prescription Management</span>
                                    </h2>
                                    <p className="text-orange-100 mt-2">Create and manage patient prescriptions</p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <div className="relative">
                                            <input
                                                type="text"
                                                placeholder="Search prescriptions..."
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                            <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                        </div>
                                        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                                            New Prescription
                                        </button>
                                    </div>
                                </div>

                                <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Patient</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Medication</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Dosage</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Duration</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200">
                                                {filteredPrescriptions.length === 0 ? (
                                                    <tr>
                                                        <td colSpan="7" className="px-6 py-12 text-center">
                                                            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                            </svg>
                                                            <h3 className="mt-2 text-sm font-medium text-gray-900">No prescriptions found</h3>
                                                            <p className="mt-1 text-sm text-gray-500">Total prescriptions: {prescriptions.length}, Filtered: {filteredPrescriptions.length}</p>
                                                        </td>
                                                    </tr>
                                                ) : filteredPrescriptions.map((prescription) => (
                                                    <tr key={prescription.id} className="hover:bg-gray-50">
                                                        <td className="px-6 py-4">
                                                            <div className="flex items-center">
                                                                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                                                                    <span className="text-white font-semibold text-sm">
                                                                        {(prescription.patientFirstName?.[0] || '') + (prescription.patientLastName?.[0] || '')}
                                                                    </span>
                                                                </div>
                                                                <div className="ml-3">
                                                                    <p className="text-sm font-medium text-gray-900">{prescription.patientFirstName} {prescription.patientLastName}</p>
                                                                    <p className="text-sm text-gray-500">ID: {prescription.patientId}</p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <div className="text-sm font-medium text-gray-900">{prescription.medicationDetails}</div>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <div className="text-sm text-gray-900">{prescription.dosages}</div>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <div className="text-sm text-gray-900">{new Date(prescription.createdAt).toLocaleDateString()}</div>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <div className="text-sm text-gray-900">-</div>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                                                                Active
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <div className="flex space-x-2">
                                                                <button 
                                                                    onClick={() => handleEditPrescription(prescription)}
                                                                    className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                                                                >
                                                                    Edit
                                                                </button>
                                                                <button 
                                                                    onClick={() => handlePrintPrescription(prescription)}
                                                                    className="text-green-600 hover:text-green-900 text-sm font-medium"
                                                                >
                                                                    Print
                                                                </button>
                                                                <button className="text-red-600 hover:text-red-900 text-sm font-medium">
                                                                    Cancel
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : null}
                </main>
            </div>

            {/* Prescription Modal */}
            {showPrescriptionModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-2xl p-8 w-96 max-w-md mx-4 border border-slate-200">
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 011 1v1a1 1 0 01-1 1H4a1 1 0 01-1-1v-1zM3.293 7.707A1 1 0 014 7h12a1 1 0 01.707.293l2 2a1 1 0 010 1.414l-2 2A1 1 0 0116 13H4a1 1 0 01-.707-.293l-2-2a1 1 0 010-1.414l2-2z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-slate-800 mb-2">Create Prescription</h3>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">Patient ID: {selectedAppointment?.patientId}</p>
                        
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Medication Details</label>
                                <textarea
                                    value={prescriptionData.medicationDetails}
                                    onChange={(e) => setPrescriptionData({...prescriptionData, medicationDetails: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    rows="3"
                                    placeholder="Enter medication details..."
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Dosages</label>
                                <input
                                    type="text"
                                    value={prescriptionData.dosages}
                                    onChange={(e) => setPrescriptionData({...prescriptionData, dosages: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="e.g., 1 tablet twice daily"
                                />
                            </div>
                        </div>
                        
                        <div className="flex space-x-3 mt-6">
                            <button
                                onClick={handleCreatePrescription}
                                className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-green-600 bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200 shadow-sm"
                            >
                                Create Prescription
                            </button>
                            <button
                                onClick={() => {
                                    setShowPrescriptionModal(false);
                                    setPrescriptionData({ medicationDetails: '', dosages: '' });
                                }}
                                className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 shadow-sm"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Prescription Modal */}
            {showEditModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-2xl p-8 w-96 max-w-md mx-4 border border-slate-200">
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 011 1v1a1 1 0 01-1 1H4a1 1 0 01-1-1v-1zM3.293 7.707A1 1 0 014 7h12a1 1 0 01.707.293l2 2a1 1 0 010 1.414l-2 2A1 1 0 0116 13H4a1 1 0 01-.707-.293l-2-2a1 1 0 010-1.414l2-2z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-slate-800 mb-2">Edit Prescription</h3>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">Patient: {editingPrescription?.patientFirstName} {editingPrescription?.patientLastName}</p>
                        
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Medication Details</label>
                                <textarea
                                    value={prescriptionData.medicationDetails}
                                    onChange={(e) => setPrescriptionData({...prescriptionData, medicationDetails: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    rows="3"
                                    placeholder="Enter medication details..."
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Dosages</label>
                                <input
                                    type="text"
                                    value={prescriptionData.dosages}
                                    onChange={(e) => setPrescriptionData({...prescriptionData, dosages: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="e.g., 1 tablet twice daily"
                                />
                            </div>
                        </div>
                        
                        <div className="flex space-x-3 mt-6">
                            <button
                                onClick={handleUpdatePrescription}
                                className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 shadow-sm"
                            >
                                Update Prescription
                            </button>
                            <button
                                onClick={() => {
                                    setShowEditModal(false);
                                    setEditingPrescription(null);
                                    setPrescriptionData({ medicationDetails: '', dosages: '' });
                                }}
                                className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 shadow-sm"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DoctorDashboard;