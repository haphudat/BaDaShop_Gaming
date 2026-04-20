import { useState, useEffect } from "react";

const API = "http://localhost:8081/api/reviews";

function ReviewsAdmin() {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterStar, setFilterStar] = useState("");
    const [search, setSearch] = useState("");
    const [msg, setMsg] = useState(null);

    useEffect(() => { fetchData(); }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await fetch(API);
            const data = await res.json();
            setReviews(data);
        } catch { setMsg({ type: "error", text: "Không thể kết nối API!" }); }
        finally { setLoading(false); }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Xác nhận xóa đánh giá này?")) return;
        try {
            await fetch(`${API}/${id}`, { method: "DELETE" });
            setMsg({ type: "success", text: "Xóa thành công!" });
            fetchData();
        } catch { setMsg({ type: "error", text: "Lỗi khi xóa!" }); }
    };

    const renderStars = (rating) => "★".repeat(rating) + "☆".repeat(5 - rating);

    const filtered = reviews.filter(r => {
        const matchStar = filterStar ? r.rating === Number(filterStar) : true;
        const matchSearch = r.username?.toLowerCase().includes(search.toLowerCase()) ||
            r.comment?.toLowerCase().includes(search.toLowerCase());
        return matchStar && matchSearch;
    });

    return (
        <div style={{ padding: "24px", fontFamily: "'Segoe UI', sans-serif", background: "#f8f9fa", minHeight: "100vh" }}>
            <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
                    <h2 style={{ margin: 0, fontSize: "24px", fontWeight: 700 }}>⭐ Quản lý đánh giá</h2>
                    <div style={{ display: "flex", gap: "8px" }}>
                        <select value={filterStar} onChange={e => setFilterStar(e.target.value)}
                            style={{ padding: "8px 14px", borderRadius: "6px", border: "1px solid #ddd" }}>
                            <option value="">Tất cả sao</option>
                            {[5, 4, 3, 2, 1].map(s => <option key={s} value={s}>{s} sao</option>)}
                        </select>
                    </div>
                </div>

                {msg && (
                    <div style={{ padding: "10px 16px", borderRadius: "6px", marginBottom: "16px",
                        background: msg.type === "success" ? "#d4edda" : "#f8d7da",
                        color: msg.type === "success" ? "#155724" : "#721c24" }}>
                        {msg.text}
                        <button onClick={() => setMsg(null)} style={{ float: "right", background: "none", border: "none", cursor: "pointer" }}>✕</button>
                    </div>
                )}

                <input
                    placeholder="🔍 Tìm theo người dùng, nội dung..."
                    value={search} onChange={e => setSearch(e.target.value)}
                    style={{ padding: "8px 14px", borderRadius: "6px", border: "1px solid #ddd", width: "300px", marginBottom: "16px" }}
                />

                {loading ? <p>Đang tải...</p> : (
                    <div style={{ background: "#fff", borderRadius: "10px", boxShadow: "0 2px 8px rgba(0,0,0,0.08)", overflow: "hidden" }}>
                        <table style={{ width: "100%", borderCollapse: "collapse" }}>
                            <thead style={{ background: "#f5a623" }}>
                                <tr>
                                    {["ID", "Người dùng", "Sản phẩm", "Đánh giá", "Nội dung", "Ngày", "Thao tác"].map(h => (
                                        <th key={h} style={thStyle}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.length === 0 ? (
                                    <tr><td colSpan={7} style={{ textAlign: "center", padding: "24px", color: "#888" }}>Không có đánh giá</td></tr>
                                ) : filtered.map((r, i) => (
                                    <tr key={r.id} style={{ background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                                        <td style={tdStyle}>{r.id}</td>
                                        <td style={tdStyle}>{r.username || r.userId}</td>
                                        <td style={tdStyle}>{r.productName || r.productId}</td>
                                        <td style={tdStyle}>
                                            <span style={{ color: "#f5a623", fontSize: "16px" }}>{renderStars(r.rating)}</span>
                                        </td>
                                        <td style={{ ...tdStyle, maxWidth: "200px" }}>
                                            <span title={r.comment} style={{ display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                                {r.comment}
                                            </span>
                                        </td>
                                        <td style={tdStyle}>{r.createdAt ? new Date(r.createdAt).toLocaleDateString("vi-VN") : "—"}</td>
                                        <td style={tdStyle}>
                                            <button onClick={() => handleDelete(r.id)} style={btnStyle("#dc3545", "sm")}>Xóa</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

const thStyle = { padding: "12px 16px", textAlign: "left", fontWeight: 700, color: "#333" };
const tdStyle = { padding: "10px 16px", borderBottom: "1px solid #f0f0f0" };
const btnStyle = (bg, size) => ({
    padding: size === "sm" ? "4px 12px" : "8px 20px",
    background: bg, color: "#fff", border: "none", borderRadius: "6px",
    cursor: "pointer", fontWeight: 600, fontSize: size === "sm" ? "13px" : "14px"
});

export default ReviewsAdmin;