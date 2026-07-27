package com.example.demo.entity;

import java.time.LocalDate;

import com.example.demo.enums.Gender;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "customer_profiles")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CustomerProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "customerid")
    private Integer customerId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userid", nullable = false, unique = true)
    private User user;

    @Column(name = "firstname", length = 50)
    private String firstName;

    @Column(name = "lastname", length = 50)
    private String lastName;

    @Column(name = "phone", length = 15)
    private String phone;

    @Column(name = "dob")
    private LocalDate dob;

    @Enumerated(EnumType.STRING)
    @Column(name = "gender")
    private Gender gender;
}