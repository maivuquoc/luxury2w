import { Link } from "react-router-dom";

const About = () => {
    return (
        <div>
            <section className="bg-body-tertiary">
                <div className="container py-2">
                    <div className="row">
                        <div className="col-12">
                            <ul className="breadcrumb m-0">
                                <li className="home">
                                    <Link to="/"><span>Trang chủ</span></Link>
                                    <span className="mx-2">/</span>
                                </li>
                                <li><strong><span>Giới thiệu</span></strong></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-5">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-10">
                            <div className="text-center mb-4">
                                <h1 className="fw-bold">Giới thiệu</h1>
                            </div>
                            <div className="content-page rte">
                                <p>
                                    Công ty được thành lập từ năm 1960. Trải qua hơn 50 năm phấn đấu và trưởng thành, công ty đã không ngừng lớn mạnh, tích lũy được nhiều kinh nghiệm trong sản xuất kinh doanh. Với đội ngũ lãnh đạo giàu kinh nghiệm, chiến lược kinh doanh tốt, đội ngũ kỹ sư được đào tạo chuyên ngành có năng lực và lực lượng công nhân giỏi tay nghề, công ty đã tiến bước vững chắc và phát triển liên tục để giữ vững uy tín và chất lượng xứng đáng với niềm tin yêu của người tiêu dùng.
                                </p>
                                <p>
                                    Công ty chính thức hoạt động dưới hình thức Công ty cổ phần từ ngày 20/01/2004 theo Giấy chứng nhận đăng ký kinh doanh số 012348765 do Sở Kế hoạch và Đầu tư thành phố Hà Nội cấp và thay đổi lần thứ bảy ngày 09/05/2018. Các hoạt động sản xuất kinh doanh chính bao gồm:
                                </p>
                                <ul>
                                    <li>Kinh doanh xuất nhập khẩu: thời trang nam nữ, phụ kiện, quần áo, sản phẩm chuyên ngành, hàng hoá tiêu dùng và các sản phẩm hàng hoá khác.</li>
                                    <li>Đầu tư xây dựng, cho thuê văn phòng, nhà ở, trung tâm thương mại.</li>
                                    <li>Kinh doanh các ngành nghề khác không bị cấm theo các quy định của pháp luật.</li>
                                </ul>
                                <p>
                                    Sản phẩm của chúng tôi liên tục được người tiêu dùng mến mộ và bình chọn là “Hàng Việt Nam chất lượng cao”.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
