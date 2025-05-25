import { Link, useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../../api/axios';
import { useEffect, useState } from "react";
import createSlug from '../../../utils/f';

function ProductEdit() {
    const { id } = useParams();
    const [BrandId, setBrandId] = useState("");
    const [CategoryId, setCategoryId] = useState("");
    const [Name, setName] = useState("");
    const [Description, setDescription] = useState("");
    const [Content, setContent] = useState("");
    const [Pricebuy, setPricebuy] = useState("");
    const [Pricesale, setPricesale] = useState("");
    const [Qty, setQty] = useState("");
    const [Thumbnail, setThumbnail] = useState(null); // Có thể là tên file cũ hoặc file mới

    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        // Load danh mục & thương hiệu
        axiosInstance.get("/categories").then(res => setCategories(res.data));
        axiosInstance.get("/brands").then(res => setBrands(res.data));

        // Load sản phẩm
        axiosInstance.get(`/products/${id}`).then(res => {
            const product = res.data;
            setBrandId(product.brand_id);
            setCategoryId(product.category_id);
            setName(product.name);
            setDescription(product.description);
            setContent(product.content);
            setPricebuy(product.pricebuy);
            setPricesale(product.pricesale);
            setQty(product.qty);
            setThumbnail(product.thumbnail); // Lưu tên file
        });
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const productData = {
            category_id: parseInt(CategoryId),
            brand_id: parseInt(BrandId),
            name: Name,
            slug: createSlug(Name),
            thumbnail: "", // sẽ gán sau
            description: Description,
            content: Content,
            pricebuy: parseFloat(Pricebuy),
            pricesale: parseFloat(Pricesale),
            qty: parseInt(Qty),
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

            // Nếu là file mới thì upload, còn không giữ nguyên tên cũ
            if (Thumbnail instanceof File) {
                const fileData = new FormData();
                fileData.append("files", Thumbnail);
                axiosInstance.enableUploadFile();
                const res = await axiosInstance.post("/upload", fileData);
                filename = res.data.filename;
            } else {
                filename = Thumbnail;
            }

            productData.thumbnail = filename;

            axiosInstance.enableJson();
            const resProduct = await axiosInstance.put(`/products/${id}`, productData);
            console.log("Cập nhật sản phẩm thành công:", resProduct);

            navigate("/admin/Listproduct");
        } catch (error) {
            console.error("Lỗi khi cập nhật sản phẩm:", error.response?.data || error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="card shadow-sm">
                <div className="card-header bg-light">
                    <div className="row">
                        <div className="col-6">
                            <strong className="text-primary">Chỉnh sửa sản phẩm</strong>
                        </div>
                        <div className="col-6 text-end">
                            <Link className="btn btn-sm btn-success" to="/admin/listproduct">
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
                                <label><strong>Tên sản phẩm</strong></label>
                                <input type="text" className="form-control" value={Name} onChange={(e) => setName(e.target.value)} />
                            </div>

                            <div className="mb-3">
                                <label><strong>Mô tả</strong></label>
                                <textarea rows="3" className="form-control" value={Description} onChange={(e) => setDescription(e.target.value)} />
                            </div>

                            <div className="mb-3">
                                <label><strong>Chi tiết</strong></label>
                                <textarea rows="5" className="form-control" value={Content} onChange={(e) => setContent(e.target.value)} />
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
                                <label><strong>Danh mục</strong></label>
                                <select className="form-control" value={CategoryId} onChange={(e) => setCategoryId(e.target.value)}>
                                    <option value="">-- Chọn danh mục --</option>
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-3">
                                <label><strong>Thương hiệu</strong></label>
                                <select className="form-control" value={BrandId} onChange={(e) => setBrandId(e.target.value)}>
                                    <option value="">-- Chọn thương hiệu --</option>
                                    {brands.map(brand => (
                                        <option key={brand.id} value={brand.id}>{brand.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-3">
                                <label><strong>Giá bán</strong></label>
                                <input type="number" className="form-control" value={Pricebuy} onChange={(e) => setPricebuy(e.target.value)} />
                            </div>

                            <div className="mb-3">
                                <label><strong>Giá sale</strong></label>
                                <input type="number" className="form-control" value={Pricesale} onChange={(e) => setPricesale(e.target.value)} />
                            </div>

                            <div className="mb-3">
                                <label><strong>Số lượng</strong></label>
                                <input type="number" className="form-control" value={Qty} onChange={(e) => setQty(e.target.value)} />
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

export default ProductEdit;
