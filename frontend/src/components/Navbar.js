import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/logo.png";

function Navbar({ setSearch, setCategory, cart }) {
    const [showMenu, setShowMenu] = useState(false);
    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();

    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <nav
            className="d-flex align-items-center px-4"
            style={{ background: "#f5a623", height: "70px" }}
        >
            {/* LOGO */}
            <Link
                to="/"
                className="fw-bold me-4 text-dark d-flex align-items-center gap-2"
                style={{ textDecoration: "none" }}
                onClick={() => { setSearch(""); setCategory(""); }}
            >
                <img src={logo} alt="logo" style={{ width: "40px" }} />
                <span>BaDa Shop</span>
            </Link>

            {/* CATEGORY */}
            <div className="d-flex gap-3 me-4">
                <span style={{ cursor: "pointer" }} onClick={() => { setCategory("tai nghe"); navigate("/shop"); }}><i className="fa-solid fa-headphones"></i> Tai nghe</span>
                <span style={{ cursor: "pointer" }} onClick={() => { setCategory("tay cam"); navigate("/shop"); }}><i className="fa-solid fa-gamepad"></i> Tay cầm</span>
                <span style={{ cursor: "pointer" }} onClick={() => { setCategory("ban phim"); navigate("/shop"); }}><i className="fa-solid fa-keyboard"></i> Bàn phím</span>
                <span style={{ cursor: "pointer" }} onClick={() => { setCategory("chuot"); navigate("/shop"); }}><i className="fa-solid fa-computer-mouse"></i> Chuột</span>
                <span style={{ cursor: "pointer" }} onClick={() => { setCategory("man hinh"); navigate("/shop"); }}><i className="fa-solid fa-display"></i> Màn hình</span>
                <span style={{ cursor: "pointer" }} onClick={() => { setCategory("ghe"); navigate("/shop"); }}><i className="fa-solid fa-couch"></i> Ghế</span>
                <span style={{ cursor: "pointer" }} onClick={() => { setCategory("phu kien"); navigate("/shop"); }}><i className="fa-solid fa-wand-sparkles"></i> Phụ kiện khác</span>
                <span style={{ color: "red", fontWeight: "bold", cursor: "pointer" }} onClick={() => { setCategory(""); navigate("/shop"); }}><i className="fa-solid fa-fire"></i> Hot Deals</span>
            </div>

            {/* SEARCH */}
            <form
                className="d-flex mx-auto"
                style={{ width: "400px" }}
                onSubmit={(e) => { e.preventDefault(); navigate("/shop"); }}
            >
                <input
                    className="form-control"
                    placeholder="Tìm kiếm..."
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button className="btn btn-dark px-3" style={{ whiteSpace: "nowrap" }}>
                    Tìm kiếm
                </button>
            </form>

            {/* RIGHT */}
            <div className="ms-4 d-flex align-items-center gap-3">

                {/* GIỎ HÀNG */}
                <Link to="/cart" style={{ textDecoration: "none" }}>
                    <div style={{ position: "relative", display: "inline-block" }}>
                        <span style={{ fontSize: "20px", color: "black" }}>
                            <i className="fa-solid fa-cart-arrow-down"></i>
                        </span>
                        {totalQuantity > 0 && (
                            <span style={{
                                position: "absolute", top: "-5px", right: "-5px",
                                background: "red", color: "#fff", borderRadius: "50%",
                                minWidth: "15px", display: "flex", alignItems: "center",
                                justifyContent: "center", fontSize: "12px", fontWeight: "bold"
                            }}>{totalQuantity}</span>
                        )}
                    </div>
                </Link>

                {/* USER MENU */}
                {user ? (
                    <div style={{ position: "relative" }}>

                        {/* ✅ CHỈ CÒN 1 LẦN HIỂN THỊ USERNAME */}
                        <span
                            style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}
                            onClick={() => setShowMenu(!showMenu)}
                        >
                            {user.role?.toUpperCase() === "ADMIN"
                                ? <i className="fa-solid fa-shield-halved"></i>
                                : <i className="fa-solid fa-user"></i>
                            }
                            {user.username}
                            {user.role?.toUpperCase() === "ADMIN" && (
                                <span style={{
                                    background: "red", color: "#fff",
                                    fontSize: "10px", fontWeight: "bold",
                                    padding: "1px 5px", borderRadius: "4px"
                                }}>ADMIN</span>
                            )}
                        </span>

                        {/* DROPDOWN */}
                        {showMenu && (
                            <div style={{
                                position: "absolute", right: 0, top: "35px",
                                background: "#fff", border: "1px solid #ccc",
                                width: "220px", zIndex: 1000,
                                borderRadius: "6px", boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
                            }}>
                                {/* USER */}
                                {user.role?.toUpperCase() !== "ADMIN" && (
                                    <>
                                        <div onClick={() => { navigate("/profile"); setShowMenu(false); }} className="p-2 border-bottom" style={{ cursor: "pointer" }}>
                                            Tài khoản của tôi
                                        </div>
                                        <div onClick={() => { navigate("/orders"); setShowMenu(false); }} className="p-2 border-bottom" style={{ cursor: "pointer" }}>
                                            Đơn mua
                                        </div>
                                    </>
                                )}

                                {/* ADMIN */}
                                {user.role?.toUpperCase() === "ADMIN" && (
                                    <>
                                        <div onClick={() => { navigate("/profile"); setShowMenu(false); }} className="p-2 border-bottom" style={{ cursor: "pointer" }}>Tài khoản của tôi</div>
                                        <div onClick={() => { navigate("/admin/products"); setShowMenu(false); }} className="p-2 border-bottom" style={{ cursor: "pointer" }}>Quản lý sản phẩm</div>
                                        <div onClick={() => { navigate("/admin/categories"); setShowMenu(false); }} className="p-2 border-bottom" style={{ cursor: "pointer" }}>Quản lý danh mục</div>
                                        <div onClick={() => { navigate("/admin/orders"); setShowMenu(false); }} className="p-2 border-bottom" style={{ cursor: "pointer" }}>Quản lý đơn hàng</div>
                                        <div onClick={() => { navigate("/admin/users"); setShowMenu(false); }} className="p-2 border-bottom" style={{ cursor: "pointer" }}>Quản lý người dùng</div>
                                        <div onClick={() => { navigate("/admin/reviews"); setShowMenu(false); }} className="p-2 border-bottom" style={{ cursor: "pointer" }}>Quản lý đánh giá</div>
                                        <div onClick={() => { navigate("/admin/promotions"); setShowMenu(false); }} className="p-2 border-bottom" style={{ cursor: "pointer" }}>Quản lý khuyến mãi</div>
                                        <div onClick={() => { navigate("/admin/statistics"); setShowMenu(false); }} className="p-2 border-bottom" style={{ cursor: "pointer" }}>Thống kê</div>
                                    </>
                                )}

                                {/* LOGOUT */}
                                <div
                                    className="p-2"
                                    style={{ color: "red", cursor: "pointer" }}
                                    onClick={() => { localStorage.clear(); navigate("/login"); setShowMenu(false); }}
                                >
                                    Đăng xuất
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <span style={{ cursor: "pointer" }} onClick={() => navigate("/login")}>
                        <i className="fa-solid fa-user"></i> Login
                    </span>
                )}

            </div>
        </nav>
    );
}

export default Navbar;