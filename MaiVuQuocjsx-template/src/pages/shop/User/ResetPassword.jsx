import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiUser from '../../../api/apiUser';
import { Link } from 'react-router-dom';


const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!email) {
      setErrorMsg('Vui lòng nhập email');
      return;
    }
    if (password !== confirm) {
      setErrorMsg('Mật khẩu không khớp');
      return;
    }

    const dataToSend = { email, newPassword: password };
    console.log('Dữ liệu gửi API:', dataToSend);

    setLoading(true);
    try {
      await apiUser.updatePassword(email, password); // apiUser phải gửi đúng newPassword, mình sẽ sửa bên apiUser.js
      setSuccessMsg('Đổi mật khẩu thành công, sẽ chuyển hướng sau 2s');
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      setErrorMsg(
        error.response?.data?.message || 'Có lỗi xảy ra khi đổi mật khẩu'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="col-11 col-md-6 col-lg-4">
        <div className="card shadow rounded-4 p-4">
          <h3 className="text-center mb-3 fw-bold">Đặt lại mật khẩu</h3>

          {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
          {successMsg && <div className="alert alert-success">{successMsg}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Nhập email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Mật khẩu mới"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                minLength={3}
              />
            </div>

            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Nhập lại mật khẩu"
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                required
                minLength={3}
              />
            </div>

            <div className="d-flex justify-content-between align-items-center mb-3">
              <Link to="/forgot-password" className="text-dark text-decoration-none">Quay lại</Link>
            </div>

            <button
              type="submit"
              className="btn btn-dark w-100"
              disabled={loading}
            >
              {loading ? 'Đang xử lý...' : 'Xác nhận'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
