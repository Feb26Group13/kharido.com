package com.example.demo.service.impl;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.example.demo.dto.request.SellerRegisterRequest;
import com.example.demo.dto.response.AuthResponse;
import com.example.demo.repository.RoleRepository;
import com.example.demo.repository.SellerProfileRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.SellerAuthService;
import com.example.demo.entity.Role;
import com.example.demo.entity.SellerProfile;
import com.example.demo.entity.User;
import com.example.demo.enums.AccountStatus;
@Service
public class SellerAuthServiceImpl implements SellerAuthService {

    private final UserRepository userRepository;
    private final SellerProfileRepository sellerProfileRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    public SellerAuthServiceImpl(UserRepository userRepository,
                                 SellerProfileRepository sellerProfileRepository,
                                 RoleRepository roleRepository,
                                 PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.sellerProfileRepository = sellerProfileRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }
    @Override
    public AuthResponse registerSeller(SellerRegisterRequest request) {

        if (userRepository.existsByUsername(request.getUsername())) {
            return new AuthResponse("Username already exists");
        }

        if (userRepository.existsByEmail(request.getEmail())) {
            return new AuthResponse("Email already exists");
        }

        Role sellerRole = roleRepository.findByRoleName("SELLER")
                .orElseThrow(() -> new RuntimeException("SELLER role not found"));

        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setStatus(AccountStatus.ACTIVE);
        user.setRole(sellerRole);

        User savedUser = userRepository.save(user);

        SellerProfile sellerProfile = new SellerProfile();
        sellerProfile.setUser(savedUser);
        sellerProfile.setShopName(request.getShopName());
        sellerProfile.setGstNumber(request.getGstNumber());
        sellerProfile.setPhone(request.getPhone());
        sellerProfile.setApprovalStatus("PENDING");

        sellerProfileRepository.save(sellerProfile);

        return new AuthResponse("Seller Registered Successfully");
    }

}