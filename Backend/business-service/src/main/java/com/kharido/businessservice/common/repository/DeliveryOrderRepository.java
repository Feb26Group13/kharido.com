package com.kharido.businessservice.common.repository;

// 🔥 CHANGE: Import DeliveryOrder instead of Order
import com.kharido.businessservice.common.entity.DeliveryOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DeliveryOrderRepository extends JpaRepository<DeliveryOrder, Integer> {
    List<DeliveryOrder> findByUserid(Integer userId);
    boolean existsByUserid(Integer userId);
}