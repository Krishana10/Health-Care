package com.ankit.HealthCare_Backend.Repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ankit.HealthCare_Backend.Entity.Prescription;

@Repository
public interface PrescriptionRepository extends JpaRepository<Prescription,Long>{
    List<Prescription> findByAppointmentId(Long appointmentId);
}
