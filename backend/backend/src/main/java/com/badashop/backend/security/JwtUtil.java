package com.badashop.backend.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    // Secret key — đủ dài cho HS256
    private static final String SECRET = "badashop-secret-key-2024-very-long-string-for-security";
    private static final long EXPIRATION = 1000 * 60 * 60 * 24; // 24 giờ

    private final Key key = Keys.hmacShaKeyFor(SECRET.getBytes());

    // Tạo token từ username và role
    public String generateToken(String username, String role) {
        return Jwts.builder()
                .setSubject(username)
                .claim("role", role)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    // Lấy username từ token
    public String getUsername(String token) {
        return getClaims(token).getSubject();
    }

    // Lấy role từ token
    public String getRole(String token) {
        return getClaims(token).get("role", String.class);
    }

    // Kiểm tra token hợp lệ không
    public boolean isValid(String token) {
        try {
            getClaims(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }

    private Claims getClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}