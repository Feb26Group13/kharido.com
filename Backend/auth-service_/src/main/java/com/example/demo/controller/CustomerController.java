package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.dto.request.CustomerRegistrationRequest;
import com.example.demo.dto.response.RegistrationResponse;
import com.example.demo.service.UserService;

@RestController
@RequestMapping("/api/customers")
@CrossOrigin(origins = "http://localhost:5173")
public class CustomerController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public RegistrationResponse registerCustomer(
            @RequestBody CustomerRegistrationRequest request) {

        System.out.println("===== CustomerController reached =====");

        return userService.registerCustomer(request);
    }
}