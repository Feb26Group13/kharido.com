// package com.example.demo.repository;
//
// import com.example.demo.entity.DeliveryPartner;
// import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.stereotype.Repository;
// import java.util.List;
// import java.util.Optional;
//
// @Repository
// public interface DeliveryPartnerRepository extends JpaRepository<DeliveryPartner, Integer> {
//
//     // 🔥 Change this to return List (since multiple partners possible)
//     List<DeliveryPartner> findByUserid(Integer userId);
//
//     // Or keep Optional for city (which is unique)
//     Optional<DeliveryPartner> findByCity(String city);
//
//     // Get first/primary partner
//     default Optional<DeliveryPartner> findPrimaryByUserid(Integer userId) {
//         List<DeliveryPartner> partners = findByUserid(userId);
//         return partners.isEmpty() ? Optional.empty() : Optional.of(partners.get(0));
//     }
// }

package com.example.demo.repository;

import com.example.demo.entity.DeliveryPartner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface DeliveryPartnerRepository extends JpaRepository<DeliveryPartner, Integer> {

    // Return list of partners for a user (multiple cities possible)
    List<DeliveryPartner> findByUserid(Integer userId);

    // Find partners by city
    List<DeliveryPartner> findByCity(String city);

    // Find active partners
    List<DeliveryPartner> findByUseridAndStatus(Integer userId, String status);
}