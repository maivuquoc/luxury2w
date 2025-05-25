import React, { useEffect, useState } from 'react';
import { useParams, Link } from "react-router-dom";
import ProductItem from './ProductItem';
import apiProduct from '../../../api/apiProduct';
import apiBrands from "../../../api/apiBrands";


const ProductBrand = () => {
    const { brand_id } = useParams();
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 6;
    const [brands, setBrands] = useState([]);


    useEffect(() => {
        if (!brand_id) return;

        apiProduct.getAllBrandProduct(brand_id).then((res) => {
            try {
                const productData = res.map(product => ({
                    id: product.id,
                    brand_id: product.brand_id,
                    category_id: product.category_id,
                    name: product.name,
                    slug: product.slug,
                    thumbnail: product.thumbnail,
                    description: product.description,
                    content: product.content,
                    pricebuy: product.pricebuy,
                    pricesale: product.pricesale,
                    qty: product.qty,
                }));
                setProducts(productData);
            } catch (err) {
                console.error("Lỗi xử lý dữ liệu:", err);
            }
        });
        apiBrands.getAll().then((res) => {
            setBrands(res);
        });
    }, [brand_id]);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(products.length / productsPerPage);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            <section>
                <div className="bg-body-tertiary">
                    <div className="container">
                        <div className="row">
                            <ul className="breadcrumb m-0 px-0 py-2">
                                <li className="home">
                                    <Link to="/"><span>Trang chủ</span></Link>
                                    <span className="mr_lr">&nbsp;/&nbsp;</span>
                                </li>
                                <li><strong><span>Sản phẩm theo thương hiệu</span></strong></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <section className="page_product section">
                <div className="container py-3">
                    <div className="row">
                        <div className="col-md-3">
                            <div className="container">
                                <div className="col">
                                    <p>Thương hiệu</p>
                                </div>
                                <div className="col">
                                    <div className="col">
                                        <label className="form-check-label">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="brand"
                                            /> Diamond Zone
                                        </label>
                                    </div>
                                    <div className="col">
                                        <label className="form-check-label">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="brand"
                                            /> EGA
                                        </label>
                                    </div>
                                    <div className="col">
                                        <label className="form-check-label">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="brand"
                                            /> EVA
                                        </label>
                                    </div>
                                    <div className="col">
                                        <label className="form-check-label">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="brand"
                                            /> Queen Beauty
                                        </label>
                                    </div>
                                    <div className="col">
                                        <label className="form-check-label">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="brand"
                                            /> Soleil
                                        </label>
                                    </div>
                                </div>

                                <div className="col pt-3 mt-3 border-top">
                                    <p>Màu sắc</p>
                                    <div className="col">
                                        <div className="col">
                                            <div className="spinner-border text-danger" role="status" /> Đỏ
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="col">
                                            <div className="spinner-border text-warning" role="status" /> Vàng
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="col">
                                            <div className="spinner-border text-info" role="status" /> Xanh
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="col">
                                            <div className="spinner-border text-secondary" role="status" /> Xám
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="col">
                                            <div className="spinner-border text-dark" role="status" /> Đen
                                        </div>
                                    </div>
                                </div>

                                <div className="col pt-3 mt-3 border-top">
                                    <p>Mức giá</p>
                                    <div className="col">
                                        <label className="form-check-label">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                name="price"
                                            /> Giá dưới 1.000.000₫
                                        </label>
                                    </div>
                                    <div className="col">
                                        <label className="form-check-label">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                name="price"
                                            /> 1.000.000₫ - 2.000.000₫
                                        </label>
                                    </div>
                                    <div className="col">
                                        <label className="form-check-label">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                name="price"
                                            /> 2.000.000₫ - 3.000.000₫
                                        </label>
                                    </div>
                                    <div className="col">
                                        <label className="form-check-label">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                name="price"
                                            /> 3.000.000₫ - 5.000.000₫
                                        </label>
                                    </div>
                                    <div className="col">
                                        <label className="form-check-label">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                name="price"
                                            /> 5.000.000₫ - 7.000.000₫
                                        </label>
                                    </div>
                                    <div className="col">
                                        <label className="form-check-label">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                name="price"
                                            /> 7.000.000₫ - 10.000.000₫
                                        </label>
                                    </div>
                                    <div className="col">
                                        <label className="form-check-label">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                name="price"
                                            /> Giá trên 10.000.000₫
                                        </label>
                                    </div>
                                </div>

                                <div className="col pt-3 mt-3 border-top">
                                    <p>Dịch vụ giao hàng</p>
                                    <div className="col">
                                        <label className="form-check-label">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="shipping"
                                            /> Miễn phí giao hàng
                                        </label>
                                    </div>
                                    <div className="col">
                                        <label className="form-check-label">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="shipping"
                                            /> Giao hàng nhanh 4h
                                        </label>
                                    </div>
                                    <div className="col">
                                        <label className="form-check-label">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="shipping"
                                            /> Giao hàng tiết kiệm
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-9">
                            <div className="row">
                                {currentProducts.length > 0 ? currentProducts.map((product, index) => (
                                    <div className="col-md-4 mb-4" key={index}>
                                        <ProductItem product={product} brand={brands.find(b => b.id === product.brand_id)} />
                                    </div>
                                )) : (
                                    <p className="text-center">Không có sản phẩm nào</p>
                                )}
                            </div>

                            <nav className="d-flex justify-content-center mt-4">
                                <ul className="pagination">
                                    {Array.from({ length: totalPages }, (_, index) => (
                                        <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                            <button className="page-link" onClick={() => paginate(index + 1)}>
                                                {index + 1}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ProductBrand;
