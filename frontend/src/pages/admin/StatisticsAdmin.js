import { useState, useEffect } from "react";
import axios from "../../axiosConfig";

const API = "http://localhost:8081/api/statistics";

const STATUS_LABEL = {
    pending:   { label: "Chờ xử lý",   color: "#ffc107" },
    confirmed: { label: "Đã xác nhận", color: "#0d6efd" },
    shipping:  { label: "Đang giao",   color: "#6f42c1" },
    delivered: { label: "Đã giao",     color: "#198754" },
    cancelled: { label: "Đã hủy",      color: "#dc3545" },
};

function StatisticsAdmin() {
    const [summary, setSummary] = useState(null);
    const [revenueByMonth, setRevenueByMonth] = useState([]);
    const [ordersByStatus, setOrdersByStatus] = useState({});
    const [topProducts, setTopProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            axios.get(`${API}/summary`),
            axios.get(`${API}/revenue-by-month`),
            axios.get(`${API}/orders-by-status`),
            axios.get(`${API}/top-products`),
        ]).then(([s, rev, status, top]) => {
            setSummary(s.data);
            setRevenueByMonth(rev.data);
            setOrdersByStatus(status.data);
            setTopProducts(top.data);
        }).finally(() => setLoading(false));
    }, []);

    if (loading || !summary) return (
        <div style={{ padding: "40px", textAlign: "center" }}>Đang tải thống kê...</div>
    );

    const maxRevenue = Math.max(...revenueByMonth.map(r => r.revenue), 1);
    const totalStatusCount = Object.values(ordersByStatus).reduce((a, b) => a + b, 0);
    const maxSold = Math.max(...topProducts.map(p => p.sold), 1);

    return (
        <div style={{ padding: "24px", fontFamily: "'Segoe UI', sans-serif", background: "#f8f9fa", minHeight: "100vh" }}>
            <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

                <h2 style={{ marginBottom: "24px" }}>📊 Thống kê</h2>

                {/* SUMMARY CARDS */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "16px", marginBottom: "32px" }}>
                    {[
                        { label: "Tổng đơn hàng", value: summary.totalOrders, icon: "📦", color: "#0d6efd" },
                        { label: "Đơn chờ xử lý", value: summary.pendingOrders, icon: "⏳", color: "#ffc107" },
                        { label: "Doanh thu", value: formatMoney(summary.totalRevenue), icon: "💰", color: "#198754" },
                        { label: "Sản phẩm", value: summary.totalProducts, icon: "🎮", color: "#6f42c1" },
                        { label: "Người dùng", value: summary.totalUsers, icon: "👤", color: "#f5a623" },
                    ].map(c => (
                        <div key={c.label} style={{
                            background: "#fff", borderRadius: "12px", padding: "20px",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                            borderTop: `4px solid ${c.color}`
                        }}>
                            <div style={{ fontSize: "28px" }}>{c.icon}</div>
                            <div style={{ fontSize: "22px", fontWeight: 700, color: c.color, margin: "8px 0 4px" }}>{c.value}</div>
                            <div style={{ fontSize: "13px", color: "#666" }}>{c.label}</div>
                        </div>
                    ))}
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "24px" }}>

                    {/* DOANH THU THEO THÁNG */}
                    <div style={card}>
                        <h5 style={cardTitle}>💹 Doanh thu theo tháng</h5>
                        {revenueByMonth.length === 0 ? (
                            <p style={{ color: "#888", textAlign: "center", padding: "24px" }}>Chưa có dữ liệu</p>
                        ) : (
                            <div style={{ display: "flex", alignItems: "flex-end", gap: "8px", height: "180px", padding: "0 8px" }}>
                                {revenueByMonth.map(r => (
                                    <div key={r.month} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
                                        <div style={{ fontSize: "10px", color: "#666", fontWeight: 600 }}>
                                            {formatMoneyShort(r.revenue)}
                                        </div>
                                        <div style={{
                                            width: "100%", background: "#f5a623", borderRadius: "4px 4px 0 0",
                                            height: `${(r.revenue / maxRevenue) * 140}px`,
                                            minHeight: "4px", transition: "height 0.3s"
                                        }} />
                                        <div style={{ fontSize: "10px", color: "#666" }}>{r.month}</div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* ĐƠN HÀNG THEO TRẠNG THÁI */}
                    <div style={card}>
                        <h5 style={cardTitle}>📋 Đơn hàng theo trạng thái</h5>
                        <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "8px" }}>
                            {Object.entries(ordersByStatus).map(([status, count]) => {
                                const info = STATUS_LABEL[status] || { label: status, color: "#999" };
                                const pct = totalStatusCount ? Math.round((count / totalStatusCount) * 100) : 0;
                                return (
                                    <div key={status}>
                                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                                            <span style={{ fontSize: "13px", fontWeight: 600 }}>{info.label}</span>
                                            <span style={{ fontSize: "13px", color: "#666" }}>{count} ({pct}%)</span>
                                        </div>
                                        <div style={{ background: "#f0f0f0", borderRadius: "6px", height: "10px" }}>
                                            <div style={{
                                                width: `${pct}%`, height: "100%",
                                                background: info.color, borderRadius: "6px",
                                                transition: "width 0.4s"
                                            }} />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* TOP 5 SẢN PHẨM BÁN CHẠY */}
                <div style={card}>
                    <h5 style={cardTitle}>🏆 Top 5 sản phẩm bán chạy</h5>
                    {topProducts.length === 0 ? (
                        <p style={{ color: "#888", textAlign: "center", padding: "24px" }}>Chưa có dữ liệu</p>
                    ) : (
                        <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "8px" }}>
                            {topProducts.map((p, i) => (
                                <div key={p.productId} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                                    <div style={{
                                        width: "28px", height: "28px", borderRadius: "50%", flexShrink: 0,
                                        background: i === 0 ? "#ffc107" : i === 1 ? "#adb5bd" : i === 2 ? "#cd7f32" : "#e9ecef",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        fontWeight: 700, fontSize: "13px"
                                    }}>
                                        {i + 1}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: "14px", fontWeight: 600, marginBottom: "4px" }}>
                                            {p.name || `Product #${p.productId}`}
                                        </div>
                                        <div style={{ background: "#f0f0f0", borderRadius: "6px", height: "8px" }}>
                                            <div style={{
                                                width: `${(p.sold / maxSold) * 100}%`, height: "100%",
                                                background: "#f5a623", borderRadius: "6px"
                                            }} />
                                        </div>
                                    </div>
                                    <div style={{ fontWeight: 700, color: "#f5a623", minWidth: "60px", textAlign: "right" }}>
                                        {p.sold} cái
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}

const formatMoney = (n) => n ? Number(n).toLocaleString("vi-VN") + "đ" : "0đ";
const formatMoneyShort = (n) => {
    if (!n) return "0";
    if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
    if (n >= 1_000) return (n / 1_000).toFixed(0) + "K";
    return n;
};

const card = { background: "#fff", borderRadius: "12px", padding: "20px", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" };
const cardTitle = { margin: "0 0 16px", fontSize: "15px", fontWeight: 700 };

export default StatisticsAdmin;