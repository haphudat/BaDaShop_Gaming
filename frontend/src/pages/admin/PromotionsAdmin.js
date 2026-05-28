import { useState, useEffect } from "react";

const API = "http://localhost:8080/api/promotions";

const emptyForm = {
    code: "", description: "", discountType: "PERCENT",
    discountValue: "", minOrderValue: "", startDate: "", endDate: "", active: true
};

function PromotionsAdmin() {
    const [list, setList] = useState([]);
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

    const openAdd = () => { setEditItem(null); setForm(emptyForm); setShowModal(true); };
    const openEdit = (item) => { setEditItem(item); setForm({ ...item }); setShowModal(true); };

    const handleSave = async () => {
        if (!form.code.trim()) return showMsg("error", "Vui lòng nhập mã giảm giá!");
        if (!form.discountValue) return showMsg("error", "Vui lòng nhập giá trị giảm!");
        try {
            const method = editItem ? "PUT" : "POST";
            const url = editItem ? `${API}/${editItem.id}` : API;
            await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            });
            showMsg("success", editItem ? "Cập nhật thành công!" : "Thêm thành công!");
            setShowModal(false);
            fetchData();
        } catch {
            showMsg("error", "Lỗi khi lưu!");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Xóa khuyến mãi này?")) return;
        await fetch(`${API}/${id}`, { method: "DELETE" });
        showMsg("success", "Đã xóa!");
        fetchData();
    };

    const handleToggle = async (id) => {
        await fetch(`${API}/${id}/toggle`, { method: "PUT" });
        fetchData();
    };

    const filtered = list.filter(p =>
        p.code?.toLowerCase().includes(search.toLowerCase()) ||
        p.description?.toLowerCase().includes(search.toLowerCase())
    );

    const formatValue = (p) =>
        p.discountType === "PERCENT"
            ? `${p.discountValue}%`
            : `${Number(p.discountValue).toLocaleString("vi-VN")}đ`;

    return (
        <div style={{ padding: "24px", fontFamily: "'Segoe UI', sans-serif", background: "#f8f9fa", minHeight: "100vh" }}>
            <div style={{ maxWidth: "1000px", margin: "0 auto" }}>

                {/* HEADER */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
                    <h2 style={{ margin: 0 }}>🎟️ Quản lý khuyến mãi</h2>
                    <button onClick={openAdd} style={btn("#f5a623")}>+ Thêm mã</button>
                </div>

                {/* THÔNG BÁO */}
                {msg && (
                    <div style={{
                        padding: "10px 16px", borderRadius: "6px", marginBottom: "16px",
                        background: msg.type === "success" ? "#d4edda" : "#f8d7da",
                        color: msg.type === "success" ? "#155724" : "#721c24"
                    }}>{msg.text}</div>
                )}

                {/* SEARCH */}
                <input
                    placeholder="🔍 Tìm mã hoặc mô tả..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    style={{ padding: "8px 14px", borderRadius: "6px", border: "1px solid #ddd", width: "300px", marginBottom: "16px" }}
                />

                {/* TABLE */}
                {loading ? <p>Đang tải...</p> : (
                    <div style={{ background: "#fff", borderRadius: "10px", boxShadow: "0 2px 8px rgba(0,0,0,0.08)", overflow: "hidden" }}>
                        <table style={{ width: "100%", borderCollapse: "collapse" }}>
                            <thead style={{ background: "#f5a623" }}>
                                <tr>
                                    {["Mã", "Mô tả", "Loại", "Giảm", "Đơn tối thiểu", "Từ ngày", "Đến ngày", "Trạng thái", ""].map(h => (
                                        <th key={h} style={{ padding: "12px 14px", textAlign: "left", fontWeight: 700 }}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.length === 0 ? (
                                    <tr><td colSpan={9} style={{ textAlign: "center", padding: "24px", color: "#888" }}>Không có dữ liệu</td></tr>
                                ) : filtered.map((p, i) => (
                                    <tr key={p.id} style={{ background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                                        <td style={td}>
                                            <strong style={{ background: "#fff3cd", padding: "2px 8px", borderRadius: "4px", fontFamily: "monospace" }}>
                                                {p.code}
                                            </strong>
                                        </td>
                                        <td style={td}>{p.description || "—"}</td>
                                        <td style={td}>
                                            <span style={{
                                                padding: "2px 8px", borderRadius: "4px", fontSize: "12px", fontWeight: 600,
                                                background: p.discountType === "PERCENT" ? "#cfe2ff" : "#d1e7dd",
                                                color: p.discountType === "PERCENT" ? "#084298" : "#0f5132"
                                            }}>
                                                {p.discountType === "PERCENT" ? "%" : "Cố định"}
                                            </span>
                                        </td>
                                        <td style={{ ...td, fontWeight: 700, color: "#dc3545" }}>{formatValue(p)}</td>
                                        <td style={td}>{p.minOrderValue ? `${Number(p.minOrderValue).toLocaleString("vi-VN")}đ` : "—"}</td>
                                        <td style={td}>{p.startDate || "—"}</td>
                                        <td style={td}>{p.endDate || "—"}</td>
                                        <td style={td}>
                                            <span
                                                onClick={() => handleToggle(p.id)}
                                                style={{
                                                    cursor: "pointer", padding: "3px 10px", borderRadius: "12px", fontSize: "12px", fontWeight: 600,
                                                    background: p.active ? "#d4edda" : "#f8d7da",
                                                    color: p.active ? "#155724" : "#721c24"
                                                }}
                                            >
                                                {p.active ? "✅ Đang bật" : "❌ Tắt"}
                                            </span>
                                        </td>
                                        <td style={td}>
                                            <button onClick={() => openEdit(p)} style={btn("#0d6efd", "sm")}>Sửa</button>
                                            {" "}
                                            <button onClick={() => handleDelete(p.id)} style={btn("#dc3545", "sm")}>Xóa</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* MODAL */}
            {showModal && (
                <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.4)", zIndex: 2000, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ background: "#fff", borderRadius: "10px", padding: "28px", width: "480px", boxShadow: "0 8px 32px rgba(0,0,0,0.2)" }}>
                        <h4 style={{ marginTop: 0 }}>{editItem ? "✏️ Sửa mã" : "➕ Thêm mã giảm giá"}</h4>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                            <div style={{ gridColumn: "1/-1" }}>
                                <label style={lbl}>Mã giảm giá *</label>
                                <input value={form.code} onChange={e => setForm({ ...form, code: e.target.value.toUpperCase() })} style={inp} placeholder="VD: SALE20" />
                            </div>
                            <div style={{ gridColumn: "1/-1" }}>
                                <label style={lbl}>Mô tả</label>
                                <input value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} style={inp} placeholder="Giảm 20% cho đơn từ 200k" />
                            </div>
                            <div>
                                <label style={lbl}>Loại giảm *</label>
                                <select value={form.discountType} onChange={e => setForm({ ...form, discountType: e.target.value })} style={inp}>
                                    <option value="PERCENT">Phần trăm (%)</option>
                                    <option value="FIXED">Cố định (đồng)</option>
                                </select>
                            </div>
                            <div>
                                <label style={lbl}>Giá trị giảm *</label>
                                <input type="number" value={form.discountValue} onChange={e => setForm({ ...form, discountValue: e.target.value })} style={inp}
                                    placeholder={form.discountType === "PERCENT" ? "VD: 20" : "VD: 50000"} />
                            </div>
                            <div>
                                <label style={lbl}>Đơn tối thiểu (đ)</label>
                                <input type="number" value={form.minOrderValue} onChange={e => setForm({ ...form, minOrderValue: e.target.value })} style={inp} placeholder="VD: 200000" />
                            </div>
                            <div>
                                <label style={lbl}>Trạng thái</label>
                                <select value={form.active} onChange={e => setForm({ ...form, active: e.target.value === "true" })} style={inp}>
                                    <option value="true">Đang bật</option>
                                    <option value="false">Tắt</option>
                                </select>
                            </div>
                            <div>
                                <label style={lbl}>Từ ngày</label>
                                <input type="date" value={form.startDate} onChange={e => setForm({ ...form, startDate: e.target.value })} style={inp} />
                            </div>
                            <div>
                                <label style={lbl}>Đến ngày</label>
                                <input type="date" value={form.endDate} onChange={e => setForm({ ...form, endDate: e.target.value })} style={inp} />
                            </div>
                        </div>

                        <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end", marginTop: "20px" }}>
                            <button onClick={() => setShowModal(false)} style={btn("#6c757d")}>Hủy</button>
                            <button onClick={handleSave} style={btn("#f5a623")}>Lưu</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

const td = { padding: "10px 14px", borderBottom: "1px solid #f0f0f0" };
const lbl = { display: "block", marginBottom: "4px", fontWeight: 600, fontSize: "13px" };
const inp = { width: "100%", padding: "8px 10px", borderRadius: "6px", border: "1px solid #ddd", boxSizing: "border-box" };
const btn = (bg, size) => ({
    padding: size === "sm" ? "4px 10px" : "8px 20px",
    background: bg, color: "#fff", border: "none", borderRadius: "6px",
    cursor: "pointer", fontWeight: 600, fontSize: size === "sm" ? "12px" : "14px"
});

export default PromotionsAdmin;