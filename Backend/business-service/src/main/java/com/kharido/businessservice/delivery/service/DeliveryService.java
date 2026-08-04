package com.kharido.businessservice.delivery.service;

import com.kharido.businessservice.common.dto.DeliveryDTO;
import com.kharido.businessservice.common.dto.DeliveryStatsDTO;
import com.kharido.businessservice.common.entity.DeliveryAssignment;
import com.kharido.businessservice.common.entity.DeliveryPartner;
// 🔥 CHANGE: Use DeliveryOrder instead of Order
import com.kharido.businessservice.common.entity.DeliveryOrder;
// 🔥 CHANGE: Use DeliveryAddress instead of Address
import com.kharido.businessservice.common.entity.DeliveryAddress;
import com.kharido.businessservice.common.entity.User;
import com.kharido.businessservice.common.enums.DeliveryPartnerStatus;
import com.kharido.businessservice.common.enums.DeliveryStatus;
import com.kharido.businessservice.common.repository.DeliveryAssignmentRepository;
import com.kharido.businessservice.common.repository.DeliveryPartnerRepository;
// 🔥 CHANGE: Use DeliveryOrderRepository instead of OrderRepository
import com.kharido.businessservice.common.repository.DeliveryOrderRepository;
// 🔥 CHANGE: Use DeliveryAddressRepository instead of AddressRepository
import com.kharido.businessservice.common.repository.DeliveryAddressRepository;
import com.kharido.businessservice.common.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class DeliveryService {

    @Autowired
    private DeliveryAssignmentRepository deliveryAssignmentRepository;

    @Autowired
    private DeliveryPartnerRepository deliveryPartnerRepository;

    // 🔥 CHANGE: DeliveryOrderRepository instead of OrderRepository
    @Autowired
    private DeliveryOrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    // 🔥 CHANGE: DeliveryAddressRepository instead of AddressRepository
    @Autowired
    private DeliveryAddressRepository addressRepository;

    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    // ============ ADMIN SERVICES ============

    public List<DeliveryDTO> getAllDeliveries() {
        List<DeliveryAssignment> assignments = deliveryAssignmentRepository.findAll();
        return assignments.stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }

    public DeliveryStatsDTO getDeliveryStatistics() {
        DeliveryStatsDTO stats = new DeliveryStatsDTO();
        stats.setTotal(deliveryAssignmentRepository.count());
        stats.setPending(deliveryAssignmentRepository.findByPickupStatus(DeliveryStatus.PENDING).stream().count());
        stats.setPicked(deliveryAssignmentRepository.findByPickupStatus(DeliveryStatus.PICKED).stream().count());
        stats.setInTransit(deliveryAssignmentRepository.findByPickupStatus(DeliveryStatus.IN_TRANSIT).stream().count());
        stats.setDelivered(deliveryAssignmentRepository.findByPickupStatus(DeliveryStatus.DELIVERED).stream().count());
        return stats;
    }

    public List<DeliveryPartner> getAllDeliveryPartners() {
        return deliveryPartnerRepository.findAll();
    }

    @Transactional
    public DeliveryAssignment assignDelivery(Integer orderId, Integer partnerId) {
        if (deliveryAssignmentRepository.existsByOrderid(orderId)) {
            throw new RuntimeException("Order already assigned to a delivery partner");
        }

        // 🔥 CHANGE: DeliveryOrder instead of Order
        DeliveryOrder order = orderRepository.findById(orderId)
            .orElseThrow(() -> new RuntimeException("Order not found"));

        DeliveryPartner partner = deliveryPartnerRepository.findById(partnerId)
            .orElseThrow(() -> new RuntimeException("Delivery partner not found"));

        if (partner.getStatus() != DeliveryPartnerStatus.ACTIVE) {
            throw new RuntimeException("Delivery partner is not active");
        }

        DeliveryAssignment assignment = new DeliveryAssignment();
        assignment.setOrderid(orderId);
        assignment.setDeliveryid(partnerId);
        assignment.setAssignedDate(LocalDateTime.now());
        assignment.setPickupStatus(DeliveryStatus.PENDING);

        return deliveryAssignmentRepository.save(assignment);
    }

    @Transactional
    public void cancelDelivery(Integer assignmentId) {
        DeliveryAssignment assignment = deliveryAssignmentRepository.findById(assignmentId)
            .orElseThrow(() -> new RuntimeException("Delivery assignment not found"));
        deliveryAssignmentRepository.delete(assignment);
    }

    // ============ DELIVERY PARTNER SERVICES ============

    public List<DeliveryDTO> getDeliveriesForPartner(Integer partnerId) {
        List<DeliveryAssignment> assignments = deliveryAssignmentRepository.findByDeliveryid(partnerId);
        System.out.println("📋 Found " + assignments.size() + " assignments for partner " + partnerId);
        return assignments.stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }

    @Transactional
    public DeliveryAssignment updateDeliveryStatus(Integer assignmentId, String status) {
        DeliveryAssignment assignment = deliveryAssignmentRepository.findById(assignmentId)
            .orElseThrow(() -> new RuntimeException("Delivery assignment not found"));

        try {
            DeliveryStatus newStatus = DeliveryStatus.valueOf(status);
            assignment.setPickupStatus(newStatus);
            return deliveryAssignmentRepository.save(assignment);
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid status: " + status);
        }
    }

    // ============ CUSTOMER SERVICES ============

    public List<DeliveryAssignment> trackOrder(Integer orderId) {
        return deliveryAssignmentRepository.findByOrderid(orderId);
    }

    // ============ HELPER METHODS ============

    private DeliveryDTO convertToDTO(DeliveryAssignment assignment) {
        DeliveryDTO dto = new DeliveryDTO();
        dto.setAssignmentId(assignment.getAssignmentid());
        dto.setOrderId(assignment.getOrderid());
        dto.setPickupStatus(assignment.getPickupStatus().toString());
        dto.setAssignedDate(assignment.getAssignedDate().format(DATE_FORMATTER));

        // 🔥 CHANGE: orderRepository (which is DeliveryOrderRepository)
        orderRepository.findById(assignment.getOrderid()).ifPresent(order -> {
            dto.setTotalAmount(order.getTotalAmount());
            dto.setOrderStatus(order.getOrderStatus().toString());

            userRepository.findById(order.getUserid()).ifPresent(user -> {
                dto.setCustomerName(user.getUsername());
                dto.setCustomerEmail(user.getEmail());
            });

            // 🔥 CHANGE: addressRepository (which is DeliveryAddressRepository)
            addressRepository.findById(order.getAddressid()).ifPresent(address -> {
                String fullAddress = String.format("%s, %s, %s - %s",
                    address.getStreet() != null ? address.getStreet() : "",
                    address.getCity() != null ? address.getCity() : "",
                    address.getState() != null ? address.getState() : "",
                    address.getPincode() != null ? address.getPincode() : ""
                );
                dto.setDeliveryAddress(fullAddress);
                dto.setDeliveryCity(address.getCity());
            });
        });

        deliveryPartnerRepository.findById(assignment.getDeliveryid()).ifPresent(partner -> {
            dto.setDeliveryPartnerName(partner.getCompanyName());
        });

        return dto;
    }
}