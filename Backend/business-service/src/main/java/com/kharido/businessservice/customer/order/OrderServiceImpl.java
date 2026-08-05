package com.kharido.businessservice.customer.order;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kharido.businessservice.common.entity.User;
import com.kharido.businessservice.common.repository.UserRepository;
import com.kharido.businessservice.customer.address.Address;
import com.kharido.businessservice.customer.address.AddressRepository;
import com.kharido.businessservice.customer.cart.Cart;
import com.kharido.businessservice.customer.cart.CartItem;
import com.kharido.businessservice.customer.cart.CartItemRepository;
import com.kharido.businessservice.customer.cart.CartRepository;
import com.kharido.businessservice.customer.product.Product;
import com.kharido.businessservice.customer.product.ProductRepository;

@Service
@Transactional
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final UserRepository userRepository;
    private final AddressRepository addressRepository;
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;

    public OrderServiceImpl(
            OrderRepository orderRepository,
            OrderItemRepository orderItemRepository,
            UserRepository userRepository,
            AddressRepository addressRepository,
            CartRepository cartRepository,
            CartItemRepository cartItemRepository,
            ProductRepository productRepository) {

        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.userRepository = userRepository;
        this.addressRepository = addressRepository;
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
        this.productRepository = productRepository;
    }

    @Override
    public OrderResponse placeOrder(
            String username,
            PlaceOrderRequest request) {

        User user = userRepository.findByUsername(username)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        Address address = addressRepository
                .findByAddressIdAndUser(request.getAddressId(), user)
                .orElseThrow(() ->
                        new RuntimeException("Address not found"));

        Cart cart = cartRepository.findByUser(user)
                .orElseThrow(() ->
                        new RuntimeException("Cart not found"));

        List<CartItem> cartItems =
                cartItemRepository.findByCart(cart);

        if (cartItems.isEmpty()) {
            throw new RuntimeException("Cart is empty.");
        }

        BigDecimal totalAmount = BigDecimal.ZERO;

        Order order = new Order();

        order.setUser(user);
        order.setAddress(address);
        order.setPaymentStatus(PaymentStatus.PENDING);
        order.setOrderStatus(OrderStatus.PLACED);

        order = orderRepository.save(order);

        List<OrderItemResponse> responseItems =
                new ArrayList<>();

        for (CartItem cartItem : cartItems) {

            Product product = cartItem.getProduct();

            if (product.getStockQuantity() < cartItem.getQuantity()) {

                throw new RuntimeException(
                        product.getProductName() + " is out of stock.");
            }

            BigDecimal subtotal =
                    cartItem.getPrice()
                            .multiply(BigDecimal.valueOf(cartItem.getQuantity()));

            totalAmount = totalAmount.add(subtotal);

            OrderItem orderItem = new OrderItem();

            orderItem.setOrder(order);
            orderItem.setProduct(product);
            orderItem.setSeller(product.getSeller());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setPrice(cartItem.getPrice());
            orderItem.setSubtotal(subtotal);

            orderItemRepository.save(orderItem);

            product.setStockQuantity(
                    product.getStockQuantity() - cartItem.getQuantity());

            productRepository.save(product);

            OrderItemResponse dto =
                    new OrderItemResponse();

            dto.setOrderItemId(orderItem.getOrderItemId());
            dto.setProductId(product.getProductId());
            dto.setProductName(product.getProductName());
            dto.setQuantity(orderItem.getQuantity());
            dto.setPrice(orderItem.getPrice());
            dto.setSubtotal(orderItem.getSubtotal());

            responseItems.add(dto);
        }

        order.setTotalAmount(totalAmount);

        orderRepository.save(order);

        cartItemRepository.deleteAll(cartItems);

        OrderResponse response =
                new OrderResponse();

        response.setOrderId(order.getOrderId());
        response.setUserId(user.getUserId());
        response.setAddressId(address.getAddressId());
        response.setOrderDate(order.getOrderDate());
        response.setTotalAmount(order.getTotalAmount());
        response.setPaymentStatus(order.getPaymentStatus());
        response.setOrderStatus(order.getOrderStatus());
        response.setItems(responseItems);

        return response;
    }
    @Override
    public List<OrderResponse> getMyOrders(
            String username) {

        User user = userRepository.findByUsername(username)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        List<Order> orders = orderRepository.findByUser(user);

        List<OrderResponse> responseList = new ArrayList<>();

        for (Order order : orders) {

            List<OrderItem> orderItems =
                    orderItemRepository.findByOrder(order);

            List<OrderItemResponse> itemResponses =
                    new ArrayList<>();

            for (OrderItem item : orderItems) {

                OrderItemResponse dto =
                        new OrderItemResponse();

                dto.setOrderItemId(item.getOrderItemId());
                dto.setProductId(item.getProduct().getProductId());
                dto.setProductName(item.getProduct().getProductName());
                dto.setQuantity(item.getQuantity());
                dto.setPrice(item.getPrice());
                dto.setSubtotal(item.getSubtotal());

                itemResponses.add(dto);
            }

            OrderResponse response =
                    new OrderResponse();

            response.setOrderId(order.getOrderId());
            response.setUserId(user.getUserId());
            response.setAddressId(order.getAddress().getAddressId());
            response.setOrderDate(order.getOrderDate());
            response.setTotalAmount(order.getTotalAmount());
            response.setPaymentStatus(order.getPaymentStatus());
            response.setOrderStatus(order.getOrderStatus());
            response.setItems(itemResponses);

            responseList.add(response);
        }

        return responseList;
    }

    @Override
    public OrderResponse getOrderById(
            String username,
            Integer orderId) {

        User user = userRepository.findByUsername(username)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() ->
                        new RuntimeException("Order not found"));

        if (!order.getUser().getUserId().equals(user.getUserId())) {
            throw new RuntimeException("Order does not belong to this user.");
        }

        List<OrderItem> orderItems =
                orderItemRepository.findByOrder(order);

        List<OrderItemResponse> itemResponses =
                new ArrayList<>();

        for (OrderItem item : orderItems) {

            OrderItemResponse dto =
                    new OrderItemResponse();

            dto.setOrderItemId(item.getOrderItemId());
            dto.setProductId(item.getProduct().getProductId());
            dto.setProductName(item.getProduct().getProductName());
            dto.setQuantity(item.getQuantity());
            dto.setPrice(item.getPrice());
            dto.setSubtotal(item.getSubtotal());

            itemResponses.add(dto);
        }

        OrderResponse response =
                new OrderResponse();

        response.setOrderId(order.getOrderId());
        response.setUserId(user.getUserId());
        response.setAddressId(order.getAddress().getAddressId());
        response.setOrderDate(order.getOrderDate());
        response.setTotalAmount(order.getTotalAmount());
        response.setPaymentStatus(order.getPaymentStatus());
        response.setOrderStatus(order.getOrderStatus());
        response.setItems(itemResponses);

        return response;
    }

    @Override
    public String cancelOrder(
            String username,
            Integer orderId) {

        User user = userRepository.findByUsername(username)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() ->
                        new RuntimeException("Order not found"));

        if (!order.getUser().getUserId().equals(user.getUserId())) {
            throw new RuntimeException("Order does not belong to this user.");
        }

        if (order.getOrderStatus() == OrderStatus.CANCELLED) {
            throw new RuntimeException("Order is already cancelled.");
        }

        List<OrderItem> orderItems =
                orderItemRepository.findByOrder(order);

        for (OrderItem item : orderItems) {

            Product product = item.getProduct();

            product.setStockQuantity(
                    product.getStockQuantity() + item.getQuantity());

            productRepository.save(product);
        }

        order.setOrderStatus(OrderStatus.CANCELLED);

        orderRepository.save(order);

        return "Order cancelled successfully.";
    }
}