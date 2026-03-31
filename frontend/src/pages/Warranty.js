function Warranty() {
    return (
        <div className="container mt-4">

            <h2 className="mb-4">Chính sách bảo hành</h2>

            {/* 1 */}
            <h5>1. Quy định chung</h5>
            <ul>
                <li>Sản phẩm phải còn trong thời hạn bảo hành.</li>
                <li>Có hóa đơn mua hàng hoặc thông tin đơn hàng.</li>
                <li>Sản phẩm không bị hư hỏng do người dùng.</li>
            </ul>

            {/* 2 */}
            <h5>2. Quy định về hình thức</h5>
            <ul>
                <li>Khách mua tại cửa hàng cần kiểm tra sản phẩm trước khi thanh toán.</li>
                <li>Khách nhận hàng từ shipper cần kiểm tra ngay khi nhận.</li>
                <li>Shop không chịu trách nhiệm nếu lỗi hình thức sau khi đã nhận hàng.</li>
            </ul>

            {/* 3 */}
            <h5>3. Quy định về chức năng</h5>
            <ul>
                <li>Bảo hành các lỗi kỹ thuật từ nhà sản xuất.</li>
                <li>Không bảo hành nếu sản phẩm bị rơi, vỡ, vào nước.</li>
                <li>Sản phẩm được hỗ trợ test trong 7 ngày.</li>
            </ul>

            {/* 4 */}
            <h5>4. Phương thức bảo hành</h5>
            <ul>
                <li>Đổi sản phẩm nếu đủ điều kiện.</li>
                <li>Thời gian xử lý từ 1–7 ngày.</li>
                <li>Không hoàn tiền, chỉ đổi sản phẩm tương đương.</li>
            </ul>

            <hr />

            <h5>Lưu ý</h5>
            <ul>
                <li>Vui lòng giữ hóa đơn khi mua hàng.</li>
                <li>Liên hệ hotline khi có vấn đề.</li>
            </ul>

            <p>
                📞 Hotline: 0368751160
            </p>

        </div>
    );
}

export default Warranty;