import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../../api/axios';
import apiBrand from '../../../api/apiBrands';
import { useState } from "react";
import createSlug from '../../../utils/f';

function BrandAdd() {
    const [Name, setName] = useState("");
    const [Description, setDescription] = useState("");
    const [SortOrder, setSortOrder] = useState("");
    const [Thumbnail, setThumbnail] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const brandData = {
            name: Name,
            slug: createSlug(Name),
            thumbnail: "",
            description: Description,
            sort_order: parseInt(SortOrder),
            created_at: Date.now(),
            created_by: 1,
            updated_at: Date.now(),
            updated_by: 1,
            status: 1,
        };

        //Kiểm tra token admin trước khi thao tác
        const adminToken = localStorage.getItem("adminToken");
        if (!adminToken) {
            alert("Bạn cần đăng nhập trước khi thực hiện thao tác này.");
            return;
        }

        try {
            let filename = "";
            if (Thumbnail) {
                const file = new FormData();
                file.append("files", Thumbnail);

                axiosInstance.enableUploadFile();
                const res = await axiosInstance.post("/upload", file);
                filename = res.data.filename;
            }

            brandData.thumbnail = filename;

            axiosInstance.enableJson();
            const resBrand = await apiBrand.createBrand(brandData);

            console.log("Thêm thương hiệu thành công:", resBrand);
            navigate("/admin/listBrand");
        } catch (error) {
            console.error("Lỗi khi thêm thương hiệu:", error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="card shadow-sm">
                <div className="card-header bg-light">
                    <div className="row">
                        <div className="col-6">
                            <strong className="text-primary">Thêm thương hiệu</strong>
                        </div>
                        <div className="col-6 text-end">
                            <Link className="btn btn-sm btn-success" to="/admin/listBrand">
                                <i className="fa fa-long-arrow-alt-left me-1"></i>
                                Về danh sách
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="card-body row">
                    <div className="col-md-9">
                        <div className="mb-3">
                            <label><strong>Tên thương hiệu</strong></label>
                            <input type="text" className="form-control" value={Name} onChange={(e) => setName(e.target.value)} required />
                        </div>

                        <div className="mb-3">
                            <label><strong>Mô tả</strong></label>
                            <textarea rows="3" className="form-control" value={Description} onChange={(e) => setDescription(e.target.value)} required />
                        </div>

                        <div className="text-end">
                            <button type="submit" className="btn btn-sm btn-primary">
                                <i className="fa fa-save me-1"></i>
                                Lưu
                            </button>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="mb-3">
                            <label><strong>Thứ tự hiển thị</strong></label>
                            <input type="number" className="form-control" value={SortOrder} onChange={(e) => setSortOrder(e.target.value)} required />
                        </div>

                        <div className="mb-3">
                            <label><strong>Hình ảnh</strong></label>
                            <input type="file" className="form-control" onChange={(e) => setThumbnail(e.target.files[0])} required />
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default BrandAdd;
