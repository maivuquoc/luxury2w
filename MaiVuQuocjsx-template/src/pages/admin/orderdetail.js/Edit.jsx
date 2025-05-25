import { Link, useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../../api/axios';
import { useEffect, useState } from "react";

function OrderDetailEdit() {
    const { id } = useParams();
    const [OrderId, setOrderId] = useState("");
    const [ProductId, setProductId] = useState("");
    const [Price, setPrice] = useState("");
    const [Discount, setDiscount] = useState("");
    const [Qty, setQty] = useState("");
    const [Amount, setAmount] = useState("");
    const [IsPaid, setIsPaid] = useState(0);

    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        // Load danh sách đơn hàng và sản phẩm
        axiosInstance.get("/orders").then(res => setOrders(res.data));
        axiosInstance.get("/products").then(res => setProducts(res.data));

        // Load chi tiết đơn hàng
        axiosInstance.get(`/orderdetails/${id}`).then(res => {
            const orderDetail = res.data;
            setOrderId(orderDetail.order_id);
            setProductId(orderDetail.product_id);
            setPrice(orderDetail.price);
            setDiscount(orderDetail.discount);
            setQty(orderDetail.qty);
            setAmount(orderDetail.amount);
            setIsPaid(orderDetail.is_paid);
        });
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const orderDetailData = {
            order_id: parseInt(OrderId),
            product_id: parseInt(ProductId),
            price: parseFloat(Price),
            discount: parseFloat(Discount),
            qty: parseInt(Qty),
            amount: parseFloat(Amount),
            is_paid: IsPaid,
            status: 1,

        };

        // Kiểm tra token admin trước khi thao tác
        const adminToken = localStorage.getItem("adminToken");
        if (adminToken) {
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${adminToken}`;
        } else {
            alert("Bạn cần đăng nhập trước khi thực hiện thao tác này.");
            return;
        }

        try {
            const resOrderDetail = await axiosInstance.put(`/orderdetails/${id}`, orderDetailData);
            console.log("Cập nhật chi tiết đơn hàng thành công:", resOrderDetail);

            navigate("/admin/listOrderDetail");
        } catch (error) {
            console.error("Lỗi khi cập nhật chi tiết đơn hàng:", error.response?.data || error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
    <div className="card shadow-sm">
        <div className="card-header bg-light">
            <div className="row">
                <div className="col-6">
                    <strong className="text-primary">Chỉnh sửa chi tiết đơn hàng</strong>
                </div>
                <div className="col-6 text-end">
                    <Link className="btn btn-sm btn-success" to="/admin/listOrderDetail">
                        <i className="fa fa-long-arrow-alt-left me-1"></i>
                        Về danh sách đơn hàng
                    </Link>
                </div>
            </div>
        </div>

        <div className="card-body">
            <div className="row">
                {/* Cột trái */}
                <div className="col-md-9">
                    <div className="mb-3">
                        <label><strong>Đơn hàng</strong></label>
                        <select className="form-control" value={OrderId} disabled>
                            <option value="">-- Chọn đơn hàng --</option>
                            {orders.map(order => (
                                <option key={order.id} value={order.id}>
                                    Mã đơn: {order.id} - {order.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-3">
                        <label><strong>Sản phẩm</strong></label>
                        <select className="form-control" value={ProductId} disabled>
                            <option value="">-- Chọn sản phẩm --</option>
                            {products.map(product => (
                                <option key={product.id} value={product.id}>{product.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-3">
                        <label><strong>Giá</strong></label>
                        <input type="number" className="form-control" value={Price} readOnly />
                    </div>

                    <div className="mb-3">
                        <label><strong>Giảm giá</strong></label>
                        <input type="number" className="form-control" value={Discount} readOnly />
                    </div>

                    <div className="text-end">
                        <button type="submit" className="btn btn-sm btn-primary">
                            <i className="fa fa-save me-1"></i>
                            Lưu
                        </button>
                    </div>
                </div>

                {/* Cột phải */}
                <div className="col-md-3">
                    <div className="mb-3">
                        <label><strong>Số lượng</strong></label>
                        <input type="number" className="form-control" value={Qty} readOnly />
                    </div>

                    <div className="mb-3">
                        <label><strong>Tổng tiền</strong></label>
                        <input type="number" className="form-control" value={Amount} readOnly />
                    </div>

                    <div className="mb-3 form-check mt-4">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="isPaidCheck"
                            checked={IsPaid === 1}
                            onChange={(e) => setIsPaid(e.target.checked ? 1 : 0)}
                        />
                        <label className="form-check-label" htmlFor="isPaidCheck"><strong>Đã thanh toán</strong></label>
                    </div>
                </div>
            </div>
        </div>
    </div>
</form>

    );
}

export default OrderDetailEdit;
