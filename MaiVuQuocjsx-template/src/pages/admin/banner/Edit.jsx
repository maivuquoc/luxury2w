import { Link, useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../../api/axios';

import { useEffect, useState } from "react";

function BannerEdit() {
    const { id } = useParams();
    const [Name, setName] = useState("");
    const [LinkUrl, setLinkUrl] = useState("");
    const [Position, setPosition] = useState("");
    const [Image, setImage] = useState(null); // Có thể là tên file cũ hoặc file mới
    const [Description, setDescription] = useState("");
    const [SortOrder, setSortOrder] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        // Load banner theo ID
        axiosInstance.get(`/banners/${id}`).then(res => {
            const banner = res.data;
            setName(banner.name);
            setLinkUrl(banner.link);
            setPosition(banner.position);
            setImage(banner.image);
            setDescription(banner.description);
            setSortOrder(banner.sort_order);
        });
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const bannerData = {
            name: Name,
            link: LinkUrl,
            position: Position,
            image: "", // sẽ gán sau
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
        if (adminToken) {
            // Đảm bảo rằng token được thêm vào header Authorization
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${adminToken}`;
        } else {
            alert("Bạn cần đăng nhập trước khi thực hiện thao tác này.");
            return;
        }

        try {
            let filename = "";

            // Nếu là file mới thì upload
            if (Image instanceof File) {
                const fileData = new FormData();
                fileData.append("files", Image);
                axiosInstance.enableUploadFile();
                const res = await axiosInstance.post("/upload", fileData);
                filename = res.data.filename;
            } else {
                filename = Image;
            }

            bannerData.image = filename;

            axiosInstance.enableJson();
            const resBanner = await axiosInstance.put(`/banners/${id}`, bannerData);
            console.log("Cập nhật banner thành công:", resBanner);

            navigate("/admin/listbanner");
        } catch (error) {
            console.error("Lỗi khi cập nhật banner:", error.response?.data || error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="card shadow-sm">
                <div className="card-header bg-light">
                    <div className="row">
                        <div className="col-6">
                            <strong className="text-primary">Chỉnh sửa banner</strong>
                        </div>
                        <div className="col-6 text-end">
                            <Link className="btn btn-sm btn-success" to="/admin/listbanner">
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
                                <label><strong>Tên banner</strong></label>
                                <input type="text" className="form-control" value={Name} onChange={(e) => setName(e.target.value)} />
                            </div>

                            <div className="mb-3">
                                <label><strong>Link</strong></label>
                                <input type="text" className="form-control" value={LinkUrl} onChange={(e) => setLinkUrl(e.target.value)} />
                            </div>

                            <div className="mb-3">
                                <label><strong>Vị trí</strong></label>
                                <input type="text" className="form-control" value={Position} onChange={(e) => setPosition(e.target.value)} />
                            </div>

                            <div className="mb-3">
                                <label><strong>Mô tả</strong></label>
                                <textarea rows="3" className="form-control" value={Description} onChange={(e) => setDescription(e.target.value)} />
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
                                <label><strong>Thứ tự sắp xếp</strong></label>
                                <input type="number" className="form-control" value={SortOrder} onChange={(e) => setSortOrder(e.target.value)} />
                            </div>

                            <div className="mb-3">
                                <label><strong>Hình ảnh</strong></label>
                                <input type="file" className="form-control" onChange={(e) => setImage(e.target.files[0])} />
                                {/* Hiển thị tên ảnh hiện tại */}
                                {typeof Image === "string" && (
                                    <small className="text-muted">Ảnh hiện tại: {Image}</small>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default BannerEdit;
