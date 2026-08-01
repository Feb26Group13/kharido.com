package com.kharido.businessservice.customer.controller;

import java.util.List;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.kharido.businessservice.customer.dto.CustomerResponseDTO;
import com.kharido.businessservice.customer.dto.UpdateCustomerRequest;
import com.kharido.businessservice.customer.service.CustomerService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/customers")
@Validated
public class CustomerController {

    private final CustomerService customerService;

    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @GetMapping("/profile")
    public CustomerResponseDTO getCustomerProfile(@RequestParam String username) {
        return customerService.getCustomerProfile(username);
    }

    @PutMapping("/profile")
    public CustomerResponseDTO updateCustomerProfile(
            @RequestParam String username,
            @Valid @RequestBody UpdateCustomerRequest request) {

        return customerService.updateCustomerProfile(username, request);
    }

    @GetMapping
    public List<CustomerResponseDTO> getAllCustomers() {
        return customerService.getAllCustomers();
    }

    @DeleteMapping("/{customerId}")
    public String deleteCustomer(@PathVariable Integer customerId) {
        return customerService.deleteCustomer(customerId);
    }
}