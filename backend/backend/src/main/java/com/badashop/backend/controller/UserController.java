package com.badashop.backend.controller;

import com.badashop.backend.model.User;
import com.badashop.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // Lấy tất cả users
    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Lấy user theo id
    @GetMapping("/{id}")
    public User getUserById(@PathVariable Integer id) {
        return userRepository.findById(id).orElse(null);
    }

    // Cập nhật thông tin (dùng cho profile user)
    @PutMapping("/{id}")
    public User updateUser(@PathVariable Integer id, @RequestBody User newUser) {
        User user = userRepository.findById(id).orElse(null);
        if (user == null) return null;
        user.setName(newUser.getName());
        user.setPhone(newUser.getPhone());
        user.setAddress(newUser.getAddress());
        user.setGender(newUser.getGender());
        user.setBirthday(newUser.getBirthday());
        return userRepository.save(user);
    }

    // Đổi role (ADMIN/USER) — dùng cho admin
    @PutMapping("/{id}/role")
    public User updateRole(@PathVariable Integer id, @RequestBody User newUser) {
        User user = userRepository.findById(id).orElse(null);
        if (user == null) return null;
        user.setRole(newUser.getRole());
        return userRepository.save(user);
    }

    // Xóa user
    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable Integer id) {
        userRepository.deleteById(id);
        return "Đã xóa user " + id;
    }
}