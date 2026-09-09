import React, { useState, useEffect } from 'react';
import { getDoctors, bookAppointment } from '../../Services/PatientService.js';
import { setupAxiosInterceptors } from '../../Services/AuthService.js';

const NewAppointment = () => {
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [appointmentDate, setAppointmentDate] = useState('');
    const [appointmentTime, setAppointmentTime] = useState('');
    const [reason, setReason] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setupAxiosInterceptors();
        const fetchDoctors = async () => {
            try {
                const response = await getDoctors();
                setDoctors(response.data);
            } catch (error) {
                console.error('Failed to fetch doctors:', error);
            }
        };
        fetchDoctors();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const appointmentDateTime = appointmentDate && appointmentTime ? 
                `${appointmentDate}T${appointmentTime}` : appointmentDate;
            
            const appointmentData = {
                doctorId: parseInt(selectedDoctor),
                appointmentDate: appointmentDateTime
            };
            
            console.log('Booking appointment:', appointmentData);
            await bookAppointment(appointmentData);
            
            // Reset form after successful booking
            setSelectedDoctor('');
            setAppointmentDate('');
            setAppointmentTime('');
            setReason('');
            
            alert('Appointment booked successfully!');
        } catch (error) {
            console.error('Failed to book appointment:', error);
            console.error('Error details:', error.response?.data);
            alert('Failed to book appointment. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const timeSlots = [
        '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
        '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
    ];

    return (
        <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Book New Appointment</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Doctor Selection */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Select Doctor
                        </label>
                        <select
                            value={selectedDoctor}
                            onChange={(e) => setSelectedDoctor(e.target.value)}
                            required
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Choose a doctor...</option>
                            {doctors.map(doctor => (
                                <option key={doctor.id} value={doctor.id}>
                                    Dr. {doctor.firstName} {doctor.lastName} - {doctor.specialty}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Date Selection */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Appointment Date
                        </label>
                        <input
                            type="date"
                            value={appointmentDate}
                            onChange={(e) => setAppointmentDate(e.target.value)}
                            min={new Date().toISOString().split('T')[0]}
                            required
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Time Selection */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Appointment Time
                        </label>
                        <select
                            value={appointmentTime}
                            onChange={(e) => setAppointmentTime(e.target.value)}
                            required
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select time...</option>
                            {timeSlots.map(time => (
                                <option key={time} value={time}>{time}</option>
                            ))}
                        </select>
                    </div>

                    {/* Reason */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Reason for Visit
                        </label>
                        <textarea
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            rows={4}
                            placeholder="Describe your symptoms or reason for the appointment..."
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-blue-600 py-3 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                    >
                        {loading ? 'Booking...' : 'Book Appointment'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default NewAppointment;