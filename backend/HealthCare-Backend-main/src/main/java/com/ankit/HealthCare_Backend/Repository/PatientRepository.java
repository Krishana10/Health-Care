package com.ankit.HealthCare_Backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ankit.HealthCare_Backend.Entity.Patient;

@Repository
public interface PatientRepository extends JpaRepository<Patient,Long>{
	// Find a Patient record based on the linked User id
	Patient findByUserId(Long userId);
	
}
