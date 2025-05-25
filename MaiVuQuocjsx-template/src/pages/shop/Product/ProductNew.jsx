import { Link } from "react-router-dom";
import apiProduct from '../../../api/apiProduct';
import ProductItem from './ProductItem';
import React, { useEffect, useState } from 'react';
import apiBrands from "../../../api/apiBrands";


const ProductNew = () => {
    const [products, setProducts] = useState([]);
    const [brands, setBrands] = useState([]);
  

  useEffect(() => {
    apiProduct.newProduct().then((res) => {
      try {
        const productData = res.map(product => ({
          id: product.id,
          category_id: product.category_id,
          brand_id: product.brand_id,
          name: product.name,
          slug: product.slug,
          thumbnail: product.thumbnail,
          description: product.description,
          content: product.content,
          pricebuy: product.pricebuy,
          pricesale: product.pricesale,
          qty: product.qty,
        }))
        setProducts(productData);
      } catch (err) {
        console.error("Lỗi khi xử lý dữ liệu:", err);
      }
    });
    apiBrands.getAll().then((res) => {
      setBrands(res);
    });
  }, []);
    return (
        <div>
            <div className="container py-5">
                <div className="row">
                    <h3 className="text-center py-2">Sản phẩm mới nhất</h3>
                    {products.map((product, index) => (
                    <div className="col-md-3" key={index}>
                      <ProductItem product={product} brand={brands.find(b => b.id === product.brand_id)}/>
                    </div>
                  ))}

                    <div className="mb-3 mt-3 text-center">
                        <Link to="/products">
                            <button type="button" className="btn btn-outline-dark">Xem tất cả</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ProductNew;