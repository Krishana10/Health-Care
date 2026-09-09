package com.ankit.HealthCare_Backend.Service.DoctorService;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ankit.HealthCare_Backend.DTO.AppointmentDTO;
import com.ankit.HealthCare_Backend.DTO.PrescriptionDTO;
import com.ankit.HealthCare_Backend.DTO.UpdateStatusDTO;
import com.ankit.HealthCare_Backend.Entity.Appointment;
import com.ankit.HealthCare_Backend.Entity.Doctor;
import com.ankit.HealthCare_Backend.Entity.Prescription;
import com.ankit.HealthCare_Backend.Entity.User;
import com.ankit.HealthCare_Backend.Repository.AppointmentRepository;
import com.ankit.HealthCare_Backend.Repository.DoctorRepository;
import com.ankit.HealthCare_Backend.Repository.PrescriptionRepository;
import com.ankit.HealthCare_Backend.Repository.UserRepository;

@Service
public class DoctorServiceImpl implements DoctorService {

    @Autowired
    private UserRepository userRepo;
    @Autowired
    private DoctorRepository doctorRepo;
    @Autowired
    private AppointmentRepository appointmentRepo;
    @Autowired
    private PrescriptionRepository prescriptionRepo;



    //Get upcoming appoinments of doctor
    @Override
    public List<AppointmentDTO> myUpcomingAppointments() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated() || auth instanceof AnonymousAuthenticationToken) {
            throw new RuntimeException("Unauthenticated");
        }

        String email = auth.getName();

        User user = userRepo.findByEmail(email);
        if (user == null) {
            throw new RuntimeException("User not found with Email " + email);
        }

        Doctor doctor = doctorRepo.findByUserId(user.getId());
        if (doctor == null) {
            // The authenticated user exists but is not a patient (or patient profile
            // missing)
            throw new RuntimeException("No doctor profile found for user: " + email);
        }

        Long doctorId = doctor.getId();
        List<Appointment> appointments = appointmentRepo.findByDoctorId(doctorId);

        return appointments.stream()
                .map(appointment -> convertToAppointmentDto(appointment))
                .collect(Collectors.toList());
    }

    

    // createPrescription
    @Override
    public PrescriptionDTO createPrescription(PrescriptionDTO prescriptionDTO) {
        Appointment appointment = appointmentRepo.findById(prescriptionDTO.getAppointmentId())
                .orElseThrow(() -> new RuntimeException(
                        "Appointment not found with id: " + prescriptionDTO.getAppointmentId()));

        Prescription prescription = new Prescription();
        prescription.setAppointment(appointment);
        prescription.setDosages(prescriptionDTO.getDosages());
        prescription.setMedicationDetails(prescriptionDTO.getMedicationDetails());
        Prescription savedPrescription = prescriptionRepo.save(prescription);
        return convertToPrescriptionDto(savedPrescription);
    }

    // Helper method to convert the entity to a DTO
    private AppointmentDTO convertToAppointmentDto(Appointment appointment) {
    AppointmentDTO dto = new AppointmentDTO();
    dto.setId(appointment.getId());
    dto.setPatientId(appointment.getPatient().getId());
    dto.setPatientFirstName(appointment.getPatient().getFirstName());
    dto.setPatientLastName(appointment.getPatient().getLastName());
    dto.setDoctorId(appointment.getDoctor().getId());
    dto.setAppointmentDate(appointment.getAppointmentDate());
    dto.setStatus(appointment.getStatus());
    return dto;
}


    private PrescriptionDTO convertToPrescriptionDto(Prescription prescription) {
        PrescriptionDTO dto = new PrescriptionDTO();
        dto.setId(prescription.getId()); // This will now have a value
        dto.setAppointmentId(prescription.getAppointment().getId()); // Get the ID from the nested object
        dto.setDosages(prescription.getDosages());
        dto.setMedicationDetails(prescription.getMedicationDetails());
        return dto;
    }

    @Override
    @Transactional
    public AppointmentDTO updateAppointmentStatus(Long id, UpdateStatusDTO status)  {
        Appointment appointment=appointmentRepo.findById(id).orElseThrow(() -> new RuntimeException("Appointment not found with id: " + id));
        appointment.setStatus(status.getStatus());
        Appointment savedAppointment = appointmentRepo.save(appointment); 
        return  convertToAppointmentDto(savedAppointment);
    }

    @Override
    public List<PrescriptionDTO> getMyPrescriptions() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated() || auth instanceof AnonymousAuthenticationToken) {
            throw new RuntimeException("Unauthenticated");
        }

        String email = auth.getName();
        User user = userRepo.findByEmail(email);
        if (user == null) {
            throw new RuntimeException("User not found with Email " + email);
        }

        Doctor doctor = doctorRepo.findByUserId(user.getId());
        if (doctor == null) {
            throw new RuntimeException("No doctor profile found for user: " + email);
        }

        Long doctorId = doctor.getId();
        List<Appointment> doctorAppointments = appointmentRepo.findByDoctorId(doctorId);
        
        return doctorAppointments.stream()
                .flatMap(appointment -> prescriptionRepo.findByAppointmentId(appointment.getId()).stream())
                .map(this::convertToPrescriptionDtoWithPatient)
                .collect(Collectors.toList());
    }

    private PrescriptionDTO convertToPrescriptionDtoWithPatient(Prescription prescription) {
        PrescriptionDTO dto = new PrescriptionDTO();
        dto.setId(prescription.getId());
        dto.setAppointmentId(prescription.getAppointment().getId());
        dto.setPatientId(prescription.getAppointment().getPatient().getId());
        dto.setPatientFirstName(prescription.getAppointment().getPatient().getFirstName());
        dto.setPatientLastName(prescription.getAppointment().getPatient().getLastName());
        dto.setDosages(prescription.getDosages());
        dto.setMedicationDetails(prescription.getMedicationDetails());
        dto.setCreatedAt(prescription.getCreatedAt());
        return dto;
    }
}
