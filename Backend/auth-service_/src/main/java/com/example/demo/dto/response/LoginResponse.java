package com.example.demo.dto.response;

public class LoginResponse {

    private String message;
    private String username;
    private String role;
    private Integer userId;
    private Integer partnerId;
    private String partnerCity;
    private String partnerCompany;

    // Constructor with all fields
    public LoginResponse(
            String message,
            String username,
            String role,
            Integer userId,
            Integer partnerId,
            String partnerCity,
            String partnerCompany) {

        this.message = message;
        this.username = username;
        this.role = role;
        this.userId = userId;
        this.partnerId = partnerId;
        this.partnerCity = partnerCity;
        this.partnerCompany = partnerCompany;
    }

    // Constructor without partner details
    public LoginResponse(
            String message,
            String username,
            String role,
            Integer userId) {

        this(message, username, role, userId, null, null, null);
    }

    // Constructor for error responses
    public LoginResponse(
            String message) {

        this(message, null, null, null, null, null, null);
    }

    // Getters
    public String getMessage() { return message; }
    public String getUsername() { return username; }
    public String getRole() { return role; }
    public Integer getUserId() { return userId; }
    public Integer getPartnerId() { return partnerId; }
    public String getPartnerCity() { return partnerCity; }
    public String getPartnerCompany() { return partnerCompany; }

    // Setters
    public void setMessage(String message) { this.message = message; }
    public void setUsername(String username) { this.username = username; }
    public void setRole(String role) { this.role = role; }
    public void setUserId(Integer userId) { this.userId = userId; }
    public void setPartnerId(Integer partnerId) { this.partnerId = partnerId; }
    public void setPartnerCity(String partnerCity) { this.partnerCity = partnerCity; }
    public void setPartnerCompany(String partnerCompany) { this.partnerCompany = partnerCompany; }
}