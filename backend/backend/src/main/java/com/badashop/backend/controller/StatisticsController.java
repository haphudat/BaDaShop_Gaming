package com.badashop.backend.controller;

import com.badashop.backend.model.Order;
import com.badashop.backend.model.OrderItem;
import com.badashop.backend.model.Product;
import com.badashop.backend.model.User;
import com.badashop.backend.repository.OrderItemRepository;
import com.badashop.backend.repository.OrderRepository;
import com.badashop.backend.repository.ProductRepository;
import com.badashop.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/statistics")
@CrossOrigin(origins = "http://localhost:3000")
public class StatisticsController {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    // SUMMARY: tổng đơn, doanh thu, sản phẩm, người dùng
    @GetMapping("/summary")
    public Map<String, Object> getSummary() {
        List<Order> orders = orderRepository.findAll();
        List<Product> products = productRepository.findAll();
        List<User> users = userRepository.findAll();

        long totalOrders = orders.size();

        // Đơn chờ xử lý (status = pending hoặc null)
        long pendingOrders = orders.stream()
                .filter(o -> o.getStatus() == null || o.getStatus().equalsIgnoreCase("pending"))
                .count();

        // Tổng doanh thu (tất cả đơn không bị hủy)
        double totalRevenue = orders.stream()
                .filter(o -> o.getStatus() == null || !o.getStatus().equalsIgnoreCase("cancelled"))
                .mapToDouble(o -> o.getTotal() != null ? o.getTotal() : 0)
                .sum();

        Map<String, Object> summary = new HashMap<>();
        summary.put("totalOrders", totalOrders);
        summary.put("pendingOrders", pendingOrders);
        summary.put("totalRevenue", totalRevenue);
        summary.put("totalProducts", products.size());
        summary.put("totalUsers", users.size());

        return summary;
    }

    // DOANH THU THEO THÁNG
    @GetMapping("/revenue-by-month")
    public List<Map<String, Object>> getRevenueByMonth() {
        List<Order> orders = orderRepository.findAll();

        Map<String, Double> revenueMap = new LinkedHashMap<>();

        for (Order order : orders) {
            if (order.getCreatedAt() == null) continue;
            if ("cancelled".equalsIgnoreCase(order.getStatus())) continue;

            String month = String.format("%02d/%d",
                    order.getCreatedAt().getMonthValue(),
                    order.getCreatedAt().getYear());

            revenueMap.merge(month, order.getTotal() != null ? order.getTotal() : 0, Double::sum);
        }

        List<Map<String, Object>> result = new ArrayList<>();
        for (Map.Entry<String, Double> entry : revenueMap.entrySet()) {
            Map<String, Object> item = new HashMap<>();
            item.put("month", entry.getKey());
            item.put("revenue", entry.getValue());
            result.add(item);
        }

        return result;
    }

    // ĐƠN HÀNG THEO TRẠNG THÁI
    @GetMapping("/orders-by-status")
    public Map<String, Long> getOrdersByStatus() {
        List<Order> orders = orderRepository.findAll();

        Map<String, Long> result = new LinkedHashMap<>();
        result.put("pending", 0L);
        result.put("confirmed", 0L);
        result.put("shipping", 0L);
        result.put("delivered", 0L);
        result.put("cancelled", 0L);

        for (Order order : orders) {
            String status = order.getStatus();
            // Nếu null thì tính là pending
            if (status == null) status = "pending";
            status = status.toLowerCase();

            if (result.containsKey(status)) {
                result.put(status, result.get(status) + 1);
            } else {
                result.put(status, 1L);
            }
        }

        // Xóa các status có giá trị 0
        result.entrySet().removeIf(e -> e.getValue() == 0);

        return result;
    }

    // TOP 5 SẢN PHẨM BÁN CHẠY
    @GetMapping("/top-products")
    public List<Map<String, Object>> getTopProducts() {
        List<OrderItem> items = orderItemRepository.findAll();
        List<Product> products = productRepository.findAll();

        // Map productId -> tên sản phẩm
        Map<Long, String> productNames = new HashMap<>();
        for (Product p : products) {
            productNames.put(p.getId(), p.getName());
        }

        // Đếm số lượng bán theo productId
        Map<Long, Integer> soldMap = new HashMap<>();
        for (OrderItem item : items) {
            soldMap.merge(item.getProductId(), item.getQuantity(), Integer::sum);
        }

        // Sắp xếp và lấy top 5
        List<Map<String, Object>> result = new ArrayList<>();
        soldMap.entrySet().stream()
                .sorted(Map.Entry.<Long, Integer>comparingByValue().reversed())
                .limit(5)
                .forEach(e -> {
                    Map<String, Object> item = new HashMap<>();
                    item.put("productId", e.getKey());
                    item.put("name", productNames.getOrDefault(e.getKey(), "Sản phẩm #" + e.getKey()));
                    item.put("sold", e.getValue());
                    result.add(item);
                });

        return result;
    }
}