import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import apiUser from '../../../api/apiUser';

const LoginUser = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await apiUser.loginUser({ email, password });
            const token = res.data.jwt;
            const user = res.data.user;
            if (token && user) {
                localStorage.setItem('userToken', token);
                localStorage.setItem('currentUser', JSON.stringify(user));
                navigate('/'); // chuyển về trang chủ sau khi đăng nhập
            } else {
                setErrorMsg('Đã xảy ra lỗi, vui lòng thử lại.');
            }
        } catch (err) {
            setErrorMsg('Email hoặc mật khẩu không chính xác.');
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="col-11 col-md-6 col-lg-4">
                <div className="card shadow rounded-4 p-4">
                    <h3 className="text-center mb-3 fw-bold">Đăng nhập người dùng</h3>
                    <p className="text-center text-muted mb-4">Vui lòng nhập thông tin để đăng nhập</p>
                    {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

                    <form onSubmit={handleLogin}>
                        <div className="mb-3">
                            <div className="input-group">
                                <span className="input-group-text"><i className="fas fa-envelope"></i></span>
                                <input
                                    type="email"
                                    id="email"
                                    className="form-control"
                                    placeholder="Nhập email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="mb-3">
                            <div className="input-group">
                                <span className="input-group-text"><i className="fas fa-lock"></i></span>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    className="form-control"
                                    placeholder="Nhập mật khẩu"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    required
                                />
                                <span className="input-group-text" style={{ cursor: 'pointer' }} onClick={() => setShowPassword(!showPassword)}>
                                    <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                                </span>
                            </div>
                        </div>

                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <Link to="/forgot-password" className="text-dark text-decoration-none">Quên mật khẩu?</Link>
                            <Link to="/register" className="text-decoration-none">Đăng ký</Link>
                        </div>

                        <button type="submit" className="btn btn-dark w-100" style={{ backgroundColor: '#343a40', borderColor: '#343a40' }}>Đăng nhập</button>         
                         </form>
                </div>
            </div>
        </div>
    );
};

export default LoginUser;