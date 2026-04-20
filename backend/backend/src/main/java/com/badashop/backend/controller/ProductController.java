package com.badashop.backend.controller;

import com.badashop.backend.model.Product;
import com.badashop.backend.repository.ProductRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {

    private final ProductRepository productRepository;

    public ProductController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    // GET ALL
    @GetMapping
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // GET BY ID
    @GetMapping("/{id}")
    public Product getProductById(@PathVariable Long id) {
        return productRepository.findById(id).orElse(null);
    }

    // CREATE
    @PostMapping
    public Product createProduct(@RequestBody Product product) {
        return productRepository.save(product);
    }

    // UPDATE
    @PutMapping("/{id}")
    public Product updateProduct(@PathVariable Long id, @RequestBody Product newProduct) {
        Product product = productRepository.findById(id).orElse(null);
        if (product == null) return null;

        product.setName(newProduct.getName());
        product.setPrice(newProduct.getPrice());
        product.setImage(newProduct.getImage());
        product.setCategory(newProduct.getCategory());
        product.setDescription(newProduct.getDescription());
        product.setBrand(newProduct.getBrand());
        product.setStock(newProduct.getStock());
        product.setSpecs(newProduct.getSpecs());

        return productRepository.save(product);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public String deleteProduct(@PathVariable Long id) {
        productRepository.deleteById(id);
        return "Xóa sản phẩm thành công";
    }
}