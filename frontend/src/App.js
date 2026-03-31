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

function App() {
    const [category, setCategory] = useState("");

    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart) : [];
    });

    const [search, setSearch] = useState("");

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    return (
        <BrowserRouter>

            <Navbar setSearch={setSearch} setCategory={setCategory} cart={cart}/>

            <Routes>
                <Route path="/" element={<Home search={search} category={category} />} />
                <Route path="/product/:id" element={<ProductDetail setCart={setCart} />}/>
                <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
                <Route path="/shop" element={<Shop search={search} category={category} />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/warranty" element={<Warranty />} />
                <Route path="/privacy" element={<Privacy />} />
            </Routes>
            <Footer />

        </BrowserRouter>
    );
}

export default App;