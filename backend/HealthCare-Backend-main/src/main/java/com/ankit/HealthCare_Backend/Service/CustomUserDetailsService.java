package com.ankit.HealthCare_Backend.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.ankit.HealthCare_Backend.Entity.Role;
import com.ankit.HealthCare_Backend.Entity.User;
import com.ankit.HealthCare_Backend.Repository.UserRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepo; 
    // These values are injected from your application.properties file
    @Value("${app.admin.email}")
    private String adminEmail;

    @Value("${app.admin.password}")
    private String adminPasswordHash; // This is the HASHED password

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        // --- Step 1: Check if the login is for the hardcoded admin ---
        if (adminEmail.equals(email)) {
            return org.springframework.security.core.userdetails.User
                    .withUsername(adminEmail)
                    .password(adminPasswordHash) // Use the hashed password from properties
                    .roles("ADMIN")
                    .build();
        }

        User user = userRepo.findByEmail(email);
        if (user == null) {
            throw new UsernameNotFoundException("User not found with email: " + email);
        }

        
        // Step 1: Get the entire Role object from the user.
        Role roleObject = user.getRole();

        // Step 2: Get the role name (a String) from the Role object.
        // We assume your Role entity has a field named 'name' or 'roleName'. Let's use
        // 'name'.
        String roleName = roleObject.getName();

        // Null check for safety
        if (roleName == null || roleName.trim().isEmpty()) {
            throw new IllegalStateException("User '" + email + "' has a role with no name.");
        }

        // Step 3: Use the roleName string to create the authority.
        List<GrantedAuthority> authorities = List.of(
                new SimpleGrantedAuthority("ROLE_" + roleName.toUpperCase()));

        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                authorities);
    }
}