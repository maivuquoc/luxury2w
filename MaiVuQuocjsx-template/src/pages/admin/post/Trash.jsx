import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import apiPost from '../../../api/apiPosts';
import { imageURL } from "../../../api/config";
import axiosInstance from '../../../api/axios';

function PostTrash() {
    const [trashPosts, setTrashPosts] = useState([]);

    // Gọi API lấy bài viết đã xoá (status = 0)
    useEffect(() => {
        const fetchTrashPosts = async () => {
            try {
                const allPosts = await apiPost.getAll();
                const deletedPosts = allPosts.filter(p => p.status === 0);
                setTrashPosts(deletedPosts);
            } catch (error) {
                console.error("Lỗi khi load bài viết thùng rác:", error.message);
            }
        };

        fetchTrashPosts();
    }, []);

    // Khôi phục bài viết
    const handleRestore = async (id) => {
        if (!window.confirm("Khôi phục bài viết này?")) return;
        try {
            await apiPost.updateStatus(id, 1); // Cần API cập nhật status
            setTrashPosts(prev => prev.filter(p => p.id !== id));
        } catch (error) {
            console.error("Lỗi khi khôi phục bài viết:", error.message);
        }
    };

    // Xoá vĩnh viễn bài viết
    const handlePermanentDelete = async (id) => {
        if (!window.confirm("Xoá vĩnh viễn bài viết này?")) return;

        const adminToken = localStorage.getItem("adminToken");
        if (!adminToken) {
            alert("Bạn cần đăng nhập để thực hiện thao tác này.");
            return;
        }

        try {
            axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${adminToken}`;
            axiosInstance.enableJson();

            const result = await axiosInstance.delete(`/posts/${id}`);

            if (result.status === 200) {
                setTrashPosts(prev => prev.filter(p => p.id !== id));
            }
        } catch (error) {
            console.error("Lỗi khi xoá vĩnh viễn:", error.response?.data || error.message);
        }
    };

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-header bg-secondary text-white">
                    <div className="row">
                        <div className="col-md-6">
                            <strong>Bài viết đã xoá</strong>
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
                    <table className="table table-bordered table-hover">
                        <thead className="table-light">
                            <tr>
                                <th>STT</th>
                                <th>Tiêu đề bài viết</th>
                                <th>Loại</th>
                                <th>Hình ảnh</th>
                                <th>Ngày xoá</th>
                                <th style={{ width: "20%" }}>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {trashPosts.length > 0 ? (
                                trashPosts.map((item, index) => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.title}</td>
                                        <td>{item.type}</td>
                                        <td>
                                            <img
                                                src={`${imageURL}/public/${item.thumbnail}`}
                                                alt={item.title}
                                                style={{
                                                    width: "100px",
                                                    height: "100px",
                                                    objectFit: "cover",
                                                    border: "2px solid #dee2e6",
                                                    borderRadius: "8px",
                                                    boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
                                                }}
                                            />
                                        </td>
                                        <td>{new Date(item.updated_at).toLocaleDateString()}</td>
                                        <td>
                                            <button className="btn btn-sm btn-info me-1" onClick={() => handleRestore(item.id)}>
                                                <i className="fa fa-undo"></i> Khôi phục
                                            </button>
                                            <button className="btn btn-sm btn-danger" onClick={() => handlePermanentDelete(item.id)}>
                                                <i className="fa fa-trash"></i> Xoá vĩnh viễn
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center">Không có bài viết nào trong thùng rác</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default PostTrash;
