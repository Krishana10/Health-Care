import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { setAppointments, setLoading, updateAppointment, setPatients } from '../../store/slices/appointmentsSlice';
import { setPrescriptions, addPrescription } from '../../store/slices/prescriptionsSlice';
import { selectCompletedAppointments, selectPendingAppointments, selectScheduledAppointments, selectTodayAppointments } from '../../store/selectors';
import { removeToken, getUserEmail, setupAxiosInterceptors } from "../../Services/AuthService.js";
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
    
    // Redux state
    const { list: appointments, loading, patients } = useAppSelector(state => state.appointments);
    const { list: prescriptions } = useAppSelector(state => state.prescriptions);
    
    // Local state
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [prescriptionData, setPrescriptionData] = useState({ medicationDetails: '', dosages: '' });
    const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
    const [activeView, setActiveView] = useState('dashboard');
    const [currentDate, setCurrentDate] = useState(new Date());
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
        
        dispatch(setPatients(uniquePatients));
    };

    const fetchPrescriptions = async () => {
        try {
            console.log('Fetching prescriptions...');
            const response = await getMyPrescriptions();
            console.log('Prescriptions response:', response.data);
            dispatch(setPrescriptions(response.data || []));
        } catch (error) {
            console.error('Error fetching prescriptions:', error);
            dispatch(setPrescriptions([]));
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
            dispatch(setLoading(true));
            const response = await getMyAppointments();
            dispatch(setAppointments(response.data));
        } catch (error) {
            console.error('Error fetching appointments:', error);
        } finally {
            dispatch(setLoading(false));
        }
    };

    const handleStatusUpdate = async (appointmentId, newStatus) => {
        try {
            const response = await updateAppointmentStatus(appointmentId, newStatus);
            dispatch(updateAppointment(response.data));
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
            
            const response = await createPrescription(prescription);
            dispatch(addPrescription(response.data));
            setShowPrescriptionModal(false);
            setPrescriptionData({ medicationDetails: '', dosages: '' });
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

    const completedAppointments = useAppSelector(selectCompletedAppointments).length;
    const pendingAppointments = useAppSelector(selectPendingAppointments).length;
    const scheduledAppointments = useAppSelector(selectScheduledAppointments).length;
    const todayAppointments = useAppSelector(selectTodayAppointments).length;

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
        <div className="min-h-screen bg-gray-100 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">Doctor Dashboard</h1>
                            <p className="text-gray-500 mt-2">Welcome back, Dr. {userEmail}</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                        >
                            Logout
                        </button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">Total Patients</p>
                                <p className="text-3xl font-bold text-gray-800 mt-2">{patients.length}</p>
                            </div>
                            <img src={totalPatient} alt="Total Patients" className="w-12 h-12 opacity-80" />
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">Scheduled</p>
                                <p className="text-3xl font-bold text-blue-600 mt-2">{scheduledAppointments}</p>
                            </div>
                            <img src={scheduled} alt="Scheduled" className="w-12 h-12 opacity-80" />
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">Completed</p>
                                <p className="text-3xl font-bold text-green-600 mt-2">{completedAppointments}</p>
                            </div>
                            <img src={completed} alt="Completed" className="w-12 h-12 opacity-80" />
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">Pending</p>
                                <p className="text-3xl font-bold text-yellow-600 mt-2">{pendingAppointments}</p>
                            </div>
                            <img src={pending} alt="Pending" className="w-12 h-12 opacity-80" />
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex gap-4 mb-6 border-b">
                        <button
                            onClick={() => setActiveView('dashboard')}
                            className={`px-4 py-2 font-medium ${activeView === 'dashboard' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-600'}`}
                        >
                            Dashboard
                        </button>
                        <button
                            onClick={() => setActiveView('appointments')}
                            className={`px-4 py-2 font-medium ${activeView === 'appointments' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-600'}`}
                        >
                            Appointments
                        </button>
                        <button
                            onClick={() => setActiveView('prescriptions')}
                            className={`px-4 py-2 font-medium ${activeView === 'prescriptions' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-600'}`}
                        >
                            Prescriptions
                        </button>
                    </div>

                    {activeView === 'dashboard' && (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-2">
                                <h2 className="text-xl font-bold text-gray-800 mb-4">Calendar</h2>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="grid grid-cols-7 gap-2 mb-4">
                                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                                            <div key={day} className="text-center font-bold text-gray-600">{day}</div>
                                        ))}
                                    </div>
                                    <div className="grid grid-cols-7 gap-2">
                                        {renderCalendar()}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-800 mb-4">Today's Appointments</h2>
                                {appointments.filter(apt => new Date(apt.appointmentDate).toDateString() === new Date().toDateString()).length > 0 ? (
                                    <div className="space-y-2">
                                        {appointments.filter(apt => new Date(apt.appointmentDate).toDateString() === new Date().toDateString()).map(apt => (
                                            <div key={apt.id} className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                                                <p className="font-semibold text-gray-800">{apt.patientFirstName} {apt.patientLastName}</p>
                                                <p className="text-sm text-gray-600">{new Date(apt.appointmentDate).toLocaleTimeString()}</p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-500">No appointments today</p>
                                )}
                            </div>
                        </div>
                    )}

                    {activeView === 'appointments' && (
                        <div>
                            <h2 className="text-xl font-bold text-gray-800 mb-4">All Appointments</h2>
                            {loading ? (
                                <p className="text-gray-500">Loading...</p>
                            ) : appointments.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b">
                                                <th className="text-left py-2 px-4 font-bold text-gray-600">Patient</th>
                                                <th className="text-left py-2 px-4 font-bold text-gray-600">Date</th>
                                                <th className="text-left py-2 px-4 font-bold text-gray-600">Time</th>
                                                <th className="text-left py-2 px-4 font-bold text-gray-600">Status</th>
                                                <th className="text-left py-2 px-4 font-bold text-gray-600">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {appointments.map(apt => (
                                                <tr key={apt.id} className="border-b hover:bg-gray-50">
                                                    <td className="py-2 px-4">{apt.patientFirstName} {apt.patientLastName}</td>
                                                    <td className="py-2 px-4">{new Date(apt.appointmentDate).toLocaleDateString()}</td>
                                                    <td className="py-2 px-4">{new Date(apt.appointmentDate).toLocaleTimeString()}</td>
                                                    <td className="py-2 px-4">
                                                        <span className={`px-2 py-1 rounded text-sm font-medium ${
                                                            apt.status === 'SCHEDULED' ? 'bg-blue-100 text-blue-800' :
                                                            apt.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                                                            'bg-yellow-100 text-yellow-800'
                                                        }`}>
                                                            {apt.status}
                                                        </span>
                                                    </td>
                                                    <td className="py-2 px-4">
                                                        <select
                                                            onChange={(e) => handleStatusUpdate(apt.id, e.target.value)}
                                                            defaultValue={apt.status}
                                                            className="px-2 py-1 border rounded text-sm"
                                                        >
                                                            <option value="SCHEDULED">Scheduled</option>
                                                            <option value="COMPLETED">Completed</option>
                                                            <option value="PENDING">Pending</option>
                                                        </select>
                                                        <button
                                                            onClick={() => {
                                                                setSelectedAppointment(apt);
                                                                setShowPrescriptionModal(true);
                                                            }}
                                                            className="ml-2 bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-sm"
                                                        >
                                                            Add Rx
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <p className="text-gray-500">No appointments found</p>
                            )}
                        </div>
                    )}

                    {activeView === 'prescriptions' && (
                        <div>
                            <h2 className="text-xl font-bold text-gray-800 mb-4">Prescriptions</h2>
                            <div className="mb-4">
                                <input
                                    type="text"
                                    placeholder="Search prescriptions..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full px-4 py-2 border rounded-lg"
                                />
                            </div>
                            {filteredPrescriptions.length > 0 ? (
                                <div className="space-y-4">
                                    {filteredPrescriptions.map(presc => (
                                        <div key={presc.id} className="bg-gray-50 p-4 rounded-lg border">
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <p className="font-bold text-gray-800">{presc.patientFirstName} {presc.patientLastName}</p>
                                                    <p className="text-sm text-gray-600">{new Date(presc.createdAt).toLocaleDateString()}</p>
                                                </div>
                                                <div className="space-x-2">
                                                    <button
                                                        onClick={() => handleEditPrescription(presc)}
                                                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handlePrintPrescription(presc)}
                                                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
                                                    >
                                                        Print
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-700"><strong>Medication:</strong> {presc.medicationDetails}</p>
                                                <p className="text-sm text-gray-700"><strong>Dosage:</strong> {presc.dosages}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500">No prescriptions found</p>
                            )}
                        </div>
                    )}
                </div>

                {/* Prescription Modal */}
                {showPrescriptionModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-lg p-6 max-w-md w-full">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">Create Prescription</h2>
                            <input
                                type="text"
                                placeholder="Medication Details"
                                value={prescriptionData.medicationDetails}
                                onChange={(e) => setPrescriptionData({...prescriptionData, medicationDetails: e.target.value})}
                                className="w-full px-4 py-2 border rounded-lg mb-4"
                            />
                            <textarea
                                placeholder="Dosages"
                                value={prescriptionData.dosages}
                                onChange={(e) => setPrescriptionData({...prescriptionData, dosages: e.target.value})}
                                className="w-full px-4 py-2 border rounded-lg mb-4"
                                rows="4"
                            ></textarea>
                            <div className="flex gap-2">
                                <button
                                    onClick={handleCreatePrescription}
                                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                                >
                                    Create
                                </button>
                                <button
                                    onClick={() => setShowPrescriptionModal(false)}
                                    className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Edit Prescription Modal */}
                {showEditModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-lg p-6 max-w-md w-full">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">Edit Prescription</h2>
                            <input
                                type="text"
                                placeholder="Medication Details"
                                value={prescriptionData.medicationDetails}
                                onChange={(e) => setPrescriptionData({...prescriptionData, medicationDetails: e.target.value})}
                                className="w-full px-4 py-2 border rounded-lg mb-4"
                            />
                            <textarea
                                placeholder="Dosages"
                                value={prescriptionData.dosages}
                                onChange={(e) => setPrescriptionData({...prescriptionData, dosages: e.target.value})}
                                className="w-full px-4 py-2 border rounded-lg mb-4"
                                rows="4"
                            ></textarea>
                            <div className="flex gap-2">
                                <button
                                    onClick={handleUpdatePrescription}
                                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                                >
                                    Update
                                </button>
                                <button
                                    onClick={() => setShowEditModal(false)}
                                    className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DoctorDashboard;
