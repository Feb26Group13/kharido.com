package com.kharido.businessservice.common.dto;

public class AssignDeliveryRequest {
    private Integer orderId;
    private Integer deliveryPartnerId;

    // Getters and Setters
    public Integer getOrderId() { return orderId; }
    public void setOrderId(Integer orderId) { this.orderId = orderId; }

    public Integer getDeliveryPartnerId() { return deliveryPartnerId; }
    public void setDeliveryPartnerId(Integer deliveryPartnerId) { this.deliveryPartnerId = deliveryPartnerId; }
}