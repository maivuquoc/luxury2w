import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import apiUser from "../../api//apiUser";
import axiosInstance from "../../api/axios";

const RegisterAdmin = () => {
    const [form, setForm] = useState({
        name: "",
        username: "",
        password: "",
        email: "",
        phone: "",
        address: "",
        gender: 0,
        roles: "customer",
    });
    const [thumbnail, setThumbnail] = useState(null);
    const [errorMsg, setErrorMsg] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let filename = "";
            if (thumbnail) {
                const file = new FormData();
                file.append("files", thumbnail);
                axiosInstance.enableUploadFile();
                const res = await axiosInstance.post("/upload", file);
                filename = res.data.filename;
            }

            const userData = {
                ...form,
                phone: parseInt(form.phone),
                gender: parseInt(form.gender),
                thumbnail: filename,
                created_at: Date.now(),
                created_by: 1,
                updated_at: Date.now(),
                updated_by: 1,
                status: 1,
            };

            axiosInstance.enableJson();
            await apiUser.createUser(userData);
            navigate("/admin/login");
        } catch (err) {
            console.error("Lỗi đăng ký:", err);
            setErrorMsg("Đăng ký thất bại. Vui lòng kiểm tra lại.");
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh", backgroundColor: "#f5f6fa" }}>
            <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow" style={{ width: "400px" }}>
                <h4 className="text-center mb-1 fw-bold">Admin Register</h4>
                <p className="text-center text-muted mb-4">Vui lòng nhập thông tin để đăng ký</p>

                {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

                <div className="mb-3 input-group">
                    <span className="input-group-text"><i className="fa fa-user"></i></span>
                    <input type="text" name="name" value={form.name} onChange={handleChange} className="form-control" placeholder="Họ tên" required />
                </div>

                <div className="mb-3 input-group">
                    <span className="input-group-text"><i className="fa fa-user-circle"></i></span>
                    <input type="text" name="username" value={form.username} onChange={handleChange} className="form-control" placeholder="Tên đăng nhập" required />
                </div>

                <div className="mb-3 input-group">
                    <span className="input-group-text"><i className="fa fa-envelope"></i></span>
                    <input type="email" name="email" value={form.email} onChange={handleChange} className="form-control" placeholder="Email" required />
                </div>

                <div className="mb-3 input-group">
                    <span className="input-group-text"><i className="fa fa-map-marker-alt"></i></span>
                    <input type="text" name="address" value={form.address} onChange={handleChange} className="form-control" placeholder="Địa chỉ" required />
                </div>

                <div className="mb-3 input-group">
                    <span className="input-group-text"><i className="fa fa-phone"></i></span>
                    <input type="number" name="phone" value={form.phone} onChange={handleChange} className="form-control" placeholder="Số điện thoại" required />
                </div>

                <div className="mb-3 input-group">
                    <span className="input-group-text"><i className="fa fa-lock"></i></span>
                    <input type="password" name="password" value={form.password} onChange={handleChange} className="form-control" placeholder="Mật khẩu" required />
                </div>

                <div className="mb-3 input-group">
                    <span className="input-group-text"><i className="fa fa-venus-mars"></i></span>
                    <select name="gender" value={form.gender} onChange={handleChange} className="form-control">
                        <option value={0}>Nam</option>
                        <option value={1}>Nữ</option>
                    </select>
                </div>

                <div className="mb-3 input-group">
                    <span className="input-group-text"><i className="fa fa-users-cog"></i></span>
                    <select name="roles" value={form.roles} onChange={handleChange} className="form-control">
                        <option value="admin">Quản trị viên</option>
                        <option value="customer">Khách hàng</option>
                    </select>
                </div>

                <div className="mb-4">
                    <input type="file" className="form-control" onChange={(e) => setThumbnail(e.target.files[0])} />
                </div>

                <div className="d-grid">
                    <button type="submit" className="btn btn-dark">
                        <i className="fa fa-user-plus me-2"></i>Đăng ký
                    </button>
                </div>

                <div className="text-center mt-3">
                    <span>Đã có tài khoản? </span>
                    <Link to="/admin/login">Đăng nhập</Link>
                </div>
            </form>
        </div>
    );
};

export default RegisterAdmin;
