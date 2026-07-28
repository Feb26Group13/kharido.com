package com.example.demo.service;

import com.example.demo.dto.request.CustomerRegistrationRequest;
import com.example.demo.dto.response.RegistrationResponse;

public interface UserService {

    RegistrationResponse registerCustomer(CustomerRegistrationRequest request);

}