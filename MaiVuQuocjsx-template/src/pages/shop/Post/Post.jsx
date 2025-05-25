import React, { useEffect, useState } from "react";
import PostItem from "./PostItem";
import apiPost from "../../../api/apiPosts";
import { Link } from "react-router-dom";
import { imageURL } from "../../../api/config";


const Post = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        apiPost.getAll()
            .then((res) => setPosts(res))
            .catch((err) => {
                console.error("Lỗi khi lấy danh sách bài viết:", err);
            });
    }, []);

    return (
        <div className="bg-white py-5">
            <section className="mb-4">
                <div className="bg-light py-2 px-3 rounded">
                    <ul className="breadcrumb mb-0">
                        <li className="breadcrumb-item">
                            <Link to="/">Trang chủ</Link>
                        </li>
                        <li className="breadcrumb-item active">Danh sách bài viết</li>
                    </ul>
                </div>
            </section>
            <div className="container">
                <h2 className="text-center mb-5">TIN TỨC</h2>

                <div className="row">
                    <div className="col-md-8">
                        {posts.map((post) => (
                            <div key={post.id} className="mb-5">
                                <PostItem post={post} />
                            </div>
                        ))}
                    </div>

                    <div className="col-md-4">
                        <div className="mb-4">
                            <h5 className="fw-bold mb-3">DANH MỤC TIN TỨC</h5>
                            <ul className="list-unstyled">
                                <li>Gợi ý quà tặng</li>
                                <li>Kiến thức trang sức</li>
                                <li>Cẩm nang cưới</li>
                                <li>Trang sức cung mệnh</li>
                                <li>Tin khuyến mãi</li>
                            </ul>
                        </div>

                        <div>
                            <h5 className="fw-bold mb-3">TIN NỔI BẬT</h5>
                            {posts.slice(0, 4).map((post) => (
                                <div key={post.id} className="d-flex mb-3">
                                    <Link to={`/post/${post.id}`}>
                                        <img
                                            src={`${imageURL}/public/${post.thumbnail}`}
                                            alt={post.title}
                                            width={60}
                                            height={60}
                                            className="me-2 rounded"
                                            style={{ objectFit: "cover" }}
                                        />
                                    </Link>

                                    <Link to={`/post/${post.id}`} className="text-dark fw-medium">
                                        {post.title}
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Post;
