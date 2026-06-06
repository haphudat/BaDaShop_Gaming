import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Shop from "./pages/Shop";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Warranty from "./pages/Warranty";
import Privacy from "./pages/Privacy";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";

import ProductsAdmin from "./pages/admin/ProductsAdmin";
import CategoriesAdmin from "./pages/admin/CategoriesAdmin";
import OrdersAdmin from "./pages/admin/OrdersAdmin";
import UsersAdmin from "./pages/admin/UsersAdmin";
import ReviewsAdmin from "./pages/admin/ReviewsAdmin";
import PromotionsAdmin from "./pages/admin/PromotionsAdmin";
import StatisticsAdmin from "./pages/admin/StatisticsAdmin";

function App() {

    const [category, setCategory] = useState("");
    const [search, setSearch] = useState("");

    // 🔥 Lấy user hiện tại
    const user = JSON.parse(localStorage.getItem("user"));

    // 🔥 Cart riêng từng user
    const cartKey = user
        ? `cart_${user.id}`
        : "cart_guest";

    // 🔥 State cart
    const [cart, setCart] = useState([]);

    // 🔥 Load cart theo user
    useEffect(() => {
        const savedCart = localStorage.getItem(cartKey);

        if (savedCart) {
            setCart(JSON.parse(savedCart));
        } else {
            setCart([]);
        }

    }, [cartKey]);

    // 🔥 Save cart
    useEffect(() => {
        localStorage.setItem(cartKey, JSON.stringify(cart));
    }, [cart, cartKey]);

    return (
        <BrowserRouter>

            <Navbar
                setSearch={setSearch}
                setCategory={setCategory}
                cart={cart}
            />

            <Routes>

                <Route
                    path="/"
                    element={
                        <Home
                            search={search}
                            category={category}
                        />
                    }
                />

                <Route
                    path="/shop"
                    element={
                        <Shop
                            search={search}
                            category={category}
                        />
                    }
                />

                <Route
                    path="/product/:id"
                    element={
                        <ProductDetail
                            cart={cart}
                            setCart={setCart}
                        />
                    }
                />

                <Route
                    path="/cart"
                    element={
                        <Cart
                            cart={cart}
                            setCart={setCart}
                        />
                    }
                />

                <Route
                    path="/checkout"
                    element={<Checkout cart={cart} />}
                />

                <Route path="/orders" element={<Orders />} />
                <Route path="/profile" element={<Profile />} />

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/warranty" element={<Warranty />} />
                <Route path="/privacy" element={<Privacy />} />

                {/* ADMIN */}
                <Route path="/admin/products" element={<ProductsAdmin />} />
                <Route path="/admin/categories" element={<CategoriesAdmin />} />
                <Route path="/admin/orders" element={<OrdersAdmin />} />
                <Route path="/admin/users" element={<UsersAdmin />} />
                <Route path="/admin/reviews" element={<ReviewsAdmin />} />
                <Route path="/admin/promotions" element={<PromotionsAdmin />} />
                <Route path="/admin/statistics" element={<StatisticsAdmin />} />

            </Routes>

            <Footer />

        </BrowserRouter>
    );
}

export default App;