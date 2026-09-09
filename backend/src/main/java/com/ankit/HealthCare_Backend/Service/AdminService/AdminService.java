package com.ankit.HealthCare_Backend.Service.AdminService;

import java.util.List;
import com.ankit.HealthCare_Backend.DTO.DoctorDTO;
import com.ankit.HealthCare_Backend.DTO.PatientDTO;
import com.ankit.HealthCare_Backend.DTO.BillingDTO;

public interface AdminService {
    List<DoctorDTO> getAllDoctors();
    DoctorDTO approveDoctor(Long id);
    List<PatientDTO> getAllPatients();
    DoctorDTO rejectDoctor(Long id);
    List<BillingDTO> getAllBilling();
    BillingDTO updateBillingStatus(Long id, String status);
    Integer getDailyRevenue();
    Integer getMonthlyRevenue();
}
