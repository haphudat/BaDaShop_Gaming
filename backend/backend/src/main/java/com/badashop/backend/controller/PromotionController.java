package com.badashop.backend.controller;

import com.badashop.backend.model.Promotion;
import com.badashop.backend.repository.PromotionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/promotions")
@CrossOrigin(origins = "http://localhost:3000")
public class PromotionController {

    @Autowired
    private PromotionRepository promotionRepository;

    @GetMapping
    public List<Promotion> getAllPromotions() {
        return promotionRepository.findAll();
    }

    @GetMapping("/{id}")
    public Promotion getPromotionById(@PathVariable Long id) {
        return promotionRepository.findById(id).orElse(null);
    }

    @PostMapping
    public Promotion createPromotion(@RequestBody Promotion promotion) {
        return promotionRepository.save(promotion);
    }

    @PutMapping("/{id}")
    public Promotion updatePromotion(@PathVariable Long id, @RequestBody Promotion newPromotion) {
        Promotion promotion = promotionRepository.findById(id).orElse(null);
        if (promotion == null) return null;

        promotion.setCode(newPromotion.getCode());
        promotion.setDescription(newPromotion.getDescription());
        promotion.setDiscountPercent(newPromotion.getDiscountPercent());
        promotion.setStartDate(newPromotion.getStartDate());
        promotion.setEndDate(newPromotion.getEndDate());
        promotion.setActive(newPromotion.getActive());

        return promotionRepository.save(promotion);
    }

    @DeleteMapping("/{id}")
    public String deletePromotion(@PathVariable Long id) {
        promotionRepository.deleteById(id);
        return "Xóa khuyến mãi thành công";
    }
}