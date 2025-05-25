import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import apiUser from '../../../api/apiUser';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      console.log("Đang kiểm tra email:", email);
      const res = await apiUser.checkEmail(email);

      // Nếu API trả về exists = true
      if (res.exists) {
        navigate(`/resetpassword`);
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        // Email không tồn tại
        setError('Email không tồn tại! đã đăng kí chưa vậy ba.');
      } else {
        // Lỗi khác (như mất kết nối, timeout...)
        console.error('Lỗi khi kiểm tra email:', err);
        setError('Lỗi server, vui lòng thử lại sau.');
      }
    }
  };


  return (
    <div className="container d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="col-11 col-md-6 col-lg-4">
        <div className="card shadow rounded-4 p-4">
          <h3 className="text-center mb-3 fw-bold">Quên mật khẩu</h3>
          <p className="text-center text-muted mb-4">Nhập email để đặt lại mật khẩu</p>

          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3 input-group">
              <span className="input-group-text"><i className="fa fa-envelope"></i></span>
              <input
                type="email"
                className="form-control"
                placeholder="Nhập email của bạn"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-dark w-100">Tiếp tục</button>
            </div>
          </form>

          <div className="d-flex justify-content-between align-items-center mt-3">
            <Link to="/login" className="text-dark text-decoration-none">Quay lại đăng nhập</Link>
            <Link to="/register" className="text-decoration-none">Đăng ký</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
