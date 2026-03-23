# 🎮 BaDaShop_Gaming

Website bán phụ kiện gaming

---

## Thành viên

* Hà Phú Đạt - 21130018
* Võ Khương Đại Bảo - 21130284

## Giới thiệu

BaDaShop_Gaming là website thương mại điện tử đơn giản chuyên bán phụ kiện gaming như:

* Tai nghe gaming
* Tay cầm chơi game
* Phụ kiện điện thoại
* Thiết bị hỗ trợ chơi game

Website được xây dựng phục vụ cho đồ án môn **Chuyên Đề Web** với mục tiêu:

* Áp dụng mô hình MVC
* Xây dựng REST API
* Kết nối Frontend và Backend
* Thao tác với database MySQL

## ️ Công nghệ sử dụng

### Frontend

* HTML
* CSS
* JavaScript
* ReactJS
* Bootstrap 5
* Axios

### Backend

* Java Spring Boot
* Spring Data JPA
* Spring Security
* REST API

### Database

* MySQL

### Công cụ

* XAMPP
* Navicat Lite
* Git & GitHub

## Sitemap – BaDaShop_Gaming

### Public Pages (Guest)

* Home → `/`
* Shop (Product Listing) → `/shop`
* Product Detail → `/product/{id}`
* Search Products → `/search`
* Cart → `/cart`
* Login → `/login`
* Register → `/register`
* Forgot Password → `/forgot-password`

### User Pages (Authenticated)

* User Profile → `/profile`
* Checkout → `/checkout`
* Order History → `/orders`
* Order Detail → `/orders/{id}`
* Product Review → `/review`

### Admin Pages

* Dashboard → `/admin`
* Manage Products → `/admin/products`
* Create Product → `/admin/products/new`
* Edit Product → `/admin/products/{id}`
* Manage Categories → `/admin/categories`
* Manage Orders → `/admin/orders`
* Manage Users → `/admin/users`
* Revenue Statistics → `/admin/statistics`

## Sitemap Structure (Tree)

```
/
│
├── shop
│   └── product/{id}
│
├── search
├── cart
│
├── login
├── register
├── forgot-password
│
├── profile
├── checkout
│
├── orders
│   └── orders/{id}
│
├── review
│
└── admin
    ├── dashboard
    ├── products
    │   ├── new
    │   └── {id}
    ├── categories
    ├── orders
    ├── users
    └── statistics
```

## 👥 Use Case
![usecase.png](usecase.png)
### 🔹 Guest

* Xem sản phẩm
* Tìm kiếm sản phẩm
* Đăng ký
* Đăng nhập

### User

* Thêm vào giỏ hàng
* Thanh toán (Checkout)
* Xem lịch sử đơn hàng
* Đánh giá sản phẩm
* Cập nhật thông tin cá nhân

### Admin

* Quản lý sản phẩm
* Quản lý danh mục
* Quản lý đơn hàng
* Quản lý người dùng
* Thống kê doanh thu


## Kiến trúc hệ thống

```
ReactJS (Frontend)
        ↓
Axios (API Call)
        ↓
Spring Boot Controller
        ↓
Service Layer
        ↓
Repository (JPA)
        ↓
MySQL Database
```


## Mục tiêu đồ án

* Xây dựng website bán hàng hoạt động được
* Có đầy đủ frontend + backend + database
* Áp dụng REST API
* Deploy và quản lý code bằng GitHub

---

## Trạng thái dự án

- Đang phát triển

---

## Repository

GitHub: https://github.com/haphudat/BaDaShop_Gaming

