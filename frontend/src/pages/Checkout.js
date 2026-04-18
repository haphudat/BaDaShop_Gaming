import { useState, useEffect } from "react";
import axios from "axios";

function Checkout({ cart }) {

    // 👉 lấy sản phẩm đã chọn (QUAN TRỌNG NHẤT)
    const selectedCart = JSON.parse(localStorage.getItem("checkout_items")) || cart;

    // load thông tin đã lưu
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });

    const [payment, setPayment] = useState("COD");

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("checkout_info"));
        if (saved) {
            setForm(saved);
        }
    }, []);

    // 👉 tổng tiền (SỬA Ở ĐÂY)
    const total = selectedCart.reduce((sum, item) => {
        return sum + item.price * item.quantity;
    }, 0);

    // nhập input
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    // đặt hàng
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
                items: selectedCart   // 👉 SỬA Ở ĐÂY
            };

            await axios.post("http://localhost:8081/api/orders", data);

            alert("Đặt hàng thành công!");

            // 👉 xoá giỏ hàng
            localStorage.removeItem("cart");

            // 👉 xoá selected
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

                    {/* PAYMENT */}
                    <h5 className="mt-4">Phương thức thanh toán</h5>

                    <div className="border p-3 mb-2">
                        <input
                            type="radio"
                            name="payment"
                            checked={payment === "COD"}
                            onChange={() => setPayment("COD")}
                        />{" "}
                        Thanh toán khi nhận hàng (COD)
                    </div>

                    <div className="border p-3 mb-2">
                        <input
                            type="radio"
                            name="payment"
                            checked={payment === "MOMO"}
                            onChange={() => setPayment("MOMO")}
                        />{" "}
                        Ví MoMo
                    </div>

                    <div className="border p-3 mb-2">
                        <input
                            type="radio"
                            name="payment"
                            checked={payment === "BANK"}
                            onChange={() => setPayment("BANK")}
                        />{" "}
                        Chuyển khoản ngân hàng
                    </div>

                    <button
                        className="btn btn-primary mt-3"
                        onClick={handleOrder}
                    >
                        Hoàn tất đơn hàng
                    </button>

                </div>

                {/* RIGHT */}
                <div className="col-md-5">

                    <div
                        className="p-3 rounded shadow-sm"
                        style={{ background: "var(--card)" }}
                    >

                        <h5>Đơn hàng</h5>

                        {selectedCart.map(item => (   // 👉 SỬA Ở ĐÂY
                            <div
                                key={item.id}
                                className="d-flex justify-content-between align-items-center mb-3"
                            >

                                <div className="d-flex align-items-center gap-2">

                                    <img
                                        src={item.image}
                                        style={{
                                            width: "50px",
                                            height: "50px",
                                            objectFit: "contain"
                                        }}
                                    />

                                    <div>
                                        <div>{item.name}</div>
                                        <small>x{item.quantity}</small>
                                    </div>

                                </div>

                                <div>
                                    {(item.price * item.quantity).toLocaleString()}đ
                                </div>

                            </div>
                        ))}

                        <hr />

                        <div className="d-flex justify-content-between">
                            <span>Tạm tính</span>
                            <span>{total.toLocaleString()}đ</span>
                        </div>

                        <div className="d-flex justify-content-between">
                            <span>Phí vận chuyển</span>
                            <span>—</span>
                        </div>

                        <hr />

                        <div className="d-flex justify-content-between">
                            <b>Tổng cộng</b>
                            <b style={{ color: "var(--primary)" }}>
                                {total.toLocaleString()}đ
                            </b>
                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Checkout;