package com.example.demo.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "delivery_partners")
public class DeliveryPartner {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer deliveryid;

    @Column(name = "userid", nullable = false)
    private Integer userid;

    @Column(name = "city", nullable = false)
    private String city;

    @Column(name = "company_name", nullable = false)
    private String companyName;

    @Column(name = "phone")
    private String phone;

    @Column(name = "status")
    private String status = "ACTIVE";

    // Constructors
    public DeliveryPartner() {}

    public DeliveryPartner(Integer userid, String city, String companyName, String phone) {
        this.userid = userid;
        this.city = city;
        this.companyName = companyName;
        this.phone = phone;
    }

    // Getters and Setters
    public Integer getDeliveryid() { return deliveryid; }
    public void setDeliveryid(Integer deliveryid) { this.deliveryid = deliveryid; }

    public Integer getUserid() { return userid; }
    public void setUserid(Integer userid) { this.userid = userid; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) { this.companyName = companyName; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}