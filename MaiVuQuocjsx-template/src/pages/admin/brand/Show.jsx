import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
// api
import apiBrand from '../../../api/apiBrands';
import { imageURL } from "../../../api/config";

function BrandShow() {
    const { id } = useParams(); // Lấy id từ URL
    const [brand, setBrand] = useState(null);

    useEffect(() => {
        apiBrand.getOne(id)
            .then((res) => {
                setBrand(res);
            })
            .catch((err) => {
                console.error("Lỗi khi gọi API thương hiệu:", err);
            });
    }, [id]);

    if (!brand) return <div className="p-4">Đang tải dữ liệu thương hiệu...</div>;

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-header bg-info text-white">
                    <div className="row">
                        <div className="col-md-6">
                            <strong>Chi tiết thương hiệu: {brand.name}</strong>
                        </div>
                        <div className="col-md-6 text-end">
                            <Link to="/admin/listBrand" className="btn btn-sm btn-success">
                                <i className="fa fa-long-arrow-alt-left me-1"></i>
                                Về danh sách
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="card-body">
                    <div className="row mb-3">
                        <div className="col-md-3 fw-bold">Tên thương hiệu:</div>
                        <div className="col-md-9">{brand.name}</div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-3 fw-bold">Slug:</div>
                        <div className="col-md-9">{brand.slug}</div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-3 fw-bold">Mô tả:</div>
                        <div className="col-md-9">{brand.description}</div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-3 fw-bold">Thứ tự hiển thị:</div>
                        <div className="col-md-9">{brand.sort_order}</div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-3 fw-bold">Hình ảnh:</div>
                        <div className="col-md-9">
                            <img
                                src={`${imageURL}/public/${brand.thumbnail}`}
                                alt={brand.name}
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

export default BrandShow;
