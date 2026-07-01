package com.badashop.backend.controller;

import com.badashop.backend.model.Review;
import com.badashop.backend.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.badashop.backend.dto.ReviewRequest;
import com.badashop.backend.model.Product;
import com.badashop.backend.model.User;
import com.badashop.backend.repository.ProductRepository;
import com.badashop.backend.repository.UserRepository;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin("*")
public class ReviewController {
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

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

    // CREATE REVIEW
    @PostMapping
    public Review createReview(@RequestBody ReviewRequest request) {

        Product product = productRepository
                .findById(request.getProductId())
                .orElse(null);

        User user = userRepository
                .findById(request.getUserId())
                .orElse(null);

        if (product == null || user == null) {
            return null;
        }

        Review review = new Review();

        review.setProduct(product);
        review.setUser(user);
        review.setRating(request.getRating());
        review.setComment(request.getComment());

        return reviewRepository.save(review);
    }
    // ADMIN REPLY REVIEW
    @PutMapping("/{id}/reply")
    public Review replyReview(
            @PathVariable Long id,
            @RequestBody Review reviewRequest) {

        System.out.println("Review ID: " + id);
        System.out.println("Reply: " + reviewRequest.getReply());

        Review review = reviewRepository.findById(id).orElse(null);

        if (review == null) {
            return null;
        }

        review.setReply(reviewRequest.getReply());

        return reviewRepository.save(review);
    }

    // DELETE — admin xóa review vi phạm
    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        reviewRepository.deleteById(id);
        return "Đã xóa review";
    }
}