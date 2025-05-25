import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import apiOrderDetails from '../../../api/apiOrderDetails'; 
import axiosInstance from '../../../api/axios';

function OrderDetailTrash() {
    const [trashOrders, setTrashOrders] = useState([]);

    // Lấy các đơn hàng đã xoá
    useEffect(() => {
        const fetchTrashOrders = async () => {
            try {
                const allOrders = await apiOrderDetails.getAll();
                const deletedOrders = allOrders.filter(order => order.status === 0);
                setTrashOrders(deletedOrders);
            } catch (error) {
                console.error("Lỗi khi load đơn hàng trong thùng rác:", error.message);
            }
        };

        fetchTrashOrders();
    }, []);

    // Khôi phục đơn hàng
    const handleRestore = async (id) => {
        if (!window.confirm("Khôi phục đơn hàng này?")) return;
        try {
            await apiOrderDetails.updateStatus(id, 1);
            setTrashOrders(prev => prev.filter(order => order.id !== id));
        } catch (error) {
            console.error("Lỗi khi khôi phục đơn hàng:", error.message);
        }
    };

    // Xoá vĩnh viễn
        const handlePermanentDelete = async (id) => {
            if (!window.confirm("Xoá vĩnh viễn này?")) return;
    
            const adminToken = localStorage.getItem("adminToken");
            if (!adminToken) {
                alert("Bạn cần đăng nhập để thực hiện thao tác này.");
                return;
            }
    
            try {
                axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${adminToken}`;
                axiosInstance.enableJson();
    
                const result = await axiosInstance.delete(`/orderdetails/${id}`);
    
                if (result.status === 200) {
                    setTrashOrders(prev => prev.filter(order => order.id !== id));
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
                            <strong>Chi tiết đơn hàng đã xoá</strong>
                        </div>
                        <div className="col-md-6 text-end">
                            <Link to="/admin/listorderdetail" className="btn btn-sm btn-success">
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
                                <th>ID</th>
                                <th>Order ID</th>
                                <th>Product ID</th>
                                <th>Số lượng</th>
                                <th>Giá</th>
                                <th style={{ width: "20%" }}>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {trashOrders.length > 0 ? (
                                trashOrders.map((item, index) => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.order_id}</td>
                                        <td>{item.product_id}</td>
                                        <td>{item.qty}</td>
                                        <td>{item.price}</td>
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
                                    <td colSpan="7" className="text-center">Không có chi tiết đơn hàng nào trong thùng rác</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default OrderDetailTrash;
