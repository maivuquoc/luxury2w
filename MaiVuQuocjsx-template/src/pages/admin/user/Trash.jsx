import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import apiUser from '../../../api/apiUser'; // API cho user
import { imageURL } from "../../../api/config";

function UserTrash() {
    const [trashUsers, setTrashUsers] = useState([]);

    useEffect(() => {
        const fetchTrashUsers = async () => {
            try {
                const allUsers = await apiUser.getAll();
                const deletedUsers = allUsers.filter(u => u.status === 0);
                setTrashUsers(deletedUsers);
            } catch (error) {
                console.error("Lỗi khi load người dùng thùng rác:", error.message);
            }
        };

        fetchTrashUsers();
    }, []);

    const handleRestore = async (id) => {
        if (!window.confirm("Khôi phục người dùng này?")) return;
        try {
            await apiUser.updateStatus(id, 1); // Phục hồi
            setTrashUsers(prev => prev.filter(u => u.id !== id));
        } catch (error) {
            console.error("Lỗi khi khôi phục người dùng:", error.message);
        }
    };

    const handlePermanentDelete = async (id) => {
        if (!window.confirm("Xoá vĩnh viễn người dùng này?")) return;
        try {
            await apiUser.deleteUser(id); // Xoá thật
            setTrashUsers(prev => prev.filter(u => u.id !== id));
        } catch (error) {
            console.error("Lỗi khi xoá vĩnh viễn người dùng:", error.message);
        }
    };

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-header bg-secondary text-white">
                    <div className="row">
                        <div className="col-md-6">
                            <strong>Người dùng đã xoá</strong>
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
                    <table className="table table-bordered table-hover">
                        <thead className="table-light">
                            <tr>
                                <th>STT</th>
                                <th>Họ tên</th>
                                <th>Tài khoản</th>
                                <th>Email</th>
                                <th>Hình ảnh</th>
                                <th>Ngày xoá</th>
                                <th style={{ width: "20%" }}>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {trashUsers.length > 0 ? (
                                trashUsers.map((user, index) => (
                                    <tr key={user.id}>
                                        <td>{index + 1}</td>
                                        <td>{user.name}</td>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            <img
                                                src={`${imageURL}/public/${user.thumbnail}`}
                                                alt={user.name}
                                                style={{
                                                    width: "80px",
                                                    height: "80px",
                                                    objectFit: "cover",
                                                    border: "2px solid #dee2e6",
                                                    borderRadius: "50%",
                                                    boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
                                                }}
                                            />
                                        </td>
                                        <td>{new Date(user.updated_at).toLocaleDateString()}</td>
                                        <td>
                                            <button className="btn btn-sm btn-info me-1" onClick={() => handleRestore(user.id)}>
                                                <i className="fa fa-undo"></i> Khôi phục
                                            </button>
                                            <button className="btn btn-sm btn-danger" onClick={() => handlePermanentDelete(user.id)}>
                                                <i className="fa fa-trash"></i> Xoá vĩnh viễn
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="text-center">Không có người dùng nào trong thùng rác</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default UserTrash;
