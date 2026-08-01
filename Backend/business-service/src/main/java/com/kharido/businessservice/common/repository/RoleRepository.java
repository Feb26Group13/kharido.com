package com.kharido.businessservice.common.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kharido.businessservice.common.entity.Role;

public interface RoleRepository extends JpaRepository<Role, Integer> {

    Optional<Role> findByRoleName(String roleName);

}
