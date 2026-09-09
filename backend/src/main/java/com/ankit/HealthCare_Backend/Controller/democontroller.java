// Create a new file: DemoController.java
package com.ankit.HealthCare_Backend.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/demo") // A new, protected path
public class democontroller {

    @GetMapping("/greeting")
    public ResponseEntity<String> sayHello() {
        return ResponseEntity.ok("Hello from a SECURED endpoint!");
    }
}