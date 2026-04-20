import { useState, useEffect } from "react";

const API = "http://localhost:8081/api/promotions";

const emptyForm = { code: "", description: "", discountPercent: "", startDate: "", endDate: "", active: true };

function PromotionsAdmin() {
    const [promotions, setPromotions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const [form, setForm] = useState(emptyForm);
    const [search, setSearch] = useState("");
    const [msg, setMsg] = useState(null);

    useEffect(() => { fetchData(); }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await fetch(API);
            const data = await res.json();
            setPromotions(data);
        } catch { setMsg({ type: "error", text: "Không thể kết nối API!" }); }
        finally { setLoading(false); }
    };

    const openAdd = () => { setEditItem(null); setForm(emptyForm); setShowModal(true); };
    const openEdit = (item) => { setEditItem(item); setForm(item); setShowModal(true); };

    const handleSave = async () => {
        try {
            const method = editItem ? "PUT" : "POST";
            const url = editItem ? `${API}/${editItem.id}` : API;
            await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
            setMsg({ type: "success", text: editItem ? "Cập nhật thành công!" : "Thêm thành công!" });
            setShowModal(false);
            fetchData();
        } catch { setMsg({ type: "error", text: "Lỗi khi lưu!" }); }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Xác nhận xóa khuyến mãi này?")) return;
        try {
            await fetch(`${API}/${id}`, { method: "DELETE" });
            setMsg({ type: "success", text: "Xóa thành công!" });
            fetchData();
        } catch { setMsg({ type: "error", text: "Lỗi khi xóa!" }); }
    };

    const filtered = promotions.filter(p =>
        p.code?.toLowerCase().includes(search.toLowerCase()) ||
        p.description?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div style={{ padding: "24px", fontFamily: "'Segoe UI', sans-serif", background: "#f8f9fa", minHeight: "100vh" }}>
            <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
                    <h2 style={{ margin: 0, fontSize: "24px", fontWeight: 700 }}>🎁 Quản lý khuyến mãi</h2>
                    <button onClick={openAdd} style={btnStyle("#f5a623")}>+ Thêm khuyến mãi</button>
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
                    placeholder="🔍 Tìm mã hoặc mô tả..."
                    value={search} onChange={e => setSearch(e.target.value)}
                    style={{ padding: "8px 14px", borderRadius: "6px", border: "1px solid #ddd", width: "300px", marginBottom: "16px" }}
                />

                {loading ? <p>Đang tải...</p> : (
                    <div style={{ background: "#fff", borderRadius: "10px", boxShadow: "0 2px 8px rgba(0,0,0,0.08)", overflow: "hidden" }}>
                        <table style={{ width: "100%", borderCollapse: "collapse" }}>
                            <thead style={{ background: "#f5a623" }}>
                                <tr>
                                    {["ID", "Mã code", "Mô tả", "Giảm (%)", "Từ ngày", "Đến ngày", "Trạng thái", "Thao tác"].map(h => (
                                        <th key={h} style={thStyle}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.length === 0 ? (
                                    <tr><td colSpan={8} style={{ textAlign: "center", padding: "24px", color: "#888" }}>Không có khuyến mãi</td></tr>
                                ) : filtered.map((p, i) => (
                                    <tr key={p.id} style={{ background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                                        <td style={tdStyle}>{p.id}</td>
                                        <td style={tdStyle}><b style={{ color: "#f5a623" }}>{p.code}</b></td>
                                        <td style={tdStyle}>{p.description}</td>
                                        <td style={tdStyle}>{p.discountPercent}%</td>
                                        <td style={tdStyle}>{p.startDate ? new Date(p.startDate).toLocaleDateString("vi-VN") : "—"}</td>
                                        <td style={tdStyle}>{p.endDate ? new Date(p.endDate).toLocaleDateString("vi-VN") : "—"}</td>
                                        <td style={tdStyle}>
                                            <span style={{
                                                padding: "3px 10px", borderRadius: "12px", fontSize: "12px", fontWeight: 600,
                                                background: p.active ? "#d4edda" : "#f8d7da",
                                                color: p.active ? "#155724" : "#721c24"
                                            }}>
                                                {p.active ? "Đang hoạt động" : "Tắt"}
                                            </span>
                                        </td>
                                        <td style={tdStyle}>
                                            <button onClick={() => openEdit(p)} style={btnStyle("#0d6efd", "sm")}>Sửa</button>
                                            {" "}
                                            <button onClick={() => handleDelete(p.id)} style={btnStyle("#dc3545", "sm")}>Xóa</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {showModal && (
                <div style={overlayStyle}>
                    <div style={modalStyle}>
                        <h4 style={{ marginTop: 0 }}>{editItem ? "✏️ Sửa khuyến mãi" : "➕ Thêm khuyến mãi"}</h4>
                        {[
                            { label: "Mã code", key: "code" },
                            { label: "Mô tả", key: "description" },
                            { label: "Giảm giá (%)", key: "discountPercent" },
                            { label: "Từ ngày", key: "startDate", type: "date" },
                            { label: "Đến ngày", key: "endDate", type: "date" },
                        ].map(({ label, key, type }) => (
                            <div key={key} style={{ marginBottom: "12px" }}>
                                <label style={{ display: "block", marginBottom: "4px", fontWeight: 600 }}>{label}</label>
                                <input type={type || "text"} value={form[key] || ""} onChange={e => setForm({ ...form, [key]: e.target.value })} style={inputStyle} />
                            </div>
                        ))}
                        <div style={{ marginBottom: "12px" }}>
                            <label style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: 600, cursor: "pointer" }}>
                                <input type="checkbox" checked={form.active} onChange={e => setForm({ ...form, active: e.target.checked })} />
                                Đang hoạt động
                            </label>
                        </div>
                        <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end", marginTop: "16px" }}>
                            <button onClick={() => setShowModal(false)} style={btnStyle("#6c757d")}>Hủy</button>
                            <button onClick={handleSave} style={btnStyle("#f5a623")}>Lưu</button>
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
const modalStyle = { background: "#fff", borderRadius: "10px", padding: "28px", width: "460px", maxHeight: "80vh", overflowY: "auto", boxShadow: "0 8px 32px rgba(0,0,0,0.2)" };
const inputStyle = { width: "100%", padding: "8px 12px", borderRadius: "6px", border: "1px solid #ddd", boxSizing: "border-box" };
const btnStyle = (bg, size) => ({
    padding: size === "sm" ? "4px 12px" : "8px 20px",
    background: bg, color: "#fff", border: "none", borderRadius: "6px",
    cursor: "pointer", fontWeight: 600, fontSize: size === "sm" ? "13px" : "14px"
});

export default PromotionsAdmin;