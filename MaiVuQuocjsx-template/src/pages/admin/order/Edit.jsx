import { Link, useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../../api/axios';
import { useEffect, useState } from "react";

function OrderEdit() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [UserId, setUserId] = useState("");
    const [Name, setName] = useState("");
    const [Phone, setPhone] = useState("");
    const [Email, setEmail] = useState("");
    const [Address, setAddress] = useState("");
    const [IsPaid, setIsPaid] = useState(0);

    useEffect(() => {
        axiosInstance.get(`/orders/${id}`).then(res => {
            const order = res.data;
            setUserId(order.user_id);
            setName(order.name);
            setPhone(order.phone);
            setEmail(order.email);
            setAddress(order.address);
            setIsPaid(order.is_paid);
        });
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const orderData = {
            user_id: parseInt(UserId),
            name: Name,
            phone: Phone,
            email: Email,
            address: Address,
            created_at: Date.now(),
            updated_at: Date.now(),
            updated_by: 1,
            status: 1,
            is_paid: parseInt(IsPaid),
        };
        //Kiểm tra token admin trước khi thao tác
        const adminToken = localStorage.getItem("adminToken");
        if (adminToken) {
            // Đảm bảo rằng token được thêm vào header Authorization
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${adminToken}`;
        } else {
            alert("Bạn cần đăng nhập trước khi thực hiện thao tác này.");
            return;
        }

        try {
            const res = await axiosInstance.put(`/orders/${id}`, orderData);
            console.log("Cập nhật đơn hàng thành công:", res);
            navigate("/admin/listorder");
        } catch (error) {
            console.error("Lỗi khi cập nhật đơn hàng:", error.response?.data || error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="card shadow-sm">
                <div className="card-header bg-light">
                    <div className="row">
                        <div className="col-6">
                            <strong className="text-primary">Chỉnh sửa đơn hàng</strong>
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
                                <label><strong>Họ tên</strong></label>
                                <input type="text" className="form-control" value={Name} readOnly onChange={(e) => setName(e.target.value)}/>
                            </div>

                            <div className="mb-3">
                                <label><strong>Địa chỉ</strong></label>
                                <input type="text" className="form-control" value={Address} readOnly onChange={(e) => setAddress(e.target.value)}/>
                            </div>

                            <div className="mb-3">
                                <label><strong>User ID</strong></label>
                                <input type="number" className="form-control" value={UserId} readOnly onChange={(e) => setUserId(e.target.value)}/>
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
                                <input type="text" className="form-control" value={Phone} readOnly onChange={(e) => setPhone(e.target.value)}/>
                            </div>

                            <div className="mb-3">
                                <label><strong>Email</strong></label>
                                <input type="email" className="form-control" value={Email} readOnly onChange={(e) => setEmail(e.target.value)}/>
                            </div>
                            <div className="mb-3">
                                <label><strong>Trạng thái thanh toán</strong></label>
                                <select
                                    className="form-control"
                                    value={IsPaid}
                                    onChange={(e) => setIsPaid(parseInt(e.target.value))}
                                    required
                                >
                                    <option value={0}>Chưa thanh toán</option>
                                    <option value={1}>Đã thanh toán</option>
                                    <option value={2}>Đang chờ thanh toán</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default OrderEdit;
