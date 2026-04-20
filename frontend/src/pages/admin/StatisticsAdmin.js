import { useState, useEffect } from "react";

const API_BASE = "http://localhost:8081/api";

function StatCard({ icon, label, value, color }) {
    return (
        <div style={{
            background: "#fff", borderRadius: "10px", padding: "20px 24px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)", borderLeft: `4px solid ${color}`,
            flex: 1, minWidth: "180px"
        }}>
            <div style={{ fontSize: "28px", marginBottom: "8px" }}>{icon}</div>
            <div style={{ fontSize: "13px", color: "#888", marginBottom: "4px" }}>{label}</div>
            <div style={{ fontSize: "24px", fontWeight: 700, color }}>{value}</div>
        </div>
    );
}

function StatisticsAdmin() {
    const [stats, setStats] = useState({ totalOrders: 0, totalRevenue: 0, totalUsers: 0, totalProducts: 0 });
    const [recentOrders, setRecentOrders] = useState([]);
    const [topProducts, setTopProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [msg, setMsg] = useState(null);

    useEffect(() => { fetchAll(); }, []);

    const fetchAll = async () => {
        setLoading(true);
        try {
            const [ordersRes, usersRes, productsRes] = await Promise.all([
                fetch(`${API_BASE}/orders`),
                fetch(`${API_BASE}/users`),
                fetch(`${API_BASE}/products`),
            ]);
            const orders = await ordersRes.json();
            const users = await usersRes.json();
            const products = await productsRes.json();

            const totalRevenue = orders
                .filter(o => o.status !== "CANCELLED")
                .reduce((sum, o) => sum + Number(o.totalPrice || 0), 0);

            setStats({
                totalOrders: orders.length,
                totalRevenue,
                totalUsers: users.length,
                totalProducts: products.length,
            });

            // 5 đơn gần nhất
            setRecentOrders([...orders].reverse().slice(0, 5));

            // Sản phẩm theo danh mục (đơn giản)
            const catCount = {};
            products.forEach(p => {
                catCount[p.category] = (catCount[p.category] || 0) + 1;
            });
            setTopProducts(Object.entries(catCount).map(([cat, count]) => ({ cat, count })));
        } catch {
            setMsg({ type: "error", text: "Không thể tải dữ liệu thống kê!" });
        } finally { setLoading(false); }
    };

    const STATUS_LABELS = {
        PENDING: { label: "Chờ xác nhận", color: "#856404", bg: "#fff3cd" },
        CONFIRMED: { label: "Đã xác nhận", color: "#0c5460", bg: "#d1ecf1" },
        SHIPPING: { label: "Đang giao", color: "#1b5e20", bg: "#c8e6c9" },
        DELIVERED: { label: "Đã giao", color: "#155724", bg: "#d4edda" },
        CANCELLED: { label: "Đã hủy", color: "#721c24", bg: "#f8d7da" },
    };

    return (
        <div style={{ padding: "24px", fontFamily: "'Segoe UI', sans-serif", background: "#f8f9fa", minHeight: "100vh" }}>
            <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

                <h2 style={{ marginBottom: "24px", fontSize: "24px", fontWeight: 700 }}>📊 Thống kê tổng quan</h2>

                {msg && (
                    <div style={{ padding: "10px 16px", borderRadius: "6px", marginBottom: "16px",
                        background: "#f8d7da", color: "#721c24" }}>
                        {msg.text}
                    </div>
                )}

                {loading ? <p>Đang tải...</p> : (
                    <>
                        {/* STAT CARDS */}
                        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginBottom: "32px" }}>
                            <StatCard icon="📦" label="Tổng đơn hàng" value={stats.totalOrders} color="#f5a623" />
                            <StatCard icon="💰" label="Doanh thu" value={`${Number(stats.totalRevenue).toLocaleString()}đ`} color="#28a745" />
                            <StatCard icon="👥" label="Người dùng" value={stats.totalUsers} color="#0d6efd" />
                            <StatCard icon="🛍️" label="Sản phẩm" value={stats.totalProducts} color="#6f42c1" />
                        </div>

                        <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
                            {/* ĐƠN HÀNG GẦN ĐÂY */}
                            <div style={{ flex: 2, minWidth: "320px", background: "#fff", borderRadius: "10px", padding: "20px", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
                                <h5 style={{ marginTop: 0, marginBottom: "16px" }}>🕐 Đơn hàng gần đây</h5>
                                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                                    <thead>
                                        <tr style={{ borderBottom: "2px solid #f0f0f0" }}>
                                            {["Mã đơn", "Khách hàng", "Tổng tiền", "Trạng thái"].map(h => (
                                                <th key={h} style={{ padding: "8px", textAlign: "left", fontSize: "13px", color: "#888" }}>{h}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {recentOrders.length === 0 ? (
                                            <tr><td colSpan={4} style={{ textAlign: "center", padding: "16px", color: "#888" }}>Chưa có đơn hàng</td></tr>
                                        ) : recentOrders.map(o => {
                                            const s = STATUS_LABELS[o.status] || { label: o.status, color: "#333", bg: "#eee" };
                                            return (
                                                <tr key={o.id} style={{ borderBottom: "1px solid #f0f0f0" }}>
                                                    <td style={{ padding: "8px" }}>#{o.id}</td>
                                                    <td style={{ padding: "8px" }}>{o.username || o.userId}</td>
                                                    <td style={{ padding: "8px" }}>{Number(o.totalPrice).toLocaleString()}đ</td>
                                                    <td style={{ padding: "8px" }}>
                                                        <span style={{ padding: "2px 8px", borderRadius: "10px", fontSize: "11px", fontWeight: 600, background: s.bg, color: s.color }}>
                                                            {s.label}
                                                        </span>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>

                            {/* SẢN PHẨM THEO DANH MỤC */}
                            <div style={{ flex: 1, minWidth: "220px", background: "#fff", borderRadius: "10px", padding: "20px", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
                                <h5 style={{ marginTop: 0, marginBottom: "16px" }}>📂 Sản phẩm theo danh mục</h5>
                                {topProducts.length === 0 ? (
                                    <p style={{ color: "#888" }}>Chưa có dữ liệu</p>
                                ) : topProducts.map(({ cat, count }) => {
                                    const max = Math.max(...topProducts.map(t => t.count));
                                    const pct = Math.round((count / max) * 100);
                                    return (
                                        <div key={cat} style={{ marginBottom: "12px" }}>
                                            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", marginBottom: "4px" }}>
                                                <span>{cat || "Khác"}</span>
                                                <span style={{ fontWeight: 600 }}>{count}</span>
                                            </div>
                                            <div style={{ background: "#f0f0f0", borderRadius: "4px", height: "8px" }}>
                                                <div style={{ width: `${pct}%`, background: "#f5a623", borderRadius: "4px", height: "8px", transition: "width 0.5s" }} />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default StatisticsAdmin;