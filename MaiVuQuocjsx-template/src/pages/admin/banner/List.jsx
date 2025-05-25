import { useEffect, useState } from "react";
import apiBanner from "../../../api/apiBanners"; 
import { imageURL } from "../../../api/config";

// Icon
import { FaTrash } from "react-icons/fa";
import { IoEyeSharp, IoAddCircle } from "react-icons/io5";
import { MdEditSquare } from "react-icons/md";
import { FaTrashCanArrowUp } from "react-icons/fa6";
import { Link } from "react-router-dom";

function BannerList() {
    const [banners, setBanners] = useState([]);

    useEffect(() => {
        apiBanner.getAll().then(res => {
            try {
                const bannerData = res
                    .filter(item => item.status === 1)
                    .map(item => ({
                        id: item.id,
                        name: item.name,
                        link: item.link,
                        position: item.position,
                        image: item.image,
                        description: item.description,
                        sort_order: item.sort_order,
                    }));
                setBanners(bannerData);
            } catch (e) {
                console.error("Lỗi khi xử lý dữ liệu banner:", e);
            }
        });
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Bạn có chắc chắn muốn chuyển banner này vào thùng rác?");
        if (!confirmDelete) return;

        try {
            await apiBanner.updateStatus(id, 0); // cập nhật status = 0
            setBanners(prev => prev.filter(b => b.id !== id));
            alert("Banner đã được chuyển vào thùng rác!");
        } catch (error) {
            console.error("Lỗi khi xoá tạm thời banner:", error.response?.data || error.message);
            alert("Đã xảy ra lỗi khi xoá banner.");
        }
    };

    return (
        <div>
            <main className="flex-grow-1 p-4 bg-light">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="m-0">Danh sách Banner</h2>
                    <Link to={`/admin/trashBanner`}>
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
                                <th>Link</th>
                                <th>Vị trí</th>
                                <th>Hình ảnh</th>
                                <th>Mô tả</th>
                                <th>Thứ tự</th>
                                <th className="text-nowrap">Hoạt động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {banners.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.link}</td>
                                    <td>{item.position}</td>
                                    <td>
                                        <img
                                            src={`${imageURL}/public/${item.image}`}
                                            alt={item.name}
                                            style={{ width: "100px", height: "100px", objectFit: "cover" }}
                                        />
                                    </td>
                                    <td style={{ maxWidth: "150px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                        {item.description}
                                    </td>
                                    <td>{item.sort_order}</td>
                                    <td className="text-nowrap">
                                        <Link to={`/admin/showBanner/${item.id}`}>
                                            <button className="btn btn-sm btn-secondary me-1">
                                                <IoEyeSharp /> Xem
                                            </button>
                                        </Link>
                                        <Link to="/admin/addBanner">
                                            <button className="btn btn-sm btn-success me-1">
                                                <IoAddCircle /> Thêm
                                            </button>
                                        </Link>
                                        <Link to={`/admin/editBanner/${item.id}`}>
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

export default BannerList;
