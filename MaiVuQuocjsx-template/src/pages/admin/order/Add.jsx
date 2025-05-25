import { Link, useNavigate } from 'react-router-dom';
import apiOrder from '../../../api/apiOrders';
import { useState } from "react";

function OrderAdd() {
    const [UserId, setUserId] = useState("");
    const [Name, setName] = useState("");
    const [Phone, setPhone] = useState("");
    const [Email, setEmail] = useState("");
    const [Address, setAddress] = useState("");


    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const orderData = {
            user_id: UserId,
            name: Name,
            phone: Phone,
            email: Email,
            address: Address,
            created_at: Date.now(),
            updated_at: Date.now(),
            updated_by: 1,
            status: 1,
        };
        
        //Kiểm tra token admin trước khi thao tác
        const adminToken = localStorage.getItem("adminToken");
        if (!adminToken) {
            alert("Bạn cần đăng nhập trước khi thực hiện thao tác này.");
            return;
        }

        try {
            const res = await apiOrder.createOrder(orderData);
            console.log("Thêm đơn hàng thành công:", res);
            navigate("/admin/listorder");
        } catch (error) {
            console.error("Lỗi khi thêm đơn hàng:", error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="card shadow-sm">
                <div className="card-header bg-light">
                    <div className="row">
                        <div className="col-6">
                            <strong className="text-primary">Thêm đơn hàng</strong>
                        </div>
                        <div className="col-6 text-end">
                            <Link className="btn btn-sm btn-success" to="/admin/listorder">
                                <i className="fa fa-long-arrow-alt-left me-1"></i>
                                Về danh sách
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="card-body">
                    <div className="row">
                        <div className="col-md-9">
                            <div className="mb-3">
                                <label><strong>User ID</strong></label>
                                <input type="number" className="form-control" value={UserId} onChange={(e) => setUserId(e.target.value)} required />
                            </div>
                            <div className="mb-3">
                                <label><strong>Họ tên</strong></label>
                                <input type="text" className="form-control" value={Name} onChange={(e) => setName(e.target.value)} required />
                            </div>

                            <div className="mb-3">
                                <label><strong>Địa chỉ</strong></label>
                                <input type="text" className="form-control" value={Address} onChange={(e) => setAddress(e.target.value)} required />
                            </div>

                            <div className="text-end">
                                <button type="submit" className="btn btn-sm btn-primary">
                                    <i className="fa fa-save me-1"></i>
                                    Lưu
                                </button>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="mb-3">
                                <label><strong>Số điện thoại</strong></label>
                                <input type="text" className="form-control" value={Phone} onChange={(e) => setPhone(e.target.value)} required />
                            </div>

                            <div className="mb-3">
                                <label><strong>Email</strong></label>
                                <input type="email" className="form-control" value={Email} onChange={(e) => setEmail(e.target.value)} required />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default OrderAdd;
