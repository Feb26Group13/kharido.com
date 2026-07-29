package com.example.demo.service;

import com.example.demo.dto.request.LoginRequest;
import com.example.demo.dto.response.LoginResponse;

public interface AuthService {

    LoginResponse login(LoginRequest request);
}