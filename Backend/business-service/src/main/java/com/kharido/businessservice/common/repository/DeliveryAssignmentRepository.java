package com.kharido.businessservice.common.repository;

import com.kharido.businessservice.common.entity.DeliveryAssignment;
import com.kharido.businessservice.common.enums.DeliveryStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface DeliveryAssignmentRepository extends JpaRepository<DeliveryAssignment, Integer> {

    List<DeliveryAssignment> findByOrderid(Integer orderId);

    List<DeliveryAssignment> findByDeliveryid(Integer deliveryId);

    List<DeliveryAssignment> findByPickupStatus(DeliveryStatus status);

    List<DeliveryAssignment> findByDeliveryidAndPickupStatus(Integer deliveryId, DeliveryStatus status);

    boolean existsByOrderid(Integer orderId);
}