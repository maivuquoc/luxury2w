import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiContact from "../../../api/apiContacts";

const Contact = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [replyID, setReplyID] = useState("");

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    // Lấy thông tin currentUser từ localStorage
    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if (currentUser) {
            setUser(currentUser);
            setReplyID(currentUser.id || "");
        }
    }, []);

    // Đẩy dữ liệu người dùng vào form nếu đã đăng nhập
    useEffect(() => {
        if (user) {
            setName(user.name || "");
            setEmail(user.email || "");
            setPhone(user.phone || "");
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !email || !content) {
            setErrorMessage("Vui lòng điền đầy đủ thông tin.");
            return;
        }

        setLoading(true);
        const contactData = {
            name,
            email,
            phone,
            title,
            content,
            reply_id: replyID || null,
            created_at: Date.now(),
            updated_at: Date.now(),
            updated_by: 1,
            status: 1,
        };

        try {
            await apiContact.createContactUser(contactData);
            setSuccessMessage("Liên hệ của bạn đã được gửi thành công!");
            setErrorMessage("");
            setLoading(false);
            setTimeout(() => navigate("/"), 2000);
        } catch (error) {
            console.error("Lỗi khi gửi liên hệ:", error.message);
            setErrorMessage("Đã có lỗi xảy ra, vui lòng thử lại.");
            setSuccessMessage("");
            setLoading(false);
        }
    };

    return (
        <div>
            <section>
                <div className="bg-body-tertiary">
                    <div className="container">
                        <div className="row">
                            <ul className="breadcrumb m-0 px-0 py-2">
                                <li className="home">
                                    <Link to="/"><span>Trang chủ</span></Link>
                                    <span className="mr_lr">&nbsp;/&nbsp;</span>
                                </li>
                                <li><strong><span>Liên hệ</span></strong></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <section className="page_contact section">
                <div className="container py-3">
                    <div className="row">
                        <h1>Công ty TNHH Vũ Quốc</h1>
                        <div className="mb-3">
                            <ul><i className="fa-solid fa-location-dot"></i> Địa chỉ: 70 Lu Gia, District 11, Ho Chi Minh City.</ul>
                            <ul><i className="fa-solid fa-mobile"></i> Số điện thoại: 0966200317</ul>
                            <ul><i className="fa-solid fa-envelope"></i> Email: vuquoc1906@gmail.com</ul>
                        </div>
                        <hr />
                        <div className="col-lg-6">
                            <h2 className="pt-3 mt-3">Liên hệ với chúng tôi</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Họ và tên</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        placeholder="Họ và tên"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        readOnly={!!user}
                                    />
                                </div>
                                <div className="mb-3 mt-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        readOnly={!!user}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="phone" className="form-label">Số điện thoại</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="phone"
                                        placeholder="Số điện thoại"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Tiêu đề</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="title"
                                        placeholder="Tiêu đề"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="content" className="form-label">Nội dung</label>
                                    <textarea
                                        className="form-control"
                                        rows="8"
                                        id="content"
                                        placeholder="Nhập nội dung"
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3 mt-3">
                                    <button type="submit" className="btn btn-outline-dark" disabled={loading}>
                                        {loading ? (
                                            <span><i className="fa fa-spinner fa-spin me-1"></i> Đang gửi...</span>
                                        ) : (
                                            <><i className="fa fa-paper-plane me-1"></i> Gửi liên hệ của bạn</>
                                        )}
                                    </button>
                                </div>
                            </form>

                            {successMessage && (
                                <div className="alert alert-success mt-3">{successMessage}</div>
                            )}
                            {errorMessage && (
                                <div className="alert alert-danger mt-3">{errorMessage}</div>
                            )}
                        </div>

                        <div className="col-lg-6">
                            <div className="iFrameMap px-2 mt-3 mt-lg-0">
                                <div id="contact_map" className="map">
                                    <iframe
                                        title="Google Maps - EGANY"
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.7463237616694!2d106.77247247586914!3d10.83071505818831!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752701a34a5d5f%3A0x30056b2fdf668565!2zQ2FvIMSQ4bqzbmcgQ8O0bmcgVGjGsMahbmcgVFAuSENN!5e0!3m2!1svi!2s!4v1722511205207!5m2!1svi!2s"
                                        width="100%"
                                        height="450"
                                        style={{ border: 0 }}
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                    ></iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
