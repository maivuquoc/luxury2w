import React, { useState, useEffect } from 'react';
import logo from "../../assets/image/logo.webp";
import { Link, useNavigate } from 'react-router-dom';
import Menu from "../../pages/shop/Home/Menu";
import { useSelector } from 'react-redux';

const Header = () => {
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState(null); // Thêm state để lưu trữ user_id
  const navigate = useNavigate();
  const getData = useSelector((state) => state.cart.carts);
  const totalItems = getData.reduce((sum, item) => sum + item.amount, 0);

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setUserName(user.name);
        setUserId(user.id); // Lưu trữ user_id vào state
      } catch {}
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('currentUser');
    setUserName('');
    setUserId(null); // Đặt lại userId khi đăng xuất
    navigate('/');
  };

  const handleAdminRedirect = () => {
    navigate('/admin');
  };

  return (
    <header>
      <section className="section_header py-2 shadow-sm bg-white">
        <div className="container">
          <div className="row align-items-center">
            {/* Logo */}
            <div className="col-6 col-md-2">
              <Link to="/">
                <img src={logo} className="img-fluid" alt="Logo" style={{ maxHeight: '50px' }} />
              </Link>
            </div>

            {/* Menu */}
            <div className="d-none d-md-block col-md-7">
              <Menu />
            </div>

            {/* User + Cart */}
            <div className="col-6 col-md-3 d-flex justify-content-end align-items-center gap-3">
              {userName ? (
                <div className="dropdown position-relative" style={{ zIndex: 1000 }}>
                  <span
                    className="badge bg-primary py-2 px-3 dropdown-toggle"
                    role="button"
                    id="userDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ cursor: "pointer" }}
                  >
                    {userName}
                  </span>
                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                    <li>
                      <Link className="dropdown-item" to="/profile">Quản lí cá nhân</Link>
                    </li>
                    <li>
                      {/* Sửa đường dẫn theo user_id */}
                      {userId && (
                        <Link className="dropdown-item" to={`/order-by-user/${userId}`}>Quản lí đơn hàng</Link>
                      )}
                    </li>
                    <li>
                      <button className="dropdown-item" onClick={handleAdminRedirect}>Quản trị</button>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <button className="dropdown-item text-danger" onClick={handleLogout}>Đăng xuất</button>
                    </li>
                  </ul>
                </div>
              ) : (
                <Link to="/login" className="btn btn-outline-primary btn-sm">Đăng nhập</Link>
              )}
              <Link to="/cart" className="position-relative text-dark">
                <i className="fa-solid fa-bag-shopping fa-lg"></i>
                {totalItems > 0 && (
                  <span
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                    style={{ fontSize: '0.50rem' }}
                  >
                    {totalItems}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </header>
  );
};

export default Header;
