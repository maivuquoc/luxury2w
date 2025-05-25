import { Link } from "react-router-dom";

const PolicyDelivery = () => {
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
                                <li><strong><span>Chính sách giao hàng</span></strong></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Nội dung chính sách */}
            <section className="py-5">
                <div className="container">
                    <div className="heading-bar mb-4">
                        <h1 className="title_page">Chính sách giao hàng</h1>
                    </div>

                    <div className="content-page rte">
                        <p>EGA Luxury có dịch vụ giao hàng tận nơi trên toàn quốc, áp dụng cho khách mua hàng trên website, fanpage và gọi điện thoại, không áp dụng cho khách mua trực tiếp tại cửa hàng.</p>
                        <p>Đơn hàng sẽ được chuyển phát đến tận địa chỉ khách hàng cung cấp thông qua công ty vận chuyển trung gian.</p>

                        <section className="mb-4">
                            <h3 className="fw-bold">1. Thời gian giao hàng</h3>
                            <p><strong>Đơn hàng nội và ngoại thành TP.HCM:</strong></p>
                            <ul>
                                <li>Thời gian giao hàng là 1–2 ngày sau khi đặt hàng.</li>
                                <li>Đơn hàng đặt trước 11h30 trưa sẽ được giao trong buổi chiều cùng ngày.</li>
                                <li>Đơn hàng sau 11h30 sẽ giao trong buổi tối hoặc sáng hôm sau.</li>
                            </ul>

                            <p className="mt-3"><strong>Đơn hàng ở các tỉnh thành khác:</strong></p>
                            <ul>
                                <li>2–3 ngày đối với khu vực trung tâm tỉnh/thành phố.</li>
                                <li>3–7 ngày đối với khu vực ngoại thành, huyện, xã, thị trấn.</li>
                            </ul>

                            <p className="fst-italic">(Không tính thứ Bảy, Chủ nhật hay các ngày lễ Tết)</p>

                            <p>Thời gian xử lý đơn hàng được tính từ khi nhận được thanh toán hoàn tất của quý khách.</p>
                            <p>Có thể thay đổi thời gian giao hàng nếu khách hàng yêu cầu hoặc do ảnh hưởng của thiên tai hay sự kiện đặc biệt khác.</p>
                            <p>Đơn hàng được giao tối đa 2 lần. Nếu lần đầu giao không thành công, nhân viên sẽ liên hệ để hẹn giao lần 2. Nếu không thể liên lạc lại hoặc không nhận được phản hồi, đơn hàng sẽ không còn hiệu lực.</p>
                            <p>Để kiểm tra thông tin/tình trạng đơn hàng, vui lòng inbox fanpage hoặc gọi hotline và cung cấp tên, số điện thoại để được hỗ trợ.</p>
                            <p>Khi nhận hàng, vui lòng ký xác nhận với nhân viên giao hàng và kiểm tra kỹ số lượng, loại sản phẩm. Quý khách nên giữ lại biên lai vận chuyển và hóa đơn mua hàng để đối chiếu khi cần thiết.</p>
                        </section>

                        <section className="mb-4">
                            <h3 className="fw-bold">2. Phí giao hàng</h3>
                            <p><strong>Miễn phí vận chuyển cho tất cả đơn hàng trên toàn quốc.</strong></p>
                        </section>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PolicyDelivery;
