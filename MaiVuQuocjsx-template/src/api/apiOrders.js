import axiosInstance from "./axios";


const apiOrders = {
    // getProductPagination: (page, limit)=> {
    //     return axiosInstance.get(`/products?page=${page}&limit=${limit}`).then((res) => res.data);
    // },

    //Tất cả đơn hàng
    getAll: () => {
        return axiosInstance.get("/orders").then((res) => res.data);
    },

    //Xem 1 đơn hàng
    getOne: (id) => {
        return axiosInstance.get(`/orders/${id}`).then((res) => res.data);
    },

    //Thêm đơn hàng
    createOrder: (order) => {
        const adminToken = axiosInstance.getAuthToken('admin')

        if (adminToken === null) {
            return;
        }
        return axiosInstance.post("/orders", order, {
            headers: {
                Authorization: `Bearer ${adminToken}`
            }
        });
    },

    //Sửa đơn hàng
    updateOrder: (id, order) => {
        const adminToken = axiosInstance.getAuthToken('admin');

        if (adminToken === null) {
            return;
        }
        return axiosInstance.put(`/orders/${id}`, order, {
            headers: {
                Authorization: `Bearer ${adminToken}`
            }
        });
    },

    //Xoá đơn hàng
    deleteOrder: (id) => {
        const adminToken = axiosInstance.getAuthToken('admin');

        if (adminToken === null) {
            return;
        }
        return axiosInstance.delete(`/orders/${id}`, {
            headers: {
                Authorization: `Bearer ${adminToken}`
            }
        });
    },

    //
    updateStatus: (id, status) => {
        return axiosInstance.patch(`/orders/${id}`, { status }).then(res => res.data);
    },

    //Người dùng
    //tao don hang
    createOrderUser: (order) => {
        return axiosInstance.post("/orders/user", order).then((res) => res.data);
    },

    //Các đơn hàng của người dùng
    getAllOrderUser: (user_id) => {
        return axiosInstance.get(`/orders/all-user/${user_id}`)
            .then((res) => res.data)
            .catch((error) => {
                if (error.response && error.response.status === 404) {
                    // Trả về một thông báo nếu không có đơn hàng
                    return { message: 'Không có đơn hàng nào cho người dùng này.' };
                }
                // Xử lý các lỗi khác nếu có
                throw error;
            });
    },

    //Xoá đơn hàng người dùng
    deleteOrderUser: (id) => {
        return axiosInstance.delete(`/orders/user/${id}`, id).then((res) => res.data);
    },


}
export default apiOrders;
