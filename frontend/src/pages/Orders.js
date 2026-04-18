import { useEffect, useState } from "react";
import axios from "axios";

function Orders() {

    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState({});
    const [tab, setTab] = useState("all");

    // 👉 load orders
    useEffect(() => {
        axios.get("http://localhost:8081/api/orders/full")
            .then(res => setOrders(res.data))
            .catch(err => console.log(err));
    }, []);

    // 👉 load products (map id → product)
    useEffect(() => {
        axios.get("http://localhost:8081/api/products")
            .then(res => {
                const map = {};
                res.data.forEach(p => {
                    map[p.id] = p;
                });
                setProducts(map);
            })
            .catch(err => console.log(err));
    }, []);

    // 👉 filter theo status
    const filteredOrders = orders.filter(o => {
        if (tab === "all") return true;
        return o.order.status === tab;
    });

    // 👉 text hiển thị
    const getStatusText = (status) => {
        switch (status) {
            case "pending": return "Chờ xác nhận";
            case "shipping": return "Đang giao";
            case "done": return "Đã giao";
            case "cancel": return "Đã hủy";
            default: return "";
        }
    };

    // 👉 update status
    const updateStatus = async (id, status) => {
        try {
            await axios.put(`http://localhost:8081/api/orders/${id}?status=${status}`);
            alert("Cập nhật thành công");
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="container mt-4">

            <h3>Lịch sử đơn hàng</h3>

            {/* TAB */}
            <div className="d-flex gap-4 border-bottom pb-2 mb-3">

                <span
                    onClick={() => setTab("all")}
                    style={{ cursor: "pointer", color: tab === "all" ? "red" : "" }}
                >
                    Tất cả
                </span>

                <span
                    onClick={() => setTab("pending")}
                    style={{ cursor: "pointer", color: tab === "pending" ? "red" : "" }}
                >
                    Chờ xác nhận
                </span>

                <span
                    onClick={() => setTab("shipping")}
                    style={{ cursor: "pointer", color: tab === "shipping" ? "red" : "" }}
                >
                    Đang giao
                </span>

                <span
                    onClick={() => setTab("done")}
                    style={{ cursor: "pointer", color: tab === "done" ? "red" : "" }}
                >
                    Đã giao
                </span>

                <span
                    onClick={() => setTab("cancel")}
                    style={{ cursor: "pointer", color: tab === "cancel" ? "red" : "" }}
                >
                    Đã hủy
                </span>

            </div>

            {/* LIST */}
            {filteredOrders.map((o, index) => (

                <div key={index} className="border p-3 mb-4">

                    {/* STATUS */}
                    <div className="text-end mb-2" style={{ color: "red" }}>
                        {getStatusText(o.order.status)}
                    </div>

                    {/* ITEMS */}
                    {o.items.map(item => (
                        <div key={item.id} className="d-flex align-items-center mb-2">

                            {/* IMAGE */}
                            <img
                                src={products[item.productId]?.image || "https://via.placeholder.com/80"}
                                style={{ width: "80px", height: "80px", objectFit: "contain" }}
                                className="me-3"
                            />

                            {/* NAME */}
                            <div style={{ flex: 1 }}>
                                <div>
                                    {products[item.productId]?.name || "Đang tải..."}
                                </div>
                                <small>x{item.quantity}</small>
                            </div>

                            {/* PRICE */}
                            <div style={{ color: "red" }}>
                                {(item.price * item.quantity).toLocaleString()}đ
                            </div>

                        </div>
                    ))}

                    <hr />

                    {/* TOTAL */}
                    <div className="d-flex justify-content-end">
                        <b style={{ color: "red" }}>
                            Tổng tiền: {o.order.total.toLocaleString()}đ
                        </b>
                    </div>

                    {/* BUTTON ADMIN */}
                    <div className="d-flex justify-content-end mt-2 gap-2">

                        {/* pending / shipping */}
                        {(o.order.status === "pending" || o.order.status === "shipping") && (
                            <button
                                className="btn btn-danger"
                                onClick={() => updateStatus(o.order.id, "cancel")}
                            >
                                Hủy đơn
                            </button>
                        )}

                        {/* done */}
                        {o.order.status === "done" && (
                            <>
                                <button className="btn btn-warning">
                                    Mua lại
                                </button>

                                <button className="btn btn-outline-secondary">
                                    Xem chi tiết
                                </button>
                            </>
                        )}

                        {/* cancel */}
                        {o.order.status === "cancel" && (
                            <button className="btn btn-warning">
                                Mua lại
                            </button>
                        )}

                    </div>

                </div>

            ))}

        </div>
    );
}

export default Orders;