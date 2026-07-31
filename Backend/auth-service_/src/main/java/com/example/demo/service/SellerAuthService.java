package com.example.demo.service;

import com.example.demo.dto.request.SellerRegisterRequest;
import com.example.demo.dto.response.AuthResponse;
public interface SellerAuthService {

    AuthResponse registerSeller(SellerRegisterRequest request);

}