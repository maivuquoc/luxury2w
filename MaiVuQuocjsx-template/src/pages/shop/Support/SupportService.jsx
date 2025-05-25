import { Link } from "react-router-dom";

const SupportService = () => {
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
                                <li><strong><span>Điều khoản dịch vụ</span></strong></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Nội dung điều khoản */}
            <section className="py-5">
                <div className="container">
                    <div className="heading-bar mb-4">
                        <h1 className="title_page">Điều khoản dịch vụ</h1>
                    </div>

                    <div className="content-page rte">
                        <p>
                            EGA Luxury chính thức thành lập vào tháng 11/2022 với mục tiêu mang đến cho khách hàng Việt Nam cơ hội sở hữu
                            trang sức kim cương thiên nhiên chất lượng cao ở chi phí hợp lý.
                        </p>

                        <p>
                            Trong bối cảnh “tranh tối tranh sáng” của thị trường Kim cương trong nước - nơi có sự tham gia của rất nhiều cá nhân
                            & đơn vị lớn nhỏ với vô vàn tiêu chuẩn chất lượng và mức giá khác nhau, chúng tôi đã chứng kiến rất nhiều người tiêu
                            dùng phải chịu thiệt thòi vì mua hàng chỉ dựa vào cảm tính, yếu tố truyền miệng hay lời mời chào của người bán.
                        </p>

                        <p>
                            Vì lẽ đó, bên cạnh yếu tố quan trọng nhất là chất lượng sản phẩm, Luxury còn đặt ra sứ mệnh chia sẻ những thông tin trung thực,
                            những kiến thức chính xác về Kim cương Thiên nhiên đến công chúng; qua đó giúp mỗi khách hàng có thể tự tin ra quyết định
                            đúng đắn và đạt được lợi ích tối đa. Chúng tôi tin rằng, với những nỗ lực của mình, thị trường sẽ ngày càng trở nên chuẩn mực hơn,
                            minh bạch hơn và việc sở hữu kim cương thiên nhiên sẽ ngày càng dễ dàng hơn.
                        </p>

                        <p>
                            Chúng tôi theo đuổi mô hình “Click & Brick” - kết hợp thế mạnh của các nền tảng online và cửa hàng vật lý nhằm mục tiêu biến
                            trang sức kim cương và việc mua sắm trang sức kim cương thật sự trở thành niềm vui thích, một trải nghiệm đặc sắc cho những
                            khách hàng thế hệ mới – hiện đại, cá tính và đòi hỏi rất cao.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SupportService;
