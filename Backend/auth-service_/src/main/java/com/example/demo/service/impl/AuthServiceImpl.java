package com.example.demo.service.impl;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.dto.request.LoginRequest;
import com.example.demo.dto.response.LoginResponse;
import com.example.demo.entity.User;
import com.example.demo.enums.AccountStatus;
import com.example.demo.repository.UserRepository;
import com.example.demo.security.JwtService;
import com.example.demo.service.AuthService;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthServiceImpl(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    @Override
    public LoginResponse login(LoginRequest request) {

        // Find user by username
        User user = userRepository
                .findByUsername(request.getUsername())
                .orElse(null);

        // User not found
        if (user == null) {
            return new LoginResponse(
                    "User not found",
                    null,
                    null,
                    null
            );
        }

        // Check encrypted password
        if (!passwordEncoder.matches(
                request.getPassword(),
                user.getPassword())) {

            return new LoginResponse(
                    "Invalid password",
                    null,
                    null,
                    null
            );
        }

        // Check account status
        if (user.getStatus() != AccountStatus.ACTIVE) {

            return new LoginResponse(
                    "User account is not active",
                    null,
                    null,
                    null
            );
        }

        // Get role
        String role = user.getRole().getRoleName();

        // Generate JWT
        String token = jwtService.generateToken(
                user.getUsername(),
                role
        );

        // Login successful
        return new LoginResponse(
                "Login successful",
                user.getUsername(),
                role,
                token
        );
    }
}