package com.kharido.businessservice.customer.service;

import java.util.List;

import com.kharido.businessservice.customer.dto.CustomerResponseDTO;
import com.kharido.businessservice.customer.dto.UpdateCustomerRequest;

public interface CustomerService {

    CustomerResponseDTO getCustomerProfile(String username);

    CustomerResponseDTO updateCustomerProfile(String username, UpdateCustomerRequest request);

    List<CustomerResponseDTO> getAllCustomers();

    String deleteCustomer(Integer customerId);
}