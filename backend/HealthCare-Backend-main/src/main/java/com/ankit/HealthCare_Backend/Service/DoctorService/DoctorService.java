package com.ankit.HealthCare_Backend.Service.DoctorService;

import java.util.List;

import com.ankit.HealthCare_Backend.DTO.AppointmentDTO;
import com.ankit.HealthCare_Backend.DTO.PrescriptionDTO;
import com.ankit.HealthCare_Backend.DTO.UpdateStatusDTO;
import io.swagger.v3.oas.annotations.parameters.RequestBody;

public interface DoctorService {
    List<AppointmentDTO> myUpcomingAppointments();
    PrescriptionDTO createPrescription(@RequestBody PrescriptionDTO prescriptionDTO);
    AppointmentDTO updateAppointmentStatus(Long id, UpdateStatusDTO status);
    List<PrescriptionDTO> getMyPrescriptions();
}
