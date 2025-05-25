export const ADD = (item) => {
    return {
        type: 'ADD_TO_CART',
        payload: {
            ...item,
            price: Number(item.pricesale || item.price || 0),
            amount: Number(item.amount || 1)
        }
    };
};


export const TOTAL = () => ({
    type: 'TOTAL_CART',
});

export const REMOVE_ITEM_CART = (id) => ({
    type: 'REMOVE_ITEM_CART',
    payload: id
});


export const CLEAR_CART = () => ({
    type: 'CLEAR_CART'
});

export const LOAD_CART = 'LOAD_CART';

export const loadCart = (cartItems) => {
    return {
        type: LOAD_CART,
        payload: cartItems
    };
};

export const UPDATE_QUANTITY_CART = (id, quantity) => {
    return {
        type: 'UPDATE_QUANTITY_CART',
        payload: { id, quantity }
    };
};


