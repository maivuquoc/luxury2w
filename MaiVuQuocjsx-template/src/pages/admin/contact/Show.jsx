import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
// API
import apiContact from '../../../api/apiContacts';

function ContactShow() {
    const { id } = useParams(); // Lấy id từ URL
    const [contact, setContact] = useState(null);

    useEffect(() => {
        apiContact.getOne(id)
            .then((res) => {
                setContact(res);
            })
            .catch((err) => {
                console.error("Lỗi khi gọi API contact:", err);
            });
    }, [id]);

    if (!contact) return <div className="p-4">Đang tải dữ liệu liên hệ...</div>;

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-header bg-info text-white">
                    <div className="row">
                        <div className="col-md-6">
                            <strong>Chi tiết liên hệ: {contact.name}</strong>
                        </div>
                        <div className="col-md-6 text-end">
                            <Link to="/admin/listContact" className="btn btn-sm btn-success">
                                <i className="fa fa-long-arrow-alt-left me-1"></i>
                                Về danh sách
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="card-body">
                    <div className="row mb-3">
                        <div className="col-md-3 fw-bold">Họ tên:</div>
                        <div className="col-md-9">{contact.name}</div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-3 fw-bold">Email:</div>
                        <div className="col-md-9">{contact.email}</div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-3 fw-bold">Điện thoại:</div>
                        <div className="col-md-9">{contact.phone}</div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-3 fw-bold">Tiêu đề:</div>
                        <div className="col-md-9">{contact.title}</div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-3 fw-bold">Nội dung:</div>
                        <div className="col-md-9">{contact.content}</div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-3 fw-bold">Trả lời ID:</div>
                        <div className="col-md-9">{contact.reply_id}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactShow;
