package com.kharido.businessservice.common.dto;

import java.time.LocalDateTime;

public class DeliveryDTO {
    private Integer assignmentId;
    private Integer orderId;
    private Integer deliveryPartnerId;
    private String deliveryPartnerName;
    private String customerName;
    private String customerEmail;
    private String deliveryCity;
    private String deliveryAddress;
    private String pickupStatus;
    private String orderStatus;
    private String assignedDate;
    private Double totalAmount;

    // Getters and Setters
    public Integer getAssignmentId() { return assignmentId; }
    public void setAssignmentId(Integer assignmentId) { this.assignmentId = assignmentId; }

    public Integer getOrderId() { return orderId; }
    public void setOrderId(Integer orderId) { this.orderId = orderId; }

    public Integer getDeliveryPartnerId() { return deliveryPartnerId; }
    public void setDeliveryPartnerId(Integer deliveryPartnerId) { this.deliveryPartnerId = deliveryPartnerId; }

    public String getDeliveryPartnerName() { return deliveryPartnerName; }
    public void setDeliveryPartnerName(String deliveryPartnerName) { this.deliveryPartnerName = deliveryPartnerName; }

    public String getCustomerName() { return customerName; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }

    public String getCustomerEmail() { return customerEmail; }
    public void setCustomerEmail(String customerEmail) { this.customerEmail = customerEmail; }

    public String getDeliveryCity() { return deliveryCity; }
    public void setDeliveryCity(String deliveryCity) { this.deliveryCity = deliveryCity; }

    public String getDeliveryAddress() { return deliveryAddress; }  // ← ADD GETTER
    public void setDeliveryAddress(String deliveryAddress) { this.deliveryAddress = deliveryAddress; }  // ← ADD SETTER

    public String getPickupStatus() { return pickupStatus; }
    public void setPickupStatus(String pickupStatus) { this.pickupStatus = pickupStatus; }

    public String getOrderStatus() { return orderStatus; }
    public void setOrderStatus(String orderStatus) { this.orderStatus = orderStatus; }

    public String getAssignedDate() { return assignedDate; }
    public void setAssignedDate(String assignedDate) { this.assignedDate = assignedDate; }

    public Double getTotalAmount() { return totalAmount; }
    public void setTotalAmount(Double totalAmount) { this.totalAmount = totalAmount; }
}