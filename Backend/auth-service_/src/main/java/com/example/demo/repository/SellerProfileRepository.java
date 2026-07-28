package com.example.demo.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.SellerProfile;

public interface SellerProfileRepository extends JpaRepository<SellerProfile, Integer> {

}

