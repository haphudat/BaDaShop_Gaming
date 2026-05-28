package com.badashop.backend.controller;

import com.badashop.backend.model.Order;
import com.badashop.backend.repository.OrderRepository;
import com.badashop.backend.repository.OrderItemRepository;
import com.badashop.backend.repository.ProductRepository;
import com.badashop.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/statistics")
@CrossOrigin("*")
public class StatisticsController {

    @Autowired OrderRepository orderRepository;
    @Autowired OrderItemRepository orderItemRepository;
    @Autowired ProductRepository productRepository;
    @Autowired UserRepository userRepository;

    @GetMapping("/summary")
    public Map<String, Object> getSummary() {
        List<Order> orders = orderRepository.findAll();

        long totalOrders = orders.size();
        double totalRevenue = orders.stream()
                .filter(o -> "delivered".equals(o.getStatus()))
                .mapToDouble(o -> o.getTotal() != null ? o.getTotal() : 0)
                .sum();
        long totalUsers = userRepository.count();
        long totalProducts = productRepository.count();
        long pendingOrders = orders.stream()
                .filter(o -> "pending".equals(o.getStatus())).count();

        Map<String, Object> result = new HashMap<>();
        result.put("totalOrders", totalOrders);
        result.put("totalRevenue", totalRevenue);
        result.put("totalUsers", totalUsers);
        result.put("totalProducts", totalProducts);
        result.put("pendingOrders", pendingOrders);
        return result;
    }

    @GetMapping("/revenue-by-month")
    public List<Map<String, Object>> getRevenueByMonth() {
        List<Order> orders = orderRepository.findAll().stream()
                .filter(o -> "delivered".equals(o.getStatus()))
                .collect(Collectors.toList());

        // Group theo tháng/năm
        Map<String, Double> map = new LinkedHashMap<>();
        for (Order o : orders) {
            if (o.getCreatedAt() == null) continue;
            String key = String.format("%02d/%d",
                    o.getCreatedAt().getMonthValue(),
                    o.getCreatedAt().getYear());
            map.merge(key, o.getTotal() != null ? o.getTotal() : 0, Double::sum);
        }

        return map.entrySet().stream()
                .map(e -> { Map<String, Object> m = new HashMap<>(); m.put("month", e.getKey()); m.put("revenue", e.getValue()); return m; })
                .collect(Collectors.toList());
    }

    @GetMapping("/orders-by-status")
    public Map<String, Long> getOrdersByStatus() {
        return orderRepository.findAll().stream()
                .collect(Collectors.groupingBy(
                        o -> o.getStatus() != null ? o.getStatus() : "unknown",
                        Collectors.counting()
                ));
    }

    @GetMapping("/top-products")
    public List<Map<String, Object>> getTopProducts() {
        // Group orderItems theo productId, cộng quantity
        Map<Long, Integer> soldMap = new HashMap<>();
        orderItemRepository.findAll().forEach(item -> {
            soldMap.merge(item.getProductId(), item.getQuantity() != null ? item.getQuantity() : 0, Integer::sum);
        });

        return soldMap.entrySet().stream()
                .sorted(Map.Entry.<Long, Integer>comparingByValue().reversed())
                .limit(5)
                .map(e -> {
                    Map<String, Object> m = new HashMap<>();
                    m.put("productId", e.getKey());
                    m.put("sold", e.getValue());
                    // Lấy tên sản phẩm
                    productRepository.findById(e.getKey()).ifPresent(p -> m.put("name", p.getName()));
                    return m;
                })
                .collect(Collectors.toList());
    }
}