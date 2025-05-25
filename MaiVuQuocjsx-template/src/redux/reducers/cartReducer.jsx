const initCart = {
    carts: [],
    amountItem: 0,
    totalAmount: 0
};

// Hàm lưu giỏ hàng vào localStorage theo user
const saveCartToLocalStorage = (carts) => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (user?.id) {
        localStorage.setItem(`cart_${user.id}`, JSON.stringify(carts));
    }
};

const cartReducer = (state = initCart, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            const exisingItemIndex = state.carts.findIndex(item => item.id === action.payload.id);
            if (exisingItemIndex !== -1) {
                const updatedCart = state.carts.map((item, index) =>
                    index === exisingItemIndex
                        ? { ...item, quantity: item.quantity + action.payload.amount }
                        : item
                );
                saveCartToLocalStorage(updatedCart);
                return {
                    ...state,
                    carts: updatedCart,
                    amountItem: state.amountItem
                };
            } else {
                const newCart = [...state.carts, { ...action.payload, quantity: action.payload.amount }];
                saveCartToLocalStorage(newCart);
                return {
                    ...state,
                    carts: newCart,
                    amountItem: state.amountItem + 1
                };
            }

        case 'TOTAL_CART':
            let total = 0;
            state.carts.forEach(item => {
                const price = Number(item.price) || 0;
                const quantity = Number(item.quantity) || 0;
                total += price * quantity;
            });
            return {
                ...state,
                totalAmount: total
            };

        case 'REMOVE_ITEM_CART':
            const filteredCart = state.carts.filter(item => item.id !== action.payload);
            saveCartToLocalStorage(filteredCart);
            return {
                ...state,
                carts: filteredCart,
                amountItem: filteredCart.length
            };

        case 'CLEAR_CART':
            saveCartToLocalStorage([]);
            return {
                ...state,
                carts: [],
                totalAmount: 0
            };

        case 'LOAD_CART':
            return {
                ...state,
                carts: action.payload,
                amountItem: action.payload.length
            };

            case 'UPDATE_QUANTITY_CART':
                const updatedQuantityCart = state.carts.map(item =>
                    item.id === action.payload.id
                        ? { ...item, quantity: action.payload.quantity }
                        : item
                );
                saveCartToLocalStorage(updatedQuantityCart);
                return {
                    ...state,
                    carts: updatedQuantityCart
                };

        default:
            return state;
    }
};

export default cartReducer;
