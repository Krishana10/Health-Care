import React, { useState, useEffect } from 'react';
import { getMyAppointments, makePayment, cancelAppointment } from '../../Services/PatientService.js';
import { setupAxiosInterceptors } from '../../Services/AuthService.js';

const AppointmentHistory = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [paymentLoading, setPaymentLoading] = useState(null);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [paymentAppointment, setPaymentAppointment] = useState(null);
    const [cancelLoading, setCancelLoading] = useState(null);

    useEffect(() => {
        setupAxiosInterceptors();
        const fetchAppointments = async () => {
            try {
                const response = await getMyAppointments();
                console.log('My appointments:', response.data);
                setAppointments(response.data);
            } catch (error) {
                console.error('Failed to fetch appointments:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchAppointments();
    }, []);

    const filteredAppointments = appointments.filter(appointment => {
        if (filter === 'all') return true;
        if (filter === 'upcoming') return new Date(appointment.appointmentDate) > new Date();
        if (filter === 'past') return new Date(appointment.appointmentDate) < new Date();
        return appointment.status.toLowerCase() === filter.toLowerCase();
    });

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'scheduled': return 'bg-blue-100 text-blue-800';
            case 'completed': return 'bg-green-100 text-green-800';
            case 'canceled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };



    const handleUPIPayment = (appointment) => {
        setPaymentAppointment(appointment);
        setShowPaymentModal(true);
    };

    const handleCancelAppointment = async (appointmentId) => {
        if (window.confirm('Are you sure you want to cancel this appointment?')) {
            try {
                setCancelLoading(appointmentId);
                await cancelAppointment(appointmentId);
                
                // Remove appointment from state
                setAppointments(prev => prev.filter(apt => apt.id !== appointmentId));
                
                alert('Appointment cancelled successfully!');
            } catch (error) {
                console.error('Failed to cancel appointment:', error);
                alert('Failed to cancel appointment. Please try again.');
            } finally {
                setCancelLoading(null);
            }
        }
    };

    const processUPIPayment = async (upiId, appName) => {
        try {
            setPaymentLoading(paymentAppointment.id);
            
            // Generate UPI payment URL
            const amount = paymentAppointment.amount || 500;
            const upiUrl = `upi://pay?pa=${upiId}&pn=HealthCare System&am=${amount}&cu=INR&tn=Payment for Appointment ${paymentAppointment.id}`;
            
            // Try to open UPI app
            const newWindow = window.open(upiUrl, '_blank');
            
            // Check if UPI app opened (for mobile) or failed (for desktop)
            setTimeout(() => {
                if (newWindow) {
                    newWindow.close();
                }
                
                // Ask user for payment confirmation
                const paymentConfirmed = window.confirm(
                    `Did you complete the payment of ₹${amount} via ${appName}?\n\nClick OK if payment was successful, Cancel if payment failed or was not completed.`
                );
                
                if (paymentConfirmed) {
                    // Process successful payment
                    makePayment(paymentAppointment.id)
                        .then(() => {
                            setAppointments(prev => prev.map(apt => 
                                apt.id === paymentAppointment.id 
                                    ? { ...apt, billingStatus: 'PAID' }
                                    : apt
                            ));
                            alert('Payment confirmed successfully!');
                            setShowPaymentModal(false);
                        })
                        .catch(() => {
                            alert('Payment verification failed. Please contact support.');
                        })
                        .finally(() => {
                            setPaymentLoading(null);
                        });
                } else {
                    // Payment was not completed
                    alert('Payment was not completed. Please try again.');
                    setPaymentLoading(null);
                }
            }, 1000);
            
        } catch (error) {
            console.error('UPI payment failed:', error);
            alert('UPI payment failed. Please try again.');
            setPaymentLoading(null);
        }
    };

    if (loading) {
        return (
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-12">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mb-4"></div>
                    <div className="text-gray-600 text-lg font-medium">Loading appointments...</div>
                </div>
            </div>
        );
    }

    return (
        <>
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 mb-8">
                <h2 className="text-3xl font-bold text-white flex items-center space-x-3">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <span>My Appointments</span>
                </h2>
                <p className="text-purple-100 mt-2">View and manage your appointment history</p>
            </div>

            {/* Filter Buttons */}
            <div className="bg-white rounded-2xl p-6 shadow-xl border border-slate-200 mb-8">
                <div className="flex flex-wrap gap-3">
                    {['all', 'upcoming', 'past', 'pending', 'scheduled', 'completed', 'canceled'].map(filterOption => (
                        <button
                            key={filterOption}
                            onClick={() => setFilter(filterOption)}
                            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                                filter === filterOption
                                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
                            }`}
                        >
                            {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Appointments List */}
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
                <div className="px-8 py-6 border-b border-gray-200 bg-gradient-to-r from-slate-50 to-purple-50">
                    <h3 className="text-2xl font-bold text-gray-900">
                        Appointments ({filteredAppointments.length})
                    </h3>
                </div>

                {filteredAppointments.length === 0 ? (
                    <div className="text-center py-16">
                        <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        <h4 className="text-xl font-semibold text-gray-900 mb-2">No appointments found</h4>
                        <p className="text-gray-500">No appointments match the selected filter.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gradient-to-r from-slate-50 to-purple-50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Doctor
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Specialty
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Date & Time
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Payment
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredAppointments.map(appointment => (
                                    <tr key={appointment.id} className="hover:bg-purple-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
                                                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <div className="text-sm font-bold text-gray-900">
                                                        Dr. {appointment.doctorFirstName} {appointment.doctorLastName}
                                                    </div>
                                                    <div className="text-xs text-gray-500">ID: #{appointment.id}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                            {appointment.doctorSpecialty}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-900">
                                            <div>
                                                <div className="font-medium">{new Date(appointment.appointmentDate).toLocaleDateString()}</div>
                                                <div className="text-xs text-gray-500">{new Date(appointment.appointmentDate).toLocaleTimeString()}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-xl text-xs font-semibold ${getStatusColor(appointment.status)}`}>
                                                {appointment.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="space-y-1">
                                                <span className={`px-3 py-1 rounded-xl text-xs font-semibold ${
                                                    appointment.billingStatus === 'PAID' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                                }`}>
                                                    {appointment.billingStatus || 'UNPAID'}
                                                </span>
                                                <div className="text-sm font-bold text-gray-900">₹{appointment.amount || 500}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col space-y-2">
                                                <button 
                                                    onClick={() => {
                                                        setSelectedAppointment(appointment);
                                                        setShowModal(true);
                                                    }}
                                                    className="text-purple-600 hover:text-purple-800 font-semibold text-sm"
                                                >
                                                    View Details
                                                </button>
                                                {appointment.billingStatus !== 'PAID' && (
                                                    <button 
                                                        onClick={() => handleUPIPayment(appointment)}
                                                        disabled={paymentLoading === appointment.id}
                                                        className="text-green-600 hover:text-green-800 disabled:opacity-50 font-semibold text-sm"
                                                    >
                                                        {paymentLoading === appointment.id ? 'Processing...' : 'Pay via UPI'}
                                                    </button>
                                                )}
                                                {(appointment.status === 'PENDING' || appointment.status === 'SCHEDULED') && (
                                                    <button 
                                                        onClick={() => handleCancelAppointment(appointment.id)}
                                                        disabled={cancelLoading === appointment.id}
                                                        className="text-red-600 hover:text-red-800 disabled:opacity-50 font-semibold text-sm"
                                                    >
                                                        {cancelLoading === appointment.id ? 'Cancelling...' : 'Cancel'}
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Appointment Details Modal */}
            {showModal && selectedAppointment && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl p-8 w-full max-w-lg shadow-2xl">
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Appointment Details</h3>
                            <p className="text-gray-600">#{selectedAppointment.id}</p>
                        </div>
                        
                        <div className="space-y-4">
                            <div className="bg-gray-50 rounded-xl p-4">
                                <p className="text-sm font-semibold text-gray-700 mb-2">Doctor</p>
                                <p className="text-gray-900 font-medium">Dr. {selectedAppointment.doctorFirstName} {selectedAppointment.doctorLastName}</p>
                            </div>
                            
                            <div className="bg-gray-50 rounded-xl p-4">
                                <p className="text-sm font-semibold text-gray-700 mb-2">Specialty</p>
                                <p className="text-gray-900 font-medium">{selectedAppointment.doctorSpecialty}</p>
                            </div>
                            
                            <div className="bg-gray-50 rounded-xl p-4">
                                <p className="text-sm font-semibold text-gray-700 mb-2">Date & Time</p>
                                <p className="text-gray-900 font-medium">{new Date(selectedAppointment.appointmentDate).toLocaleString()}</p>
                            </div>
                            
                            <div className="bg-gray-50 rounded-xl p-4">
                                <p className="text-sm font-semibold text-gray-700 mb-2">Status</p>
                                <span className={`px-3 py-1 rounded-xl text-sm font-semibold ${getStatusColor(selectedAppointment.status)}`}>
                                    {selectedAppointment.status}
                                </span>
                            </div>
                        </div>
                        
                        <div className="mt-8 flex justify-end">
                            <button
                                onClick={() => setShowModal(false)}
                                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-xl transition-all duration-200 font-semibold"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* UPI Payment Modal */}
            {showPaymentModal && paymentAppointment && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-gray-800">UPI Payment</h3>
                            <button 
                                onClick={() => setShowPaymentModal(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                ×
                            </button>
                        </div>
                        
                        <div className="space-y-4">
                            <div className="text-center">
                                <p className="text-lg font-semibold">Amount: ₹{paymentAppointment.amount || 500}</p>
                                <p className="text-sm text-gray-600">Appointment #{paymentAppointment.id}</p>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    onClick={() => processUPIPayment('healthcare@paytm', 'PayTM')}
                                    disabled={paymentLoading === paymentAppointment.id}
                                    className="bg-blue-600 hover:bg-blue-700 text-pink-600 p-3 rounded-lg transition disabled:opacity-50 border border-blue-700"
                                >
                                    <div className="text-center">
                                        <div className="font-semibold text-orange-600">PayTM</div>
                                        <div className="text-xs text-blue-600">UPI Payment</div>
                                    </div>
                                </button>
                                
                                <button
                                    onClick={() => processUPIPayment('healthcare@phonepe', 'PhonePe')}
                                    disabled={paymentLoading === paymentAppointment.id}
                                    className="bg-purple-600 hover:bg-purple-700 text-purple-700 p-3 rounded-lg transition disabled:opacity-50 border border-purple-700"
                                >
                                    <div className="text-center">
                                        <div className="font-semibold text-red-500">PhonePe</div>
                                        <div className="text-xs text-purple-500">UPI Payment</div>
                                    </div>
                                </button>
                                
                                <button
                                    onClick={() => processUPIPayment('healthcare@googlepay', 'Google Pay')}
                                    disabled={paymentLoading === paymentAppointment.id}
                                    className="bg-green-600 hover:bg-green-700 text-green-600 p-3 rounded-lg transition disabled:opacity-50 border border-green-700"
                                >
                                    <div className="text-center">
                                        <div className="font-semibold text-yellow-600">Google Pay</div>
                                        <div className="text-xs text-yellow-700">UPI Payment</div>
                                    </div>
                                </button>
                                
                                <button
                                    onClick={() => processUPIPayment('healthcare@amazonpay', 'Amazon Pay')}
                                    disabled={paymentLoading === paymentAppointment.id}
                                    className="bg-orange-600 hover:bg-orange-700 text-blue-600 p-3 rounded-lg transition disabled:opacity-50 border border-orange-700"
                                >
                                    <div className="text-center">
                                        <div className="font-semibold text-blue-600">Amazon Pay</div>
                                        <div className="text-xs text-blue-600">UPI Payment</div>
                                    </div>
                                </button>
                            </div>
                            
                            {paymentLoading === paymentAppointment.id && (
                                <div className="text-center text-blue-600">
                                    <div className="animate-spin inline-block w-6 h-6 border-2 border-current border-t-transparent rounded-full mb-2"></div>
                                    <p>Processing payment...</p>
                                </div>
                            )}
                        </div>
                        
                        <div className="mt-6 flex justify-end">
                            <button
                                onClick={() => setShowPaymentModal(false)}
                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AppointmentHistory;