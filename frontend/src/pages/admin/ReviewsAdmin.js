import { useState, useEffect } from "react";

const API = "http://localhost:8081/api/reviews";

const STARS = [5, 4, 3, 2, 1];

function ReviewsAdmin() {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [filterRating, setFilterRating] = useState("");
    const [msg, setMsg] = useState(null);

    useEffect(() => { fetchData(); }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await fetch(API);
            setList(await res.json());
        } catch {
            showMsg("error", "Không thể kết nối API!");
        } finally {
            setLoading(false);
        }
    };

    const showMsg = (type, text) => {
        setMsg({ type, text });
        setTimeout(() => setMsg(null), 3000);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Xóa đánh giá này?")) return;
        await fetch(`${API}/${id}`, { method: "DELETE" });
        showMsg("success", "Đã xóa đánh giá!");
        setList(list.filter(r => r.id !== id));
    };

    const handleReply = async (review) => {

        try {

            const response = await fetch(
                `${API}/${review.id}/reply`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        reply: review.reply
                    })
                }
            );

            if (!response.ok) {
                throw new Error();
            }

            showMsg("success", "Đã lưu phản hồi");

            fetchData();

        } catch {

            showMsg("error", "Không thể lưu phản hồi");

        }

    };

    const renderStars = (rating) =>
        Array.from({ length: 5 }, (_, i) => (
            <span key={i} style={{ color: i < rating ? "#f5a623" : "#ddd", fontSize: "16px" }}>★</span>
        ));

    const filtered = list.filter(r => {
        const matchSearch =
            r.user?.username?.toLowerCase().includes(search.toLowerCase()) ||
            r.product?.name?.toLowerCase().includes(search.toLowerCase()) ||
            r.comment?.toLowerCase().includes(search.toLowerCase());
        const matchRating = filterRating ? r.rating === Number(filterRating) : true;
        return matchSearch && matchRating;
    });

    // Thống kê nhanh
    const avgRating = list.length
        ? (list.reduce((s, r) => s + r.rating, 0) / list.length).toFixed(1)
        : 0;
    const countByStar = (star) => list.filter(r => r.rating === star).length;

    return (
        <div style={{ padding: "24px", fontFamily: "'Segoe UI', sans-serif", background: "#f8f9fa", minHeight: "100vh" }}>
            <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

                {/* HEADER */}
                <h2 style={{ marginBottom: "24px" }}>⭐ Quản lý đánh giá</h2>

                {/* THỐNG KÊ NHANH */}
                <div style={{ display: "flex", gap: "16px", marginBottom: "24px" }}>
                    <div style={statCard}>
                        <div style={{ fontSize: "28px", fontWeight: 700, color: "#f5a623" }}>{avgRating} ★</div>
                        <div style={{ color: "#666", fontSize: "13px" }}>Trung bình</div>
                    </div>
                    <div style={statCard}>
                        <div style={{ fontSize: "28px", fontWeight: 700 }}>{list.length}</div>
                        <div style={{ color: "#666", fontSize: "13px" }}>Tổng đánh giá</div>
                    </div>
                    {STARS.map(s => (
                        <div key={s} style={statCard}>
                            <div style={{ fontSize: "20px", fontWeight: 700 }}>{countByStar(s)}</div>
                            <div style={{ color: "#666", fontSize: "13px" }}>{s} sao</div>
                        </div>
                    ))}
                </div>

                {/* THÔNG BÁO */}
                {msg && (
                    <div style={{
                        padding: "10px 16px", borderRadius: "6px", marginBottom: "16px",
                        background: msg.type === "success" ? "#d4edda" : "#f8d7da",
                        color: msg.type === "success" ? "#155724" : "#721c24"
                    }}>{msg.text}</div>
                )}

                {/* TOOLBAR */}
                <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
                    <input
                        placeholder="🔍 Tìm user, sản phẩm, nội dung..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        style={{ padding: "8px 14px", borderRadius: "6px", border: "1px solid #ddd", width: "320px" }}
                    />
                    <select
                        value={filterRating}
                        onChange={e => setFilterRating(e.target.value)}
                        style={{ padding: "8px 12px", borderRadius: "6px", border: "1px solid #ddd" }}
                    >
                        <option value="">Tất cả sao</option>
                        {STARS.map(s => <option key={s} value={s}>{s} sao</option>)}
                    </select>
                    <span style={{ alignSelf: "center", color: "#666", marginLeft: "auto" }}>
                        {filtered.length} đánh giá
                    </span>
                </div>

                {/* TABLE */}
                {loading ? <p>Đang tải...</p> : (
                    <div style={{ background: "#fff", borderRadius: "10px", boxShadow: "0 2px 8px rgba(0,0,0,0.08)", overflow: "hidden" }}>
                        <table style={{ width: "100%", borderCollapse: "collapse" }}>
                            <thead style={{ background: "#f5a623" }}>
                            <tr>
                                {[
                                    "ID",
                                    "Sản phẩm",
                                    "Người dùng",
                                    "Đánh giá",
                                    "Đánh giá của khách",
                                    "Phản hồi của shop",
                                    "Thời gian",
                                    "Thao tác"
                                ].map(h => (
                                    <th
                                        key={h}
                                        style={{
                                            padding: "12px 14px",
                                            textAlign: "left",
                                            fontWeight: 700
                                        }}
                                    >
                                        {h}
                                    </th>
                                ))}
                            </tr>
                            </thead>
                            <tbody>
                                {filtered.length === 0 ? (
                                    <tr><td colSpan={7} style={{ textAlign: "center", padding: "32px", color: "#888" }}>Không có đánh giá nào</td></tr>
                                ) : filtered.map((r, i) => (
                                    <tr key={r.id} style={{ background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                                        <td style={td}>{r.id}</td>
                                        <td style={td}>
                                            <a
                                                href={`/product/${r.product?.id}`}
                                                target="_blank"
                                                rel="noreferrer"
                                                style={{
                                                    fontWeight: 600,
                                                    color: "#0d6efd",
                                                    textDecoration: "none"
                                                }}
                                            >
                                                {r.product?.name}
                                            </a>
                                        </td>
                                        <td style={td}>{r.user?.username || "—"}</td>
                                        <td style={td}>{renderStars(r.rating)}</td>
                                        {/* Đánh giá của khách */}
                                        <td style={{ ...td, minWidth: "220px" }}>
                                            <div
                                                style={{
                                                    whiteSpace: "pre-wrap",
                                                    wordBreak: "break-word"
                                                }}
                                            >
                                                {r.comment || "Không có nội dung"}
                                            </div>
                                        </td>

                                        {/* Phản hồi của shop */}
                                        <td style={{ ...td, minWidth: "320px" }}>

                                            <div
                                                style={{
                                                    fontWeight: "bold",
                                                    color: "#f5a623",
                                                    marginBottom: "8px"
                                                }}
                                            >
                                                💬 Phản hồi của BaDaShop
                                            </div>

                                            <textarea
                                                className="form-control"
                                                rows="2"
                                                defaultValue={r.reply || ""}
                                                placeholder="Nhập phản hồi..."
                                                onChange={(e) => {
                                                    r.reply = e.target.value;
                                                }}
                                            />

                                            <button
                                                className="btn btn-warning btn-sm mt-2"
                                                onClick={() => handleReply(r)}
                                            >
                                                💾 Lưu phản hồi
                                            </button>

                                        </td>

                                        <td style={{ ...td, whiteSpace: "nowrap", fontSize: "13px", color: "#666" }}>
                                            {r.createdAt ? new Date(r.createdAt).toLocaleString("vi-VN") : "—"}
                                        </td>
                                        <td style={td}>

                                            <button
                                                onClick={() => handleDelete(r.id)}
                                                style={{
                                                    padding: "4px 10px",
                                                    background: "#dc3545",
                                                    color: "#fff",
                                                    border: "none",
                                                    borderRadius: "6px",
                                                    cursor: "pointer",
                                                    fontWeight: 600,
                                                    fontSize: "12px"
                                                }}
                                            >
                                                🗑 Xóa
                                            </button>

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

const td = { padding: "10px 14px", borderBottom: "1px solid #f0f0f0", verticalAlign: "top" };
const statCard = {
    background: "#fff", borderRadius: "10px", padding: "16px 24px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)", textAlign: "center", minWidth: "90px"
};

export default ReviewsAdmin;