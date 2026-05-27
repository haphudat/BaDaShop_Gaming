package com.badashop.backend.controller;

import com.badashop.backend.model.Review;
import com.badashop.backend.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin("*")
public class ReviewController {

    @Autowired
    private ReviewRepository reviewRepository;

    // GET ALL — dùng cho admin
    @GetMapping
    public List<Review> getAll() {
        return reviewRepository.findAll();
    }

    // GET BY PRODUCT — dùng ở trang ProductDetail
    @GetMapping("/product/{productId}")
    public List<Review> getByProduct(@PathVariable Long productId) {
        return reviewRepository.findByProductId(productId);
    }

    // DELETE — admin xóa review vi phạm
    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        reviewRepository.deleteById(id);
        return "Đã xóa review";
    }
}