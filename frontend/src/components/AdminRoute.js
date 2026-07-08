import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {
    const user = JSON.parse(localStorage.getItem("user"));

    // Chưa login → về trang login
    if (!user) {
        return <Navigate to="/login" />;
    }

    // Đã login nhưng không phải ADMIN → về trang chủ
    if (user.role !== "ADMIN") {
        return <Navigate to="/" />;
    }

    // Là ADMIN → cho vào
    return children;
}

export default AdminRoute;