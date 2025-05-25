import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import apiUser from '../../api/apiUser';
import { FaHome } from "react-icons/fa";

const LoginAdmin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await apiUser.loginUser({ email, password });
            console.log("Kết quả từ API login:", res.data);

            const token = res.data.jwt;
            const user = res.data.user;
            if (token && user) {
                localStorage.setItem('adminToken', token);
                localStorage.setItem('adminUser', JSON.stringify(user));
                navigate('/admin');
            } else {
                setErrorMsg('Không nhận được token hoặc user từ server.');
            }
        } catch (err) {
            console.error("Lỗi đăng nhập:", err);
            setErrorMsg('Sai email hoặc mật khẩu. Vui lòng thử lại.');
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="col-md-6 col-lg-5">
                <div className="card shadow rounded-4 p-4">
                    <Link to="/">
                        <FaHome />
                    </Link>
                    <h3 className="text-center mb-2 fw-bold">Admin Login</h3>
                    <p className="text-center text-muted mb-4">Vui lòng đăng nhập để truy cập hệ thống</p>
                    {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

                    <form onSubmit={handleLogin}>
                        <div className="form-group mb-3">
                            <div className="input-group">
                                <span className="input-group-text">
                                    <i className="fas fa-envelope"></i>
                                </span>
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="admin@gmail.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group mb-3">
                            <div className="input-group">
                                <span className="input-group-text">
                                    <i className="fas fa-lock"></i>
                                </span>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className="form-control"
                                    placeholder="Nhập mật khẩu"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <span
                                    className="input-group-text"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                                </span>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-dark w-100 mb-3">Đăng nhập</button>
                    </form>

                    <div className="text-center">
                        <span>Chưa có tài khoản? </span>
                        <Link to="/admin/register" className="text-decoration-none">Đăng ký</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginAdmin;
