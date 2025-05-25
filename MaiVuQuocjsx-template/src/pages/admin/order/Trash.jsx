import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import apiOrder from '../../../api/apiOrders';
import axiosInstance from '../../../api/axios';


function OrderTrash() {
    const [trashOrders, setTrashOrders] = useState([]);

    useEffect(() => {
        const fetchTrashOrders = async () => {
            try {
                const allOrders = await apiOrder.getAll();
                const deletedOrders = allOrders.filter(o => o.status === 0);
                setTrashOrders(deletedOrders);
            } catch (error) {
                console.error("Lỗi khi load đơn hàng thùng rác:", error.message);
            }
        };

        fetchTrashOrders();
    }, []);

    // Khôi phục đơn hàng (status = 1)
    const handleRestore = async (id) => {
        if (!window.confirm("Khôi phục đơn hàng này?")) return;
        try {
            await apiOrder.updateStatus(id, 1); // cần có API này
            setTrashOrders(prev => prev.filter(o => o.id !== id));
        } catch (error) {
            console.error("Lỗi khi khôi phục:", error.message);
        }
    };

    // Xoá vĩnh viễn đơn hàng
    const handlePermanentDelete = async (id) => {
        if (!window.confirm("Xoá vĩnh viễn đơn hàng này?")) return;

        const adminToken = localStorage.getItem("adminToken");
        if (!adminToken) {
            alert("Bạn cần đăng nhập để thực hiện thao tác này.");
            return;
        }

        try {
            axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${adminToken}`;
            axiosInstance.enableJson();

            const result = await axiosInstance.delete(`/orders/${id}`);

            if (result.status === 200) {
                setTrashOrders(prev => prev.filter(o => o.id !== id));
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
                            <strong>Đơn hàng đã xoá</strong>
                        </div>
                        <div className="col-md-6 text-end">
                            <Link to="/admin/listOrder" className="btn btn-sm btn-success">
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
                                <th>Họ tên</th>
                                <th>Điện thoại</th>
                                <th>Email</th>
                                <th>Địa chỉ</th>
                                <th>Ngày xoá</th>
                                <th style={{ width: "20%" }}>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {trashOrders.length > 0 ? (
                                trashOrders.map((item, index) => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.phone}</td>
                                        <td>{item.email}</td>
                                        <td>{item.address}</td>
                                        <td>{new Date(item.updated_at).toLocaleDateString()}</td>
                                        <td>
                                            <button className="btn btn-sm btn-info me-1" onClick={() => handleRestore(item.id)}>
                                                <i className="fa fa-undo"></i> Khôi phục
                                            </button>
                                            {/* <button className="btn btn-sm btn-danger" onClick={() => handlePermanentDelete(item.id)}>
                                                <i className="fa fa-trash"></i> Xoá vĩnh viễn
                                            </button> */}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="text-center">Không có đơn hàng nào trong thùng rác</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default OrderTrash;
