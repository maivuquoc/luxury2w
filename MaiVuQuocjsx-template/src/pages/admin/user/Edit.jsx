import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import axiosInstance from '../../../api/axios';

function UserEdit() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [gender, setGender] = useState("");
    const [thumbnail, setThumbnail] = useState(null);
    const [roles, setRoles] = useState("");

    useEffect(() => {
        axiosInstance.get(`/users/${id}`).then(res => {
            const user = res.data;
            setName(user.name);
            setUsername(user.username);
            setPassword(user.password);
            setEmail(user.email);
            setPhone(user.phone);
            setAddress(user.address);
            setGender(user.gender);
            setThumbnail(user.thumbnail);
            setRoles(user.roles);
        });
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = {
            name: name,
            username: username,
            password: password,
            email: email,
            phone: phone,
            address: address,
            gender: gender,
            thumbnail: "",
            roles: roles,
            created_at: Date.now(),
            created_by: 1,
            updated_at: Date.now(),
            updated_by: 1,
            status: 1,
        };

        console.log("UserData gửi lên:", userData);

        try {
            let filename = "";

            if (thumbnail instanceof File) {
                const fileData = new FormData();
                fileData.append("files", thumbnail);
                axiosInstance.enableUploadFile();
                const res = await axiosInstance.post("/upload", fileData);
                filename = res.data.filename;
            } else {
                filename = thumbnail;
            }

            userData.thumbnail = filename;

            axiosInstance.enableJson();
            await axiosInstance.put(`/users/${id}`, userData);
            navigate("/admin/listuser");
        } catch (error) {
            console.error("Lỗi khi cập nhật user:", error.response?.data || error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="card shadow-sm">
                <div className="card-header bg-light">
                    <div className="row">
                        <div className="col-6">
                            <strong className="text-primary">Chỉnh sửa người dùng</strong>
                        </div>
                        <div className="col-6 text-end">
                            <Link className="btn btn-sm btn-success" to="/admin/listuser">
                                <i className="fa fa-long-arrow-alt-left me-1"></i>
                                Về danh sách
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="card-body">
                    <div className="mb-3">
                        <label><strong>Họ tên</strong></label>
                        <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>

                    <div className="mb-3">
                        <label><strong>Tên đăng nhập</strong></label>
                        <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>

                    <div className="mb-3">
                        <label><strong>Mật khẩu</strong></label>
                        <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <div className="mb-3">
                        <label><strong>Email</strong></label>
                        <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div className="mb-3">
                        <label><strong>Số điện thoại</strong></label>
                        <input type="text" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </div>

                    <div className="mb-3">
                        <label><strong>Địa chỉ</strong></label>
                        <input type="text" className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} />
                    </div>

                    <div className="mb-3">
                        <label><strong>Giới tính</strong></label>
                        <select className="form-control" value={gender} onChange={(e) => setGender(e.target.value)}>
                            <option value="1">Nam</option>
                            <option value="2">Nữ</option>
                            <option value="0">Khác</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label><strong>Ảnh đại diện</strong></label>
                        <input type="file" className="form-control" onChange={(e) => setThumbnail(e.target.files[0])} />
                        {typeof thumbnail === "string" && (
                            <small className="text-muted">Ảnh hiện tại: {thumbnail}</small>
                        )}
                    </div>

                    <div className="mb-3">
                        <label><strong>Quyền</strong></label>
                        <select className="form-control" value={roles} onChange={(e) => setRoles(e.target.value)}>
                            <option value="customer">Customer</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>

                    <div className="text-end">
                        <button type="submit" className="btn btn-sm btn-primary">
                            <i className="fa fa-save me-1"></i>
                            Lưu
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default UserEdit;
