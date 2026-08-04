package com.kharido.businessservice.common.dto;

public class DeliveryStatsDTO {
    private Long total;
    private Long pending;
    private Long picked;
    private Long inTransit;
    private Long delivered;

    // Getters and Setters
    public Long getTotal() { return total; }
    public void setTotal(Long total) { this.total = total; }

    public Long getPending() { return pending; }
    public void setPending(Long pending) { this.pending = pending; }

    public Long getPicked() { return picked; }
    public void setPicked(Long picked) { this.picked = picked; }

    public Long getInTransit() { return inTransit; }
    public void setInTransit(Long inTransit) { this.inTransit = inTransit; }

    public Long getDelivered() { return delivered; }
    public void setDelivered(Long delivered) { this.delivered = delivered; }
}