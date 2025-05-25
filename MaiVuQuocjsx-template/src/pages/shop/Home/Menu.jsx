import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import apiCategory from "../../../api/apiCategories";
import apiBrand from "../../../api/apiBrands"; // <-- import API brand

const Menu = () => {
    const [showCategories, setShowCategories] = useState(false);
    const [categories, setCategories] = useState([]);
    const [showBrands, setShowBrands] = useState(false);
    const [brands, setBrands] = useState([]);

    useEffect(() => {
        apiCategory.getAll()
            .then(res => setCategories(res))
            .catch(err => console.error("Lỗi lấy danh sách danh mục:", err));

        apiBrand.getAll()
            .then(res => setBrands(res))
            .catch(err => console.error("Lỗi lấy danh sách thương hiệu:", err));
    }, []);

    return (
        <div>
            <nav className="d-flex justify-content-center">
                <ul className="nav">
                    <li className="nav-item">
                        <Link className="nav-link text-dark fw-bold" to="/">Trang chủ</Link>
                    </li>

                    {/* Danh mục */}
                    <li
                        className="nav-item position-relative"
                        onMouseEnter={() => setShowCategories(true)}
                        onMouseLeave={() => setShowCategories(false)}
                    >
                        <span className="nav-link text-dark fw-bold" style={{ cursor: 'pointer' }}>
                            Danh mục
                        </span>
                        {showCategories && (
                            <ul
                                className="position-absolute bg-white list-unstyled shadow"
                                style={{ top: '100%', left: 0, minWidth: '200px', zIndex: 1000 }}
                            >
                                {categories.map((category) => (
                                    <li key={category.id}>
                                        <Link className="dropdown-item text-dark" to={`/products-by-cat/${category.id}`}>
                                            {category.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>

                    {/* Thương hiệu */}
                    <li
                        className="nav-item position-relative"
                        onMouseEnter={() => setShowBrands(true)}
                        onMouseLeave={() => setShowBrands(false)}
                    >
                        <span className="nav-link text-dark fw-bold" style={{ cursor: 'pointer' }}>
                            Thương hiệu
                        </span>
                        {showBrands && (
                            <ul
                                className="position-absolute bg-white list-unstyled shadow"
                                style={{ top: '100%', left: 0, minWidth: '200px', zIndex: 1000 }}
                            >
                                {brands.map((brand) => (
                                    <li key={brand.id}>
                                        <Link className="dropdown-item text-dark" to={`/products-by-bra/${brand.id}`}>
                                            {brand.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link text-dark fw-bold" to="/products">Sản phẩm</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-dark fw-bold" to="/about">Giới thiệu</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-dark fw-bold" to="/post">Bài viết</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-dark fw-bold" to="/contact">Liên hệ</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Menu;
