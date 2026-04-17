import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleRegister = async () => {

        // validate cơ bản
        if (!username || !email || !password) {
            alert("Vui lòng nhập đầy đủ thông tin!");
            return;
        }

        if (password !== confirmPassword) {
            alert("Mật khẩu không khớp!");
            return;
        }

        try {
            const res = await axios.post("http://localhost:8081/api/auth/register", {
                username: username,
                email: email,
                password: password,
                phone: phone
            });

            console.log(res.data);
            alert("Đăng ký thành công!");

            // chuyển sang login
            navigate("/login");

        } catch (err) {
            console.error(err);
            console.log(err.response);
            alert("Đăng ký thất bại!");
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-4">

                    <div className="card p-4 shadow">
                        <h3 className="text-center mb-3">Đăng ký</h3>

                        <input
                            type="text"
                            placeholder="Username"
                            className="form-control mb-3"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />

                        <input
                            type="email"
                            placeholder="Email"
                            className="form-control mb-3"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <input
                            type="text"
                            placeholder="Số điện thoại"
                            className="form-control mb-3"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            className="form-control mb-3"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <input
                            type="password"
                            placeholder="Confirm Password"
                            className="form-control mb-3"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />

                        <button
                            className="btn btn-primary w-100 mb-3"
                            onClick={handleRegister}
                        >
                            Đăng ký
                        </button>

                        <div className="text-center">
                            Đã có tài khoản?{" "}
                            <Link to="/login">Đăng nhập</Link>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}

export default Register;