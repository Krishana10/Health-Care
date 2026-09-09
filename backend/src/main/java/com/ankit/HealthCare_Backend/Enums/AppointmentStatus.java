package com.ankit.HealthCare_Backend.Enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum AppointmentStatus {
    PENDING,
    SCHEDULED,
    COMPLETED,
    CANCELED;

     @JsonValue
    public String getValue() {
        return name();
    }

    @JsonCreator
    public static AppointmentStatus fromValue(String value) {
        // Custom deserializer logic here
        // Map the JSON value to the corresponding enum constant
        return AppointmentStatus.valueOf(value.toUpperCase());
    }
}
