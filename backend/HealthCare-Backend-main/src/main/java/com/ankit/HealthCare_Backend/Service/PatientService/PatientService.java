package com.ankit.HealthCare_Backend.Service.PatientService;

import java.util.List;

import com.ankit.HealthCare_Backend.DTO.AppointmentDTO;
import com.ankit.HealthCare_Backend.DTO.DoctorDTO;
import com.ankit.HealthCare_Backend.DTO.PatientDTO;
import com.ankit.HealthCare_Backend.DTO.PrescriptionDTO;

public interface PatientService {
    List<DoctorDTO> getAllDoctors();
    AppointmentDTO newAppointment(AppointmentDTO appointmentDTO, String patientEmail);
    List<AppointmentDTO> getMyAppointments();
    List<PrescriptionDTO> getMyPrescriptions();
    PatientDTO getMyProfile();
    void makePayment(Long appointmentId);
    void cancelAppointment(Long appointmentId);
}
