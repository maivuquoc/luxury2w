import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import apiCategory from '../../../api/apiCategories';
import { imageURL } from "../../../api/config";
import axiosInstance from '../../../api/axios';

function CategoryTrash() {
    const [trashCategories, setTrashCategories] = useState([]);

    useEffect(() => {
        const fetchTrashCategories = async () => {
            try {
                const allCategories = await apiCategory.getAll();
                const deletedCategories = allCategories.filter(c => c.status === 0);
                setTrashCategories(deletedCategories);
            } catch (error) {
                console.error("Lỗi khi tải danh mục thùng rác:", error.message);
            }
        };

        fetchTrashCategories();
    }, []);

    const handleRestore = async (id) => {
        if (!window.confirm("Khôi phục danh mục này?")) return;
        try {
            await apiCategory.updateStatus(id, 1);
            setTrashCategories(prev => prev.filter(c => c.id !== id));
        } catch (error) {
            console.error("Lỗi khi khôi phục:", error.message);
        }
    };

    const handlePermanentDelete = async (id) => {
        if (!window.confirm("Xoá vĩnh viễn danh mục này?")) return;

        const adminToken = localStorage.getItem("adminToken");
        if (!adminToken) {
            alert("Bạn cần đăng nhập để thực hiện thao tác này.");
            return;
        }

        try {
            axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${adminToken}`;
            axiosInstance.enableJson();

            const result = await axiosInstance.delete(`/categories/${id}`);

            if (result.status === 200) {
                setTrashCategories(prev => prev.filter(c => c.id !== id));
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
                            <strong>Danh mục đã xoá</strong>
                        </div>
                        <div className="col-md-6 text-end">
                            <Link to="/admin/listCategory" className="btn btn-sm btn-success">
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
                                <th>Tên danh mục</th>
                                <th>Slug</th>
                                <th>Hình ảnh</th>
                                <th>Ngày xoá</th>
                                <th style={{ width: "20%" }}>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {trashCategories.length > 0 ? (
                                trashCategories.map((item, index) => (
                                    <tr key={item.id}>
                                        <td>{index + 1}</td>
                                        <td>{item.name}</td>
                                        <td>{item.slug}</td>
                                        <td>
                                            <img
                                                src={`${imageURL}/public/${item.thumbnail}`}
                                                alt={item.name}
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
                                    <td colSpan="6" className="text-center">Không có danh mục nào trong thùng rác</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default CategoryTrash;
