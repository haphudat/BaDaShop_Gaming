import { Link, useNavigate } from "react-router-dom";
import {useState} from "react";
import logo from "../assets/logo.png";

function Navbar({ setSearch, setCategory, cart }) {
    //Login, Signup
    const [showMenu, setShowMenu] = useState(false);
    const user = JSON.parse(localStorage.getItem("user")); // Hiển thị tên user
    const navigate = useNavigate();

    // Đếm số lượng sản phẩm
    const totalQuantity = cart.reduce((sum, item) => {
        return sum + item.quantity;
    }, 0);
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
                onClick={() => {
                    setSearch("");
                    setCategory("");
                }}
            >
                <img
                    src={logo}
                    alt="logo"
                    style={{ width: "40px" }}
                />
                <span>BaDa Shop</span>
            </Link>
            {/* CATEGORY */}
            <div className="d-flex gap-3 me-4">
                <span style={{ cursor: "pointer" }} onClick={() => {setCategory("tai nghe");navigate("/shop");}}><i className="fa-solid fa-headphones"></i> Tai nghe</span>
                <span style={{ cursor: "pointer" }} onClick={() => {setCategory("tay cam");navigate("/shop");}}><i className="fa-solid fa-gamepad"></i> Tay cầm</span>
                <span style={{ cursor: "pointer" }} onClick={() => {setCategory("ban phim");navigate("/shop");}}><i className="fa-solid fa-keyboard"></i> Bàn phím</span>
                <span style={{ cursor: "pointer" }} onClick={() => {setCategory("chuot");navigate("/shop");}}><i className="fa-solid fa-computer-mouse"></i> Chuột</span>
                <span style={{ cursor: "pointer" }} onClick={() => {setCategory("man hinh");navigate("/shop");}}><i className="fa-solid fa-display"></i> Màn hình</span>
                <span style={{ cursor: "pointer" }} onClick={() => {setCategory("ghe");navigate("/shop");}}><i className="fa-solid fa-couch"></i> Ghế</span>
                <span style={{ cursor: "pointer" }} onClick={() => {setCategory("phu kien");navigate("/shop");}}><i className="fa-solid fa-wand-sparkles"></i> Phụ kiện khác</span>
                {/* HOT DEAL */}
                <span style={{ color: "red", fontWeight: "bold", cursor: "pointer" }} onClick={() => {setCategory("");navigate("/shop");}}><i className="fa-solid fa-fire"></i> Hot Deals</span>
            </div>

            {/* SEARCH (GIỮA) */}
            <form
                className="d-flex mx-auto"
                style={{ width: "400px" }}
                onSubmit={(e) => {
                    e.preventDefault();
                    navigate("/shop");
                }}
            >
                <input
                    className="form-control"
                    placeholder="Tìm kiếm..."
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button
                    className="btn btn-dark px-3"
                    style={{ whiteSpace: "nowrap" }}
                >
                    Tìm kiếm
                </button>
            </form>

            {/* RIGHT */}
            <div className="ms-4 d-flex align-items-center gap-3">
                <Link to="/cart" style={{ textDecoration: "none" }}>
                    <div style={{position: "relative", display: "inline-block"}}>
                        <span style={{ fontSize: "20px", color: "black"}}><i className="fa-solid fa-cart-arrow-down"></i></span>

                    {/*Số lượng hàng trong giỏ*/}
                        {totalQuantity > 0 && (
                            <span style={{
                                position: "absolute",
                                top: "-5px",
                                right: "-5px",
                                background: "red",
                                color: "#fff",
                                borderRadius: "50%",
                                minWidth: "15px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "12px",
                                fontWeight: "bold"
                            }}>{totalQuantity}</span>
                        )}
                    </div>
                </Link>
                {/*Đăng ký, Đăng nhập*/}
                <div style={{ position: "relative" }}>

                    {user ? (
                        <div>
                            <span>
                                <i className="fa-solid fa-user"></i> {user.username}
                            </span>

                            <div
                                style={{ cursor: "pointer", color: "red" }}
                                onClick={() => {
                                    localStorage.removeItem("user");
                                    window.location.reload();
                                }}>Logout
                            </div>
                        </div>
                    ) : (
                        <span style={{ cursor: "pointer" }} onClick={() => navigate("/login")}>
                            <i className="fa-solid fa-user"></i> Login
                        </span>
                    )}

                    {showMenu && (
                        <div
                            style={{
                                position: "absolute",
                                top: "30px",
                                right: 0,
                                background: "#fff",
                                border: "1px solid #ccc",
                                borderRadius: "5px",
                                width: "150px"
                            }}>

                            <div
                                style={{ padding: "10px", cursor: "pointer" }}
                                onClick={() => navigate("/login")}>Đăng nhập</div>

                            <div
                                style={{ padding: "10px", cursor: "pointer" }}
                                onClick={() => navigate("/register")}>Đăng ký</div>

                        </div>
                    )}

                </div>
            </div>

        </nav>
    );
}

export default Navbar;