import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
// API
import apiOrderDetail from '../../../api/apiOrderDetails';

function OrderDetailShow() {
    const { id } = useParams();
    const [orderDetail, setOrderDetail] = useState(null);

    useEffect(() => {
        apiOrderDetail.getOne(id)
            .then((res) => setOrderDetail(res))
            .catch((err) => console.error("Lỗi khi gọi API chi tiết đơn hàng:", err));
    }, [id]);

    if (!orderDetail) return <div className="p-4">Đang tải dữ liệu chi tiết đơn hàng...</div>;

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-header bg-info text-white">
                    <div className="row">
                        <div className="col-md-6">
                            <strong>Chi tiết đơn hàng: #{orderDetail.id}</strong>
                        </div>
                        <div className="col-md-6 text-end">
                            <Link to="/admin/listOrderDetail" className="btn btn-sm btn-success">
                                <i className="fa fa-long-arrow-alt-left me-1"></i>
                                Về danh sách
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="card-body">
                    <div className="row mb-3">
                        <div className="col-md-3 fw-bold">ID:</div>
                        <div className="col-md-9">{orderDetail.id}</div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-3 fw-bold">Order ID:</div>
                        <div className="col-md-9">{orderDetail.order_id}</div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-3 fw-bold">Product ID:</div>
                        <div className="col-md-9">{orderDetail.product_id}</div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-3 fw-bold">Giá:</div>
                        <div className="col-md-9">{orderDetail.price} VNĐ</div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-3 fw-bold">Giảm giá:</div>
                        <div className="col-md-9">{orderDetail.discount}%</div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-3 fw-bold">Số lượng:</div>
                        <div className="col-md-9">{orderDetail.qty}</div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-3 fw-bold">Thành tiền:</div>
                        <div className="col-md-9">{orderDetail.amount} VNĐ</div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-3 fw-bold">Trạng thái thanh toán:</div>
                        <div className="col-md-9">
                            {orderDetail.is_paid === 1 ? (
                                <span className="badge bg-success">Đã thanh toán</span>
                            ) : (
                                <span className="badge bg-danger">Chưa thanh toán</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderDetailShow;
