import { useEffect, useState } from "react";
import axios from "../../axiosConfig";

const API = "http://localhost:8081/api/users";

function UsersAdmin() {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [filterRole, setFilterRole] = useState("");

    useEffect(() => {
        axios.get(API)
            .then(res => setUsers(res.data))
            .catch(err => console.log(err));
    }, []);

    const handleDelete = (id) => {
        if (!window.confirm("Xóa user này?")) return;
        axios.delete(`${API}/${id}`)
            .then(() => setUsers(users.filter(u => u.id !== id)))
            .catch(err => console.log(err));
    };

    const handleRoleChange = (id, newRole) => {
        axios.put(`${API}/${id}/role`, { role: newRole })
            .then(res => {
                setUsers(users.map(u => u.id === res.data.id ? res.data : u));
            })
            .catch(err => console.log(err));
    };

    const filtered = users.filter(u => {
        const matchSearch =
            (u.username || "").toLowerCase().includes(search.toLowerCase()) ||
            (u.email || "").toLowerCase().includes(search.toLowerCase()) ||
            (u.name || "").toLowerCase().includes(search.toLowerCase());
        const matchRole = filterRole ? u.role === filterRole : true;
        return matchSearch && matchRole;
    });

    return (
        <div className="container mt-4">
            <h4 className="mb-3">👤 Quản lý người dùng</h4>

            {/* TOOLBAR */}
            <div className="d-flex gap-2 mb-3">
                <input
                    className="form-control"
                    style={{ width: "300px" }}
                    placeholder="Tìm theo tên, username, email..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
                <select
                    className="form-select"
                    style={{ width: "160px" }}
                    value={filterRole}
                    onChange={e => setFilterRole(e.target.value)}
                >
                    <option value="">Tất cả role</option>
                    <option value="USER">USER</option>
                    <option value="ADMIN">ADMIN</option>
                </select>
                <span className="ms-auto text-muted align-self-center">
                    {filtered.length} người dùng
                </span>
            </div>

            {/* TABLE */}
            <table className="table table-bordered table-hover align-middle">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Họ tên</th>
                        <th>Email</th>
                        <th>SĐT</th>
                        <th>Giới tính</th>
                        <th>Ngày sinh</th>
                        <th>Role</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {filtered.length === 0 ? (
                        <tr>
                            <td colSpan="9" className="text-center text-muted">
                                Không có người dùng nào
                            </td>
                        </tr>
                    ) : filtered.map(u => (
                        <tr key={u.id}>
                            <td>{u.id}</td>
                            <td><strong>{u.username}</strong></td>
                            <td>{u.name || "—"}</td>
                            <td>{u.email || "—"}</td>
                            <td>{u.phone || "—"}</td>
                            <td>{u.gender || "—"}</td>
                            <td>{u.birthday || "—"}</td>
                            <td>
                                <select
                                    className={`form-select form-select-sm ${u.role === "ADMIN" ? "text-danger fw-bold" : ""}`}
                                    style={{ width: "100px" }}
                                    value={u.role}
                                    onChange={e => handleRoleChange(u.id, e.target.value)}
                                >
                                    <option value="USER">USER</option>
                                    <option value="ADMIN">ADMIN</option>
                                </select>
                            </td>
                            <td>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDelete(u.id)}
                                    disabled={u.role === "ADMIN"}
                                    title={u.role === "ADMIN" ? "Không thể xóa ADMIN" : "Xóa"}
                                >
                                    🗑 Xóa
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UsersAdmin;