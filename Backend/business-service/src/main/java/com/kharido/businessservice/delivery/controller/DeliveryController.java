package com.kharido.businessservice.delivery.controller;

import com.kharido.businessservice.common.dto.DeliveryDTO;
import com.kharido.businessservice.common.dto.UpdateDeliveryStatusRequest;
import com.kharido.businessservice.common.entity.DeliveryAssignment;
import com.kharido.businessservice.delivery.service.DeliveryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/delivery")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"}, allowCredentials = "true")
public class DeliveryController {

    @Autowired
    private DeliveryService deliveryService;

    // ============================================================
    // DELIVERY PARTNER ENDPOINTS
    // ============================================================

    /**
     * Get all deliveries assigned to a specific delivery partner
     * URL: GET /api/delivery/partner/{partnerId}/deliveries
     */
    @GetMapping("/partner/{partnerId}/deliveries")
    @PreAuthorize("hasRole('DELIVERY_PARTNER')")
    public ResponseEntity<List<DeliveryDTO>> getPartnerDeliveries(
            @PathVariable Integer partnerId) {
        System.out.println("✅ getPartnerDeliveries called for partner: " + partnerId);
        List<DeliveryDTO> deliveries = deliveryService.getDeliveriesForPartner(partnerId);
        System.out.println("📋 Found " + deliveries.size() + " deliveries");
        return ResponseEntity.ok(deliveries);
    }

    /**
     * Update delivery status by delivery partner
     * URL: PUT /api/delivery/partner/update-status
     */
    @PutMapping("/partner/update-status")
    @PreAuthorize("hasRole('DELIVERY_PARTNER')")
    public ResponseEntity<DeliveryAssignment> updateStatusByPartner(
            @RequestBody UpdateDeliveryStatusRequest request) {
        System.out.println("✅ updateStatusByPartner called for assignment: " + request.getAssignmentId());
        DeliveryAssignment updated = deliveryService.updateDeliveryStatus(
                request.getAssignmentId(),
                request.getPickupStatus()
        );
        return ResponseEntity.ok(updated);
    }

    // ============================================================
    // ADMIN ENDPOINTS
    // ============================================================

    /**
     * Get all deliveries (Admin only)
     * URL: GET /api/delivery/admin/all
     */
    @GetMapping("/admin/all")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<DeliveryDTO>> getAllDeliveries() {
        System.out.println("✅ getAllDeliveries called");
        return ResponseEntity.ok(deliveryService.getAllDeliveries());
    }

    /**
     * Get delivery statistics (Admin only)
     * URL: GET /api/delivery/admin/stats
     */
    @GetMapping("/admin/stats")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getDeliveryStats() {
        System.out.println("✅ getDeliveryStats called");
        return ResponseEntity.ok(deliveryService.getDeliveryStatistics());
    }

    /**
     * Get all delivery partners (Admin only)
     * URL: GET /api/delivery/admin/partners
     */
    @GetMapping("/admin/partners")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getAllPartners() {
        System.out.println("✅ getAllPartners called");
        return ResponseEntity.ok(deliveryService.getAllDeliveryPartners());
    }

    /**
     * Assign delivery to a partner (Admin only)
     * URL: POST /api/delivery/admin/assign?orderId={orderId}&deliveryPartnerId={partnerId}
     */
    @PostMapping("/admin/assign")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<DeliveryAssignment> assignDelivery(
            @RequestParam Integer orderId,
            @RequestParam Integer deliveryPartnerId) {
        System.out.println("✅ assignDelivery called - Order: " + orderId + ", Partner: " + deliveryPartnerId);
        return ResponseEntity.ok(deliveryService.assignDelivery(orderId, deliveryPartnerId));
    }

    /**
     * Cancel delivery assignment (Admin only)
     * URL: DELETE /api/delivery/admin/cancel/{assignmentId}
     */
    @DeleteMapping("/admin/cancel/{assignmentId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> cancelDelivery(@PathVariable Integer assignmentId) {
        System.out.println("✅ cancelDelivery called for assignment: " + assignmentId);
        deliveryService.cancelDelivery(assignmentId);
        return ResponseEntity.ok().body("Delivery cancelled successfully");
    }

    // ============================================================
    // CUSTOMER ENDPOINTS
    // ============================================================

    /**
     * Track order delivery status (Customer only)
     * URL: GET /api/delivery/track/{orderId}
     */
    @GetMapping("/track/{orderId}")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<?> trackOrder(@PathVariable Integer orderId) {
        System.out.println("✅ trackOrder called for order: " + orderId);
        return ResponseEntity.ok(deliveryService.trackOrder(orderId));
    }

    /**
     * Get delivery details by order ID (Customer only)
     * URL: GET /api/delivery/track/details/{orderId}
     */
    @GetMapping("/track/details/{orderId}")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<List<DeliveryAssignment>> getDeliveryDetails(@PathVariable Integer orderId) {
        System.out.println("✅ getDeliveryDetails called for order: " + orderId);
        return ResponseEntity.ok(deliveryService.trackOrder(orderId));
    }

    // ============================================================
    // TEST ENDPOINT (for debugging)
    // ============================================================

    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("✅ Delivery Controller is working!");
    }
}