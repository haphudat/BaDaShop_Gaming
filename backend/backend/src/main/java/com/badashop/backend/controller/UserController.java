package com.badashop.backend.controller;

import com.badashop.backend.model.User;
import com.badashop.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserRepository userRepository;

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
}