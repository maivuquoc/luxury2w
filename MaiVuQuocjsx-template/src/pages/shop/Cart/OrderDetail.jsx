import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import apiOrders from "../../../api/apiOrders"; // Đảm bảo API lấy thông tin đơn hàng
import apiOrderDetails from "../../../api/apiOrderDetails"; // API lấy chi tiết đơn hàng

import { FaArrowLeft, FaSpinner, FaExclamationCircle } from "react-icons/fa";

function OrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [orderDetails, setOrderDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Lấy thông tin đơn hàng
    apiOrders.getOne(id)
      .then((res) => {
        if (res && res.id) {
          setOrder(res);
        } else {
          setError("Không tìm thấy đơn hàng.");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi khi tải chi tiết đơn hàng:", err);
        setError("Lỗi khi tải dữ liệu");
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    apiOrderDetails.getAllOrderDetail(id)
      .then((res) => {
        setOrderDetails(res);
      })
      .catch((err) => {
        console.error("Lỗi khi tải chi tiết sản phẩm:", err);
        setError("Lỗi khi tải chi tiết sản phẩm");
      });
  }, [id]);

  if (loading) {
    return (
      <div className="text-center py-5">
        <FaSpinner className="fa-spin text-warning" size={32} />
        <p className="mt-3">Đang tải chi tiết đơn hàng...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger text-center py-5">
        <FaExclamationCircle className="me-2" />
        {error}
      </div>
    );
  }

  return (
    <div className="container-md py-5 px-3">
      <Link to={`/order-by-user/${order.user_id}`} className="btn btn-secondary mb-4">
        <FaArrowLeft className="me-1" />
        Quay lại danh sách
      </Link>

      <div className="row">
        {/* Cột trái - Chi tiết đơn hàng */}
        <div className="col-md-6 mb-4">
          <div className="card shadow-sm" style={{ backgroundColor: '#fffbea' }}>
            <div className="card-header bg-warning bg-opacity-75 text-dark">
              <h5>Chi tiết đơn hàng #{order.id}</h5>
            </div>
            <div className="card-body">
              <p><strong>Tên người nhận:</strong> {order.name}</p>
              <p><strong>Điện thoại:</strong> {order.phone}</p>
              <p><strong>Email:</strong> {order.email}</p>
              <p><strong>Địa chỉ:</strong> {order.address}</p>
              <p><strong>Trạng thái:</strong> {order.status}</p>
              <p><strong>Ngày tạo:</strong> {new Date(order.created_at).toLocaleString()}</p>
              <p><strong>Ngày cập nhật:</strong> {new Date(order.updated_at).toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Cột phải - Chi tiết sản phẩm trong đơn hàng */}
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-header bg-warning bg-opacity-75 text-dark">
              <h5>Tất cả sản phẩm</h5>
            </div>
            <div className="card-body">
              {orderDetails.length > 0 ? (
                <ul className="list-group">
                  {orderDetails.map((item, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                      <div>
                        <strong>Sản phẩm #{item.product_id}</strong>
                        <p>Số lượng: {item.qty}</p>
                        <p>Giá: {item.price.toLocaleString()} VNĐ</p>
                        <p>Thanh toán:
                          <span className={`ms-1 badge ${item.is_paid === 1 ? 'bg-success' : 'bg-danger'}`}>
                            {item.is_paid === 1 ? "Đã thanh toán" : "Chưa thanh toán"}
                          </span>
                        </p>

                      </div>
                      <div>
                        <p>Tổng: {item.amount.toLocaleString()} VNĐ</p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-center">Không có chi tiết sản phẩm cho đơn hàng này.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetail;
