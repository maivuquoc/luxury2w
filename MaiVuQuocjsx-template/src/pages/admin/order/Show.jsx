import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
// api
import apiOrder from '../../../api/apiOrders';

function OrderShow() {
    const { id } = useParams(); // Lấy ID từ URL
    const [order, setOrder] = useState(null);

    useEffect(() => {
        apiOrder.getOne(id)
            .then((res) => {
                setOrder(res);
            })
            .catch((err) => {
                console.error("Lỗi khi gọi API đơn hàng:", err);
            });
    }, [id]);

    if (!order) return <div className="p-4">Đang tải dữ liệu đơn hàng...</div>;

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-header bg-info text-white">
                    <div className="row">
                        <div className="col-md-6">
                            <strong>Chi tiết đơn hàng: #{order.id}</strong>
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
                    <div className="row mb-3">
                        <div className="col-md-3 fw-bold">User ID:</div>
                        <div className="col-md-9">{order.user_id}</div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-3 fw-bold">Họ tên:</div>
                        <div className="col-md-9">{order.name}</div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-3 fw-bold">Số điện thoại:</div>
                        <div className="col-md-9">{order.phone}</div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-3 fw-bold">Email:</div>
                        <div className="col-md-9">{order.email}</div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-3 fw-bold">Địa chỉ:</div>
                        <div className="col-md-9">{order.address}</div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-3 fw-bold">Thanh toán:</div>
                        <div className="col-md-9">
                            {order.is_paid === 1 ? (
                                <span className="badge bg-success">Đã thanh toán</span>
                            ) : order.is_paid === 2 ? (
                                <span className="badge bg-warning text-dark">Đang chờ thanh toán</span>
                            ) : (
                                <span className="badge bg-danger">Chưa thanh toán</span>
                            )}
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-3 fw-bold">Ngày tạo:</div>
                        <div className="col-md-9">{new Date(order.created_at).toLocaleString()}</div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-3 fw-bold">Ngày cập nhật:</div>
                        <div className="col-md-9">{new Date(order.updated_at).toLocaleString()}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderShow;
