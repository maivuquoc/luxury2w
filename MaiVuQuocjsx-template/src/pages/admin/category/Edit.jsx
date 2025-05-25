import { Link, useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../../api/axios';
import { useEffect, useState } from "react";
import createSlug from '../../../utils/f';

function CategoryEdit() {
    const { id } = useParams();
    const [Name, setName] = useState("");
    const [Description, setDescription] = useState("");
    const [ParentId, setParentId] = useState(0);
    const [SortOrder, setSortOrder] = useState(0);
    const [Thumbnail, setThumbnail] = useState(null);

    const [categories, setCategories] = useState([]);

    const navigate = useNavigate();


    useEffect(() => {
        // Lấy danh sách tất cả category để chọn parent
        axiosInstance.get("/categories").then(res => setCategories(res.data));

        // Lấy thông tin category cần chỉnh sửa
        axiosInstance.get(`/categories/${id}`).then(res => {
            const category = res.data;
            setName(category.name);
            setDescription(category.description);
            setParentId(category.parent_id);
            setSortOrder(category.sort_order);
            setThumbnail(category.thumbnail);
        });
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const categoryData = {
            name: Name,
            slug: createSlug(Name),
            parent_id: parseInt(ParentId),
            sort_order: parseInt(SortOrder),
            thumbnail: "", // sẽ cập nhật sau
            description: Description,
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

            // Nếu thumbnail là file mới, thì upload
            if (Thumbnail instanceof File) {
                const fileData = new FormData();
                fileData.append("files", Thumbnail);
                axiosInstance.enableUploadFile();
                const res = await axiosInstance.post("/upload", fileData);
                filename = res.data.filename;
            } else {
                filename = Thumbnail;
            }
            console.log("002")

            categoryData.thumbnail = filename;
            console.log("003")

            axiosInstance.enableJson();
            const resCat = await axiosInstance.put(`/categories/${id}`, categoryData);
            console.log("004")
            console.log("Cập nhật danh mục thành công:", resCat);

            navigate("/admin/listcategory");
        } catch (error) {
            console.error("Lỗi khi cập nhật danh mục:", error.response?.data || error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="card shadow-sm">
                <div className="card-header bg-light">
                    <div className="row">
                        <div className="col-6">
                            <strong className="text-primary">Chỉnh sửa danh mục</strong>
                        </div>
                        <div className="col-6 text-end">
                            <Link className="btn btn-sm btn-success" to="/admin/listcategory">
                                <i className="fa fa-long-arrow-alt-left me-1"></i>
                                Về danh sách
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="card-body">
                    <div className="row">
                        {/* Cột trái */}
                        <div className="col-md-9">
                            <div className="mb-3">
                                <label><strong>Tên danh mục</strong></label>
                                <input type="text" className="form-control" value={Name} onChange={(e) => setName(e.target.value)} />
                            </div>

                            <div className="mb-3">
                                <label><strong>Mô tả</strong></label>
                                <textarea rows="4" className="form-control" value={Description} onChange={(e) => setDescription(e.target.value)} />
                            </div>

                            <div className="text-end">
                                <button type="submit" className="btn btn-sm btn-primary">
                                    <i className="fa fa-save me-1"></i>
                                    Lưu
                                </button>
                            </div>
                        </div>

                        {/* Cột phải */}
                        <div className="col-md-3">
                            <div className="mb-3">
                                <label><strong>Danh mục cha</strong></label>
                                <select className="form-control" value={ParentId} onChange={(e) => setParentId(e.target.value)}>
                                    <option value="0">-- Không có --</option>
                                    {categories
                                        .filter(cat => cat.id !== parseInt(id)) // không cho chọn chính nó
                                        .map(cat => (
                                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                                        ))}
                                </select>
                            </div>

                            <div className="mb-3">
                                <label><strong>Thứ tự</strong></label>
                                <input type="number" className="form-control" value={SortOrder} onChange={(e) => setSortOrder(e.target.value)} />
                            </div>

                            <div className="mb-3">
                                <label><strong>Hình ảnh</strong></label>
                                <input type="file" className="form-control" onChange={(e) => setThumbnail(e.target.files[0])} />
                                {/* Hiển thị tên ảnh hiện tại */}
                                {typeof Thumbnail === "string" && (
                                    <small className="text-muted">Ảnh hiện tại: {Thumbnail}</small>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default CategoryEdit;
