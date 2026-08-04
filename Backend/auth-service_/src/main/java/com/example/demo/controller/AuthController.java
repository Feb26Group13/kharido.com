package com.example.demo.controller;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.dto.request.LoginRequest;
import com.example.demo.dto.response.LoginResponse;
import com.example.demo.entity.DeliveryPartner;
import com.example.demo.entity.User;
import com.example.demo.repository.DeliveryPartnerRepository;
import com.example.demo.security.JwtCookieUtil;
import com.example.demo.security.JwtService;
import com.example.demo.service.AuthService;

import java.util.List;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(
        origins = "http://localhost:5173",
        allowCredentials = "true"
)
public class AuthController {

    private final AuthService authService;
    private final JwtService jwtService;
    private final JwtCookieUtil jwtCookieUtil;
    private final DeliveryPartnerRepository deliveryPartnerRepository;

    public AuthController(
            AuthService authService,
            JwtService jwtService,
            JwtCookieUtil jwtCookieUtil,
            DeliveryPartnerRepository deliveryPartnerRepository) {

        this.authService = authService;
        this.jwtService = jwtService;
        this.jwtCookieUtil = jwtCookieUtil;
        this.deliveryPartnerRepository = deliveryPartnerRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(
            @RequestBody LoginRequest request) {

        // 🔥 Step 1: Authenticate user
        User user = authService.login(request);

        // Login failed
        if (user == null) {
            return ResponseEntity.ok(new LoginResponse("Invalid username or password"));
        }

        // 🔥 Step 2: Get role
        String role = user.getRole().getRoleName();

        // 🔥 Step 3: Generate JWT token
        String token = jwtService.generateToken(
                user.getUsername(),
                role
        );

        // 🔥 Step 4: Get partner details if delivery partner
        Integer partnerId = null;
        String partnerCity = null;
        String partnerCompany = null;

        if ("DELIVERY_PARTNER".equals(role)) {
            List<DeliveryPartner> partners = deliveryPartnerRepository.findByUserid(user.getUserId());
            if (!partners.isEmpty()) {
                DeliveryPartner partner = partners.get(0);
                partnerId = partner.getDeliveryid();
                partnerCity = partner.getCity();
                partnerCompany = partner.getCompanyName();

                System.out.println("✅ Partner ID found: " + partnerId +
                    " for user: " + user.getUsername());
            }
        }

        // 🔥 Step 5: Create HttpOnly cookie
        ResponseCookie cookie = jwtCookieUtil.createJwtCookie(token);

        // 🔥 Step 6: Build response (NO token in body)
        LoginResponse response = new LoginResponse(
                "Login successful",
                user.getUsername(),
                role,
                user.getUserId(),
                partnerId,
                partnerCity,
                partnerCompany
        );

        // 🔥 Step 7: Return response with cookie
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(response);
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout() {

        ResponseCookie cookie = jwtCookieUtil.deleteJwtCookie();

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body("Logout Successful");
    }
}