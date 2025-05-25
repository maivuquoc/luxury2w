import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import apiBanner from '../../../api/apiBanners';
import { imageURL } from "../../../api/config";
import axiosInstance from '../../../api/axios';

function BannerTrash() {
    const [trashBanners, setTrashBanners] = useState([]);

    // Gọi API lấy banner đã xoá (status = 0)
    useEffect(() => {
        const fetchTrashBanners = async () => {
            try {
                const allBanners = await apiBanner.getAll();
                const deletedBanners = allBanners.filter(b => b.status === 0);
                setTrashBanners(deletedBanners);
            } catch (error) {
                console.error("Lỗi khi load banner thùng rác:", error.message);
            }
        };

        fetchTrashBanners();
    }, []);

    // Khôi phục banner
    const handleRestore = async (id) => {
        if (!window.confirm("Khôi phục banner này?")) return;
        try {
            await apiBanner.updateStatus(id, 1); // Cần API cập nhật status
            setTrashBanners(prev => prev.filter(b => b.id !== id));
        } catch (error) {
            console.error("Lỗi khi khôi phục banner:", error.message);
        }
    };

    // Xoá vĩnh viễn banner
    const handlePermanentDelete = async (id) => {
        if (!window.confirm("Xoá vĩnh viễn banner này?")) return;

        const adminToken = localStorage.getItem("adminToken");
        if (!adminToken) {
            alert("Bạn cần đăng nhập để thực hiện thao tác này.");
            return;
        }

        try {
            axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${adminToken}`;
            axiosInstance.enableJson();

            const result = await axiosInstance.delete(`/banners/${id}`);

            if (result.status === 200) {
                setTrashBanners(prev => prev.filter(b => b.id !== id));
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
                            <strong>Banner đã xoá</strong>
                        </div>
                        <div className="col-md-6 text-end">
                            <Link to="/admin/listbanner" className="btn btn-sm btn-success">
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
                                <th>Tên banner</th>
                                <th>Vị trí</th>
                                <th>Hình ảnh</th>
                                <th>Ngày xoá</th>
                                <th style={{ width: "20%" }}>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {trashBanners.length > 0 ? (
                                trashBanners.map((item, index) => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.position}</td>
                                        <td>
                                            <img
                                                src={`${imageURL}/public/${item.image}`}
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
                                    <td colSpan="6" className="text-center">Không có banner nào trong thùng rác</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default BannerTrash;
