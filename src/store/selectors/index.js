//what selector actually do 
//extract the data from redux store 

// Auth selectors
export const selectAuth = (state) => state.auth;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectUserRole = (state) => state.auth.role;

// Appointments selectors
export const selectAppointments = (state) => state.appointments.list;
export const selectAppointmentsLoading = (state) => state.appointments.loading;
export const selectPatients = (state) => state.appointments.patients;

// Appointment stats selectors
export const selectCompletedAppointments = (state) => 
  state.appointments.list.filter(apt => apt.status === 'COMPLETED');

export const selectPendingAppointments = (state) => 
  state.appointments.list.filter(apt => apt.status === 'PENDING');

export const selectScheduledAppointments = (state) => 
  state.appointments.list.filter(apt => apt.status === 'SCHEDULED');

export const selectTodayAppointments = (state) => 
  state.appointments.list.filter(apt => 
    new Date(apt.appointmentDate).toDateString() === new Date().toDateString()
  );

// Prescriptions selectors
export const selectPrescriptions = (state) => state.prescriptions.list;
export const selectPrescriptionsLoading = (state) => state.prescriptions.loading;

// Doctors selectors
export const selectDoctors = (state) => state.doctors.list;
export const selectDoctorsLoading = (state) => state.doctors.loading;
export const selectPendingDoctors = (state) => state.doctors.pendingDoctors;
export const selectApprovedDoctors = (state) => 
  state.doctors.list.filter(doctor => doctor.isApproved);

// Patients selectors
export const selectAllPatients = (state) => state.patients.list;
export const selectPatientsLoading = (state) => state.patients.loading;
export const selectCurrentPatient = (state) => state.patients.currentPatient;