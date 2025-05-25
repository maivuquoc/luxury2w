import React from "react";
import { Link } from "react-router-dom";
import { imageURL } from "../../../api/config";


const formatDate = (dateStr) => {
    const options = { weekday: "short", day: "2-digit", month: "2-digit", year: "numeric" };
    const date = new Date(dateStr);
    return date.toLocaleDateString("vi-VN", options); // Ví dụ: "Th 5, 10/11/2022"
};


const PostItem = ({ post }) => {
    return (
        <div className="d-flex mb-5">
            {/* Nội dung bên trái */}
            <div className="w-50 pe-4">
                <h5 className="fw-bold text-uppercase mb-2">{post.title}</h5>
                <div className="text-muted mb-2">
                    <i className="fa fa-calendar me-2"></i> {formatDate(post.created_at)}
                    &nbsp;
                </div>
                <p className="mb-3">
                    {post.description}
                </p>
                <Link to={`/post/${post.id}`} className="btn btn-dark btn-sm px-4">
                    ĐỌC TIẾP
                </Link>
            </div>

            <div className="w-50">
                <Link to={`/post/${post.id}`}>
                    <img
                        src={`${imageURL}/public/${post.thumbnail}`}
                        className="img-fluid rounded"
                        alt={post.title}
                        style={{ objectFit: "cover", width: "100%", height: "auto" }}
                    />
                </Link>
            </div>
        </div>
    );
};

export default PostItem;
