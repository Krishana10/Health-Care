package com.ankit.HealthCare_Backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ankit.HealthCare_Backend.Entity.Billing;

@Repository
public interface BillingRepository extends JpaRepository<Billing,Long>{

}
