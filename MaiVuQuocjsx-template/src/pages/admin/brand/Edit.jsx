import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import axiosInstance from '../../../api/axios';
import createSlug from '../../../utils/f';

function BrandEdit() {
    const { id } = useParams();
    const [Name, setName] = useState("");
    const [Description, setDescription] = useState("");
    const [Thumbnail, setThumbnail] = useState(null);
    const [Sort_Order, setSortOrder] = useState(1);

    const navigate = useNavigate();

    useEffect(() => {
        // Load dữ liệu thương hiệu
        axiosInstance.get(`/brands/${id}`).then(res => {
            const brand = res.data;
            setName(brand.name);
            setDescription(brand.description);
            setThumbnail(brand.thumbnail);
            setSortOrder(brand.sortorder);
        });
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const brandData = {
            name: Name,
            slug: createSlug(Name),
            thumbnail: "",
            description: Description,
            sortorder: parseInt(Sort_Order),
            created_at: Date.now(),
            created_by: 1,
            updated_at: Date.now(),
            updated_by: 1,
            status: 1,
        };

        //Kiểm tra token admin trước khi thao tác
        const adminToken = localStorage.getItem("adminToken");
        if (adminToken) {
            // Đảm bảo rằng token được thêm vào header Authorization
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${adminToken}`;
        } else {
            alert("Bạn cần đăng nhập trước khi thực hiện thao tác này.");
            return;
        }

        try {
            let filename = "";

            if (Thumbnail instanceof File) {
                const fileData = new FormData();
                fileData.append("files", Thumbnail);
                axiosInstance.enableUploadFile();
                const res = await axiosInstance.post("/upload", fileData);
                filename = res.data.filename;
            } else {
                filename = Thumbnail;
            }

            brandData.thumbnail = filename;

            axiosInstance.enableJson();
            const resBrand = await axiosInstance.put(`/brands/${id}`, brandData);
            console.log("Cập nhật thương hiệu thành công:", resBrand);

            navigate("/admin/listbrand");
        } catch (error) {
            console.error("Lỗi khi cập nhật thương hiệu:", error.response?.data || error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="card shadow-sm">
                <div className="card-header bg-light">
                    <div className="row">
                        <div className="col-6">
                            <strong className="text-primary">Chỉnh sửa thương hiệu</strong>
                        </div>
                        <div className="col-6 text-end">
                            <Link className="btn btn-sm btn-success" to="/admin/listbrand">
                                <i className="fa fa-long-arrow-alt-left me-1"></i>
                                Về danh sách
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="card-body">
                    <div className="mb-3">
                        <label><strong>Tên thương hiệu</strong></label>
                        <input type="text" className="form-control" value={Name} onChange={(e) => setName(e.target.value)} />
                    </div>

                    <div className="mb-3">
                        <label><strong>Mô tả</strong></label>
                        <textarea className="form-control" rows="3" value={Description} onChange={(e) => setDescription(e.target.value)} />
                    </div>

                    <div className="mb-3">
                        <label><strong>Thứ tự hiển thị</strong></label>
                        <input type="number" className="form-control" value={Sort_Order} onChange={(e) => setSortOrder(e.target.value)} />
                    </div>

                    <div className="mb-3">
                        <label><strong>Hình ảnh</strong></label>
                        <input type="file" className="form-control" onChange={(e) => setThumbnail(e.target.files[0])} />
                        {/* Hiển thị tên ảnh hiện tại */}
                        {typeof Thumbnail === "string" && (
                            <small className="text-muted">Ảnh hiện tại: {Thumbnail}</small>
                        )}
                    </div>



                    <div className="text-end">
                        <button type="submit" className="btn btn-sm btn-primary">
                            <i className="fa fa-save me-1"></i>
                            Lưu
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default BrandEdit;
