import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Profile() {

    const navigate = useNavigate();

    const [tab, setTab] = useState("profile");

    const [user, setUser] = useState({
        username: "",
        email: "",
        phone: "",
        name: "",
        gender: "",
        birthday: ""
    });

    const [avatar, setAvatar] = useState("https://via.placeholder.com/120");

    // load dữ liệu
    useEffect(() => {
        const savedUser = JSON.parse(localStorage.getItem("user"));
        const savedAvatar = localStorage.getItem("avatar");

        if (savedUser) setUser(savedUser);
        if (savedAvatar) setAvatar(savedAvatar);
    }, []);

    // change input
    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    // chọn ảnh
    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = () => {
                setAvatar(reader.result);
                localStorage.setItem("avatar", reader.result);
            };

            reader.readAsDataURL(file);
        }
    };

    // lưu user
    const handleSave = () => {

        axios.put(`http://localhost:8081/api/users/${user.id}`, user)
            .then(res => {

                localStorage.setItem("user", JSON.stringify(res.data));

                alert("Lưu thành công!");
            })
            .catch(err => console.log(err));

    };

    return (
        <div className="container mt-4">

            <div className="row">

                {/* SIDEBAR */}
                <div className="col-md-3 border-end">

                    <div className="text-center mb-3">
                        <img
                            src={avatar}
                            className="rounded-circle mb-2"
                            style={{
                                width: "100px",
                                height: "100px",
                                objectFit: "contain",
                                background: "#fff"
                            }}
                        />
                    </div>

                    <div className="mt-3">

                        <b>Tài Khoản Của Tôi</b>

                        <div style={{ marginLeft: "10px" }}>

                            <div
                                style={{ color: tab === "profile" ? "red" : "", cursor: "pointer" }}
                                onClick={() => setTab("profile")}
                            >
                                Hồ sơ
                            </div>

                            <div
                                style={{ color: tab === "bank" ? "red" : "", cursor: "pointer" }}
                                onClick={() => setTab("bank")}
                            >
                                Ngân hàng
                            </div>

                            <div
                                style={{ color: tab === "address" ? "red" : "", cursor: "pointer" }}
                                onClick={() => setTab("address")}
                            >
                                Địa chỉ
                            </div>

                            <div
                                style={{ color: tab === "password" ? "red" : "", cursor: "pointer" }}
                                onClick={() => setTab("password")}
                            >
                                Đổi mật khẩu
                            </div>

                        </div>

                        <div
                            className="mt-3"
                            style={{ cursor: "pointer" }}
                            onClick={() => navigate("/orders")}
                        >Đơn Mua</div>

                    </div>

                </div>

                {/* CONTENT */}
                <div className="col-md-9">

                    {/* PROFILE */}
                    {tab === "profile" && (
                        <>
                            <h4>Hồ sơ của tôi</h4>

                            <div className="row mt-3">

                                {/* FORM */}
                                <div className="col-md-8">

                                    <div className="mb-3">
                                        <label>Tên đăng nhập</label>
                                        <input className="form-control" value={user.username} disabled />
                                    </div>

                                    <div className="mb-3">
                                        <label>Tên</label>
                                        <input
                                            className="form-control"
                                            name="name"
                                            value={user.name || ""}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label>Email</label>
                                        <input className="form-control" value={user.email} disabled />
                                    </div>

                                    <div className="mb-3">
                                        <label>Số điện thoại</label>
                                        <input
                                            className="form-control"
                                            name="phone"
                                            value={user.phone || ""}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label>Giới tính</label><br />
                                        <input type="radio" name="gender" value="Nam" checked={user.gender === "Nam"} onChange={handleChange}/> Nam
                                        <input type="radio" name="gender" value="Nữ" className="ms-3" checked={user.gender === "Nữ"} onChange={handleChange}/> Nữ
                                        <input type="radio" name="gender" value="Khác" className="ms-3" checked={user.gender === "Khác"} onChange={handleChange}/> Khác
                                    </div>

                                    <div className="mb-3">
                                        <label>Ngày sinh</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            name="birthday"
                                            value={user.birthday || ""}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <button className="btn btn-warning" onClick={handleSave}>
                                        Lưu
                                    </button>

                                </div>

                                {/* AVATAR */}
                                <div className="col-md-4 d-flex flex-column align-items-center">

                                    <img
                                        src={avatar}
                                        className="rounded-circle mb-2"
                                        style={{
                                            width: "120px",
                                            height: "120px",
                                            objectFit: "contain",
                                            background: "#fff"
                                        }}
                                    />

                                    <input
                                        type="file"
                                        id="fileInput"
                                        style={{ display: "none" }}
                                        onChange={handleImageChange}
                                    />

                                    <button
                                        className="btn btn-outline-secondary btn-sm mt-2"
                                        onClick={() => document.getElementById("fileInput").click()}
                                    >
                                        Chọn ảnh
                                    </button>

                                    <div style={{ fontSize: "12px", color: "#888", marginTop: "5px", textAlign: "center" }}>
                                        JPG, PNG - tối đa 1MB
                                    </div>

                                </div>

                            </div>
                        </>
                    )}

                    {/* BANK */}
                    {tab === "bank" && (
                        <>
                            <h4>Ngân hàng</h4>

                            <input className="form-control mb-2" placeholder="Số tài khoản" />
                            <input className="form-control mb-2" placeholder="Tên ngân hàng" />

                            <button className="btn btn-warning">Lưu</button>
                        </>
                    )}

                    {/* ADDRESS */}
                    {tab === "address" && (
                        <>
                            <h4>Địa chỉ</h4>

                            <input className="form-control mb-2" placeholder="Địa chỉ" />

                            <button className="btn btn-warning">Lưu</button>
                        </>
                    )}

                    {/* PASSWORD */}
                    {tab === "password" && (
                        <>
                            <h4>Đổi mật khẩu</h4>

                            <input type="password" className="form-control mb-2" placeholder="Mật khẩu cũ" />
                            <input type="password" className="form-control mb-2" placeholder="Mật khẩu mới" />

                            <button className="btn btn-warning">Đổi mật khẩu</button>
                        </>
                    )}

                </div>

            </div>

        </div>
    );
}

export default Profile;