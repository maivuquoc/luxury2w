import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import apiOrders from '../../../api/apiOrders';
import { FaBoxOpen, FaSpinner, FaExclamationCircle, FaMoneyCheckAlt, FaInfoCircle, FaFileExport } from 'react-icons/fa';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const storedUser = localStorage.getItem('currentUser');
  const user_id = storedUser ? JSON.parse(storedUser).id : null;

  useEffect(() => {
    if (!user_id) return;

    apiOrders.getAllOrderUser(user_id)
      .then((res) => {
        if (Array.isArray(res) && res.length > 0) {
          setOrders(res);
        } else {
          setError("Bạn chưa có đơn hàng nào.");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi khi gọi API:", err);
        setError("Lỗi khi tải đơn hàng");
        setLoading(false);
      });
  }, [user_id]);

  const handleDelete = async (orderId) => {
    if (!window.confirm(`Bạn có chắc chắn muốn xoá đơn hàng #${orderId}?`)) return;

    try {
      await apiOrders.deleteOrderUser(orderId);
      setOrders(prev => prev.filter(order => order.id !== orderId));
      alert("Đã xoá đơn hàng thành công.");
    } catch (err) {
      console.error("Lỗi khi xoá đơn hàng:", err);
      alert("Đã xảy ra lỗi khi xoá đơn hàng.");
    }
  };

  //Xuất ra file excel
  const exportSingleOrderToExcel = (order, index) => {
    const data = [{
      "STT": index,
      "Người nhận": order.name,
      "Điện thoại": order.phone,
      "Email": order.email,
      "Địa chỉ": order.address,
      "Ngày tạo": new Date(order.created_at).toLocaleString(),
      "Ngày cập nhật": new Date(order.updated_at).toLocaleString(),
      "Thanh toán": order.is_paid === 1
        ? "Đã thanh toán"
        : order.is_paid === 2
          ? "Đang chờ thanh toán"
          : "Chưa thanh toán",
    }];

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "DonHang");

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });

    // Hàm bỏ dấu tiếng Việt
    function removeVietnameseTones(str) {
      return str.normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/Đ/g, 'D');
    }

    // Bỏ dấu, sau đó thay ký tự không hợp lệ thành _
    const safeName = removeVietnameseTones(order.name).replace(/[^a-zA-Z0-9-_]/g, '_');
    const fileName = `don_hang_${safeName}_${order.id}.xlsx`;
    saveAs(blob, fileName);
  };


  const renderContent = () => {
    if (loading) {
      return (
        <div className="text-center py-5">
          <FaSpinner className="fa-spin text-warning" size={32} />
          <p className="mt-3">Đang tải đơn hàng...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="alert alert-warning text-center py-5">
          <FaExclamationCircle className="me-2" size={24} />
          {error}
        </div>
      );
    }

    return (
      <div className="card border-0 shadow-sm" style={{ backgroundColor: '#fffbea' }}>
        <div className="card-header bg-warning bg-opacity-75 text-dark">
          <h5 className="mb-0"><FaBoxOpen className="me-2" />Danh sách đơn hàng</h5>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Người nhận</th>
                  <th>Điện thoại</th>
                  <th>Email</th>
                  <th>Địa chỉ</th>
                  <th>Ngày tạo</th>
                  <th>Ngày cập nhật</th>
                  <th>Thanh toán</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={order.id}>
                    <td>{index + 1}</td>
                    <td>{order.name}</td>
                    <td>{order.phone}</td>
                    <td>{order.email}</td>
                    <td>{order.address}</td>
                    <td>{new Date(order.created_at).toLocaleDateString()}</td>
                    <td>{new Date(order.updated_at).toLocaleDateString()}</td>
                    <td>
                      {order.is_paid === 1 ? (
                        <span className="badge bg-success">Đã thanh toán</span>
                      ) : order.is_paid === 2 ? (
                        <span className="badge bg-warning text-dark">Đang chờ thanh toán</span>
                      ) : (
                        <span className="badge bg-danger">Chưa thanh toán</span>
                      )}
                    </td>

                    <td>
                      <div className="d-flex flex-wrap gap-1">
                        <Link to={`/orders/${order.id}`}>
                          <button className="btn btn-sm btn-info d-flex align-items-center">
                            <FaInfoCircle className="me-1" /> Chi tiết
                          </button>
                        </Link>
                        <button
                          className="btn btn-sm btn-warning d-flex align-items-center"
                          onClick={() => handlePayment(order.id)}
                        >
                          <FaMoneyCheckAlt className="me-1" /> Thanh toán
                        </button>
                        <button
                          className="btn btn-sm btn-danger d-flex align-items-center"
                          onClick={() => handleDelete(order.id)}
                          disabled={order.is_paid === 1}
                        >
                          <FaBoxOpen className="me-1" /> Xoá
                        </button>
                        <button
                          className="btn btn-sm btn-success d-flex align-items-center"
                          onClick={() => exportSingleOrderToExcel(order, index + 1)}
                        >
                          <FaFileExport className="me-1" /> Xuất ra Excel
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container-md py-5 px-3">
      {renderContent()}
    </div>
  );
};

export default Orders;
