import { Link } from 'react-router-dom';

const Header = () => {
    const adminToken = localStorage.getItem('adminToken');
    const adminUser = localStorage.getItem('adminUser');
    const user = adminUser ? JSON.parse(adminUser) : null;

    const handleLogout = () => {
        if (window.confirm("Bạn có chắc chắn muốn đăng xuất không?")) {
            localStorage.removeItem('adminToken');
            localStorage.removeItem('adminUser');
            window.location.href = "/admin/login";
        }
    };

    return (
        <header className="bg-white border-bottom d-flex align-items-center justify-content-between px-4 py-2">
            <Link to="/admin" className="text-decoration-none text-dark">
                <div className="d-flex align-items-center">
                    <button className="btn btn-outline-secondary me-3">
                        <i className="fas fa-bars"></i>
                    </button>
                    <h5 className="mb-0">Shop thời trang</h5>
                </div>
            </Link>

            <div className="d-flex align-items-center">
                {adminToken ? (
                    <>
                        <span className="me-2 fw-semibold">
                            {user?.username || "admin"}
                        </span>
                        
                        {/* Nút chuyển hướng về trang người dùng */}
                        <Link to="/" className="btn btn-sm btn-outline-info me-2">
                            Trang người dùng
                        </Link>
                        
                        <button onClick={handleLogout} className="btn btn-sm btn-outline-danger">
                            Đăng xuất
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/admin/login" className="btn btn-sm btn-outline-primary me-2">
                            Đăng nhập
                        </Link>
                        <Link to="/admin/register" className="btn btn-sm btn-outline-success">
                            Đăng ký
                        </Link>
                    </>
                )}
            </div>
        </header>
    );
};

export default Header;
