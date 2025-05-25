import { useEffect, useState } from "react";
import apiBrand from "../../../api/apiBrands"; // cập nhật đường dẫn phù hợp
import { imageURL } from "../../../api/config";
import { FaTrash } from "react-icons/fa";
import { IoEyeSharp, IoAddCircle } from "react-icons/io5";
import { MdEditSquare } from "react-icons/md";
import { FaTrashCanArrowUp } from "react-icons/fa6";
import { Link } from "react-router-dom";

function BrandList() {
    const [brands, setBrands] = useState([]);

    useEffect(() => {
        apiBrand.getAll().then(res => {
            try {
                const brandData = res
                    .filter(item => item.status === 1)
                    .map(item => ({
                        id: item.id,
                        name: item.name,
                        slug: item.slug,
                        thumbnail: item.thumbnail,
                        description: item.description,
                        sort_order: item.sort_order,
                    }));
                setBrands(brandData);
            } catch (e) {
                console.error("Lỗi khi xử lý dữ liệu:", e);
            }
        });
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Bạn có chắc chắn muốn chuyển thương hiệu này vào thùng rác?");
        if (!confirmDelete) return;

        try {
            await apiBrand.updateStatus(id, 0);
            setBrands(prev => prev.filter(brand => brand.id !== id));
            alert("Thương hiệu đã được chuyển vào thùng rác!");
        } catch (error) {
            console.error("Lỗi khi xoá tạm thời thương hiệu:", error.response?.data || error.message);
            alert("Đã xảy ra lỗi khi xoá thương hiệu.");
        }
    };

    return (
        <div>
            <main className="flex-grow-1 p-4 bg-light">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="m-0">Danh sách thương hiệu</h2>
                    <Link to={`/admin/trashBrand`}>
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
                                <th>Tên</th>
                                <th>Slug</th>
                                <th>Hình ảnh</th>
                                <th>Mô tả</th>
                                <th>Thứ tự</th>
                                <th className="text-nowrap">Hoạt động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {brands.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.id}</td>
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
                                    <td>{item.sort_order}</td>
                                    <td className="text-nowrap">
                                        <Link to={`/admin/showBrand/${item.id}`}>
                                            <button className="btn btn-sm btn-secondary me-1">
                                                <IoEyeSharp /> Xem
                                            </button>
                                        </Link>
                                        <Link to="/admin/addBrand">
                                            <button className="btn btn-sm btn-success me-1">
                                                <IoAddCircle /> Thêm
                                            </button>
                                        </Link>
                                        <Link to={`/admin/editBrand/${item.id}`}>
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

export default BrandList;
