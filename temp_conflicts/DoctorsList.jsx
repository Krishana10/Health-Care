import { useState, useEffect } from 'react';
<<<<<<< HEAD
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { setDoctors, setLoading } from '../../store/slices/doctorsSlice';
import { addAppointment } from '../../store/slices/appointmentsSlice';
=======
>>>>>>> e7ee58140669b1cf6ba47542fd6dfd5a84117303
import { getDoctors, bookAppointment } from '../../Services/PatientService.js';
import { Link } from 'react-router-dom';

const DoctorsList = () => {
<<<<<<< HEAD
    const dispatch = useAppDispatch();
    const { list: doctors, loading } = useAppSelector(state => state.doctors);
    
=======
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
>>>>>>> e7ee58140669b1cf6ba47542fd6dfd5a84117303
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [appointmentDate, setAppointmentDate] = useState('');
    const [booking, setBooking] = useState(false);


    useEffect(() => {
        const fetchDoctors = async () => {
            try {
<<<<<<< HEAD
                dispatch(setLoading(true));
                const response = await getDoctors();
                dispatch(setDoctors(response.data));
            } catch (error) {
                console.error('Failed to fetch doctors:', error);
            } finally {
                dispatch(setLoading(false));
            }
        };
        fetchDoctors();
    }, [dispatch]);
=======
                const response = await getDoctors();
                setDoctors(response.data);
            } catch (error) {
                console.error('Failed to fetch doctors:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchDoctors();
    }, []);
>>>>>>> e7ee58140669b1cf6ba47542fd6dfd5a84117303

    const filteredDoctors = doctors.filter(doctor => {
        const fullName = `${doctor.firstName} ${doctor.lastName}`.toLowerCase();
        const search = searchTerm.toLowerCase();

        const matchesSearch = fullName.includes(search) ||
                            doctor.specialty?.toLowerCase().includes(search);
        const matchesDepartment = !selectedDepartment || doctor.specialty === selectedDepartment;
        return matchesSearch && matchesDepartment;
    });

    const departments = [...new Set(doctors.map(doctor => doctor.specialty))];

    const handleBookAppointment = (doctor) => {
        setSelectedDoctor(doctor);
        setShowModal(true);
    };

    const handleSubmitBooking = async () => {
        if (!appointmentDate) {
            alert('Please select a date and time');
            return;
        }

        try {
            setBooking(true);
<<<<<<< HEAD
            const response = await bookAppointment({
                doctorId: selectedDoctor.id,
                appointmentDate: appointmentDate
            });
            dispatch(addAppointment(response.data));
=======
            await bookAppointment({
                doctorId: selectedDoctor.id,
                appointmentDate: appointmentDate
            });
>>>>>>> e7ee58140669b1cf6ba47542fd6dfd5a84117303
            alert('Appointment booked successfully!');
            setShowModal(false);
            setAppointmentDate('');
        } catch (error) {
            console.error('Failed to book appointment:', error);
            alert('Failed to book appointment. Please try again.');
        } finally {
            setBooking(false);
        }
    };
    if (loading) {
        return (
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-12">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mb-4"></div>
                    <div className="text-gray-600 text-lg font-medium">Loading doctors...</div>
                </div>
            </div>
        );
    }

    return (
        <>
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 mb-8">
                <h2 className="text-3xl font-bold text-white flex items-center space-x-3">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                    <span>Find Doctors</span>
                </h2>
                <p className="text-blue-100 mt-2">Browse and book appointments with our qualified specialists</p>
            </div>

            {/* Search and Filter */}
            <div className="bg-white rounded-2xl p-6 shadow-xl border border-slate-200 mb-8">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative">
                        <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search doctors by name or specialty..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <select
                        value={selectedDepartment}
                        onChange={(e) => setSelectedDepartment(e.target.value)}
                        className="border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-48"
                    >
                        <option value="">All Specialties</option>
                        {departments.map(dept => (
                            <option key={dept} value={dept}>{dept}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Doctors Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredDoctors.map(doctor => (
                    <div key={doctor.id} className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] group">
                        <div className="text-center mb-6">
                            <div className="relative inline-block">
                                <img
                                    src={`https://i.pravatar.cc/100?img=${doctor.id}`}
                                    alt={`${doctor.firstName} ${doctor.lastName}`}
                                    className="w-20 h-20 rounded-2xl border-4 border-blue-200 object-cover shadow-lg mx-auto"
                                />
                                <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-white"></div>
                            </div>
                            <h3 className="font-bold text-xl text-gray-900 mt-4">Dr. {doctor.firstName} {doctor.lastName}</h3>
                            <p className="text-blue-600 font-semibold">{doctor.specialty}</p>
                        </div>
                        
                        <div className="space-y-3 mb-6">
                            <div className="bg-gray-50 rounded-xl p-3">
                                <div className="flex items-center space-x-2">
                                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span className="text-sm font-medium text-gray-700">Experience:</span>
                                    <span className="text-sm text-gray-900 font-semibold">{doctor.experience || 'N/A'} years</span>
                                </div>
                            </div>
                            <div className="bg-gray-50 rounded-xl p-3">
                                <div className="flex items-center space-x-2">
                                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <span className="text-sm font-medium text-gray-700">Email:</span>
                                    <span className="text-sm text-gray-900 font-semibold truncate">{doctor.email || 'N/A'}</span>
                                </div>
                            </div>
                        </div>

                        <button 
                            onClick={() => handleBookAppointment(doctor)}
                            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 px-4 rounded-xl transition-all duration-200 text-sm font-semibold shadow-lg hover:shadow-xl transform group-hover:scale-[1.02] flex items-center justify-center space-x-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0V6a2 2 0 012-2h4a2 2 0 012 2v1m-6 0h8m-8 0l1 12a2 2 0 002 2h6a2 2 0 002-2l1-12m-8 0V9a2 2 0 012-2h4a2 2 0 012 2v0" />
                            </svg>
                            <span>Book Appointment</span>
                        </button>
                    </div>
                ))}
            </div>

            {filteredDoctors.length === 0 && (
                <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-16">
                    <div className="text-center">
                        <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                        </svg>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No doctors found</h3>
                        <p className="text-gray-500">No doctors match your search criteria. Try adjusting your filters.</p>
                    </div>
                </div>
            )}

            {/* Booking Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl">
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0V6a2 2 0 012-2h4a2 2 0 012 2v1m-6 0h8m-8 0l1 12a2 2 0 002 2h6a2 2 0 002-2l1-12m-8 0V9a2 2 0 012-2h4a2 2 0 012 2v0" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                Book Appointment
                            </h3>
                            <p className="text-gray-600">
                                Dr. {selectedDoctor?.firstName} {selectedDoctor?.lastName}
                            </p>
                            <p className="text-sm text-blue-600 font-medium">{selectedDoctor?.specialty}</p>
                        </div>
                        
                        <div className="mb-6">
                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                                Select Date & Time
                            </label>
                            <input
                                type="datetime-local"
                                value={appointmentDate}
                                onChange={(e) => setAppointmentDate(e.target.value)}
                                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                min={new Date().toISOString().slice(0, 16)}
                            />
                        </div>
                        
                        <div className="flex gap-4">
                            <button
                                onClick={() => setShowModal(false)}
                                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 px-4 rounded-xl transition-all duration-200 font-semibold"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmitBooking}
                                disabled={booking}
                                className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 px-4 rounded-xl transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                            >
                                {booking ? (
                                    <>
                                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                                        </svg>
                                        <span>Booking...</span>
                                    </>
                                ) : (
                                    <span>Book Appointment</span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );

};

export default DoctorsList;