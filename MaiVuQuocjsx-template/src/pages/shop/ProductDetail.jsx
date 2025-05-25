import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiProduct from '../../api/apiProduct';
import apiBrand from '../../api/apiBrands';
import { imageURL } from "../../api/config";
import { Link } from "react-router-dom";
import ProductItem from '../shop/Product/ProductItem';
import { useDispatch } from 'react-redux';
import { ADD } from '../../redux/action/cartAction';
import { toast } from 'react-toastify';





const ProductDetail = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [brands, setBrands] = useState([]);


  const [relatedProducts, setRelatedProducts] = useState([]); // Sản phẩm cùng loại
  const [loading, setLoading] = useState(true);
  const [amountItem, setAmountItem] = useState(1);

  const dispatch = useDispatch();



  useEffect(() => {
    if (slug) {
      apiProduct.slugProduct(slug).then(res => {setProduct({
            id: res.id,
            category_id: res.category_id,
            brand_id: res.brand_id,
            name: res.name,
            slug: res.slug,
            thumbnail: res.thumbnail,
            description: res.description,
            content: res.content,
            pricebuy: res.pricebuy,
            pricesale: res.pricesale,
            qty: res.qty,
          });

          apiBrand.getAll().then(res => {
              setBrands(res);
          });

          // Lấy sản phẩm cùng loại sau khi đã có sản phẩm hiện tại
          return apiProduct.getCategoryProduct(res.category_id);
        })
        .then(relatedRes => {
          // Lấy chỉ 4 sản phẩm đầu tiên
          setRelatedProducts(relatedRes.slice(0, 4));
          setLoading(false); // Đánh dấu hoàn thành tải dữ liệu
        })
        .catch(err => {
          console.error("Lỗi lấy chi tiết sản phẩm theo slug:", err);
          setLoading(false); // Đánh dấu lỗi khi tải dữ liệu
        });
    }
  }, [slug]);

  if (loading) {
    return <div className="text-center py-5">Đang tải dữ liệu...</div>;
  }

  if (!product) {
    return <div className="text-center py-5">Không tìm thấy sản phẩm.</div>;
  }

  const handleAddToCart = (amountItem) => {
    const productAddToCart = {
      ...product,
      amount: amountItem
    };
    dispatch(ADD(productAddToCart));

    toast.success(`${product.name} đã được thêm vào giỏ hàng!`)
  }

  return (
    <div>
      <section>
        <div className="bg-body-tertiary">
          <div className="container">
            <div className="row">
              <ul className="breadcrumb m-0 px-0 py-2">
                <li className="home">
                  <Link to="/">
                    <span>Trang chủ</span>
                  </Link>
                  <span className="mr_lr">&nbsp;/&nbsp;</span>
                </li>
                <li><strong><span>Chi tiết sản phẩm</span></strong></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="page_productdetail section">
        <div className="container py-3">
          <div className="row">


            <div className="col-lg-6">
              <img
                src={`${imageURL}/public/${product.thumbnail}`}
                alt="Cinque Terre"
                className="img-thumbnail"
                width="370"
                height="325"
              />
            </div>

            <div className="col-lg-6">
              <div className="col mb-3">
                <h2>{product.name}</h2>
                <div>
                  <span className="me-4">Thương hiệu: {
                    brands.find(b => b.id === product.brand_id)?.name || "Đang cập nhật"
                  }</span>                
                  <span>Mã sản phẩm: Đang cập nhật</span>
                </div>
              </div>

              <div className="col mb-3">
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


                <div className="product-promotion rounded-sm" id="ega-salebox">
                  <h3 className="product-promotion__heading rounded-sm d-inline-flex align-items-center text-danger py-3">
                    <img
                      src="/assets/image/icon-product-promotion.png"
                      alt="Khuyến mãi"
                      width="22"
                      height="22"
                      className="me-2"
                    />
                    KHUYẾN MÃI - ƯU ĐÃI
                  </h3>
                  <ul className="promotion-box">
                    <li>
                      Nhập mã <strong>EGANY</strong> giảm thêm 5% đơn hàng từ 30 triệu{' '}
                      <span className="smb-copy smb-cursor-pointer text-danger" data-code="EGANY">
                        Sao chép
                      </span>
                    </li>
                    <li>Miễn phí vận chuyển toàn quốc cho tất cả đơn hàng</li>
                    <li>Tặng ngay Voucher mua hàng trị giá 10 triệu cho đơn hàng từ 50 triệu</li>
                    <li>Tặng kèm dịch vụ gói quà chuyên nghiệp</li>
                    <li>Giảm ngay 30% khi mua trọn bộ BST trang sức EVA mới năm 2023</li>
                  </ul>
                </div>

                <p className="mt-3">Mã giảm giá</p>
                <span className="badge bg-danger me-1">EGA05</span>
                <span className="badge bg-danger me-1">EGA10</span>
                <span className="badge bg-danger me-1">EGA15</span>
                <span className="badge bg-danger">FREESHIP</span>

                <div className="d-flex align-items-center gap-2 mt-2">
                  <span>Số lượng</span>
                  <div className="input-group" style={{ width: '120px' }}>
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={() => setAmountItem(prev => Math.max(prev - 1, 1))}
                    >
                      <i className="fa fa-minus"></i>
                    </button>
                    <input type="text" className="form-control text-center" value={amountItem}
                      onChange={(e) => setAmountItem(e.target.value)} readOnly />
                    <button className="btn btn-outline-secondary" type="button"
                      onClick={() => setAmountItem(prev => prev + 1)}
                    >
                      <i className="fa fa-plus"></i>
                    </button>
                  </div>
                </div>

                <div className="mb-3 mt-3">
                  <button type="button" className="btn btn-outline-dark me-2" onClick={() =>
                    handleAddToCart(amountItem)} >
                    Thêm vào giỏ hàng
                  </button>
                  <button
                    type="button"
                    className="btn btn-dark"
                    onClick={() => toast.info('Sản phẩm đã được thêm vào giỏ hàng và sẵn sàng để mua ngay!')}  // Nút mua ngay
                  >
                    Mua ngay
                  </button>
                </div>
              </div>

              <div className="col pt-3 mt-3 border-top py-3">
                <div className="container">
                  <div className="row text-center">
                    <div className="col">
                      <img
                        src="/assets/image/policy_product_image_1.png"
                        alt="Giao hàng miễn phí"
                        className="img-fluid"
                        width="24"
                        height="24"
                      />
                      <div>Giao hàng miễn phí toàn quốc</div>
                    </div>
                    <div className="col">
                      <img
                        src="/assets/image/policy_product_image_2.png"
                        alt="Tích điểm"
                        className="img-fluid"
                        width="24"
                        height="24"
                      />
                      <div>Tích điểm tất cả sản phẩm</div>
                    </div>
                    <div className="col">
                      <img
                        src="/assets/image/policy_product_image_3.png"
                        alt="Giảm thanh toán online"
                        className="img-fluid"
                        width="24"
                        height="24"
                      />
                      <div>Giảm 5% khi thanh toán online</div>
                    </div>
                  </div>
                </div>
              </div>

              <h4 className="py-3">Mô tả sản phẩm</h4>
              <div className="container">
                <p className="pt-2 mt-3 border-top">
                  Cuốn hút đến từ sự thanh lịch, kim cương chưa bao giờ là lỗi thời khi nàng biết chọn
                  cho mình những thiết kế độc đáo, trẻ trung. Sở hữu thiết kế tinh xảo, trẻ trung, đôi bông
                  tai Kim cương EGA Luxury không chỉ bừng sáng nét thanh tú, rạng ngời của nàng mà còn là
                  món quà mang ý nghĩa vĩnh cửu.
                </p>
                <p>
                  Bên cạnh đó, ánh kim rực rỡ của vàng 14K sẽ tôn lên vẻ đẹp cổ điển của phụ nữ Á đông.
                  Nàng đừng ngần ngại phối nữ trang đính kim cương với những bộ cánh dạ tiệc hay phục trang
                  tối giản, đơn sắc để hoàn thiện vẻ ngoài sang trọng của mình.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="container py-3">
          <h3>Sản phẩm cùng loại</h3>
          <div className="row">
            {relatedProducts.map((relatedProduct) => (
              <div key={relatedProduct.id} className="col-md-3 col-sm-6 col-12">
                <ProductItem product={relatedProduct} brand={brands.find(b => b.id === product.brand_id)}/>
              </div>
            ))}
          </div>
        </div>

      </section>
    </div>
  );
};

export default ProductDetail;
