import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../../api/axios';
import apiContact from '../../../api/apiContacts';
import { useState } from "react";

function ContactAdd() {
    const [Name, setName] = useState("");
    const [Email, setEmail] = useState("");
    const [Phone, setPhone] = useState("");
    const [Title, setTitle] = useState("");
    const [Content, setContent] = useState("");
    const [ReplyID, setReplyID] = useState("");


    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const contactData = {
            name: Name,
            email: Email,
            phone: Phone,
            title: Title,
            content: Content,
            reply_id: ReplyID,
            created_at: Date.now(),
            updated_at: Date.now(),
            updated_by: 1,
            status: 1,

        };

        const adminToken = localStorage.getItem("adminToken");
        if (!adminToken) {
            alert("Bạn cần đăng nhập để thực hiện thao tác này.");
            return;
        }

        try {
            axiosInstance.enableJson();
            const res = await apiContact.createContact(contactData);
            console.log("Thêm liên hệ thành công:", res);
            navigate("/admin/listContact");
        } catch (error) {
            console.error("Lỗi khi thêm liên hệ:", error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="card shadow-sm">
                <div className="card-header bg-light">
                    <div className="row">
                        <div className="col-6">
                            <strong className="text-primary">Thêm liên hệ</strong>
                        </div>
                        <div className="col-6 text-end">
                            <Link className="btn btn-sm btn-success" to="/admin/listContact">
                                <i className="fa fa-long-arrow-alt-left me-1"></i>
                                Về danh sách
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="card-body">
                    <div className="row">
                        <div className="col-md-8">
                            <div className="mb-3">
                                <label><strong>Họ tên</strong></label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={Name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label><strong>Email</strong></label>
                                <input
                                    type="email"
                                    className="form-control"
                                    value={Email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label><strong>Số điện thoại</strong></label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={Phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>

                            <div className="mb-3">
                                <label><strong>Tiêu đề</strong></label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={Title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>

                            <div className="text-end">
                                <button type="submit" className="btn btn-sm btn-primary">
                                    <i className="fa fa-save me-1"></i>
                                    Lưu
                                </button>
                            </div>
                        </div>
                        <div className='col-md-3'>
                            <div className="mb-3">
                                <label><strong>Nội dung</strong></label>
                                <textarea
                                    rows="4"
                                    className="form-control"
                                    value={Content}
                                    onChange={(e) => setContent(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label><strong>Reply ID</strong></label>
                                <input type="number" className="form-control" value={ReplyID} onChange={(e) => setReplyID(e.target.value)} required />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default ContactAdd;
