import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../../api/axios';
import { useEffect, useState } from "react";
import apiOrderDetails from '../../../api/apiOrderDetails';

function OrderDetailAdd() {
    const [OrderId, setOrderId] = useState("");
    const [ProductId, setProductId] = useState("");
    const [Price, setPrice] = useState("");
    const [Discount, setDiscount] = useState("");
    const [Qty, setQty] = useState("");
    const [Amount, setAmount] = useState("");
    const [isPaid, setIsPaid] = useState(false);

    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        axiosInstance.get("/orders").then(res => setOrders(res.data));
        axiosInstance.get("/products").then(res => setProducts(res.data));
    }, []);

    useEffect(() => {
        const priceNum = parseFloat(Price) || 0;
        const discountNum = parseFloat(Discount) || 0;
        const qtyNum = parseInt(Qty) || 0;
        const total = (priceNum - discountNum) * qtyNum;
        setAmount(total.toFixed(2));
    }, [Price, Discount, Qty]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const adminToken = localStorage.getItem("adminToken");
        if (!adminToken) {
            alert("Bạn cần đăng nhập để thực hiện thao tác này.");
            return;
        }

        const orderDetailData = {
            order_id: parseInt(OrderId),
            product_id: parseInt(ProductId),
            price: parseFloat(Price),
            discount: parseFloat(Discount) || 0,
            qty: parseInt(Qty),
            amount: parseFloat(Amount),
            is_paid: isPaid ? 1 : 0,
            status: 1,
        };

        try {
            const res = await apiOrderDetails.createOrderDetail(orderDetailData);
            console.log("Thêm chi tiết đơn hàng thành công:", res.data);
            navigate("/admin/listOrderDetail");
        } catch (error) {
            alert("Lỗi khi thêm chi tiết đơn hàng: " + error.message);
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="card shadow-sm">
                <div className="card-header bg-light">
                    <div className="row">
                        <div className="col-6">
                            <strong className="text-primary">Thêm chi tiết đơn hàng</strong>
                        </div>
                        <div className="col-6 text-end">
                            <Link className="btn btn-sm btn-success" to="/admin/listorderdetail">
                                <i className="fa fa-long-arrow-alt-left me-1"></i>
                                Về danh sách
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="card-body">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label><strong>Đơn hàng</strong></label>
                                <select className="form-control" value={OrderId} onChange={(e) => setOrderId(e.target.value)} required>
                                    <option value="">-- Chọn đơn hàng --</option>
                                    {orders.map(order => (
                                        <option key={order.id} value={order.id}>#{order.id} - {order.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-3">
                                <label><strong>Sản phẩm</strong></label>
                                <select className="form-control" value={ProductId} onChange={(e) => setProductId(e.target.value)} required>
                                    <option value="">-- Chọn sản phẩm --</option>
                                    {products.map(product => (
                                        <option key={product.id} value={product.id}>{product.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-3">
                                <label><strong>Giá</strong></label>
                                <input type="number" className="form-control" value={Price} onChange={(e) => setPrice(e.target.value)} required />
                            </div>

                            <div className="mb-3">
                                <label><strong>Giảm giá</strong></label>
                                <input type="number" className="form-control" value={Discount} onChange={(e) => setDiscount(e.target.value)} />
                            </div>

                            <div className="text-end">
                                <button type="submit" className="btn btn-sm btn-primary">
                                    <i className="fa fa-save me-1"></i>
                                    Lưu
                                </button>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="mb-3">
                                <label><strong>Số lượng</strong></label>
                                <input type="number" className="form-control" value={Qty} onChange={(e) => setQty(e.target.value)} required />
                            </div>

                            <div className="mb-3">
                                <label><strong>Thành tiền</strong></label>
                                <input type="text" className="form-control" value={Amount} readOnly />
                            </div>

                            <div className="mb-3 form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="isPaid"
                                    checked={isPaid}
                                    onChange={(e) => setIsPaid(e.target.checked)}
                                />
                                <label className="form-check-label" htmlFor="isPaid"><strong>Đã thanh toán</strong></label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default OrderDetailAdd;
