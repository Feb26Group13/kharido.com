package com.example.demo.service.impl;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.dto.request.LoginRequest;
import com.example.demo.entity.User;
import com.example.demo.enums.AccountStatus;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.AuthService;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthServiceImpl(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public User login(LoginRequest request) {

        // Find user by username
        User user = userRepository
                .findByUsername(request.getUsername())
                .orElse(null);

        // User not found
        if (user == null) {
            return null;
        }

        // Check encrypted password
        if (!passwordEncoder.matches(
                request.getPassword(),
                user.getPassword())) {

            return null;
        }

        // Check account status
        if (user.getStatus() != AccountStatus.ACTIVE) {
            return null;
        }

        // Login successful - returns User only
        return user;
    }
}