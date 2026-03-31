function Privacy() {
    return (
        <div className="container mt-4">

            <h2 className="mb-4">Chính sách bảo mật</h2>

            {/* 1 */}
            <h5>1. Mục đích và phạm vi thu thập</h5>
            <p>
                BaDaShop Gaming thu thập các thông tin cần thiết của khách hàng như:
                họ tên, email, số điện thoại và địa chỉ nhằm phục vụ cho việc đặt hàng
                và giao hàng.
            </p>

            {/* 2 */}
            <h5>2. Phạm vi sử dụng thông tin</h5>
            <ul>
                <li>Xử lý đơn hàng và giao hàng cho khách.</li>
                <li>Liên hệ hỗ trợ khách hàng khi cần thiết.</li>
                <li>Cung cấp thông tin về sản phẩm và khuyến mãi.</li>
            </ul>

            {/* 3 */}
            <h5>3. Thời gian lưu trữ thông tin</h5>
            <p>
                Thông tin khách hàng sẽ được lưu trữ cho đến khi khách hàng yêu cầu xóa
                hoặc ngừng sử dụng dịch vụ.
            </p>

            {/* 4 */}
            <h5>4. Đơn vị thu thập và quản lý thông tin</h5>
            <ul>
                <li>Tên: BaDaShop Gaming</li>
                <li>Địa chỉ: TP. Hồ Chí Minh</li>
                <li>Email: badashop@gmail.com</li>
            </ul>

            {/* 5 */}
            <h5>5. Quyền của khách hàng</h5>
            <p>
                Khách hàng có thể yêu cầu chỉnh sửa hoặc xóa thông tin cá nhân của mình
                bằng cách liên hệ với cửa hàng.
            </p>

            {/* 6 */}
            <h5>6. Cam kết bảo mật</h5>
            <ul>
                <li>Không chia sẻ thông tin khách hàng cho bên thứ ba.</li>
                <li>Bảo mật thông tin bằng các biện pháp an toàn.</li>
                <li>Chỉ sử dụng thông tin cho mục đích phục vụ khách hàng.</li>
            </ul>

        </div>
    );
}

export default Privacy;