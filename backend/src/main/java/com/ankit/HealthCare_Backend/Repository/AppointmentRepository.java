package com.ankit.HealthCare_Backend.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ankit.HealthCare_Backend.Entity.Appointment;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    // in AppointmentRepository (extends JpaRepository<Appointment, Long>)
    List<Appointment> findByPatientId(Long patientId);
    List<Appointment> findByDoctorId(Long doctorId);
    Appointment findByPatientIdAndDoctorIdAndAppointmentDate(Long patientId, Long doctorId, java.time.LocalDate appointmentDate);
    Appointment findByIdAndDoctorId(Long id, Long doctorId);
}
