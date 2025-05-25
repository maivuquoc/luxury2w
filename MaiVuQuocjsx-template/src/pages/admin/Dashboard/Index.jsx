import { Link } from 'react-router-dom';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
//icon
import { FaShoppingCart } from "react-icons/fa";
import { FaBoxArchive } from "react-icons/fa6";
import { FaUserAlt } from "react-icons/fa";
import { FaTshirt } from "react-icons/fa";
import { FaSlidersH } from "react-icons/fa";
import { IoMdContacts } from "react-icons/io";
import { FaPencilAlt } from "react-icons/fa";
import { FaBook } from "react-icons/fa";
import { MdArticle } from "react-icons/md";
const data = [
    { name: 'T1', doanhthu: 500 },
    { name: 'T2', doanhthu: 800 },
    { name: 'T3', doanhthu: 1200 },
    { name: 'T4', doanhthu: 900 },
    { name: 'T5', doanhthu: 1500 },
    { name: 'T6', doanhthu: 1700 },
];

const Dashboard = () => {
    return (
        <div className="d-flex flex-column min-vh-100 bg-light p-3">
            <div className="d-flex">
                <aside className="bg-dark text-white p-3" style={{ width: '250px', minHeight: '100vh' }}>
                    <h5 className="text-white mb-4">ADMIN SHOP</h5>
                    <ul className="nav flex-column">
                        {/* Trang chủ */}
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/admin">
                                <i className="fas fa-tachometer-alt me-2"></i> Trang chủ
                            </Link>
                        </li>
                        {/* Sản phẩm */}
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/admin/Listproduct">
                                <FaBoxArchive /> Sản phẩm
                            </Link>
                        </li>
                        {/* Thương hiệu */}
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/admin/listBrand">
                                <FaShoppingCart /> Thương hiệu
                            </Link>
                        </li>
                        {/* Người dùng */}
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/admin/listUser">
                                <FaUserAlt /> Người dùng
                            </Link>
                        </li>
                        {/* Danh mục */}
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/admin/listCategory">
                                <FaTshirt /> Danh mục
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/admin/ListContact">
                                <IoMdContacts /> Liên hệ
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/admin/ListOrderDetail">
                                <FaPencilAlt /> Chi tiết đơn hàng
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/admin/ListTopic">
                                <FaBook /> Topic
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/admin/ListPost">
                                <MdArticle /> Post
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/admin/Listbanner">
                                <FaSlidersH /> Banner
                            </Link>
                        </li>

                    </ul>
                </aside>

                <div className="container-fluid">
                    <div className="alert alert-info mt-3">
                        👋 Xin chào, chúc bạn một ngày làm việc hiệu quả! Hôm nay có 3 đơn hàng mới.
                    </div>

                    <div className="row mb-4">
                        <div className="col-md-3">
                            <Link to="/admin/Listproduct">
                                <div className="card text-white bg-primary shadow-sm">
                                    <div className="card-body">
                                        <h5>Tổng sản phẩm</h5>
                                        <p className="fs-4">120</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        {/* order */}
                        <div className="col-md-3">
                            <Link to="/admin/listOrder">
                                <div className="card text-white bg-success shadow-sm">
                                    <div className="card-body">
                                        <h5>Đơn hàng mới</h5>
                                        <p className="fs-4">35</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        {/* User */}
                        <div className="col-md-3">
                            <Link to="/admin/listUser">
                                <div className="card text-white bg-warning shadow-sm">
                                    <div className="card-body">
                                        <h5>Người dùng</h5>
                                        <p className="fs-4">500+</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        {/* Category */}
                        <div className="col-md-3">
                            <Link to="/admin/listCategory"><div className="card text-white bg-danger shadow-sm">
                                <div className="card-body">
                                    <h5>Danh mục</h5>
                                    <p className="fs-4">8</p>
                                </div>
                            </div>
                            </Link>
                        </div>
                    </div>

                    {/* Biểu đồ doanh thu */}
                    <div className="card shadow-sm mb-4">
                        <div className="card-header">
                            <h5 className="mb-0">Biểu đồ doanh thu theo tháng</h5>
                        </div>
                        <div className="card-body">
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={data}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="doanhthu" fill="#0d6efd" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;
