package com.ankit.HealthCare_Backend.Service.AuthService;

import com.ankit.HealthCare_Backend.DTO.RegisterRequestDTO;
import com.ankit.HealthCare_Backend.DTO.UserResponseDTO;


public interface AuthService {
    //to register the user
    UserResponseDTO registerUser(RegisterRequestDTO registerRequest);
    
    //for forgot password
    String forgotPassword(String email);
    
    //for reset password
    String resetPassword(String token, String newPassword);
}
