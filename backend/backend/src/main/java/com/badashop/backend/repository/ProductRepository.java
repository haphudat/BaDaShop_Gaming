package com.badashop.backend.repository;

import com.badashop.backend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    long countByCategory(String category);

    List<Product> findByCategory(String category);
}