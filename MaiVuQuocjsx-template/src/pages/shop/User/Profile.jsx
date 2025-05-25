import React, { useEffect, useState } from 'react';
import apiUser from '../../../api/apiUser';
import apiOrder from '../../../api/apiOrders';
import { imageURL } from '../../../api/config';
import { Link } from "react-router-dom";


const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [orderCount, setOrderCount] = useState(0);

    const storedUser = localStorage.getItem('currentUser');
    const userId = storedUser ? JSON.parse(storedUser).id : null;

    useEffect(() => {
        if (!userId) {
            setLoading(false);
            return;
        }

        apiUser.getOne(userId)
            .then(data => {
                setUser(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Lỗi khi lấy thông tin người dùng:", err);
                setLoading(false);
            });

        apiOrder.getAllOrderUser(userId)
            .then(data => {
                if (Array.isArray(data)) {
                    setOrderCount(data.length);
                } else if (data.message) {
                    setOrderCount(0);
                }
            })
            .catch(err => {
                console.error("Lỗi khi lấy số lượng đơn hàng:", err);
                setOrderCount(0);
            });
    }, [userId]);

    const renderGender = (g) => {
        switch (g) {
            case 1:
            case '1': return 'Nam';
            case 2:
            case '2': return 'Nữ';
            default: return 'Khác';
        }
    };

    if (loading) {
        return (
            <div className="container py-5 text-center">
                <p>Đang tải thông tin người dùng...</p>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="container py-5 text-center">
                <p className="text-danger">Không tìm thấy thông tin người dùng.</p>
            </div>
        );
    }

    return (
        <div className="container py-5">
            <section>
                <div className="bg-body-tertiary">
                    <div className="container">
                        <div className="row">
                            <ul className="breadcrumb m-0 px-0 py-2">
                                <li className="home">
                                    <Link to="/"><span>Trang chủ</span></Link>
                                    <span className="mr_lr">&nbsp;/&nbsp;</span>
                                </li>
                                <li><strong><span>Thông tin cá nhân</span></strong></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            <div className="card shadow-sm p-4">
                <div className="row">
                    <div className="col-md-4 text-center">
                        <img
                            src={user.thumbnail ? `${imageURL}/public/${user.thumbnail}` : 'https://via.placeholder.com/150'}
                            alt="avatar"
                            className="rounded-circle img-fluid mb-3"
                            style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                        />
                        <h5 className="text-primary">{user.name}</h5>
                        <p className="text-muted">{Array.isArray(user.roles) ? user.roles.join(', ') : user.roles}</p>
                    </div>

                    <div className="col-md-8">
                        <table className="table table-borderless">
                            <tbody>
                                <tr>
                                    <th scope="row">Tên đầy đủ</th>
                                    <td>{user.name}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Email</th>
                                    <td>{user.email}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Số điện thoại</th>
                                    <td>{user.phone}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Địa chỉ</th>
                                    <td>{user.address}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Giới tính</th>
                                    <td>{renderGender(user.gender)}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Số đơn hàng đã đặt</th>
                                    <Link to={`/order-by-user/${userId}`}>
                                        <td>{orderCount} <i className="fa fa-eye"></i></td>
                                    </Link>  
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
