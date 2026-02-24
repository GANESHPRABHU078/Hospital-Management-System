package com.hospital.entity;

import com.hospital.util.DataEncryptionConverter;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "patients")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long patientId;
    
    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @Column(nullable = false, unique = true)
    private String email;

    @Convert(converter = DataEncryptionConverter.class)
    @Column(nullable = false)
    private String phoneNumber;

    @Column(nullable = false)
    private String gender;

    @Convert(converter = DataEncryptionConverter.class)
    @Column(nullable = false)
    private String dateOfBirth;

   
    @Convert(converter = DataEncryptionConverter.class)
    private String address;

   
    private String city;

    
    private String state;

   
    private String country;

    @Column(nullable = false)
    private String password; // This should be encrypted using BCrypt

    @CreationTimestamp
    private LocalDateTime registrationDate;

    @Column(nullable = false)
    private boolean isActive = true;
}

