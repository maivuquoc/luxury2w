import { imageURL } from "../../../api/config";
import { FaEye } from 'react-icons/fa';
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { ADD } from '../../../redux/action/cartAction';
import { toast } from 'react-toastify';
import React, { useState } from 'react';



const ProductItem = ({ product, brand }) => {
    const [amountItem, setAmountItem] = useState(1);
    const dispatch = useDispatch();
    const handleAddToCart = (amountItem) => {
        const productAddToCart = {
            ...product,
            amount: amountItem
        };
        dispatch(ADD(productAddToCart));

        toast.success(`${product.name} đã được thêm vào giỏ hàng!`)
    }
    return (
        <div className="alert alert-light d-flex flex-column h-100">
            <img
                src={`${imageURL}/public/${product.thumbnail}`}
                className="rounded"
                alt={product.name}
                width={263}
                height={265}
            />
            <div className="text-center  border-top flex-grow-1 d-flex flex-column">
                <p className="product-vendor">{brand?.name || "Thương hiệu khác"}</p>
                <span
                    className="product-name"
                    style={{
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 2,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        height: "48px"
                    }}
                >
                    {product.name}
                </span>
                <div className="price-box my-2">
                    <span className="special-price">
                        <span className="price product-price">
                            {product.pricesale?.toLocaleString()} VNĐ
                        </span>
                    </span>
                    {product.pricebuy && (
                        <>
                            <span
                                className="old-price"
                                style={{ marginLeft: '8px' }}
                            >
                                <del className="product-price-old sale">
                                    {product.pricebuy.toLocaleString()} VNĐ
                                </del>
                            </span>
                            <span
                                className="badge rounded-pill bg-danger"
                                style={{ marginLeft: '8px' }}
                            >
                                {`${Math.round(((product.pricebuy - product.pricesale) / product.pricebuy) * 100)}%`}
                            </span>
                            <div className="save-price small text-muted mt-1">
                                (Tiết kiệm: <span>
                                    {(product.pricebuy - product.pricesale).toLocaleString()}₫
                                </span>)
                            </div>
                        </>
                    )}
                </div>

                {/* BUTTON THÊM VÀO GIỎ */}
                <div className=" d-flex ">
                    <Link
                        to={`/products/slug/${product.slug}`}
                        className="btn btn-light w-20 d-flex justify-content-center align-items-center"
                        style={{
                            borderRadius: "30px",
                            border: "1px solid #ccc",
                            fontWeight: "bold"
                        }}
                    >
                        <FaEye style={{ marginRight: '5px' }} /> {/* Icon mắt */}
                    </Link>
                    <button
                        className="btn btn-light w-75"
                        style={{
                            borderRadius: "30px",
                            border: "1px solid #ccc",
                            fontWeight: "bold"
                        }}
                        onClick={() => handleAddToCart(amountItem)}
                    >
                        Thêm vào giỏ hàng
                    </button>

                </div>
            </div>
        </div>
    );
};

export default ProductItem;