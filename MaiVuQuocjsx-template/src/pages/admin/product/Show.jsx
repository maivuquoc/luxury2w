import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
//api
import apiProduct from '../../../api/apiProduct';
import { imageURL } from "../../../api/config";

function ProductShow() {
    const { id } = useParams(); // Lấy id từ URL
    const [product, setProduct] = useState(null);

    useEffect(() => {
        apiProduct.getOne(id)
            .then((res) => {
                setProduct(res);
            })
            .catch((err) => {
                console.error("Lỗi khi gọi API sản phẩm:", err);
            });
    }, [id]);

    if (!product) return <div className="p-4">Đang tải dữ liệu sản phẩm...</div>;

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-header bg-info text-white">
                    <div className="row">
                        <div className="col-md-6">
                            <strong>Chi tiết sản phẩm: {product.name}</strong>
                        </div>
                        <div className="col-md-6 text-end">
                            <Link to="/admin/listProduct" className="btn btn-sm btn-success">
                                <i className="fa fa-long-arrow-alt-left me-1"></i>
                                Về danh sách
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="card-body">
                    <div className="row mb-3">
                        <div className="col-md-3 fw-bold">Tên sản phẩm:</div>
                        <div className="col-md-9">{product.name}</div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-3 fw-bold">Slug:</div>
                        <div className="col-md-9">{product.slug}</div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-3 fw-bold">Mô tả:</div>
                        <div className="col-md-9">{product.description}</div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-3 fw-bold">Nội dung:</div>
                        <div className="col-md-9">{product.content}</div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-3 fw-bold">Giá bán:</div>
                        <div className="col-md-9">{product.pricebuy.toLocaleString('vi-VN')} VNĐ</div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-3 fw-bold">Giá sale:</div>
                        <div className="col-md-9">{product.pricesale.toLocaleString('vi-VN')} VNĐ</div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-3 fw-bold">Số lượng:</div>
                        <div className="col-md-9">{product.qty}</div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-3 fw-bold">Hình ảnh:</div>
                        <div className="col-md-9">
                            <img
                                src={`${imageURL}/public/${product.thumbnail}`}
                                alt={product.name}
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

export default ProductShow;
