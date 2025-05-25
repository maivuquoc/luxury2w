import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
// API
import apiPost from '../../../api/apiPosts';
import { imageURL } from "../../../api/config";

function PostShow() {
    const { id } = useParams(); // Lấy id từ URL
    const [post, setPost] = useState(null);

    useEffect(() => {
        apiPost.getOne(id)
            .then((res) => {
                setPost(res);
            })
            .catch((err) => {
                console.error("Lỗi khi gọi API bài viết:", err);
            });
    }, [id]);

    if (!post) return <div className="p-4">Đang tải dữ liệu bài viết...</div>;

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-header bg-info text-white">
                    <div className="row">
                        <div className="col-md-6">
                            <strong>Chi tiết bài viết: {post.title}</strong>
                        </div>
                        <div className="col-md-6 text-end">
                            <Link to="/admin/listPost" className="btn btn-sm btn-success">
                                <i className="fa fa-long-arrow-alt-left me-1"></i>
                                Về danh sách
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="card-body">
                    <div className="row mb-3">
                        <div className="col-md-3 fw-bold">Tiêu đề:</div>
                        <div className="col-md-9">{post.title}</div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-3 fw-bold">Slug:</div>
                        <div className="col-md-9">{post.slug}</div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-3 fw-bold">Chủ đề (topic_id):</div>
                        <div className="col-md-9">{post.topic_id}</div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-3 fw-bold">Mô tả:</div>
                        <div className="col-md-9">{post.description}</div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-3 fw-bold">Loại:</div>
                        <div className="col-md-9">{post.type}</div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-3 fw-bold">Nội dung:</div>
                        <div className="col-md-9">{post.content}</div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-3 fw-bold">Ngày tạo:</div>
                        <div className="col-md-9">{post.created_at}</div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-3 fw-bold">Người tạo:</div>
                        <div className="col-md-9">{post.created_by}</div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-3 fw-bold">Ngày cập nhật:</div>
                        <div className="col-md-9">{post.updated_at}</div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-3 fw-bold">Người cập nhật:</div>
                        <div className="col-md-9">{post.updated_by}</div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-3 fw-bold">Hình ảnh:</div>
                        <div className="col-md-9">
                            <img
                                src={`${imageURL}/public/${post.thumbnail}`}
                                alt={post.title}
                                style={{
                                    width: "100px",
                                    height: "100px",
                                    objectFit: "cover",
                                    border: "1px solid #ccc",
                                    borderRadius: "6px",
                                    padding: "2px",
                                    backgroundColor: "#fff"
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostShow;
