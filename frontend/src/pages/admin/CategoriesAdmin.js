import { useState, useEffect } from "react";

const API = "http://localhost:8081/api/categories";

const emptyForm = { name: "", description: "" };

function CategoriesAdmin() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const [form, setForm] = useState(emptyForm);
    const [search, setSearch] = useState("");
    const [msg, setMsg] = useState(null);
    const [products, setProducts] = useState([]);
    const [showProducts, setShowProducts] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("");

    useEffect(() => { fetchData(); }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await fetch(API);
            const data = await res.json();
            setCategories(data);
        } catch {
            setMsg({ type: "error", text: "Không thể kết nối API!" });
        } finally {
            setLoading(false);
        }
    };

    const openAdd = () => {
        setEditItem(null);
        setForm(emptyForm);
        setShowModal(true);
    };

    const openEdit = (item) => {
        setEditItem(item);
        setForm(item);
        setShowModal(true);
    };

    const handleSave = async () => {
        try {
            const method = editItem ? "PUT" : "POST";
            const url = editItem ? `${API}/${editItem.id}` : API;
            await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            });
            setMsg({ type: "success", text: editItem ? "Cập nhật thành công!" : "Thêm thành công!" });
            setShowModal(false);
            fetchData();
        } catch {
            setMsg({ type: "error", text: "Lỗi khi lưu!" });
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Xác nhận xóa danh mục này?")) return;
        try {
            await fetch(`${API}/${id}`, { method: "DELETE" });
            setMsg({ type: "success", text: "Xóa thành công!" });
            fetchData();
        } catch {
            setMsg({ type: "error", text: "Lỗi khi xóa!" });
        }
    };
    const handleViewProducts = async (categoryName) => {
        try {
            const res = await fetch(
                `http://localhost:8081/api/products/category/${categoryName}`
            );

            const data = await res.json();

            setProducts(data);
            setSelectedCategory(categoryName);
            setShowProducts(true);

        } catch {
            setMsg({
                type: "error",
                text: "Không tải được sản phẩm!"
            });
        }
    };

    const filtered = categories.filter(c =>
        c.name?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div style={{ padding: "24px", fontFamily: "'Segoe UI', sans-serif", background: "#f8f9fa", minHeight: "100vh" }}>
            <div style={{ maxWidth: "900px", margin: "0 auto" }}>

                {/* HEADER */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
                    <h2 style={{ margin: 0, fontSize: "24px", fontWeight: 700 }}>📂 Quản lý danh mục</h2>
                    <button onClick={openAdd} style={btnStyle("#f5a623")}>+ Thêm danh mục</button>
                </div>

                {/* THÔNG BÁO */}
                {msg && (
                    <div style={{
                        padding: "10px 16px", borderRadius: "6px", marginBottom: "16px",
                        background: msg.type === "success" ? "#d4edda" : "#f8d7da",
                        color: msg.type === "success" ? "#155724" : "#721c24"
                    }}>
                        {msg.text}
                        <button onClick={() => setMsg(null)} style={{ float: "right", background: "none", border: "none", cursor: "pointer" }}>✕</button>
                    </div>
                )}

                {/* SEARCH */}
                <input
                    placeholder="🔍 Tìm danh mục..."
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
                                    {["ID", "Tên danh mục", "Mô tả", "Thao tác"].map(h => (
                                        <th key={h} style={thStyle}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.length === 0 ? (
                                    <tr><td colSpan={4} style={{ textAlign: "center", padding: "24px", color: "#888" }}>Không có dữ liệu</td></tr>
                                ) : filtered.map((c, i) => (
                                    <tr key={c.id} style={{ background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                                        <td style={tdStyle}>{c.id}</td>
                                        <td style={tdStyle}>{c.name}</td>
                                        <td style={tdStyle}>{c.description}</td>
                                        <td style={tdStyle}>

                                            <button
                                                onClick={() => handleViewProducts(c.name)}
                                                style={btnStyle("#198754", "sm")}>Xem sản phẩm</button>
                                            {" "}
                                            <button
                                                onClick={() => openEdit(c)}
                                                style={btnStyle("#0d6efd", "sm")}>Sửa</button>
                                            {" "}
                                            <button
                                                onClick={() => handleDelete(c.id)}
                                                style={btnStyle("#dc3545", "sm")}>Xóa</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {showProducts && (
                <div style={overlayStyle}>
                    <div style={{
                        background: "#fff",
                        borderRadius: "10px",
                        padding: "24px",
                        width: "700px",
                        maxHeight: "80vh",
                        overflowY: "auto"
                    }}>

                        <h4>
                            📦 Sản phẩm thuộc danh mục: {selectedCategory}
                        </h4>

                        {products.length === 0 ? (
                            <p>Không có sản phẩm nào.</p>
                        ) : (
                            <table
                                style={{
                                    width: "100%",
                                    borderCollapse: "collapse"
                                }}
                            >
                                <thead>
                                <tr>
                                    <th style={thStyle}>ID</th>
                                    <th style={thStyle}>Tên sản phẩm</th>
                                    <th style={thStyle}>Hãng</th>
                                    <th style={thStyle}>Giá</th>
                                    <th style={thStyle}>Tồn kho</th>
                                </tr>
                                </thead>

                                <tbody>
                                {products.map(product => (
                                    <tr key={product.id}>
                                        <td style={tdStyle}>{product.id}</td>
                                        <td style={tdStyle}>{product.name}</td>
                                        <td style={tdStyle}>{product.brand}</td>
                                        <td style={tdStyle}>
                                            {Number(product.price).toLocaleString()}đ
                                        </td>
                                        <td style={tdStyle}>{product.stock}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        )}

                        <div
                            style={{
                                marginTop: "16px",
                                textAlign: "right"
                            }}
                        >
                            <button
                                onClick={() => setShowProducts(false)}
                                style={btnStyle("#6c757d")}
                            >
                                Đóng
                            </button>
                        </div>

                    </div>
                </div>
            )}

            {/* MODAL */}
            {showModal && (
                <div style={overlayStyle}>
                    <div style={modalStyle}>
                        <h4 style={{ marginTop: 0 }}>{editItem ? "✏️ Sửa danh mục" : "➕ Thêm danh mục"}</h4>
                        {[
                            { label: "Tên danh mục", key: "name" },
                            { label: "Mô tả", key: "description" },
                        ].map(({ label, key }) => (
                            <div key={key} style={{ marginBottom: "12px" }}>
                                <label style={{ display: "block", marginBottom: "4px", fontWeight: 600 }}>{label}</label>
                                <input
                                    value={form[key] || ""}
                                    onChange={e => setForm({ ...form, [key]: e.target.value })}
                                    style={inputStyle}
                                />
                            </div>
                        ))}
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

export default CategoriesAdmin;