package com.ankit.HealthCare_Backend.DTO;

import com.ankit.HealthCare_Backend.Enums.BillingStatus;
import lombok.Data;

@Data
public class BillingDTO {
    private Long id;
    private Long appointmentId;
    private int amount;
    private BillingStatus billingStatus;
}