import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import apiUser from '../../../api/apiUser';
import axiosInstance from '../../../api/axios';

const RegisterUser = () => {
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
            navigate("/login");
        } catch (err) {
            console.error("Lỗi đăng ký:", err);
            setErrorMsg("Đăng ký thất bại. Vui lòng kiểm tra lại.");
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="col-11 col-md-6 col-lg-4">
                <div className="card shadow rounded-4 p-4">
                    <h4 className="text-center mb-1 fw-bold">Đăng ký tài khoản</h4>
                    <p className="text-center text-muted mb-4">Nhập thông tin để tạo tài khoản</p>

                    {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3 input-group">
                            <span className="input-group-text"><i className="fa fa-user"></i></span>
                            <input type="text" name="name" value={form.name} onChange={handleChange} className="form-control" placeholder="Họ và tên" required />
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
                            <span className="input-group-text"><i className="fa fa-phone"></i></span>
                            <input type="text" name="phone" value={form.phone} onChange={handleChange} className="form-control" placeholder="Số điện thoại" required />
                        </div>

                        <div className="mb-3 input-group">
                            <span className="input-group-text"><i className="fa fa-map-marker-alt"></i></span>
                            <input type="text" name="address" value={form.address} onChange={handleChange} className="form-control" placeholder="Địa chỉ" required />
                        </div>

                        <div className="mb-3 input-group">
                            <span className="input-group-text"><i className="fa fa-lock"></i></span>
                            <input type="password" name="password" value={form.password} onChange={handleChange} className="form-control" placeholder="Mật khẩu" required />
                        </div>

                        <div className="mb-3 input-group">
                            <span className="input-group-text"><i className="fa fa-venus-mars"></i></span>
                            <select name="gender" value={form.gender} onChange={handleChange} className="form-control">
                                <option value={0}>Khác</option>
                                <option value={1}>Nam</option>
                                <option value={2}>Nữ</option>
                            </select>
                        </div>

                        <div className="mb-4">
                            <input type="file" className="form-control" onChange={e => setThumbnail(e.target.files[0])} />
                        </div>

                        <div className="d-grid">
                            <button type="submit" className="btn btn-dark w-100">Đăng ký</button>
                        </div>
                    </form>

                    <div className="d-flex justify-content-between mt-3">
                        <div>
                            <span>Đã có tài khoản? </span>
                            <Link to="/login">Đăng nhập</Link>
                        </div>
                        <Link to="/forgot-password" className="text-dark text-decoration-none">Quên mật khẩu?</Link>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default RegisterUser;
