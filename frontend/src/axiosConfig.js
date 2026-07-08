import axios from "axios";

// Tự động gắn token vào header mỗi request
axios.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
});

// Tự động xử lý lỗi 401/403
axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            // Xóa thông tin cũ
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            // Redirect về login
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default axios;