import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
// API
import apiBanner from '../../../api/apiBanners';
import { imageURL } from "../../../api/config";

function BannerShow() {
    const { id } = useParams(); // Lấy id từ URL
    const [banner, setBanner] = useState(null);

    useEffect(() => {
        apiBanner.getOne(id)
            .then((res) => {
                setBanner(res);
            })
            .catch((err) => {
                console.error("Lỗi khi gọi API banner:", err);
            });
    }, [id]);

    if (!banner) return <div className="p-4">Đang tải dữ liệu banner...</div>;

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-header bg-info text-white">
                    <div className="row">
                        <div className="col-md-6">
                            <strong>Chi tiết banner: {banner.name}</strong>
                        </div>
                        <div className="col-md-6 text-end">
                            <Link to="/admin/listBanner" className="btn btn-sm btn-success">
                                <i className="fa fa-long-arrow-alt-left me-1"></i>
                                Về danh sách
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="card-body">
                    <div className="row mb-3">
                        <div className="col-md-3 fw-bold">Tên banner:</div>
                        <div className="col-md-9">{banner.name}</div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-3 fw-bold">Liên kết (Link):</div>
                        <div className="col-md-9">{banner.link}</div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-3 fw-bold">Vị trí:</div>
                        <div className="col-md-9">{banner.position}</div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-3 fw-bold">Mô tả:</div>
                        <div className="col-md-9">{banner.description}</div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-3 fw-bold">Thứ tự hiển thị:</div>
                        <div className="col-md-9">{banner.sort_order}</div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-3 fw-bold">Hình ảnh:</div>
                        <div className="col-md-9">
                            <img
                                src={`${imageURL}/public/${banner.image}`}
                                alt={banner.name}
                                style={{
                                    width: "100px",
                                    height: "100px",
                                    objectFit: "cover",
                                    border: "1px solid #ccc",
                                    borderRadius: "6px",
                                    padding: "2px",
                                    backgroundColor: "#fff"
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BannerShow;
