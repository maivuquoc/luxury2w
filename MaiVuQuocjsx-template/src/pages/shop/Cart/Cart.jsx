import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CartItem from './CartItem';
import { Link } from "react-router-dom";
import { TOTAL } from '../../../redux/action/cartAction';

const Cart = () => {
  const getDataCart = useSelector(state => state.cart.carts);
  const dispatch = useDispatch();

  
  useEffect(() => {
    dispatch(TOTAL());
  }, [getDataCart, dispatch]);  

  const totalAmount = useSelector((state) => state.cart.totalAmount);
  console.log("getDataCart: ", getDataCart);
  console.log("Total amount: ", totalAmount);

  return (
    <div className="container my-5">
      <section>
        <div className="bg-body-tertiary">
          <div className="container">
            <div className="row">
              <ul className="breadcrumb m-0 px-0 py-2">
                <li className="home">
                  <Link to="/"><span>Trang chủ</span></Link>
                  <span className="mr_lr">&nbsp;/&nbsp;</span>
                </li>
                <li><strong><span>Giỏ hàng của bạn</span></strong></li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <h2 className="mb-4 text-center">Giỏ hàng của bạn</h2>
      <div className="card shadow-sm">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th scope="col">Ảnh</th>
                  <th scope="col">Sản phẩm</th>
                  <th scope="col">Giá</th>
                  <th scope="col">Số lượng</th>
                  <th scope="col">Tổng</th>
                  <th scope="col">Trạng thái</th>
                  <th scope="col">Xóa</th>
                </tr>
              </thead>
              <tbody>
                {getDataCart.map((item, index) => (
                  <CartItem key={item.id || index} item={item} />
                ))}
              </tbody>
            </table>
          </div>
          <div className="d-flex justify-content-between align-items-center mt-4">
            <h4>Tổng cộng: {totalAmount?.toLocaleString()} VNĐ</h4>
            <Link to="/checkout">
              <button className="btn btn-primary">Đặt đơn hàng</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
