import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import apiTopic from '../../../api/apiTopics'; // Đảm bảo file này tồn tại

function TopicShow() {
    const { id } = useParams(); // Lấy ID từ URL
    const [topic, setTopic] = useState(null);

    useEffect(() => {
        apiTopic.getOne(id)
            .then((res) => {
                setTopic(res);
            })
            .catch((err) => {
                console.error("Lỗi khi gọi API topic:", err);
            });
    }, [id]);

    if (!topic) return <div className="p-4">Đang tải dữ liệu chủ đề...</div>;

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-header bg-info text-white">
                    <div className="row">
                        <div className="col-md-6">
                            <strong>Chi tiết chủ đề: {topic.name}</strong>
                        </div>
                        <div className="col-md-6 text-end">
                            <Link to="/admin/listTopic" className="btn btn-sm btn-success">
                                <i className="fa fa-long-arrow-alt-left me-1"></i>
                                Về danh sách
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="card-body">
                    <div className="row mb-3">
                        <div className="col-md-3 fw-bold">Tên chủ đề:</div>
                        <div className="col-md-9">{topic.name}</div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-3 fw-bold">Slug:</div>
                        <div className="col-md-9">{topic.slug}</div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-3 fw-bold">Mô tả:</div>
                        <div className="col-md-9">{topic.description}</div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-3 fw-bold">Thứ tự hiển thị:</div>
                        <div className="col-md-9">{topic.sort_order}</div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-3 fw-bold">Ngày tạo:</div>
                        <div className="col-md-9">{topic.created_at}</div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-3 fw-bold">Người tạo:</div>
                        <div className="col-md-9">{topic.created_by}</div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-3 fw-bold">Ngày cập nhật:</div>
                        <div className="col-md-9">{topic.updated_at}</div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-3 fw-bold">Người cập nhật:</div>
                        <div className="col-md-9">{topic.updated_by}</div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-3 fw-bold">Trạng thái:</div>
                        <div className="col-md-9">
                            {topic.status === 1 ? "Hiển thị" : "Không hiển thị"}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TopicShow;
