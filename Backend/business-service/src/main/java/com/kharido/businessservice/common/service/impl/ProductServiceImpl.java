package com.kharido.businessservice.common.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kharido.businessservice.seller.SellerService;
import com.kharido.businessservice.seller.ProductService;
import com.kharido.businessservice.seller.dto.ProductResponse;
import com.kharido.businessservice.seller.dto.request.AddProductRequest;
import com.kharido.businessservice.seller.entity.Product;
import com.kharido.businessservice.seller.entity.ProductImage;
import com.kharido.businessservice.seller.entity.Seller;
import com.kharido.businessservice.seller.repository.ProductImageRepository;
import com.kharido.businessservice.seller.repository.ProductRepository;
@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductImageRepository productImageRepository;

    @Autowired
    private SellerService sellerService;
    @Override
    public ProductResponse addProduct(AddProductRequest request) throws Exception {

        // Logged-in seller from JWT
        Seller seller = sellerService.getLoggedInSeller();

        Product product = Product.builder()
                .sellerId(seller.getSellerId())
                .categoryId(request.getCategoryId())
                .subCategoryId(request.getSubCategoryId())
                .brandId(request.getBrandId())
                .productName(request.getProductName())
                .description(request.getDescription())
                .price(request.getPrice())
                .stockQuantity(request.getStockQuantity())
                .build();

        Product savedProduct = productRepository.save(product);

        // Save Image
        if (request.getImage() != null && !request.getImage().isEmpty()) {

            ProductImage productImage = ProductImage.builder()
                    .product(savedProduct)
                    .imageData(request.getImage().getBytes())
                    .isPrimary(request.getIsPrimary())
                    .build();

            productImageRepository.save(productImage);
        }

        return ProductResponse.builder()
                .productId(savedProduct.getProductId())
                .sellerId(savedProduct.getSellerId())
                .categoryId(savedProduct.getCategoryId())
                .subCategoryId(savedProduct.getSubCategoryId())
                .brandId(savedProduct.getBrandId())
                .productName(savedProduct.getProductName())
                .description(savedProduct.getDescription())
                .price(savedProduct.getPrice())
                .stockQuantity(savedProduct.getStockQuantity())
                .approvalStatus(savedProduct.getApprovalStatus())
                .status(savedProduct.getStatus())
                .createdAt(savedProduct.getCreatedAt())
                .build();
    }

    @Override
    public List<ProductResponse> getProductsBySeller() {

        // Logged-in seller from JWT
        Seller seller = sellerService.getLoggedInSeller();

        List<Product> products =
                productRepository.findBySellerId(seller.getSellerId());

        return products.stream()
                .map(product -> ProductResponse.builder()
                        .productId(product.getProductId())
                        .sellerId(product.getSellerId())
                        .categoryId(product.getCategoryId())
                        .subCategoryId(product.getSubCategoryId())
                        .brandId(product.getBrandId())
                        .productName(product.getProductName())
                        .description(product.getDescription())
                        .price(product.getPrice())
                        .stockQuantity(product.getStockQuantity())
                        .approvalStatus(product.getApprovalStatus())
                        .status(product.getStatus())
                        .createdAt(product.getCreatedAt())
                        .build())
                .toList();
    }

    @Override
    public ProductResponse getProductById(Integer productId) {

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product Not Found"));

        return ProductResponse.builder()
                .productId(product.getProductId())
                .sellerId(product.getSellerId())
                .categoryId(product.getCategoryId())
                .subCategoryId(product.getSubCategoryId())
                .brandId(product.getBrandId())
                .productName(product.getProductName())
                .description(product.getDescription())
                .price(product.getPrice())
                .stockQuantity(product.getStockQuantity())
                .approvalStatus(product.getApprovalStatus())
                .status(product.getStatus())
                .createdAt(product.getCreatedAt())
                .build();
    }
    @Override
    @Transactional
    public ProductResponse updateProduct(Integer productId,
                                         AddProductRequest request) throws Exception {

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product Not Found"));
        Seller seller = sellerService.getLoggedInSeller();

        if (!product.getSellerId().equals(seller.getSellerId())) {
            throw new RuntimeException("Access Denied");
        }
        product.setCategoryId(request.getCategoryId());
        product.setSubCategoryId(request.getSubCategoryId());
        product.setBrandId(request.getBrandId());
        product.setProductName(request.getProductName());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setStockQuantity(request.getStockQuantity());

        Product updatedProduct = productRepository.save(product);

        if (request.getImage() != null && !request.getImage().isEmpty()) {

            Optional<ProductImage> optionalImage =
                    productImageRepository.findByProduct(updatedProduct);

            ProductImage productImage;

            if (optionalImage.isPresent()) {
                productImage = optionalImage.get();
            } else {
                productImage = ProductImage.builder()
                        .product(updatedProduct)
                        .build();
            }

            productImage.setImageData(request.getImage().getBytes());
            productImage.setIsPrimary(request.getIsPrimary());

            productImageRepository.save(productImage);
        }

        return ProductResponse.builder()
                .productId(updatedProduct.getProductId())
                .sellerId(updatedProduct.getSellerId())
                .categoryId(updatedProduct.getCategoryId())
                .subCategoryId(updatedProduct.getSubCategoryId())
                .brandId(updatedProduct.getBrandId())
                .productName(updatedProduct.getProductName())
                .description(updatedProduct.getDescription())
                .price(updatedProduct.getPrice())
                .stockQuantity(updatedProduct.getStockQuantity())
                .approvalStatus(updatedProduct.getApprovalStatus())
                .status(updatedProduct.getStatus())
                .createdAt(updatedProduct.getCreatedAt())
                .build();
    }
    @Override
    @Transactional
    public void deleteProduct(Integer productId) {

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product Not Found"));

        Seller seller = sellerService.getLoggedInSeller();

        if (!product.getSellerId().equals(seller.getSellerId())) {
            throw new RuntimeException("Access Denied");
        }

        productRepository.delete(product);
    }
    @Override
    public byte[] getProductImage(Integer productId) {

        Product product = productRepository.findById(productId)
                .orElseThrow(() ->
                        new RuntimeException("Product Not Found"));

        ProductImage productImage = productImageRepository
                .findByProduct(product)
                .orElseThrow(() ->
                        new RuntimeException("Image Not Found"));

        return productImage.getImageData();
    }
}