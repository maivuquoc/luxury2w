import { useEffect, useState } from "react";
import apiOrderDetails from "../../../api/apiOrderDetails"; // đảm bảo đúng đường dẫn
import { Link } from "react-router-dom";

// Icon
import { FaTrash } from "react-icons/fa";
import { MdEditSquare } from "react-icons/md";
import { IoEyeSharp, IoAddCircle } from "react-icons/io5";
import { FaTrashCanArrowUp } from "react-icons/fa6";

function OrderDetailList() {
    const [orderDetails, setOrderDetails] = useState([]);

    useEffect(() => {
        apiOrderDetails.getAll().then(res => {
            try {
                const orderdetailData = res
                    .filter(item => item.status === 1) // lọc ở đây status = 1
                    .map(item => ({
                        id: item.id,
                        order_id: item.order_id,
                        product_id: item.product_id,
                        price: item.price,
                        discount: item.discount,
                        qty: item.qty,
                        amount: item.amount,
                        is_paid: item.is_paid,
                    }));
                setOrderDetails(orderdetailData);
            } catch (e) {
                console.error("Lỗi khi xử lý dữ liệu:", e);
            }
        });
    }, []);

    // Xoá tạm thời (cập nhật status = 0)
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Bạn có chắc chắn muốn chuyển đơn hàng này vào thùng rác?");
        if (!confirmDelete) return;

        try {
            await apiOrderDetails.updateStatus(id, 0); // gọi API cập nhật status
            setOrderDetails(prev => prev.filter(orderdetail => orderdetail.id !== id));
            alert("Đơn hàng đã được chuyển vào thùng rác!");
        } catch (error) {
            console.error("Lỗi khi xoá tạm thời sản phẩm:", error.response?.data || error.message);
            alert("Đã xảy ra lỗi khi xoá sản phẩm.");
        }
    };

    return (
        <div>
            <main className="flex-grow-1 p-4 bg-light">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="m-0">Chi tiết đơn hàng</h2>
                    <Link to={`/admin/trashOrderDetail`}>
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
                                <th>Order ID</th>
                                <th>Product ID</th>
                                <th>Giá</th>
                                <th>Giảm giá</th>
                                <th>Số lượng</th>
                                <th>Thành tiền</th>
                                <th>Thanh toán</th>
                                <th className="text-nowrap">Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderDetails.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.id}</td>
                                    <td>{item.order_id}</td>
                                    <td>{item.product_id}</td>
                                    <td>{item.price.toLocaleString('vi-VN')} VNĐ</td>
                                    <td>{item.discount}%</td>
                                    <td>{item.qty}</td>
                                    <td>{item.amount.toLocaleString('vi-VN')} VNĐ</td>
                                    <td>
                                        <span
                                            className={`badge ${
                                                item.is_paid === 1 ? 'bg-success' : 'bg-danger'
                                            }`}
                                        >
                                            {item.is_paid === 1 ? "Đã thanh toán" : "Chưa thanh toán"}
                                        </span>
                                    </td>
                                    <td className="text-nowrap">
                                        <Link to={`/admin/showOrderDetail/${item.id}`}>
                                            <button className="btn btn-sm btn-secondary me-1">
                                                <IoEyeSharp /> Xem
                                            </button>
                                        </Link>
                                        {/* <Link to="/admin/addOrderDetail">
                                            <button className="btn btn-sm btn-success me-1">
                                                <IoAddCircle /> Thêm
                                            </button>
                                        </Link> */}
                                        <Link to={`/admin/editOrderDetail/${item.id}`}>
                                            <button className="btn btn-sm btn-info me-1">
                                                <MdEditSquare /> Sửa
                                            </button>
                                        </Link>
                                        <button className="btn btn-sm btn-danger" onClick={() => handleDelete(item.id)}>
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

export default OrderDetailList;
