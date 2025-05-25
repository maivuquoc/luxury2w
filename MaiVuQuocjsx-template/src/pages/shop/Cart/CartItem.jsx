import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { REMOVE_ITEM_CART, TOTAL, UPDATE_QUANTITY_CART } from '../../../redux/action/cartAction';
import { imageURL } from "../../../api/config";
import { toast } from 'react-toastify';

const CartItem = ({ item }) => {
    const dispatch = useDispatch();
    const [amountItem, setAmountItem] = useState(item.quantity || 1);

    // Cập nhật Redux khi số lượng thay đổi
    useEffect(() => {
        dispatch(UPDATE_QUANTITY_CART(item.id, amountItem));
        dispatch(TOTAL());
    }, [amountItem, dispatch, item.id]);

    const handleRemove = () => {
        dispatch(REMOVE_ITEM_CART(item.id));
        dispatch(TOTAL());
        toast.error(`Đã xóa "${item.name}" khỏi giỏ hàng!`, {
            position: "top-right",
            autoClose: 2000,
        });
    };

    return (
        <tr>
            <td>
                <img
                    src={`${imageURL}/public/${item.thumbnail}`}
                    alt={item.name}
                    width="80"
                    height="80"
                    className="img-fluid rounded"
                />
            </td>
            <td>
                <Link to={`/products/slug/${item.slug}`} className="text-decoration-none">
                    {item.name}
                </Link>
            </td>
            <td>{item.pricesale?.toLocaleString()} VNĐ</td>
            <td>
                <div className="d-flex align-items-center gap-2">
                    <div className="input-group" style={{ width: '120px' }}>
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={() => setAmountItem(prev => Math.max(prev - 1, 1))}
                        >
                            <i className="fa fa-minus"></i>
                        </button>
                        <input
                            type="text"
                            className="form-control text-center"
                            value={amountItem}
                            readOnly
                        />
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={() => setAmountItem(prev => prev + 1)}
                        >
                            <i className="fa fa-plus"></i>
                        </button>
                    </div>
                </div>
            </td>
            <td>{(item.pricesale * amountItem).toLocaleString()} VNĐ</td>
            <td>
                <span className={`badge ${item.status === 'paid' ? 'bg-success' : 'bg-warning'}`}>
                    {item.status === 'paid' ? 'Đã thanh toán' : 'Chưa thanh toán'}
                </span>
            </td>
            <td>
                <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={handleRemove}
                >
                    Xóa
                </button>
            </td>
        </tr>
    );
};

export default CartItem;
