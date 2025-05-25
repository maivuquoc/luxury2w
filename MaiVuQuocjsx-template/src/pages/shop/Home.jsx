// import ProductItem from "./Product/ProductItem";
import ProductNew from "./Product/ProductNew";
import ProductSale from "./Product/ProductSale";
import { Link } from "react-router-dom";
import SliderHome from "./Home/SliderHome";
import CollectionSection from "./Home/CollectionSection";
import { FaInstagram } from "react-icons/fa";
import PostNew from "./Post/PostNew";

const Home = () => {

    return (
        <div>
            <section className="section_mainmenu">
                <SliderHome />

                <div className="container py-5">
                    <div className="row">
                        <div className="col-6 py-3">
                            <div className="imgtext_content_wrap">
                                <div className="imgtext_content">
                                    <h3 className="imgtext-title head-title-style">
                                        <span>ABOUT</span> EGA LUXURY
                                    </h3>
                                    <p className="imgtext-desc">
                                        EGA LUXURY bắt nguồn từ Nghệ thuật, Thiết kế và Văn hóa.
                                        <br />
                                        <br />
                                        Đồ trang sức của chúng tôi được lấy cảm hứng từ những hình dạng và câu chuyện phổ
                                        quát trải dài qua nhiều thế hệ và nền văn hóa. <br />
                                        <br />
                                        Các hình thức điêu khắc, những đường cong mềm mại và những đường nét uyển chuyển tạo
                                        nên vẻ sang trọng dễ dàng cho những nhà sáng tạo táo bạo, tò mò.
                                    </p>
                                    <div className="mb-3 mt-3">
                                        <Link to="/products">
                                            <button type="button" className="btn btn-outline-dark">Khám phá ngay</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-6">
                            <img className="img-fluid m-auto object-contain mh-100 w-auto" src="assets/image/imgtext_1_img.webp" width="795" height="475" alt="imgtext_img" />
                        </div>
                    </div>
                </div>
                {/* Bộ sưu tập */}
                <CollectionSection />
                {/* Sản phẩm mới */}
                <ProductNew />
                {/* Sản phẩm giảm giá */}
                <ProductSale />
                <div className="container py-5">
                    <div className="row">
                        <div className="col-md-3">
                            <h3>EGA LUXURY</h3>
                            <span>Toả sáng và nâng tầm đẳng cấp với EGA LUXURY</span>
                            <div className="mb-3 mt-3">
                                <Link to="/products">
                                    <button type="button" className="btn btn-outline-dark">Khám phá ngay</button>
                                </Link>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="d-block text-center">
                                <iframe
                                    width="100%"
                                    height="450"
                                    src="https://www.youtube.com/embed/23FMIQoKhDw?autoplay=1"
                                    title="EGA LUXURY"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="container py-5">
                    <h3 className="text-center py-2">SHOP THE LOOK</h3>
                    <div className="row">
                        <div className="col-md-4">
                            <img
                                src="/assets/image/lookbook_1_image.webp"
                                alt="Hình ảnh 1"
                                className="rounded img-hover-effect"
                                width="280"
                                height="265"
                            />
                            <h5>Bộ trang sức EVA</h5>
                        </div>
                        <div className="col-md-4">
                            <img
                                src="/assets/image/lookbook_2_image.webp"
                                alt="Hình ảnh 2"
                                className="rounded img-hover-effect"
                                width="280"
                                height="265"
                            />
                            <h5>Bộ lắc tay LION</h5>
                        </div>
                        <div className="col-md-4">
                            <img
                                src="/assets/image/lookbook_3_image.webp"
                                alt="Hình ảnh 3"
                                className="rounded img-hover-effect"
                                width="280"
                                height="265"
                            />
                            <h5>Bộ dây truyền 2025</h5>
                        </div>
                    </div>
                </div>

                <section className="py-5 bg-light">
                    <div className="container text-center">
                        <p>
                            "Xây dựng câu chuyện của riêng bạn với EGA Luxury. Chọn một chiếc nhẫn bằng kim cương, chọn một viên đá, khắc tên của bạn với một ngày quan trọng. Chắc chắn có một cái gì đó cho tất cả mọi người”
                        </p>
                    </div>
                </section>

                {/* Cửa hàng */}
                <div className="container py-2">
                    <div className="row">
                        <div className="col position-relative">
                            <img
                                src="/assets/image/section_store_bg.webp"
                                alt="Hình ảnh 1"
                                className="rounded img-fluid w-100"
                            />
                            <div className="overlay-box bg-white text-dark p-3 rounded shadow-sm">
                                <h6 className="mb-2">Khai phá tận mắt sản phẩm</h6>
                                <h4>TẠI CỬA HÀNG EGA LUXURY</h4>
                                <p>Thứ 2 - Thứ 7: 9h - 21h</p>
                                <p>Chủ Nhật: đóng cửa</p>
                                <Link to="storelocator">
                                    <button type="button" className="btn btn-outline-dark">Danh sách cửa hàng</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Thế giới luxury */}
                <div className="container py-5">
                    <div className="row text-center">
                        <h3>THẾ GIỚI CỦA EGA LUXURY</h3>

                        <div className="col-md-3">
                            <div className="image-hover-wrapper position-relative overflow-hidden">
                                <img
                                    src="/assets/image/insta_1_img.webp"
                                    alt="Hình ảnh 1"
                                    className="rounded w-100 hover-zoom"
                                />
                                <div className="hover-icon d-flex justify-content-center align-items-center">
                                    <div className="icon-circle bg-white d-flex justify-content-center align-items-center">
                                        <i className="bi bi-camera fs-4 text-dark"><FaInstagram /></i>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="image-hover-wrapper position-relative overflow-hidden">
                                <img
                                    src="/assets/image/insta_2_img.webp"
                                    alt="Hình ảnh 2"
                                    className="rounded w-100 hover-zoom"
                                />
                                <div className="hover-icon d-flex justify-content-center align-items-center">
                                    <div className="icon-circle bg-white d-flex justify-content-center align-items-center">
                                        <i className="bi bi-camera fs-4 text-dark"><FaInstagram /></i>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="image-hover-wrapper position-relative overflow-hidden">
                                <img
                                    src="/assets/image/insta_3_img.webp"
                                    alt="Hình ảnh 3"
                                    className="rounded w-100 hover-zoom"
                                />
                                <div className="hover-icon d-flex justify-content-center align-items-center">
                                    <div className="icon-circle bg-white d-flex justify-content-center align-items-center">
                                        <i className="bi bi-camera fs-4 text-dark"><FaInstagram /></i>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="image-hover-wrapper position-relative overflow-hidden">
                                <img
                                    src="/assets/image/insta_4_img.webp"
                                    alt="Hình ảnh 4"
                                    className="rounded w-100 hover-zoom"
                                />
                                <div className="hover-icon d-flex justify-content-center align-items-center">
                                    <div className="icon-circle bg-white d-flex justify-content-center align-items-center">
                                        <i className="bi bi-camera fs-4 text-dark"><FaInstagram /></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="py-5">
                        <section className="py-5 bg-light">
                            <div className="container text-center">
                                <div className="row">
                                    <div className="col-md-3">
                                        <img
                                            src="/assets/image/policies_icon_1.webp"
                                            alt="Hình ảnh 1"
                                        />
                                        <p>MIỄN PHÍ VẬN CHUYỂN</p>
                                    </div>
                                    <div className="col-md-3">
                                        <img
                                            src="/assets/image/policies_icon_2.webp"
                                            alt="Hình ảnh 2"
                                        />
                                        <p>ĐỔI TRẢ HÀNG TRONG 7 NGÀY</p>
                                    </div>
                                    <div className="col-md-3">
                                        <img
                                            src="/assets/image/policies_icon_3.webp"
                                            alt="Hình ảnh 3"
                                        />
                                        <p>GÓI QUÀ MIỄN PHÍ</p>
                                    </div>
                                    <div className="col-md-3">
                                        <img
                                            src="/assets/image/policies_icon_4.webp"
                                            alt="Hình ảnh 4"
                                        />
                                        <p>HOTLINE: 0966200317</p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                </div>

                {/* bài viết mới */}
                <div className="container">
                    <div className="row">
                        <PostNew />
                        <div className="col-md-6">
                            <h4 className="text-center mb-4">Tuyển dụng</h4>
                            <ul className="list-group">
                                <li className="list-group-item">
                                    <strong>Nhân viên kinh doanh</strong><br />
                                    <small>Hà Nội - Hạn nộp: 30/06/2025</small>
                                </li>
                                <li className="list-group-item">
                                    <strong>Chuyên viên Marketing</strong><br />
                                    <small>TP. HCM - Hạn nộp: 15/07/2025</small>
                                </li>
                                <li className="list-group-item">
                                    <strong>Lập trình viên ReactJS</strong><br />
                                    <small>Remote - Hạn nộp: 01/08/2025</small>
                                </li>
                            </ul>
                            <div className="text-center mt-4">
                                <Link to="/">
                                    <button className="btn btn-outline-dark">Xem tất cả vị tri</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
        </div>
    )
}
export default Home;