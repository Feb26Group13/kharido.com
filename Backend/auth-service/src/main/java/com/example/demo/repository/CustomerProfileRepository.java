package com.example.demo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.CustomerProfile;

public interface CustomerProfileRepository extends JpaRepository<CustomerProfile, Integer> {

    Optional<CustomerProfile> findByUserUserId(Integer userId);

}