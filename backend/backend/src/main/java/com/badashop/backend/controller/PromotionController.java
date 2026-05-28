package com.badashop.backend.controller;

import com.badashop.backend.model.Promotion;
import com.badashop.backend.repository.PromotionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/promotions")
@CrossOrigin("*")
public class PromotionController {

    @Autowired
    private PromotionRepository promotionRepository;

    @GetMapping
    public List<Promotion> getAll() {
        return promotionRepository.findAll();
    }

    @GetMapping("/code/{code}")
    public Promotion getByCode(@PathVariable String code) {
        return promotionRepository.findByCode(code).orElse(null);
    }

    @PostMapping
    public Promotion create(@RequestBody Promotion promotion) {
        return promotionRepository.save(promotion);
    }

    @PutMapping("/{id}")
    public Promotion update(@PathVariable Long id, @RequestBody Promotion updated) {
        Promotion p = promotionRepository.findById(id).orElse(null);
        if (p == null) return null;
        p.setCode(updated.getCode());
        p.setDescription(updated.getDescription());
        p.setDiscountType(updated.getDiscountType());
        p.setDiscountValue(updated.getDiscountValue());
        p.setMinOrderValue(updated.getMinOrderValue());
        p.setStartDate(updated.getStartDate());
        p.setEndDate(updated.getEndDate());
        p.setActive(updated.getActive());
        return promotionRepository.save(p);
    }

    @PutMapping("/{id}/toggle")
    public Promotion toggle(@PathVariable Long id) {
        Promotion p = promotionRepository.findById(id).orElse(null);
        if (p == null) return null;
        p.setActive(!Boolean.TRUE.equals(p.getActive()));
        return promotionRepository.save(p);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        promotionRepository.deleteById(id);
        return "Đã xóa";
    }
}