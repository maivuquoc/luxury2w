import { useEffect, useState } from "react";
import apiProduct from "../../../api/apiProduct"; // điều chỉnh đường dẫn nếu cần
import { imageURL } from "../../../api/config";
// Icon
import { FaTrash } from "react-icons/fa";
import { IoEyeSharp, IoAddCircle } from "react-icons/io5";
import { MdEditSquare } from "react-icons/md";
import { FaTrashCanArrowUp } from "react-icons/fa6";
import { Link } from "react-router-dom";

function ProductList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        apiProduct.getAll().then(res => {
            try {
                const productData = res
                    .filter(item => item.status === 1) // lọc ở đây status = 1
                    .map(item => ({
                        id: item.id,
                        category_id: item.category_id,
                        brand_id: item.brand_id,
                        name: item.name,
                        slug: item.slug,
                        thumbnail: item.thumbnail,
                        description: item.description,
                        content: item.content,
                        pricebuy: item.pricebuy,
                        pricesale: item.pricesale,
                        qty: item.qty,
                    }));
                setProducts(productData);
            } catch (e) {
                console.error("Lỗi khi xử lý dữ liệu:", e);
            }
        });
    }, []);


    // Xoá tạm thời (cập nhật status = 0)
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Bạn có chắc chắn muốn chuyển sản phẩm này vào thùng rác?");
        if (!confirmDelete) return;

        try {
            await apiProduct.updateStatus(id, 0); // gọi API cập nhật status
            setProducts(prev => prev.filter(product => product.id !== id));
            alert("Sản phẩm đã được chuyển vào thùng rác!");
        } catch (error) {
            console.error("Lỗi khi xoá tạm thời sản phẩm:", error.response?.data || error.message);
            alert("Đã xảy ra lỗi khi xoá sản phẩm.");
        }
    };


    return (
        <div>
            <main className="flex-grow-1 p-4 bg-light">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="m-0">Danh sách sản phẩm</h2>
                    <Link to={`/admin/trashProduct`}>
                        <button className="btn btn-sm btn-warning">
                            <FaTrashCanArrowUp /> Thùng rác
                        </button>
                    </Link>
                </div>

                <div className="table-responsive">
                    <table className="table table-bordered table-hover">
                        <thead className="table-light">
                            <tr>
                                <th>ID</th>
                                <th>Category ID</th>
                                <th>Brand ID</th>
                                <th>Tên</th>
                                <th>Slug</th>
                                <th>Hình ảnh</th>
                                <th>Mô tả</th>
                                <th>Nội dung</th>
                                <th>Giá bán</th>
                                <th>Giá sale</th>
                                <th>Số lượng</th>
                                <th className="text-nowrap">Hoạt động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.id}</td>
                                    <td>{item.category_id}</td>
                                    <td>{item.brand_id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.slug}</td>
                                    <td>
                                        <img
                                            src={`${imageURL}/public/${item.thumbnail}`}
                                            alt={item.name}
                                            style={{ width: "100px", height: "100px", objectFit: "cover" }}
                                        />
                                    </td>

                                    <td style={{ maxWidth: "150px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                        {item.description}
                                    </td>
                                    <td style={{ maxWidth: "150px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                        {item.content}
                                    </td>
                                    <td>{item.pricebuy.toLocaleString('vi-VN')} VNĐ</td>
                                    <td>{item.pricesale.toLocaleString('vi-VN')} VNĐ</td>
                                    <td>{item.qty}</td>
                                    <td className="text-nowrap">
                                        <Link to={`/admin/showProduct/${item.id}`}>
                                            <button className="btn btn-sm btn-secondary me-1">
                                                <IoEyeSharp /> Xem
                                            </button>
                                        </Link>
                                        <Link to="/admin/addproduct">
                                            <button className="btn btn-sm btn-success me-1">
                                                <IoAddCircle /> Thêm
                                            </button>
                                        </Link>
                                        <Link to={`/admin/editProduct/${item.id}`}>
                                            <button className="btn btn-sm btn-info me-1">
                                                <MdEditSquare /> Sửa
                                            </button>
                                        </Link>
                                        <button className="btn btn-sm btn-danger" onClick={() => handleDelete(item.id)}>
                                            <FaTrash /> Xoá
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}

export default ProductList;
