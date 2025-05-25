import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../../api/axios';
import apiBanner from '../../../api/apiBanners';
import { useState } from "react";
import createSlug from '../../../utils/f';

function BannerAdd() {
    const [Name, setName] = useState("");
    const [LinkBanner, setLinkBanner] = useState("");
    const [Position, setPosition] = useState("");
    const [Description, setDescription] = useState("");
    const [SortOrder, setSortOrder] = useState("");
    const [Image, setImage] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const bannerData = {
            name: Name,
            slug: createSlug(Name),
            link: LinkBanner,
            position: Position,
            description: Description,
            sort_order: parseInt(SortOrder),
            image: "",
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
        // console.log("000")

        try {
            let filename = "";
            if (Image) {
                const file = new FormData();
                file.append("files", Image);

                axiosInstance.enableUploadFile();
                const res = await axiosInstance.post("/upload", file);
                filename = res.data.filename;
            }
            // console.log("001")
            bannerData.image = filename;
            // console.log("002")
            axiosInstance.enableJson();
            const resBanner = await apiBanner.createBanner(bannerData);
            // console.log("003")
            console.log("Thêm banner thành công:", resBanner);
            navigate("/admin/listbanner");
        } catch (error) {
            console.error("Lỗi khi thêm banner:", error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="card shadow-sm">
                <div className="card-header bg-light">
                    <div className="row">
                        <div className="col-6">
                            <strong className="text-primary">Thêm banner</strong>
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
                        <div className="col-md-8">
                            <div className="mb-3">
                                <label><strong>Tên banner</strong></label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={Name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label><strong>Đường dẫn (Link)</strong></label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={LinkBanner}
                                    onChange={(e) => setLinkBanner(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label><strong>Vị trí hiển thị</strong></label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={Position}
                                    onChange={(e) => setPosition(e.target.value)}
                                    placeholder="VD: home-top, sidebar-right"
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label><strong>Mô tả</strong></label>
                                <textarea
                                    rows="3"
                                    className="form-control"
                                    value={Description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>

                            <div className="mb-3">
                                <label><strong>Thứ tự hiển thị</strong></label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={SortOrder}
                                    onChange={(e) => setSortOrder(e.target.value)}
                                />
                            </div>

                            <div className="text-end">
                                <button type="submit" className="btn btn-sm btn-primary">
                                    <i className="fa fa-save me-1"></i>
                                    Lưu
                                </button>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="mb-3">
                                <label><strong>Hình ảnh</strong></label>
                                <input
                                    type="file"
                                    className="form-control"
                                    onChange={(e) => setImage(e.target.files[0])}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default BannerAdd;
