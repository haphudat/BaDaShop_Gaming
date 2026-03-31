function Contact() {
    return (
        <div className="container mt-4">

            <div className="row">

                {/* LEFT */}
                <div className="col-md-6">

                    <h2 style={{ color: "green" }}>LIÊN HỆ VỚI BaDaShop</h2>

                    <h5 className="mt-3">ĐỊA CHỈ CỬA HÀNG</h5>
                    <p>📍 Khu phố 33, Phường Linh Xuân, TP. Hồ Chí Minh</p>

                    <h5 className="mt-3">THỜI GIAN LÀM VIỆC</h5>
                    <p>8h30 - 19h00 (Thứ 2 - Thứ 7)</p>
                    <p>8h30 - 16h30 (Chủ nhật)</p>

                    <p>📞 Hotline: 0368751160</p>

                </div>

                {/* RIGHT */}
                <div className="col-md-6">

                    <div className="row mb-3">
                        <div className="col">
                            <input className="form-control" placeholder="Họ và tên" />
                        </div>
                        <div className="col">
                            <input className="form-control" placeholder="Email" />
                        </div>
                    </div>

                    <textarea
                        className="form-control mb-3"
                        placeholder="Nội dung"
                        rows="5"
                    ></textarea>

                    <button className="btn btn-success">
                        Gửi liên hệ
                    </button>

                </div>

            </div>

            {/* MAP */}
            <div className="mt-4">

                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.214525516547!2d106.7891814107942!3d10.871281657391863!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175276398969f7b%3A0x9672b7efd0893fc4!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBOw7RuZyBMw6JtIFRQLiBI4buTIENow60gTWluaA!5e0!3m2!1svi!2sus!4v1774668584657!5m2!1svi!2sus"
                    width="100%"
                    height="400"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>

            </div>

        </div>
    );
}

export default Contact;