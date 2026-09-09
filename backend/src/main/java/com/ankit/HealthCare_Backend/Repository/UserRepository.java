package com.ankit.HealthCare_Backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ankit.HealthCare_Backend.Entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{
    User findByEmail(String Email);
}
