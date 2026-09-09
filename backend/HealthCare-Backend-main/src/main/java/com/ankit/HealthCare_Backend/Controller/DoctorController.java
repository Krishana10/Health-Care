package com.ankit.HealthCare_Backend.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ankit.HealthCare_Backend.DTO.AppointmentDTO;
import com.ankit.HealthCare_Backend.DTO.PrescriptionDTO;
import com.ankit.HealthCare_Backend.DTO.UpdateStatusDTO;
import com.ankit.HealthCare_Backend.Service.DoctorService.DoctorService;

@RestController
@RequestMapping("/api/doctor")
public class DoctorController {
    @Autowired
    private DoctorService doctorService;

    // get the upcoming all appoinments Pending,Schedulled,Completed etc
    @GetMapping("/appointments/my")
    public ResponseEntity<List<AppointmentDTO>> getUpcomingAppointments() {
        List<AppointmentDTO> appointments = doctorService.myUpcomingAppointments();
        return ResponseEntity.ok(appointments);
    }

    // change appointment Status
    @PutMapping("/appointments/{id}/status")
    public ResponseEntity<AppointmentDTO> updateAppointmentStatus(
            @PathVariable Long id,
            @RequestBody UpdateStatusDTO statusDTO) {

        AppointmentDTO updatedAppointment = doctorService.updateAppointmentStatus(id, statusDTO);
        return ResponseEntity.ok(updatedAppointment);
    }

    // Create a new prescription for a completed appointment.
    @PostMapping("/prescription")
    public ResponseEntity<PrescriptionDTO> createPrescription(@RequestBody PrescriptionDTO prescriptionDTO) {
        PrescriptionDTO createdPrescription = doctorService.createPrescription(prescriptionDTO);
        return ResponseEntity.ok(createdPrescription);
    }

    // Get all prescriptions created by this doctor
    @GetMapping("/prescriptions")
    public ResponseEntity<List<PrescriptionDTO>> getMyPrescriptions() {
        List<PrescriptionDTO> prescriptions = doctorService.getMyPrescriptions();
        return ResponseEntity.ok(prescriptions);
    }
}
