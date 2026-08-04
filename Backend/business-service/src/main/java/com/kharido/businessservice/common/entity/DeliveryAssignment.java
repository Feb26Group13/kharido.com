package com.kharido.businessservice.common.entity;

import com.kharido.businessservice.common.enums.DeliveryStatus;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "delivery_assignments")
public class DeliveryAssignment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer assignmentid;

    @Column(name = "orderid", nullable = false)
    private Integer orderid;

    @Column(name = "deliveryid", nullable = false)
    private Integer deliveryid;

    @Column(name = "assigned_date")
    private LocalDateTime assignedDate = LocalDateTime.now();

    @Enumerated(EnumType.STRING)
    @Column(name = "pickup_status")
    private DeliveryStatus pickupStatus = DeliveryStatus.PENDING;

    // Constructors
    public DeliveryAssignment() {}

    public DeliveryAssignment(Integer orderid, Integer deliveryid) {
        this.orderid = orderid;
        this.deliveryid = deliveryid;
    }

    // Getters and Setters
    public Integer getAssignmentid() { return assignmentid; }
    public void setAssignmentid(Integer assignmentid) { this.assignmentid = assignmentid; }

    public Integer getOrderid() { return orderid; }
    public void setOrderid(Integer orderid) { this.orderid = orderid; }

    public Integer getDeliveryid() { return deliveryid; }
    public void setDeliveryid(Integer deliveryid) { this.deliveryid = deliveryid; }

    public LocalDateTime getAssignedDate() { return assignedDate; }
    public void setAssignedDate(LocalDateTime assignedDate) { this.assignedDate = assignedDate; }

    public DeliveryStatus getPickupStatus() { return pickupStatus; }
    public void setPickupStatus(DeliveryStatus pickupStatus) { this.pickupStatus = pickupStatus; }
}