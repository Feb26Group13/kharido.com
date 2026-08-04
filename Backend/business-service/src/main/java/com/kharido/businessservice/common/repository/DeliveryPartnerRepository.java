package com.kharido.businessservice.common.repository;

import com.kharido.businessservice.common.entity.DeliveryPartner;
import com.kharido.businessservice.common.enums.DeliveryPartnerStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface DeliveryPartnerRepository extends JpaRepository<DeliveryPartner, Integer> {

    List<DeliveryPartner> findByStatus(DeliveryPartnerStatus status);

    Optional<DeliveryPartner> findByCity(String city);

    List<DeliveryPartner> findByCityContaining(String city);

    Optional<DeliveryPartner> findByUserid(Integer userId);
}