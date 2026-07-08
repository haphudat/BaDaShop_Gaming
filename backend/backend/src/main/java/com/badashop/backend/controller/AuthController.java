package com.badashop.backend.controller;

import com.badashop.backend.model.User;
import com.badashop.backend.security.JwtUtil;
import com.badashop.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(
        origins = "http://localhost:3000",
        allowedHeaders = "*",
        methods = {
                RequestMethod.GET,
                RequestMethod.POST,
                RequestMethod.PUT,
                RequestMethod.DELETE,
                RequestMethod.OPTIONS
        }
)
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    // ===== REGISTER =====
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        try {
            User saved = userService.register(user);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Đăng ký thất bại: " + e.getMessage());
        }
    }

    // ===== LOGIN =====
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        try {
            User found = userService.login(user.getUsername(), user.getPassword());

            if (found == null) {
                return ResponseEntity.status(401).body("Sai tên đăng nhập hoặc mật khẩu!");
            }

            // Tạo JWT token
            String token = jwtUtil.generateToken(found.getUsername(), found.getRole());

            // Trả về user info + token
            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("id", found.getId());
            response.put("username", found.getUsername());
            response.put("email", found.getEmail());
            response.put("role", found.getRole());
            response.put("name", found.getName());
            response.put("phone", found.getPhone());
            response.put("address", found.getAddress());

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.status(401).body("Đăng nhập thất bại!");
        }
    }
}