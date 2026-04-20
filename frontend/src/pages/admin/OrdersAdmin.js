import { useState, useEffect } from "react";

const API = "http://localhost:8081/api/orders";

const STATUS_LABELS = {
    PENDING: { label: "Chờ xác nhận", color: "#856404", bg: "#fff3cd" },
    CONFIRMED: { label: "Đã xác nhận", color: "#0c5460", bg: "#d1ecf1" },
    SHIPPING: { label: "Đang giao", color: "#1b5e20", bg: "#c8e6c9" },
    DELIVERED: { label: "Đã giao", color: "#155724", bg: "#d4edda" },
    CANCELLED: { label: "Đã hủy", color: "#721c24", bg: "#f8d7da" },
};

function OrdersAdmin() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selected, setSelected] = useState(null);
    const [filterStatus, setFilterStatus] = useState("");
    const [msg, setMsg] = useState(null);

    useEffect(() => { fetchData(); }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await fetch(API);
            const data = await res.json();
            setOrders(data);
        } catch { setMsg({ type: "error", text: "Không thể kết nối API!" }); }
        finally { setLoading(false); }
    };

    const openDetail = (order) => { setSelected(order); setShowModal(true); };

    const handleUpdateStatus = async (id, status) => {
        try {
            await fetch(`${API}/${id}/status`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status })
            });
            setMsg({ type: "success", text: "Cập nhật trạng thái thành công!" });
            setShowModal(false);
            fetchData();
        } catch { setMsg({ type: "error", text: "Lỗi khi cập nhật!" }); }
    };

    const filtered = orders.filter(o => filterStatus ? o.status === filterStatus : true);

    return (
        <div style={{ padding: "24px", fontFamily: "'Segoe UI', sans-serif", background: "#f8f9fa", minHeight: "100vh" }}>
            <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
                    <h2 style={{ margin: 0, fontSize: "24px", fontWeight: 700 }}>📦 Quản lý đơn hàng</h2>
                    <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
                        style={{ padding: "8px 14px", borderRadius: "6px", border: "1px solid #ddd" }}>
                        <option value="">Tất cả trạng thái</option>
                        {Object.entries(STATUS_LABELS).map(([k, v]) => (
                            <option key={k} value={k}>{v.label}</option>
                        ))}
                    </select>
                </div>

                {msg && (
                    <div style={{ padding: "10px 16px", borderRadius: "6px", marginBottom: "16px",
                        background: msg.type === "success" ? "#d4edda" : "#f8d7da",
                        color: msg.type === "success" ? "#155724" : "#721c24" }}>
                        {msg.text}
                        <button onClick={() => setMsg(null)} style={{ float: "right", background: "none", border: "none", cursor: "pointer" }}>✕</button>
                    </div>
                )}

                {loading ? <p>Đang tải...</p> : (
                    <div style={{ background: "#fff", borderRadius: "10px", boxShadow: "0 2px 8px rgba(0,0,0,0.08)", overflow: "hidden" }}>
                        <table style={{ width: "100%", borderCollapse: "collapse" }}>
                            <thead style={{ background: "#f5a623" }}>
                                <tr>
                                    {["Mã đơn", "Khách hàng", "Tổng tiền", "Ngày đặt", "Trạng thái", "Thao tác"].map(h => (
                                        <th key={h} style={thStyle}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.length === 0 ? (
                                    <tr><td colSpan={6} style={{ textAlign: "center", padding: "24px", color: "#888" }}>Không có đơn hàng</td></tr>
                                ) : filtered.map((o, i) => {
                                    const s = STATUS_LABELS[o.status] || { label: o.status, color: "#333", bg: "#eee" };
                                    return (
                                        <tr key={o.id} style={{ background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                                            <td style={tdStyle}>#{o.id}</td>
                                            <td style={tdStyle}>{o.username || o.userId}</td>
                                            <td style={tdStyle}>{Number(o.totalPrice).toLocaleString()}đ</td>
                                            <td style={tdStyle}>{o.createdAt ? new Date(o.createdAt).toLocaleDateString("vi-VN") : "—"}</td>
                                            <td style={tdStyle}>
                                                <span style={{ padding: "3px 10px", borderRadius: "12px", fontSize: "12px", fontWeight: 600, background: s.bg, color: s.color }}>
                                                    {s.label}
                                                </span>
                                            </td>
                                            <td style={tdStyle}>
                                                <button onClick={() => openDetail(o)} style={btnStyle("#0d6efd", "sm")}>Chi tiết</button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* MODAL CHI TIẾT + CẬP NHẬT TRẠNG THÁI */}
            {showModal && selected && (
                <div style={overlayStyle}>
                    <div style={modalStyle}>
                        <h4 style={{ marginTop: 0 }}>📋 Chi tiết đơn #{selected.id}</h4>
                        <p><b>Khách hàng:</b> {selected.username || selected.userId}</p>
                        <p><b>Địa chỉ:</b> {selected.address || "—"}</p>
                        <p><b>Tổng tiền:</b> {Number(selected.totalPrice).toLocaleString()}đ</p>
                        <p><b>Ngày đặt:</b> {selected.createdAt ? new Date(selected.createdAt).toLocaleString("vi-VN") : "—"}</p>
                        <hr />
                        <p><b>Cập nhật trạng thái:</b></p>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "16px" }}>
                            {Object.entries(STATUS_LABELS).map(([k, v]) => (
                                <button key={k} onClick={() => handleUpdateStatus(selected.id, k)}
                                    style={{ padding: "6px 14px", borderRadius: "6px", border: "none", cursor: "pointer",
                                        background: selected.status === k ? "#f5a623" : "#e9ecef",
                                        color: selected.status === k ? "#fff" : "#333", fontWeight: 600 }}>
                                    {v.label}
                                </button>
                            ))}
                        </div>
                        <div style={{ display: "flex", justifyContent: "flex-end" }}>
                            <button onClick={() => setShowModal(false)} style={btnStyle("#6c757d")}>Đóng</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

const thStyle = { padding: "12px 16px", textAlign: "left", fontWeight: 700, color: "#333" };
const tdStyle = { padding: "10px 16px", borderBottom: "1px solid #f0f0f0" };
const overlayStyle = { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.4)", zIndex: 2000, display: "flex", alignItems: "center", justifyContent: "center" };
const modalStyle = { background: "#fff", borderRadius: "10px", padding: "28px", width: "500px", maxHeight: "80vh", overflowY: "auto", boxShadow: "0 8px 32px rgba(0,0,0,0.2)" };
const btnStyle = (bg, size) => ({
    padding: size === "sm" ? "4px 12px" : "8px 20px",
    background: bg, color: "#fff", border: "none", borderRadius: "6px",
    cursor: "pointer", fontWeight: 600, fontSize: size === "sm" ? "13px" : "14px"
});

export default OrdersAdmin;