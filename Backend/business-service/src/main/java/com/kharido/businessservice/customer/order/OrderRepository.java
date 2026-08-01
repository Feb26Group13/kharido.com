package com.kharido.businessservice.customer.order;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kharido.businessservice.common.entity.User;

public interface OrderRepository extends JpaRepository<Order, Integer> {

    List<Order> findByUser(User user);

}