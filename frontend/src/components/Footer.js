import { Link } from "react-router-dom";

function Footer() {
    return (
        <div style={{ background: "#f5a623", marginTop: "50px" }}>

            <div className="container py-5">
                <div className="row">

                    {/* LEFT */}
                    {/* LEFT */}
                    <div className="col-md-6">

                        <div className="row">

                            {/* CHĂM SÓC */}
                            <div className="col-md-6">
                                <h5>CHĂM SÓC KHÁCH HÀNG</h5>
                                <p>
                                    Tư vấn bán hàng (8h - 20h)<br/>
                                    Hotline: 0368751160
                                </p>

                                <p>
                                    Đổi trả & báo lỗi<br/>
                                    Hotline: 0359203537
                                </p>
                            </div>

                            {/* LIÊN KẾT */}
                            <div className="col-md-6">
                                <h5>LIÊN KẾT</h5>

                                <div className="d-flex gap-3">

                                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                                        <i className="fa-brands fa-facebook" style={{ fontSize: "30px" }}></i>
                                    </a>

                                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                                        <i className="fa-brands fa-instagram" style={{ fontSize: "30px", color: "#e1306c" }}></i>
                                    </a>

                                    <a href="https://google.com" target="_blank" rel="noopener noreferrer">
                                        <i className="fa-brands fa-google" style={{ fontSize: "30px", color: "#db4437" }}></i>
                                    </a>

                                </div>
                            </div>

                        </div>

                    </div>

                    {/* RIGHT */}
                    <div className="col-md-6">

                        <div className="row">

                            {/* THÔNG TIN */}
                            <div className="col-md-4">
                                <h5>THÔNG TIN</h5>
                                <Link to="/about" style={{ textDecoration: "none", color: "black", display: "block" }}>Giới thiệu</Link>
                                <Link to="/contact" style={{ textDecoration: "none", color: "black", display: "block" }}>Liên hệ</Link>
                            </div>

                            {/* CHÍNH SÁCH */}
                            <div className="col-md-4">
                                <h5>CHÍNH SÁCH</h5>
                                <Link to="/warranty" style={{ display: "block", textDecoration: "none", color: "black" }}>Chính sách bảo hành</Link>
                                <Link to="/privacy" style={{ display: "block", textDecoration: "none", color: "#000" }}>Chính sách bảo mật</Link>
                            </div>

                            {/* ĐỊA CHỈ */}
                            <div className="col-md-4">
                                <h5>ĐỊA CHỈ</h5>
                                <a
                                    href="https://maps.app.goo.gl/MV8q3ApCipUMX6fD7"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ textDecoration: "none", color: "black" }}
                                >
                                    Trường Đại học Nông Lâm TP. Hồ Chí Minh
                                </a>
                            </div>

                        </div>

                    </div>

                </div>
            </div>

            {/* COPYRIGHT */}
            <div style={{ background: "#eee", textAlign: "center", padding: "10px" }}>
                © BaDaShop Gaming
            </div>

        </div>
    );
}

export default Footer;