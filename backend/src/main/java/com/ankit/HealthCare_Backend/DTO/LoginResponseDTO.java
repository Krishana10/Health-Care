// In LoginResponseDTO.java
package com.ankit.HealthCare_Backend.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponseDTO {
    private String jwt; 
    private String message;

    public LoginResponseDTO(String jwt) {
        this.jwt = jwt;
    }
}