package com.ankit.HealthCare_Backend.DTO;

import lombok.Data;

@Data
public class ResetPasswordRequestDTO {
    private String token;
    private String newPassword;
}