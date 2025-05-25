import { useEffect, useState } from "react";
import apiOrder from "../../../api/apiOrders"; // API riêng cho đơn hàng
// Icons
import { FaTrash } from "react-icons/fa";
import { IoEyeSharp, IoAddCircle } from "react-icons/io5";
import { MdEditSquare } from "react-icons/md";
import { FaTrashCanArrowUp } from "react-icons/fa6";
import { Link } from "react-router-dom";

function OrderList() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        apiOrder.getAll().then(res => {
            try {
                const orderData = res
                    .filter(order => order.status === 1)
                    .map(order => ({
                        id: order.id,
                        user_id: order.user_id,
                        name: order.name,
                        phone: order.phone,
                        email: order.email,
                        address: order.address,
                        created_at: order.created_at,
                        updated_at: order.updated_at,
                        updated_by: order.updated_by,
                        status: order.status,
                        is_paid: order.is_paid
                    }));
                setOrders(orderData);
            } catch (e) {
                console.error("Lỗi khi xử lý dữ liệu đơn hàng:", e);
            }
        });
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Bạn có chắc chắn muốn chuyển đơn hàng này vào thùng rác?");
        if (!confirmDelete) return;

        try {
            await apiOrder.updateStatus(id, 0);
            setOrders(prev => prev.filter(order => order.id !== id));
            alert("Đơn hàng đã được chuyển vào thùng rác!");
        } catch (error) {
            console.error("Lỗi khi xoá tạm thời đơn hàng:", error.response?.data || error.message);
            alert("Đã xảy ra lỗi khi xoá đơn hàng.");
        }
    };

    return (
        <div>
            <main className="flex-grow-1 p-4 bg-light">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="m-0">Danh sách đơn hàng</h2>
                    <Link to={`/admin/trashOrder`}>
                        <button className="btn btn-sm btn-warning">
                            <FaTrashCanArrowUp /> Thùng rác
                        </button>
                    </Link>
                </div>

                <div className="table-responsive">
                    <table className="table table-bordered table-hover">
                        <thead className="table-light">
                            <tr>
                                <th>ID</th>
                                <th>User ID</th>
                                <th>Họ tên</th>
                                <th>SĐT</th>
                                <th>Email</th>
                                <th>Địa chỉ</th>
                                <th>Ngày tạo</th>
                                <th>Ngày Cập nhật</th>
                                <th>Thanh toán</th>
                                <th className="text-nowrap">Hoạt động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order, index) => (
                                <tr key={index}>
                                    <td>{order.id}</td>
                                    <td>{order.user_id}</td>
                                    <td>{order.name}</td>
                                    <td>{order.phone}</td>
                                    <td>{order.email}</td>
                                    <td>{order.address}</td>
                                    <td>{new Date(order.created_at).toLocaleString()}</td>
                                    <td>{new Date(order.updated_at).toLocaleString()}</td>
                                    <td>
                                        {order.is_paid === 1 ? (
                                            <span className="badge bg-success">Đã thanh toán</span>
                                        ) : order.is_paid === 2 ? (
                                            <span className="badge bg-warning text-dark">Đang chờ thanh toán</span>
                                        ) : (
                                            <span className="badge bg-danger">Chưa thanh toán</span>
                                        )}
                                    </td>

                                    <td className="text-nowrap">
                                        <Link to={`/admin/showOrder/${order.id}`}>
                                            <button className="btn btn-sm btn-secondary me-1">
                                                <IoEyeSharp /> Xem
                                            </button>
                                        </Link>
                                        {/* <Link to="/admin/addOrder">
                                            <button className="btn btn-sm btn-success me-1">
                                                <IoAddCircle /> Thêm
                                            </button>
                                        </Link> */}
                                        <Link to={`/admin/editOrder/${order.id}`}>
                                            <button className="btn btn-sm btn-info me-1">
                                                <MdEditSquare /> Sửa
                                            </button>
                                        </Link>
                                        <button className="btn btn-sm btn-danger" onClick={() => handleDelete(order.id)}>
                                            <FaTrash /> Xoá
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}

export default OrderList;
