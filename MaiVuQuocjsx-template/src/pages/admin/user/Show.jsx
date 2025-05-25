import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
// api
import apiUser from '../../../api/apiUser';
import { imageURL } from "../../../api/config";

function UserShow() {
    const { id } = useParams(); // Lấy id từ URL
    const [user, setUser] = useState(null);

    useEffect(() => {
        apiUser.getOne(id)
            .then((res) => {
                setUser(res);
            })
            .catch((err) => {
                console.error("Lỗi khi gọi API người dùng:", err);
            });
    }, [id]);

    if (!user) return <div className="p-4">Đang tải dữ liệu người dùng...</div>;

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-header bg-info text-white">
                    <div className="row">
                        <div className="col-md-6">
                            <strong>Chi tiết người dùng: {user.name}</strong>
                        </div>
                        <div className="col-md-6 text-end">
                            <Link to="/admin/listUser" className="btn btn-sm btn-success">
                                <i className="fa fa-long-arrow-alt-left me-1"></i>
                                Về danh sách
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="card-body">
                    <div className="row mb-3">
                        <div className="col-md-3 fw-bold">Họ tên:</div>
                        <div className="col-md-9">{user.name}</div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-3 fw-bold">Tài khoản:</div>
                        <div className="col-md-9">{user.username}</div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-3 fw-bold">Email:</div>
                        <div className="col-md-9">{user.email}</div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-3 fw-bold">Điện thoại:</div>
                        <div className="col-md-9">{user.phone}</div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-3 fw-bold">Địa chỉ:</div>
                        <div className="col-md-9">{user.address}</div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-3 fw-bold">Giới tính:</div>
                        <div className="col-md-9">
                            {user.gender === 'male' ? 'Nam' : user.gender === 'female' ? 'Nữ' : 'Khác'}
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-3 fw-bold">Vai trò:</div>
                        <div className="col-md-9">{user.roles}</div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-3 fw-bold">Hình ảnh:</div>
                        <div className="col-md-9">
                            <img
                                src={`${imageURL}/public/${user.thumbnail}`}
                                alt={user.name}
                                style={{
                                    width: "100px",
                                    height: "100px",
                                    objectFit: "cover",
                                    border: "1px solid #ccc",
                                    borderRadius: "6px",
                                    padding: "2px",
                                    backgroundColor: "#fff"
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserShow;
