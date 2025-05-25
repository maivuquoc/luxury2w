import { Link } from "react-router-dom";
import logo from "../../assets/image/logo.webp";

const Footer = () => {
    return (
        <footer className="bg-footer text-dark py-5">
            <div className="container">
                <div className="row gy-4">
                    <div className="col-md-3">
                        <img src={logo} className="img-fluid mb-3" alt="Logo" />
                        <ul className="list-unstyled">
                            <li className="mb-2"><i className="fa-solid fa-location-dot me-2"></i>Địa chỉ: 70 Lu Gia, District 11, Ho Chi Minh City.</li>
                            <li className="mb-2"><i className="fa-solid fa-mobile me-2"></i>Số điện thoại: 0966200317</li>
                            <li className="mb-2"><i className="fa-solid fa-envelope me-2"></i>Email: vuquoc1906@gmail.com</li>
                        </ul>
                        <p className="mt-4 small text-muted">© Bản quyền thuộc về <strong>Vũ Quốc</strong> | Cung cấp bởi <span className="text-primary">Mai Vũ Quốc</span></p>
                    </div>

                    <div className="col-md-3">
                        <h5 className="fw-bold mb-3">CHÍNH SÁCH</h5>
                        <ul className="list-unstyled">
                            <Link to="policyproduct">
                                <li className="mb-2">Bảo hành sản phẩm</li>
                            </Link>
                            <Link to="policysell">
                                <li className="mb-2">Chính sách bán hàng</li>
                            </Link>
                            <Link to="policydelivery">
                                <li className="mb-2">Chính sách giao hàng</li>
                            </Link>
                            <Link to="policyreturn">
                                <li className="mb-2">Chính sách đổi trả</li>
                            </Link> 
                        </ul>
                    </div>

                    <div className="col-md-3">
                        <h5 className="fw-bold mb-3">HỖ TRỢ KHÁCH HÀNG</h5>
                        <ul className="list-unstyled">
                            <Link to="supportservice">
                                <li className="mb-2">Điều khoản dịch vụ</li>
                            </Link>
                            <Link to="storelocator">
                                <li className="mb-2">Hệ thống cửa hàng</li>
                            </Link>
                            <Link to="faqpage">
                                <li className="mb-2">Câu hỏi thường gặp</li>
                            </Link>
                            <Link to="contact">
                                <li className="mb-2">Liên hệ</li>
                            </Link>
                        </ul>
                    </div>

                    <div className="col-md-3">
                        <h5 className="fw-bold mb-3">ĐĂNG KÝ NHẬN TIN</h5>
                        <p>Bạn có muốn nhận khuyến mãi đặc biệt? Đăng ký ngay.</p>
                        <form className="d-flex mb-3">
                            <input
                                type="email"
                                className="form-control rounded-start"
                                placeholder="Nhập địa chỉ email"
                            />
                            <Link to="register">
                                <button className="btn btn-dark rounded-end px-4" type="submit">Đăng ký</button>
                            </Link>
                        </form>

                        <div className="d-flex gap-2">
                            <img src="/assets/image/facebook.png" width="32" alt="Facebook" />
                            <img src="/assets/image/zalo.png" width="32" alt="Zalo" />
                            <img src="/assets/image/instagram.png" width="32" alt="Instagram" />
                            <img src="/assets/image/youtube.png" width="32" alt="YouTube" />
                            <img src="/assets/image/tiktok.png" width="32" alt="TikTok" />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;