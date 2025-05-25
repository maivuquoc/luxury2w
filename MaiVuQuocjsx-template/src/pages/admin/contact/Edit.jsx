import { Link, useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../../api/axios';

import { useEffect, useState } from "react";

function ContactEdit() {
    const { id } = useParams();
    const [Name, setName] = useState("");
    const [Email, setEmail] = useState("");
    const [Phone, setPhone] = useState("");
    const [Title, setTitle] = useState("");
    const [Content, setContent] = useState("");
    const [ReplyID, setReplyId] = useState(""); 

    const navigate = useNavigate();

    useEffect(() => {
        // Load thông tin liên hệ theo ID
        axiosInstance.get(`/contacts/${id}`).then(res => {
            const contact = res.data;
            setName(contact.name);
            setEmail(contact.email);
            setPhone(contact.phone);
            setTitle(contact.title);
            setContent(contact.content);
            setReplyId(contact.reply_id);
        });
    }, [id]);

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
        
        // Kiểm tra token admin trước khi thao tác
        const adminToken = localStorage.getItem("adminToken");
        if (adminToken) {
            // Đảm bảo rằng token được thêm vào header Authorization
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${adminToken}`;
        } else {
            alert("Bạn cần đăng nhập trước khi thực hiện thao tác này.");
            return;
        }

        try {
            const resContact = await axiosInstance.put(`/contacts/${id}`, contactData);
            console.log("Cập nhật liên hệ thành công:", resContact);

            navigate("/admin/listcontact");
        } catch (error) {
            console.error("Lỗi khi cập nhật liên hệ:", error.response?.data || error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="card shadow-sm">
                <div className="card-header bg-light">
                    <div className="row">
                        <div className="col-6">
                            <strong className="text-primary">Chỉnh sửa liên hệ</strong>
                        </div>
                        <div className="col-6 text-end">
                            <Link className="btn btn-sm btn-success" to="/admin/listcontact">
                                <i className="fa fa-long-arrow-alt-left me-1"></i>
                                Về danh sách
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="card-body">
                    <div className="row">
                        {/* Cột trái */}
                        <div className="col-md-9">
                            <div className="mb-3">
                                <label><strong>Tên</strong></label>
                                <input type="text" className="form-control" value={Name} onChange={(e) => setName(e.target.value)} />
                            </div>

                            <div className="mb-3">
                                <label><strong>Email</strong></label>
                                <input type="email" className="form-control" value={Email} onChange={(e) => setEmail(e.target.value)} />
                            </div>

                            <div className="mb-3">
                                <label><strong>Số điện thoại</strong></label>
                                <input type="text" className="form-control" value={Phone} onChange={(e) => setPhone(e.target.value)} />
                            </div>

                            <div className="mb-3">
                                <label><strong>Tiêu đề</strong></label>
                                <input type="text" className="form-control" value={Title} onChange={(e) => setTitle(e.target.value)} />
                            </div>

                            <div className="mb-3">
                                <label><strong>Nội dung</strong></label>
                                <textarea rows="3" className="form-control" value={Content} onChange={(e) => setContent(e.target.value)} />
                            </div>

                            <div className="text-end">
                                <button type="submit" className="btn btn-sm btn-primary">
                                    <i className="fa fa-save me-1"></i>
                                    Lưu
                                </button>
                            </div>
                        </div>

                        {/* Cột phải */}
                        <div className="col-md-3">
                            <div className="mb-3">
                                <label><strong>ID phản hồi</strong></label>
                                <input type="text" className="form-control" value={ReplyID} onChange={(e) => setReplyId(e.target.value)} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default ContactEdit;
