import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import apiTopic from '../../../api/apiTopics'; 
import axiosInstance from '../../../api/axios';

function TopicTrash() {
    const [trashTopics, setTrashTopics] = useState([]);

    useEffect(() => {
        const fetchTrashTopics = async () => {
            try {
                const allTopics = await apiTopic.getAll();
                const deletedTopics = allTopics.filter(t => t.status === 0);
                setTrashTopics(deletedTopics);
            } catch (error) {
                console.error("Lỗi khi load topic thùng rác:", error.message);
            }
        };

        fetchTrashTopics();
    }, []);

    const handleRestore = async (id) => {
        if (!window.confirm("Khôi phục chủ đề này?")) return;
        try {
            await apiTopic.updateStatus(id, 1);
            setTrashTopics(prev => prev.filter(t => t.id !== id));
        } catch (error) {
            console.error("Lỗi khi khôi phục chủ đề:", error.message);
        }
    };

    const handlePermanentDelete = async (id) => {
        if (!window.confirm("Xoá vĩnh viễn chủ đề này?")) return;

        const adminToken = localStorage.getItem("adminToken");
        if (!adminToken) {
            alert("Bạn cần đăng nhập để thực hiện thao tác này.");
            return;
        }

        try {
            axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${adminToken}`;
            axiosInstance.enableJson();
            const result = await axiosInstance.delete(`/topics/${id}`);

            if (result.status === 200) {
                setTrashTopics(prev => prev.filter(t => t.id !== id));
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
                            <strong>Chủ đề đã xoá</strong>
                        </div>
                        <div className="col-md-6 text-end">
                            <Link to="/admin/listtopic" className="btn btn-sm btn-success">
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
                                <th>Tên chủ đề</th>
                                <th>Slug</th>
                                <th>Ngày xoá</th>
                                <th style={{ width: "20%" }}>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {trashTopics.length > 0 ? (
                                trashTopics.map((item, index) => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.slug}</td>
                                        <td>{new Date(item.updated_at).toLocaleString("vi-VN")}</td>
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
                                    <td colSpan="5" className="text-center">Không có chủ đề nào trong thùng rác</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default TopicTrash;
