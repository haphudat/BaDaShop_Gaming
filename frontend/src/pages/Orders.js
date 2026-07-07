import { useEffect, useState } from "react";
import axios from "../axiosConfig";

function Orders() {

    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState({});
    const [tab, setTab] = useState("all");

    // load orders
    useEffect(() => {
        axios.get("http://localhost:8081/api/orders/full")
            .then(res => setOrders(res.data))
            .catch(err => console.log(err));
    }, []);

    // load products
    useEffect(() => {
        axios.get("http://localhost:8081/api/products")
            .then(res => {
                const map = {};
                res.data.forEach(p => { map[p.id] = p; });
                setProducts(map);
            })
            .catch(err => console.log(err));
    }, []);

    const filteredOrders = orders.filter(o => {
        if (tab === "all") return true;
        return o.order.status === tab;
    });

    const getStatusText = (status) => {
        switch (status) {
            case "pending": return "Chờ xác nhận";
            case "shipping": return "Đang giao";
            case "done": return "Đã giao";
            case "cancel": return "Đã hủy";
            default: return "";
        }
    };

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
                {[
                    { key: "all", label: "Tất cả" },
                    { key: "pending", label: "Chờ xác nhận" },
                    { key: "shipping", label: "Đang giao" },
                    { key: "done", label: "Đã giao" },
                    { key: "cancel", label: "Đã hủy" },
                ].map(t => (
                    <span
                        key={t.key}
                        onClick={() => setTab(t.key)}
                        style={{ cursor: "pointer", color: tab === t.key ? "red" : "" }}
                    >
                        {t.label}
                    </span>
                ))}
            </div>

            {/* LIST */}
            {filteredOrders.map((o, index) => (
                <div key={index} className="border p-3 mb-4">

                    <div className="text-end mb-2" style={{ color: "red" }}>
                        {getStatusText(o.order.status)}
                    </div>

                    {o.items.map(item => (
                        <div key={item.id} className="d-flex align-items-center mb-2">
                            <img
                                src={products[item.productId]?.image || "https://via.placeholder.com/80"}
                                style={{ width: "80px", height: "80px", objectFit: "contain" }}
                                className="me-3"
                                alt=""
                            />
                            <div style={{ flex: 1 }}>
                                <div>{products[item.productId]?.name || "Đang tải..."}</div>
                                <small>x{item.quantity}</small>
                            </div>
                            <div style={{ color: "red" }}>
                                {(item.price * item.quantity).toLocaleString()}đ
                            </div>
                        </div>
                    ))}

                    <hr />

                    <div className="d-flex justify-content-end">
                        <b style={{ color: "red" }}>
                            Tổng tiền: {o.order.total.toLocaleString()}đ
                        </b>
                    </div>

                    <div className="d-flex justify-content-end mt-2 gap-2">
                        {(o.order.status === "pending" || o.order.status === "shipping") && (
                            <button className="btn btn-danger" onClick={() => updateStatus(o.order.id, "cancel")}>
                                Hủy đơn
                            </button>
                        )}
                        {o.order.status === "done" && (
                            <>
                                <button className="btn btn-warning">Mua lại</button>
                                <button className="btn btn-outline-secondary">Xem chi tiết</button>
                            </>
                        )}
                        {o.order.status === "cancel" && (
                            <button className="btn btn-warning">Mua lại</button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Orders;