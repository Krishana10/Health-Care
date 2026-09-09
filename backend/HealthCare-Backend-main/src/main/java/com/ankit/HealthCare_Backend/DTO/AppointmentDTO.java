package com.ankit.HealthCare_Backend.DTO;

import com.ankit.HealthCare_Backend.Enums.AppointmentStatus;
import com.ankit.HealthCare_Backend.Enums.BillingStatus;
import lombok.Data;

import java.time.LocalDate;

@Data
public class AppointmentDTO {
    private Long id;
    private Long patientId;
    private Long doctorId;
    private String doctorFirstName;
    private String doctorLastName;
    private String patientFirstName;
    private String patientLastName;
    private String doctorSpecialty;
    private LocalDate appointmentDate;
    private AppointmentStatus status;
    private BillingStatus billingStatus;
    private Integer amount;
}
