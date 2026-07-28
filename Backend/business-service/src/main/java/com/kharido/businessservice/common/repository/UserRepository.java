package com.kharido.businessservice.common.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kharido.businessservice.common.entity.User;

public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findByEmail(String email);

    Optional<User> findByUsername(String username);
    
    Optional<User> findByUsernameOrEmail(String username, String email);

    boolean existsByEmail(String email);

    boolean existsByUsername(String username);

}