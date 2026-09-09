package com.ankit.HealthCare_Backend.DTO;

import com.ankit.HealthCare_Backend.Enums.AppointmentStatus;
import lombok.Data;

@Data
public class UpdateStatusDTO {
    private AppointmentStatus status;
}