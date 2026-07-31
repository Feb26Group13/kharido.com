package com.example.demo.service.impl;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.dto.request.CustomerRegistrationRequest;
import com.example.demo.dto.response.RegistrationResponse;
import com.example.demo.entity.CustomerProfile;
import com.example.demo.entity.Role;
import com.example.demo.entity.User;
import com.example.demo.enums.AccountStatus;
import com.example.demo.repository.CustomerProfileRepository;
import com.example.demo.repository.RoleRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.UserService;

@Service
@Transactional
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private RoleRepository roleRepository;

	@Autowired
	private CustomerProfileRepository customerProfileRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Override
	public RegistrationResponse registerCustomer(CustomerRegistrationRequest request) {

		if (userRepository.existsByUsername(request.getUsername())) {
			return new RegistrationResponse("Username already exists");
		}

		if (userRepository.existsByEmail(request.getEmail())) {
			return new RegistrationResponse("Email already exists");
		}

		Role customerRole = roleRepository.findByRoleName("CUSTOMER")
				.orElseThrow(() -> new RuntimeException("Customer role not found"));

		User user = User.builder().username(request.getUsername()).email(request.getEmail())
				.password(passwordEncoder.encode(request.getPassword())).status(AccountStatus.ACTIVE)
				.createdAt(LocalDateTime.now()).role(customerRole).build();

		user = userRepository.save(user);

		CustomerProfile customerProfile = CustomerProfile.builder().user(user).firstName(request.getFirstname())
				.lastName(request.getLastname()).phone(request.getPhone()).dob(request.getDob())
				.gender(request.getGender()).build();

		customerProfileRepository.save(customerProfile);

		return new RegistrationResponse(

				"Customer registered successfully");
	}
}