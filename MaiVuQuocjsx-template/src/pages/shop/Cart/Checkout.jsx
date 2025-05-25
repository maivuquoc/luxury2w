import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import apiOrder from "../../../api/apiOrders";
import apiOrderDetails from "../../../api/apiOrderDetails";
import { CLEAR_CART } from "../../../redux/action/cartAction";

const Checkout = () => {
    const getDataCart = useSelector(state => state.cart.carts);
    const totalAmount = useSelector(state => state.cart.totalAmount);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Lấy thông tin người dùng từ localStorage
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const userId = user?.id;

    // Form state
    const [Name, setName] = useState("");
    const [Phone, setPhone] = useState("");
    const [Email, setEmail] = useState("");
    const [Address, setAddress] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    // Đẩy dữ liệu người dùng vào form khi đã đăng nhập
    useEffect(() => {
        if (user) {
            setName(user.name || "");
            setPhone(user.phone || "");
            setEmail(user.email || "");
            setAddress(user.address || "");
        }
    }, [user]);

    const handleOrder = async (e) => {
        e.preventDefault();

        if (!userId) {
            setErrorMsg("Vui lòng đăng nhập để tiếp tục đặt hàng.");
            return;
        }

        const orderData = {
            user_id: userId,
            name: Name,
            phone: Phone,
            email: Email,
            address: Address,
            created_at: Date.now(),
            updated_at: Date.now(),
            updated_by: 1,
            status: 1,
        };

        try {
            // 1. Tạo đơn hàng
            const orderRes = await apiOrder.createOrderUser(orderData);
            const orderId = orderRes.id;

            // 2. Gửi từng chi tiết đơn hàng
            for (const item of getDataCart) {
                const detail = {
                    order_id: orderId,
                    product_id: item.id,
                    price: item.price,
                    qty: item.quantity,
                    discount: item.discount,
                    amount: item.price * item.quantity,
                    is_paid: 0,
                    status: 1,
                };
                await apiOrderDetails.createOrderDetailUser(detail);
            }

            // 3. Thông báo và reset
            alert("Đặt hàng thành công!");
            dispatch(CLEAR_CART());
            navigate("/");
        } catch (err) {
            console.error("Lỗi đặt hàng:", err.message);
            alert("Đặt hàng thất bại!");
        }
    };

    return (
        <div className="container mt-4">
            <div className="row">
                {/* Thông tin khách hàng */}
                <div className="col-md-6">
                    <div className="card p-3">
                        <h4>Thông tin người nhận hàng</h4>
                        {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
                        <form onSubmit={handleOrder}>
                            <div className="mb-3">
                                <label>Họ và tên</label>
                                <input type="text" className="form-control" required value={Name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label>Số điện thoại</label>
                                <input type="tel" className="form-control" required value={Phone} onChange={(e) => setPhone(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label>Email</label>
                                <input type="email" className="form-control" value={Email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label>Địa chỉ giao hàng</label>
                                <textarea className="form-control" rows="3" required value={Address} onChange={(e) => setAddress(e.target.value)} />
                            </div>
                            <button type="submit" className="btn btn-success w-100">Xác nhận đặt hàng</button>
                        </form>
                    </div>
                </div>

                {/* Thông tin đơn hàng */}
                <div className="col-md-6">
                    <div className="card p-3">
                        <h4>Thông tin đơn hàng</h4>
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Sản phẩm</th>
                                        <th>Đơn giá</th>
                                        <th>Số lượng</th>
                                        <th>Thành tiền</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {getDataCart.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.name}</td>
                                            <td>{item.price.toLocaleString()} VNĐ</td>
                                            <td>{item.quantity}</td>
                                            <td>{(item.price * item.quantity).toLocaleString()} VNĐ</td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td colSpan="3" className="text-end"><strong>Tổng cộng</strong></td>
                                        <td><strong>{totalAmount.toLocaleString()} VNĐ</strong></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
