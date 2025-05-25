import { useEffect, useState } from "react";
import apiUser from "../../../api/apiUser"; // cập nhật đường dẫn API người dùng
import { imageURL } from "../../../api/config";
import { FaTrash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { MdEditSquare } from "react-icons/md";
import { FaTrashCanArrowUp } from "react-icons/fa6";
import { Link } from "react-router-dom";

function UserList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        apiUser.getAll().then(res => {
            try {
                const userData = res
                    .filter(user => user.status === 1)
                    .map(user => ({
                        id: user.id,
                        name: user.name,
                        username: user.username,
                        password: user.password,
                        email: user.email,
                        phone: user.phone,
                        address: user.address,
                        gender: user.gender,
                        thumbnail: user.thumbnail,
                        roles: user.roles,
                    }));
                setUsers(userData);
            } catch (e) {
                console.error("Lỗi khi xử lý dữ liệu:", e);
            }
        });
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Bạn có chắc chắn muốn chuyển người dùng này vào thùng rác?");
        if (!confirmDelete) return;

        try {
            await apiUser.updateStatus(id, 0);
            setUsers(prev => prev.filter(user => user.id !== id));
            alert("Người dùng đã được chuyển vào thùng rác!");
        } catch (error) {
            console.error("Lỗi khi xoá người dùng:", error.response?.data || error.message);
            alert("Đã xảy ra lỗi khi xoá người dùng.");
        }
    };
    const renderGender = (g) => {
        switch (g) {
            case 1:
            case '1': return 'Nam';
            case 2:
            case '2': return 'Nữ';
            default: return 'Khác';
        }
    };

    return (
        <div>
            <main className="flex-grow-1 p-4 bg-light">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="m-0">Danh sách người dùng</h2>
                    <Link to={`/admin/trashUser`}>
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
                                <th>Họ tên</th>
                                <th>Tài khoản</th>
                                <th>Email</th>
                                <th>Điện thoại</th>
                                <th>Địa chỉ</th>
                                <th>Giới tính</th>
                                <th>Hình ảnh</th>
                                <th>Vai trò</th>
                                <th className="text-nowrap">Hoạt động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={index}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.address}</td>
                                    <td>{renderGender(user.gender)}</td>
                                    <td>
                                        <img
                                            src={`${imageURL}/public/${user.thumbnail}`}
                                            alt={user.name}
                                            style={{ width: "100px", height: "100px", objectFit: "cover" }}
                                        />
                                    </td>
                                    <td>{user.roles}</td>
                                    <td className="text-nowrap">
                                        <Link to={`/admin/showUser/${user.id}`}>
                                            <button className="btn btn-sm btn-secondary me-1">
                                                <IoEyeSharp /> Xem
                                            </button>
                                        </Link>
                                        
                                        <Link to={`/admin/editUser/${user.id}`}>
                                            <button className="btn btn-sm btn-info me-1">
                                                <MdEditSquare /> Sửa
                                            </button>
                                        </Link>
                                        <button className="btn btn-sm btn-danger" onClick={() => handleDelete(user.id)}>
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

export default UserList;
