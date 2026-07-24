package com.example.demo.dto.request;

import java.time.LocalDate;

import com.example.demo.enums.Gender;

import lombok.Data;

@Data
public class CustomerRegistrationRequest {

    private String firstname;
    private String lastname;
    private String username;
    private String email;
    private String password;
    private String phone;
    private LocalDate dob;
    private Gender gender;

}