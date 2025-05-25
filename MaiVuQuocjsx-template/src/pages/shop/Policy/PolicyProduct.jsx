import { Link } from "react-router-dom";

const PolicyProduct = () => {
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
                                <li><strong><span>Chính sách bảo hành</span></strong></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Nội dung chính sách */}
            <section className="py-5">
                <div className="container">
                    <div className="heading-bar mb-4">
                        <h1 className="title_page">Chính sách bảo hành</h1>
                    </div>

                    <div className="content-page rte">
                        <section>
                            <h3 className="fw-bold mb-3">A. HƯỚNG DẪN SỬ DỤNG</h3>
                            <p>Kim Cương và Trang Sức là tài sản quý giá, Quý khách cần sử dụng một cách nâng niu và nhẹ nhàng.</p>

                            <p><strong>Đối với Kim Cương (KC):</strong></p>
                            <ul>
                                <li>- Mặc dù KC là loại đá quý có độ cứng nhất tuy nhiên trong quá trình sử dụng nếu có những tác động, va chạm mạnh có thể dẫn đến: trầy, xước, nứt, mẻ...  gây ảnh hưởng đến giảm chất lượng và giá trị của viên kim cương.</li>
                                <li>- Trong trường hợp viên kim cương bị trầy, xước, nứt, mẻ... Trong quá trình sử dụng sẽ được Viện Ngọc Học và Trang Sức DOJI (DOJILAB) kiểm tra và đánh giá. Kết quả kiểm tra và đánh giá sẽ là căn cứ để thâu đổi.</li>
                                <li>- Giấy kiểm định được bảo quản cẩn thận, trong trường hợp bị nhăn nhúm hoặc gẫy gập, hoặc bị ố bẩn, hoặc bị mất thông tin thì khi thu đổi sẽ bị khấu trừ phí kiểm định.</li>
                            </ul>

                            <p><strong>** Đối với Trang Sức:</strong></p>
                            <ul>
                                <li>- Từ 04 - 06 tháng, Quý Khách nên mang sản phẩm đến hệ thống trung tâm hoặc cửa hàng của TGKC để được vệ sinh, kiểm tra tình trạng ổ chấu sản phẩm và làm mới sản phẩm.</li>
                                <li>- Khi bảo quản trang sức trong hộp phải để mỗi sản phẩm 01 ngăn riêng, lót vải mềm.</li>
                                <li>- Tránh để trang sức tiếp xúc trực tiếp với các hóa chất có tính chất tẩy mạnh...</li>
                                <li>- Hạn chế đeo trang sức khi trong các hoạt động như chơi thể thao...</li>
                            </ul>
                        </section>

                        <section className="mt-4">
                            <h3 className="fw-bold mb-3">B. ĐIỀU KIỆN THU ĐỔI</h3>
                            <ul>
                                <li>- Đầy đủ Phiếu Bán Hàng, Giấy tờ tùy thân của khách hàng thu đổi.</li>
                                <li>- Giấy Kiểm Định đầy đủ và nguyên vẹn (không gấp khúc, nhăn, bẩn ...).</li>
                                <li>- KC phải còn nguyên vẹn (không bị trầy xước, nứt, mẻ…) </li>
                                <li>- Trang sức phải còn nguyên vẹn (không biến dạng, không rớt hạt, không cắt ngắn (đối với dây chuyền, dây tay, dây chân…)).</li>
                            </ul>

                            <p><strong>** Sản phẩm không đủ điều kiện thu đổi:</strong></p>
                            <ul>
                                <li><strong>TH1:</strong> Trang sức hỏng → Mua lại theo thỏa thuận hoặc từ chối mua.</li>
                                <li><strong>TH2:</strong> Mất giấy kiểm định → Trừ phí hoặc từ chối thu đổi.</li>
                                <li><strong>TH3:</strong> Kim cương hỏng → Mua lại theo kết quả kiểm định hoặc từ chối, khách hàng chịu phí.</li>
                            </ul>
                        </section>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PolicyProduct;
