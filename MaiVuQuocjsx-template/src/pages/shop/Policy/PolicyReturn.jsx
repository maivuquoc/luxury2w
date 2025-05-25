import { Link } from "react-router-dom";

const PolicyReturn = () => {
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
                                <li><strong><span>Chính sách đổi trả</span></strong></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Nội dung chính sách */}
            <section className="py-5">
                <div className="container">
                    <div className="heading-bar mb-4">
                        <h1 className="title_page">Chính sách đổi trả</h1>
                    </div>

                    <div className="content-page rte">
                        <section className="mb-4">
                            <h3 className="fw-bold">1. Điều kiện đổi trả</h3>
                            <p>Quý khách hàng cần kiểm tra tình trạng hàng hóa và có thể đổi/trả ngay tại thời điểm giao/nhận hàng trong các trường hợp sau:</p>
                            <ul>
                                <li>Hàng không đúng chủng loại, mẫu mã trong đơn hàng đã đặt hoặc như trên website tại thời điểm đặt hàng.</li>
                                <li>Không đủ số lượng, không đủ bộ như trong đơn hàng.</li>
                                <li>Tình trạng bên ngoài bị ảnh hưởng như rách bao bì, bong tróc, bể vỡ…</li>
                            </ul>
                            <p>Khách hàng có trách nhiệm trình giấy tờ liên quan chứng minh sự thiếu sót trên để hoàn tất việc hoàn trả/đổi trả hàng hóa.</p>
                        </section>

                        <section className="mb-4">
                            <h3 className="fw-bold">2. Quy định về thời gian thông báo và gửi sản phẩm đổi trả</h3>
                            <ul>
                                <li><strong>Thời gian thông báo đổi trả:</strong> Trong vòng 48h kể từ khi nhận sản phẩm (áp dụng với trường hợp thiếu phụ kiện, quà tặng hoặc sản phẩm bị bể vỡ).</li>
                                <li><strong>Thời gian gửi chuyển trả sản phẩm:</strong> Trong vòng 14 ngày kể từ khi nhận sản phẩm.</li>
                                <li><strong>Địa điểm đổi trả sản phẩm:</strong> Khách hàng có thể mang hàng trực tiếp đến văn phòng/cửa hàng hoặc gửi qua đường bưu điện.</li>
                            </ul>
                            <p>Trong trường hợp Quý khách có ý kiến đóng góp hoặc khiếu nại liên quan đến chất lượng sản phẩm, vui lòng liên hệ đường dây chăm sóc khách hàng của chúng tôi để được hỗ trợ.</p>
                        </section>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PolicyReturn;
