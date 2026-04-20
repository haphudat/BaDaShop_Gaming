package com.badashop.backend.controller;

import com.badashop.backend.model.User;
import com.badashop.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // GET ALL
    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // GET BY ID
    @GetMapping("/{id}")
    public User getUserById(@PathVariable Integer id) {
        return userRepository.findById(id).orElse(null);
    }

    // UPDATE
    @PutMapping("/{id}")
    public User updateUser(@PathVariable Integer id, @RequestBody User newUser) {
        User user = userRepository.findById(id).orElse(null);
        if (user == null) return null;

        user.setName(newUser.getName());
        user.setPhone(newUser.getPhone());
        user.setAddress(newUser.getAddress());
        user.setGender(newUser.getGender());
        user.setBirthday(newUser.getBirthday());
        user.setEmail(newUser.getEmail());
        user.setRole(newUser.getRole());

        return userRepository.save(user);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable Integer id) {
        userRepository.deleteById(id);
        return "Xóa người dùng thành công";
    }
}