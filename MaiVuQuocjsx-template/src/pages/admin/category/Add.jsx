import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../../api/axios';
import apiCategories from '../../../api/apiCategories';
import { useEffect, useState } from "react";
import createSlug from '../../../utils/f';

function CategoryAdd() {
    // Khai báo các state cho form
    const [Name, setName] = useState("");
    const [Description, setDescription] = useState("");
    const [Thumbnail, setThumbnail] = useState(null);
    const [ParentId, setParentId] = useState(0);
    const [SortOrder, setSortOrder] = useState(1);

    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Lấy danh sách danh mục cha để chọn
        axiosInstance.get("/categories")
            .then(res => setCategories(res.data))
            .catch(err => console.error("Lỗi khi load danh mục:", err));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();// ngăn form reload trang

        
        const categoryData = {
            name: Name,
            slug: createSlug(Name),
            thumbnail: "",
            description: Description,
            parent_id: parseInt(ParentId),
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

        //Xử lý upload ảnh
        try {
            let filename = "";
            if (Thumbnail) {
                const file = new FormData();
                file.append("files", Thumbnail);

                axiosInstance.enableUploadFile();
                const res = await axiosInstance.post("/upload", file);
                filename = res.data.filename;
            }

            categoryData.thumbnail = filename;

            axiosInstance.enableJson();
            const resCategory = await apiCategories.createCategory(categoryData);

            console.log("Thêm sản phẩm thành công:", resCategory);
            navigate("/admin/listCategory");// chuyển về trang danh sách
        } catch (error) {
            console.error("Lỗi khi thêm sản phẩm:", error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="card shadow-sm">
                <div className="card-header bg-light">
                    <div className="row">
                        <div className="col-6">
                            <strong className="text-primary">Thêm danh mục</strong>
                        </div>
                        <div className="col-6 text-end">
                            <Link className="btn btn-sm btn-success" to="/admin/listCategory">
                                <i className="fa fa-long-arrow-alt-left me-1"></i>
                                Về danh sách
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="card-body">
                    <div className="row">
                        <div className="col-md-9">
                            <div className="mb-3">
                                <label><strong>Tên danh mục</strong></label>
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
                                <label><strong>Danh mục cha</strong></label>
                                <select className="form-control" value={ParentId} onChange={(e) => setParentId(e.target.value)}>
                                    <option value="0">-- Không có --</option>
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-3">
                                <label><strong>Thứ tự sắp xếp</strong></label>
                                <input type="number" className="form-control" value={SortOrder} onChange={(e) => setSortOrder(e.target.value)} required />
                            </div>

                            <div className="mb-3">
                                <label><strong>Hình ảnh</strong></label>
                                <input type="file" className="form-control" onChange={(e) => setThumbnail(e.target.files[0])} required />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default CategoryAdd;
