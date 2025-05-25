import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
// API
import apiCategory from '../../../api/apiCategories';
import { imageURL } from "../../../api/config";

function CategoryShow() {
    const { id } = useParams();
    const [category, setCategory] = useState(null);

    useEffect(() => {
        apiCategory.getOne(id)
            .then((res) => {
                setCategory(res);
            })
            .catch((err) => {
                console.error("Lỗi khi gọi API danh mục:", err);
            });
    }, [id]);

    if (!category) return <div className="p-4">Đang tải dữ liệu danh mục...</div>;

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-header bg-info text-white">
                    <div className="row">
                        <div className="col-md-6">
                            <strong>Chi tiết danh mục: {category.name}</strong>
                        </div>
                        <div className="col-md-6 text-end">
                            <Link to="/admin/listCategory" className="btn btn-sm btn-success">
                                <i className="fa fa-long-arrow-alt-left me-1"></i>
                                Về danh sách
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="card-body">
                    <div className="row mb-3">
                        <div className="col-md-3 fw-bold">Tên danh mục:</div>
                        <div className="col-md-9">{category.name}</div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-3 fw-bold">Slug:</div>
                        <div className="col-md-9">{category.slug}</div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-3 fw-bold">Mô tả:</div>
                        <div className="col-md-9">{category.description}</div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-3 fw-bold">Parent ID:</div>
                        <div className="col-md-9">{category.parent_id}</div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-3 fw-bold">Thứ tự:</div>
                        <div className="col-md-9">{category.sort_order}</div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-3 fw-bold">Hình ảnh:</div>
                        <div className="col-md-9">
                            <img
                                src={`${imageURL}/public/${category.thumbnail}`}
                                alt={category.name}
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

export default CategoryShow;
