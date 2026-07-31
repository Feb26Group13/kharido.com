package com.example.demo.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.demo.dto.request.SellerRegisterRequest;
import com.example.demo.dto.response.AuthResponse;
import com.example.demo.service.SellerAuthService;
@RestController
@RequestMapping("/seller")
@CrossOrigin(origins = "*")
public class SellerAuthController {

    private final SellerAuthService sellerAuthService;

    public SellerAuthController(SellerAuthService sellerAuthService) {
        this.sellerAuthService = sellerAuthService;
    }

    @GetMapping("/test")
    public String test() {
        return "Seller Auth Service is Working";
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> registerSeller(
            @RequestBody SellerRegisterRequest request) {

        System.out.println("===== REGISTER CONTROLLER CALLED =====");

        AuthResponse response = sellerAuthService.registerSeller(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

}