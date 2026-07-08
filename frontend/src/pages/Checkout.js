import { useState, useEffect } from "react";
import axios from "axios";

function Checkout({ cart }) {

    const selectedCart = JSON.parse(localStorage.getItem("checkout_items")) || cart;

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });

    const [payment, setPayment] = useState("COD");

    // KHUYẾN MÃI
    const [couponCode, setCouponCode] = useState("");
    const [coupon, setCoupon] = useState(null);
    const [couponMsg, setCouponMsg] = useState(null);
    const [couponLoading, setCouponLoading] = useState(false);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("checkout_info"));
        if (saved) setForm(saved);
    }, []);

    const subtotal = selectedCart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Tính số tiền giảm
    const calcDiscount = () => {
        if (!coupon) return 0;
        if (coupon.discountType === "PERCENT") {
            return Math.round(subtotal * coupon.discountValue / 100);
        }
        return coupon.discountValue || 0;
    };

    const discount = calcDiscount();
    const total = Math.max(0, subtotal - discount);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // KIỂM TRA MÃ KHUYẾN MÃI
    const handleApplyCoupon = async () => {
        if (!couponCode.trim()) {
            setCouponMsg({ type: "error", text: "Vui lòng nhập mã khuyến mãi!" });
            return;
        }
        setCouponLoading(true);
        setCouponMsg(null);
        try {
            const res = await fetch(`http://localhost:8081/api/promotions/code/${couponCode.trim()}`);
            if (!res.ok) throw new Error();
            const data = await res.json();

            if (!data) {
                setCouponMsg({ type: "error", text: "Mã không tồn tại!" });
                setCoupon(null);
                return;
            }
            if (!data.active) {
                setCouponMsg({ type: "error", text: "Mã đã bị vô hiệu hóa!" });
                setCoupon(null);
                return;
            }
            if (data.endDate && new Date(data.endDate) < new Date()) {
                setCouponMsg({ type: "error", text: "Mã đã hết hạn!" });
                setCoupon(null);
                return;
            }
            if (data.minOrderValue && subtotal < data.minOrderValue) {
                setCouponMsg({ type: "error", text: `Đơn hàng tối thiểu ${Number(data.minOrderValue).toLocaleString()}đ để dùng mã này!` });
                setCoupon(null);
                return;
            }

            setCoupon(data);
            setCouponMsg({ type: "success", text: `Áp dụng thành công! Giảm ${data.discountType === "PERCENT" ? `${data.discountValue}%` : `${Number(data.discountValue).toLocaleString()}đ`}` });

        } catch {
            setCouponMsg({ type: "error", text: "Mã không hợp lệ!" });
            setCoupon(null);
        } finally {
            setCouponLoading(false);
        }
    };

    const handleRemoveCoupon = () => {
        setCoupon(null);
        setCouponCode("");
        setCouponMsg(null);
    };

    // ĐẶT HÀNG
    const handleOrder = async () => {
        if (!form.name || !form.email || !form.phone || !form.address) {
            alert("Vui lòng nhập đầy đủ thông tin!");
            return;
        }

        localStorage.setItem("checkout_info", JSON.stringify(form));

        try {
            const data = {
                name: form.name,
                phone: form.phone,
                address: form.address,
                total: total,
                couponCode: coupon ? coupon.code : null,
                items: selectedCart
            };

            await axios.post("http://localhost:8081/api/orders", data);

            alert("Đặt hàng thành công!");
            localStorage.removeItem("cart");
            localStorage.removeItem("checkout_items");
            window.location.href = "/";

        } catch (err) {
            console.log(err);
            alert("Lỗi đặt hàng!");
        }
    };

    return (
        <div className="container mt-4">
            <div className="row">

                {/* LEFT */}
                <div className="col-md-7">
                    <h5>Thông tin giao hàng</h5>

                    <input
                        className="form-control mb-3"
                        placeholder="Họ và tên"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                    />

                    <div className="row">
                        <div className="col-md-6">
                            <input
                                className="form-control mb-3"
                                placeholder="Email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-md-6">
                            <input
                                className="form-control mb-3"
                                placeholder="Số điện thoại"
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <input
                        className="form-control mb-3"
                        placeholder="Địa chỉ"
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                    />

                    {/* MÃ KHUYẾN MÃI */}
                    <h5 className="mt-4">Mã khuyến mãi</h5>
                    <div className="d-flex gap-2 mb-2">
                        <input
                            className="form-control"
                            placeholder="Nhập mã khuyến mãi..."
                            value={couponCode}
                            onChange={e => setCouponCode(e.target.value.toUpperCase())}
                            disabled={!!coupon}
                            style={{ textTransform: "uppercase" }}
                        />
                        {!coupon ? (
                            <button
                                className="btn btn-outline-warning"
                                onClick={handleApplyCoupon}
                                disabled={couponLoading}
                                style={{ whiteSpace: "nowrap" }}
                            >
                                {couponLoading ? "Đang kiểm tra..." : "Áp dụng"}
                            </button>
                        ) : (
                            <button
                                className="btn btn-outline-danger"
                                onClick={handleRemoveCoupon}
                                style={{ whiteSpace: "nowrap" }}
                            >
                                Hủy mã
                            </button>
                        )}
                    </div>

                    {couponMsg && (
                        <div style={{
                            padding: "8px 12px", borderRadius: "6px", marginBottom: "12px", fontSize: "14px",
                            background: couponMsg.type === "success" ? "#d4edda" : "#f8d7da",
                            color: couponMsg.type === "success" ? "#155724" : "#721c24"
                        }}>
                            {couponMsg.text}
                        </div>
                    )}

                    {/* PHƯƠNG THỨC THANH TOÁN */}
                    <h5 className="mt-4">Phương thức thanh toán</h5>

                    <div className="border p-3 mb-2">
                        <input type="radio" name="payment" checked={payment === "COD"} onChange={() => setPayment("COD")} />{" "}
                        Thanh toán khi nhận hàng (COD)
                    </div>
                    <div className="border p-3 mb-2">
                        <input type="radio" name="payment" checked={payment === "MOMO"} onChange={() => setPayment("MOMO")} />{" "}
                        Ví MoMo
                    </div>
                    <div className="border p-3 mb-2">
                        <input type="radio" name="payment" checked={payment === "BANK"} onChange={() => setPayment("BANK")} />{" "}
                        Chuyển khoản ngân hàng
                    </div>

                    <button className="btn btn-primary mt-3" onClick={handleOrder}>
                        Hoàn tất đơn hàng
                    </button>
                </div>

                {/* RIGHT */}
                <div className="col-md-5">
                    <div className="p-3 rounded shadow-sm" style={{ background: "var(--card)" }}>
                        <h5>Đơn hàng</h5>

                        {selectedCart.map(item => (
                            <div key={item.id} className="d-flex justify-content-between align-items-center mb-3">
                                <div className="d-flex align-items-center gap-2">
                                    <img src={item.image} style={{ width: "50px", height: "50px", objectFit: "contain" }} alt={item.name} />
                                    <div>
                                        <div>{item.name}</div>
                                        <small>x{item.quantity}</small>
                                    </div>
                                </div>
                                <div>{(item.price * item.quantity).toLocaleString()}đ</div>
                            </div>
                        ))}

                        <hr />

                        <div className="d-flex justify-content-between mb-1">
                            <span>Tạm tính</span>
                            <span>{subtotal.toLocaleString()}đ</span>
                        </div>

                        {/* HIỂN THỊ GIẢM GIÁ */}
                        {coupon && (
                            <div className="d-flex justify-content-between mb-1" style={{ color: "#28a745" }}>
                                <span>Giảm giá ({coupon.code})</span>
                                <span>- {discount.toLocaleString()}đ</span>
                            </div>
                        )}

                        <div className="d-flex justify-content-between mb-1">
                            <span>Phí vận chuyển</span>
                            <span>—</span>
                        </div>

                        <hr />

                        <div className="d-flex justify-content-between">
                            <b>Tổng cộng</b>
                            <b style={{ color: "var(--primary)" }}>{total.toLocaleString()}đ</b>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Checkout;