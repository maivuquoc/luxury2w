import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import apiPost from "../../../api/apiPosts";
import { imageURL } from "../../../api/config";

const formatDate = (dateStr) => {
    const options = { weekday: "long", day: "2-digit", month: "2-digit", year: "numeric" };
    const date = new Date(dateStr);
    return date.toLocaleDateString("vi-VN", options);
};

const PostDetail = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        apiPost
            .getOne(id)
            .then((res) => {
                setPost(res);
            })
            .catch((err) => {
                console.error("Lỗi khi lấy chi tiết bài viết:", err);
            });
    }, [id]);

    if (!post) {
        return <div className="container py-5">Đang tải...</div>;
    }

    return (
        <div className="container py-4">
            <section className="mb-4">
                <div className="bg-light py-2 px-3 rounded">
                    <nav aria-label="breadcrumb" className="mb-0">
                        <ul className="breadcrumb mb-0">
                            <li className="breadcrumb-item">
                                <Link to="/">Trang chủ</Link>
                            </li>
                            <li className="breadcrumb-item">
                                <Link to="/post">Tin tức</Link>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">
                                {post.title}
                            </li>
                        </ul>
                    </nav>
                </div>
            </section>

            <div className="container">
                <div className="text-center mb-4">
                    <img
                        src={`${imageURL}/public/${post.thumbnail}`}
                        alt={post.title}
                        className="img-fluid rounded"
                    />
                </div>

                <h2 className="text-uppercase text-center mb-3">{post.title}</h2>

                <div className="text-center text-muted mb-4">
                    <span>Luxury EGANY</span> &nbsp;|&nbsp;
                    <i className="fa fa-calendar me-1"></i> {formatDate(post.created_at)} &nbsp;|&nbsp;
                    <i className="fa fa-clock-o me-1"></i> 3 phút đọc
                </div>
                <h3>Nội dung</h3>
                <div>{post.content}</div>
            </div>
        </div>
    );
};

export default PostDetail;
