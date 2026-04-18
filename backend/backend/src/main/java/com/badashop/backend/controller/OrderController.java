package com.badashop.backend.controller;

import com.badashop.backend.model.Order;
import com.badashop.backend.model.OrderItem;
import com.badashop.backend.repository.OrderRepository;
import com.badashop.backend.repository.OrderItemRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin("*")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    // Tạo Order
    @PostMapping
    public String createOrder(@RequestBody Map<String, Object> data) {

        Order order = new Order();
        order.setName((String) data.get("name"));
        order.setPhone((String) data.get("phone"));
        order.setAddress((String) data.get("address"));
        order.setTotal(Double.parseDouble(data.get("total").toString()));
        order.setStatus("pending");

        Order savedOrder = orderRepository.save(order);

        List<Map<String, Object>> items =
                (List<Map<String, Object>>) data.get("items");

        for (Map<String, Object> item : items) {

            OrderItem oi = new OrderItem();
            oi.setOrderId(savedOrder.getId());
            oi.setProductId(Long.parseLong(item.get("id").toString()));
            oi.setQuantity(Integer.parseInt(item.get("quantity").toString()));
            oi.setPrice(Double.parseDouble(item.get("price").toString()));

            orderItemRepository.save(oi);
        }

        return "Đặt hàng thành công";
    }

    @GetMapping
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    // Order, Item
    @GetMapping("/full")
    public List<Map<String, Object>> getOrdersFull() {

        List<Order> orders = orderRepository.findAll();
        List<Map<String, Object>> result = new ArrayList<>();

        for (Order order : orders) {

            Map<String, Object> map = new HashMap<>();
            map.put("order", order);

            // lấy item
            List<OrderItem> items = orderItemRepository.findAll()
                    .stream()
                    .filter(i -> i.getOrderId().equals(order.getId()))
                    .toList();

            map.put("items", items);

            result.add(map);
        }

        return result;
    }
}