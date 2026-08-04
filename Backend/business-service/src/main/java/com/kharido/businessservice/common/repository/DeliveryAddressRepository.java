package com.kharido.businessservice.common.repository;

// 🔥 CHANGE: Import DeliveryAddress instead of Address
import com.kharido.businessservice.common.entity.DeliveryAddress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DeliveryAddressRepository extends JpaRepository<DeliveryAddress, Integer> {
    List<DeliveryAddress> findByUserid(Integer userId);
    Optional<DeliveryAddress> findByUseridAndIsDefaultTrue(Integer userId);
    boolean existsByUserid(Integer userId);
}