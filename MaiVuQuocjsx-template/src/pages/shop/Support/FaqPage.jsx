import React from "react";
import { Link } from "react-router-dom";

const FaqPage = () => {
    return (
        <div>
            <section>
                <div className="bg-body-tertiary">
                    <div className="container">
                        <div className="row">
                            <ul className="breadcrumb m-0 px-0 py-2">
                                <li className="home">
                                    <Link to="/"><span>Trang chủ</span></Link>
                                    <span className="mx-1">/</span>
                                </li>
                                <li><strong><span>Câu hỏi thường gặp</span></strong></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            <div className="container py-5">
                <div className="row g-4">
                    {/* Cột bên trái: Câu hỏi thường gặp */}
                    <div className="col-md-7">
                        <h3 className="fw-bold mb-4" style={{ borderLeft: "4px solid orange", paddingLeft: "10px" }}>
                            Câu hỏi thường gặp
                        </h3>
                        <ul className="list-unstyled">
                            <li className="d-flex justify-content-between align-items-center border-bottom py-3">
                                <span>1. Tôi cần tạo tài khoản EGA Luxury để mua hàng không?</span>
                                <span className="text-orange fw-bold fs-4">+</span>
                            </li>
                            <li className="d-flex justify-content-between align-items-center border-bottom py-3">
                                <span>2. Giá của bạn thấp hơn các thợ kim hoàn khác như thế nào?</span>
                                <span className="text-orange fw-bold fs-4">+</span>
                            </li>
                            <li className="d-flex justify-content-between align-items-center border-bottom py-3">
                                <span>3. Bảo hành trọn đời là gì?</span>
                                <span className="text-orange fw-bold fs-4">+</span>
                            </li>
                            <li className="d-flex justify-content-between align-items-center border-bottom py-3">
                                <span>4. Mất bao lâu để nhận được đơn hàng của tôi? Bạn có thể gửi cùng một ngày?</span>
                                <span className="text-orange fw-bold fs-4">+</span>
                            </li>
                            <li className="d-flex justify-content-between align-items-center border-bottom py-3">
                                <span>5. Điều gì xảy ra nếu chiếc nhẫn của tôi không vừa?</span>
                                <span className="text-orange fw-bold fs-4">+</span>
                            </li>
                        </ul>
                    </div>

                    {/* Cột bên phải: Gửi thắc mắc */}
                    <div className="col-md-5">
                        <div className="bg-light p-4 rounded shadow-sm">
                            <h5 className="mb-4 text-center fw-semibold">Gửi thắc mắc cho chúng tôi</h5>
                            <div>
                                <div className="mb-3">
                                    <input type="text" className="form-control" placeholder="Tên của bạn" disabled />
                                </div>
                                <div className="mb-3">
                                    <input type="email" className="form-control" placeholder="Email của bạn" disabled />
                                </div>
                                <div className="mb-3">
                                    <input type="text" className="form-control" placeholder="Số điện thoại của bạn" disabled />
                                </div>
                                <div className="mb-3">
                                    <textarea className="form-control" rows="3" placeholder="Nội dung" disabled></textarea>
                                </div>
                                <button type="button" className="btn btn-dark w-100 text-uppercase fw-bold" disabled>
                                    Gửi cho chúng tôi
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FaqPage;
