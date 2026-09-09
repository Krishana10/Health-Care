package com.ankit.HealthCare_Backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ankit.HealthCare_Backend.Entity.Doctor;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor,Long>{
    Doctor findByUserId(Long userId);
}
