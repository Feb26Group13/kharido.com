package com.kharido.businessservice.common.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kharido.businessservice.common.repository.UserRepository;
import com.kharido.businessservice.customer.repository.CustomerProfileRepository;
import com.kharido.businessservice.seller.OrderService;
import com.kharido.businessservice.seller.SellerService;
import com.kharido.businessservice.seller.dto.response.OrderResponse;
import com.kharido.businessservice.seller.entity.OrderItem;
import com.kharido.businessservice.seller.entity.Seller;
import com.kharido.businessservice.seller.repository.OrderItemRepository;
import com.kharido.businessservice.seller.repository.ProductRepository;


@Service
public class OrderServiceImpl implements OrderService {

	
    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private SellerService sellerService;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CustomerProfileRepository customerProfileRepository;
    @Override
    public List<OrderResponse> getSellerOrders() {

        Seller seller = sellerService.getLoggedInSeller();

        List<OrderItem> orderItems =
                orderItemRepository.findBySellerId(seller.getSellerId());

        return orderItems.stream()
                .map(item -> {

                    String productName = "";

                    String customerName = "";

                    // Product Name
                    var product = productRepository.findById(item.getProductId());

                    if (product.isPresent()) {
                        productName = product.get().getProductName();
                    }

                    // Customer Name
                    var user = userRepository.findById(item.getOrder().getUserId());

                    if (user.isPresent()) {

                        var customer = customerProfileRepository.findByUser(user.get());

                        if (customer.isPresent()) {

                            customerName =
                                    customer.get().getFirstName() + " " +
                                    customer.get().getLastName();
                        }
                    }

                    return OrderResponse.builder()

                            .orderId(item.getOrder().getOrderId())

                            .orderItemId(item.getOrderItemId())

                            .productId(item.getProductId())

                            .productName(productName)

                            .customerName(customerName)

                            .quantity(item.getQuantity())

                            .price(item.getPrice())

                            .subtotal(item.getSubtotal())

                            .paymentStatus(item.getOrder().getPaymentStatus())

                            .orderStatus(item.getOrder().getOrderStatus())

                            .orderDate(item.getOrder().getOrderDate())

                            .build();

                })
                .toList();
    }
}