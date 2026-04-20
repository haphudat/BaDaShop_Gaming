import { useState, useEffect } from "react";

const API = "http://localhost:8081/api/users";

function UsersAdmin() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const [form, setForm] = useState({ username: "", email: "", role: "USER", phone: "" });
    const [search, setSearch] = useState("");
    const [msg, setMsg] = useState(null);

    useEffect(() => { fetchData(); }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await fetch(API);
            const data = await res.json();
            setUsers(data);
        } catch { setMsg({ type: "error", text: "Không thể kết nối API!" }); }
        finally { setLoading(false); }
    };

    const openEdit = (item) => { setEditItem(item); setForm(item); setShowModal(true); };

    const handleSave = async () => {
        try {
            await fetch(`${API}/${editItem.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            });
            setMsg({ type: "success", text: "Cập nhật thành công!" });
            setShowModal(false);
            fetchData();
        } catch { setMsg({ type: "error", text: "Lỗi khi cập nhật!" }); }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Xác nhận xóa người dùng này?")) return;
        try {
            await fetch(`${API}/${id}`, { method: "DELETE" });
            setMsg({ type: "success", text: "Xóa thành công!" });
            fetchData();
        } catch { setMsg({ type: "error", text: "Lỗi khi xóa!" }); }
    };

    const filtered = users.filter(u =>
        u.username?.toLowerCase().includes(search.toLowerCase()) ||
        u.email?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div style={{ padding: "24px", fontFamily: "'Segoe UI', sans-serif", background: "#f8f9fa", minHeight: "100vh" }}>
            <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
                    <h2 style={{ margin: 0, fontSize: "24px", fontWeight: 700 }}>👥 Quản lý người dùng</h2>
                    <span style={{ color: "#888" }}>Tổng: {users.length} người dùng</span>
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
                    placeholder="🔍 Tìm theo tên, email..."
                    value={search} onChange={e => setSearch(e.target.value)}
                    style={{ padding: "8px 14px", borderRadius: "6px", border: "1px solid #ddd", width: "300px", marginBottom: "16px" }}
                />

                {loading ? <p>Đang tải...</p> : (
                    <div style={{ background: "#fff", borderRadius: "10px", boxShadow: "0 2px 8px rgba(0,0,0,0.08)", overflow: "hidden" }}>
                        <table style={{ width: "100%", borderCollapse: "collapse" }}>
                            <thead style={{ background: "#f5a623" }}>
                                <tr>
                                    {["ID", "Tên đăng nhập", "Email", "SĐT", "Vai trò", "Thao tác"].map(h => (
                                        <th key={h} style={thStyle}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.length === 0 ? (
                                    <tr><td colSpan={6} style={{ textAlign: "center", padding: "24px", color: "#888" }}>Không có dữ liệu</td></tr>
                                ) : filtered.map((u, i) => (
                                    <tr key={u.id} style={{ background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                                        <td style={tdStyle}>{u.id}</td>
                                        <td style={tdStyle}>{u.username}</td>
                                        <td style={tdStyle}>{u.email}</td>
                                        <td style={tdStyle}>{u.phone || "—"}</td>
                                        <td style={tdStyle}>
                                            <span style={{
                                                padding: "3px 10px", borderRadius: "12px", fontSize: "12px", fontWeight: 600,
                                                background: u.role === "ADMIN" ? "#fff3cd" : "#d1ecf1",
                                                color: u.role === "ADMIN" ? "#856404" : "#0c5460"
                                            }}>
                                                {u.role}
                                            </span>
                                        </td>
                                        <td style={tdStyle}>
                                            <button onClick={() => openEdit(u)} style={btnStyle("#0d6efd", "sm")}>Sửa</button>
                                            {" "}
                                            <button onClick={() => handleDelete(u.id)} style={btnStyle("#dc3545", "sm")}>Xóa</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {showModal && editItem && (
                <div style={overlayStyle}>
                    <div style={modalStyle}>
                        <h4 style={{ marginTop: 0 }}>✏️ Sửa người dùng</h4>
                        {[
                            { label: "Tên đăng nhập", key: "username" },
                            { label: "Email", key: "email" },
                            { label: "Số điện thoại", key: "phone" },
                        ].map(({ label, key }) => (
                            <div key={key} style={{ marginBottom: "12px" }}>
                                <label style={{ display: "block", marginBottom: "4px", fontWeight: 600 }}>{label}</label>
                                <input value={form[key] || ""} onChange={e => setForm({ ...form, [key]: e.target.value })} style={inputStyle} />
                            </div>
                        ))}
                        <div style={{ marginBottom: "12px" }}>
                            <label style={{ display: "block", marginBottom: "4px", fontWeight: 600 }}>Vai trò</label>
                            <select value={form.role || "USER"} onChange={e => setForm({ ...form, role: e.target.value })} style={inputStyle}>
                                <option value="USER">USER</option>
                                <option value="ADMIN">ADMIN</option>
                            </select>
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
const modalStyle = { background: "#fff", borderRadius: "10px", padding: "28px", width: "440px", boxShadow: "0 8px 32px rgba(0,0,0,0.2)" };
const inputStyle = { width: "100%", padding: "8px 12px", borderRadius: "6px", border: "1px solid #ddd", boxSizing: "border-box" };
const btnStyle = (bg, size) => ({
    padding: size === "sm" ? "4px 12px" : "8px 20px",
    background: bg, color: "#fff", border: "none", borderRadius: "6px",
    cursor: "pointer", fontWeight: 600, fontSize: size === "sm" ? "13px" : "14px"
});

export default UsersAdmin;