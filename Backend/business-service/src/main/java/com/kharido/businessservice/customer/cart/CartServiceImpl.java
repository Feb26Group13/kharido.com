package com.kharido.businessservice.customer.cart;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kharido.businessservice.common.entity.User;
import com.kharido.businessservice.common.repository.UserRepository;
import com.kharido.businessservice.customer.product.Product;
import com.kharido.businessservice.customer.product.ProductRepository;

@Service
@Transactional
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public CartServiceImpl(
            CartRepository cartRepository,
            CartItemRepository cartItemRepository,
            ProductRepository productRepository,
            UserRepository userRepository) {

        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    @Override
    public CartResponse addToCart(
            String username,
            AddToCartRequest request) {

        User user = userRepository.findByUsername(username)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() ->
                        new RuntimeException("Product not found"));

        if (product.getStockQuantity() < request.getQuantity()) {
            throw new RuntimeException("Requested quantity is not available.");
        }

        Cart cart = cartRepository.findByUser(user).orElse(null);

        if (cart == null) {

            cart = new Cart();
            cart.setUser(user);
            cart.setCartItems(new ArrayList<>());

            cart = cartRepository.save(cart);
        }

        CartItem cartItem = cartItemRepository
                .findByCartAndProduct(cart, product)
                .orElse(null);

        if (cartItem == null) {

            cartItem = new CartItem();
            cartItem.setCart(cart);
            cartItem.setProduct(product);
            cartItem.setQuantity(request.getQuantity());
            cartItem.setPrice(product.getPrice());
            cartItem.setPriceAtAdded(product.getPrice());

        } else {

            int newQuantity =
                    cartItem.getQuantity() + request.getQuantity();

            if (newQuantity > product.getStockQuantity()) {
                throw new RuntimeException(
                        "Requested quantity exceeds available stock.");
            }

            cartItem.setQuantity(newQuantity);
        }

        cartItemRepository.save(cartItem);

        return getCart(username);
    }

    @Override
    public CartResponse getCart(
            String username) {

        User user = userRepository.findByUsername(username)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        Cart cart = cartRepository.findByUser(user)
                .orElseThrow(() ->
                        new RuntimeException("Cart not found"));

        CartResponse response = new CartResponse();

        response.setCartId(cart.getCartId());
        response.setUserId(user.getUserId());

        List<CartItem> cartItems =
                cartItemRepository.findByCart(cart);

        List<CartItemResponse> itemResponses =
                new ArrayList<>();

        BigDecimal total = BigDecimal.ZERO;

        for (CartItem item : cartItems) {

            CartItemResponse dto = new CartItemResponse();

            dto.setCartItemId(item.getCartItemId());
            dto.setProductId(item.getProduct().getProductId());
            dto.setProductName(item.getProduct().getProductName());
            dto.setPrice(item.getPrice());
            dto.setQuantity(item.getQuantity());

            BigDecimal subtotal =
                    item.getPrice()
                            .multiply(BigDecimal.valueOf(item.getQuantity()));

            dto.setSubtotal(subtotal);

            total = total.add(subtotal);

            itemResponses.add(dto);
        }

        response.setItems(itemResponses);
        response.setTotalAmount(total);

        return response;
    }
    @Override
    public CartResponse updateCartItem(
            String username,
            Integer cartItemId,
            UpdateCartRequest request) {

        User user = userRepository.findByUsername(username)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        Cart cart = cartRepository.findByUser(user)
                .orElseThrow(() ->
                        new RuntimeException("Cart not found"));

        CartItem cartItem = cartItemRepository.findById(cartItemId)
                .orElseThrow(() ->
                        new RuntimeException("Cart item not found"));

        if (!cartItem.getCart().getCartId().equals(cart.getCartId())) {
            throw new RuntimeException("Cart item does not belong to this user.");
        }

        if (request.getQuantity() > cartItem.getProduct().getStockQuantity()) {
            throw new RuntimeException("Requested quantity exceeds available stock.");
        }

        cartItem.setQuantity(request.getQuantity());

        cartItemRepository.save(cartItem);

        return getCart(username);
    }

    @Override
    public String removeCartItem(
            String username,
            Integer cartItemId) {

        User user = userRepository.findByUsername(username)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        Cart cart = cartRepository.findByUser(user)
                .orElseThrow(() ->
                        new RuntimeException("Cart not found"));

        CartItem cartItem = cartItemRepository.findById(cartItemId)
                .orElseThrow(() ->
                        new RuntimeException("Cart item not found"));

        if (!cartItem.getCart().getCartId().equals(cart.getCartId())) {
            throw new RuntimeException("Cart item does not belong to this user.");
        }

        cartItemRepository.delete(cartItem);

        return "Item removed from cart successfully.";
    }

    @Override
    public String clearCart(
            String username) {

        User user = userRepository.findByUsername(username)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        Cart cart = cartRepository.findByUser(user)
                .orElseThrow(() ->
                        new RuntimeException("Cart not found"));

        cartItemRepository.deleteAll(
                cartItemRepository.findByCart(cart));

        return "Cart cleared successfully.";
    }
}