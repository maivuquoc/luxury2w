import { Link } from "react-router-dom";

const PolicySell = () => {
    return (
        <div>
            {/* Breadcrumb */}
            <section>
                <div className="bg-body-tertiary">
                    <div className="container">
                        <div className="row">
                            <ul className="breadcrumb m-0 px-0 py-2">
                                <li className="home">
                                    <Link to="/"><span>Trang chủ</span></Link>
                                    <span className="mx-1">/</span>
                                </li>
                                <li><strong><span>Chính sách bán hàng</span></strong></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Nội dung chính sách */}
            <section className="py-5">
                <div className="container">
                    <div className="heading-bar mb-4">
                        <h1 className="title_page">Chính sách bán hàng</h1>
                    </div>

                    <div className="content-page rte">
                        <section className="mb-4">
                            <h3 className="fw-bold">1. HÌNH THỨC THANH TOÁN</h3>
                            <p>Để thuận tiện nhất cho khách hàng mua sắm online với Luxury, chúng tôi hỗ trợ các hình thức thanh toán sau:</p>
                            <ul>
                                <li>Thanh toán tiền mặt khi giao hàng</li>
                                <li>Thanh toán trước bằng các hình thức:
                                    <ul>
                                        <li>Thẻ ATM Nội Địa</li>
                                        <li>Thẻ tín dụng / Thẻ ghi nợ / VISA / MASTER / JCB / AMEX</li>
                                        <li>Ví điện tử MOMO</li>
                                        <li>Ví điện tử Zalo Pay</li>
                                    </ul>
                                </li>
                            </ul>
                        </section>

                        <section className="mb-4">
                            <h3 className="fw-bold">2. HỦY ĐƠN HÀNG</h3>
                            <p>Đơn hàng sẽ được xử lý ngay khi khách hàng xác nhận thanh toán. Để được hỗ trợ hủy đơn, vui lòng liên hệ:</p>
                            <ul>
                                <li>Tổng đài: <strong>1900 999999</strong> (8:00 - 18:00)</li>
                                <li>Email: <strong>support@luxury.com</strong></li>
                            </ul>
                        </section>

                        <section className="mb-4">
                            <h3 className="fw-bold">3. THỜI GIAN VÀ PHÍ GIAO HÀNG</h3>
                            <p>Chúng tôi luôn cố gắng giao hàng sớm nhất theo hình thức sau:</p>
                            <ul>
                                <li><strong>Giao hàng tận nơi:</strong></li>
                                <ul>
                                    <li>Miễn phí cho tất cả đơn hàng (tối đa 200.000đ phí ship)</li>
                                    <li><strong>TP. Hồ Chí Minh:</strong> 1–3 ngày làm việc</li>
                                    <li><strong>Tỉnh thành khác:</strong> 3–7 ngày làm việc</li>
                                </ul>
                            </ul>
                        </section>

                        <section className="mb-4">
                            <h3 className="fw-bold">4. CHÍNH SÁCH TRẢ HÀNG & HOÀN TIỀN</h3>
                            <p>Khách hàng có thể trả hàng và hoàn tiền trong các trường hợp:</p>
                            <ul>
                                <li>Sản phẩm bị lỗi, sai loại, sai kích cỡ/màu sắc, thiếu sản phẩm</li>
                                <li>Sản phẩm hết hạn sử dụng</li>
                            </ul>
                            <p>Chính sách trả hàng:</p>
                            <ul>
                                <li>Trả hàng trong vòng 14 ngày kể từ ngày nhận</li>
                                <li>Phải hoàn trả đầy đủ sản phẩm, quà tặng, phiếu mua hàng/giảm giá đi kèm</li>
                                <li>Sản phẩm chưa sử dụng, không trầy xước, không bẩn hoặc hỏng bao bì</li>
                                <li>Hoàn tiền trong vòng 30 ngày làm việc sau khi kiểm tra</li>
                            </ul>
                            <p>Mọi thắc mắc vui lòng liên hệ:</p>
                            <ul>
                                <li>Tổng đài: <strong>0966200317</strong> (8:00 - 18:00)</li>
                                <li>Email: <strong>Vuquoc1906@gmail.com</strong></li>
                            </ul>
                        </section>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PolicySell;
