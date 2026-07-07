import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {

    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        if (!username || !password) {
            alert("Vui lòng nhập đầy đủ thông tin!");
            return;
        }

        try {
            const res = await axios.post("http://localhost:8081/api/auth/login", {
                username,
                password
            });

            if (res.data && res.data.id) {
                // ✅ Lưu token riêng
                localStorage.setItem("token", res.data.token);

                // ✅ Lưu user info (bỏ token ra để gọn)
                const { token, ...userInfo } = res.data;
                localStorage.setItem("user", JSON.stringify(userInfo));

                alert("Đăng nhập thành công!");
                navigate("/");

            } else {
                alert("Sai tài khoản hoặc mật khẩu!");
            }

        } catch (err) {
            console.error(err);
            alert("Sai tài khoản hoặc mật khẩu!");
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <div className="card p-4 shadow">
                        <h3 className="text-center mb-3">Đăng nhập</h3>

                        <input
                            type="text"
                            placeholder="Username"
                            className="form-control mb-3"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            className="form-control mb-3"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <button
                            className="btn btn-primary w-100 mb-3"
                            onClick={handleLogin}
                        >
                            Đăng nhập
                        </button>

                        <div className="text-center">
                            Chưa có tài khoản?{" "}
                            <Link to="/register">Đăng ký</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;