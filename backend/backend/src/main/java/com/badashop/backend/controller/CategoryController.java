package com.badashop.backend.controller;

import com.badashop.backend.model.Category;
import com.badashop.backend.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin(origins = "http://localhost:3000")
public class CategoryController {

    @Autowired
    private CategoryRepository categoryRepository;

    // GET ALL
    @GetMapping
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    // GET BY ID
    @GetMapping("/{id}")
    public Category getCategoryById(@PathVariable Long id) {
        return categoryRepository.findById(id).orElse(null);
    }

    // CREATE
    @PostMapping
    public Category createCategory(@RequestBody Category category) {
        return categoryRepository.save(category);
    }

    // UPDATE
    @PutMapping("/{id}")
    public Category updateCategory(@PathVariable Long id, @RequestBody Category newCategory) {
        Category category = categoryRepository.findById(id).orElse(null);
        if (category == null) return null;

        category.setName(newCategory.getName());
        category.setDescription(newCategory.getDescription());

        return categoryRepository.save(category);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public String deleteCategory(@PathVariable Long id) {
        categoryRepository.deleteById(id);
        return "Xóa danh mục thành công";
    }
}