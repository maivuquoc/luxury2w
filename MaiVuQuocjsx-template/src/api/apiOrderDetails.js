import axiosInstance from "./axios";


const apiOrderDetails = {
    //
    getAll: () => {
        return axiosInstance.get("/orderdetails").then((res) => res.data);
    },

    //
    getOne: (id) => {
        return axiosInstance.get(`/orderdetails/${id}`).then((res) => res.data);
    },

    // 
    createOrderDetail: (orderdetail) => {
        const adminToken = axiosInstance.getAuthToken('admin');

        if (adminToken === null) {
            return;
        }
        return axiosInstance.post("/orderdetails", orderdetail, {
            headers: {
                Authorization: `Bearer ${adminToken}`
            }
        });
    },


    //
    updateOrderDetail: (id, orderdetail) => {
        const adminToken = axiosInstance.getAuthToken('admin');

        if (adminToken === null) {
            return;
        }
        return axiosInstance.put(`/orderdetails/${id}`, orderdetail, {
            headers: {
                Authorization: `Bearer ${adminToken}`
            }
        });
    },

    //Xoá danh mục
    deleteOrderDetail: (id) => {
        const adminToken = axiosInstance.getAuthToken('admin');

        if (adminToken === null) {
            return;
        }
        return axiosInstance.delete(`/orderdetails/${id}`, {
            headers: {
                Authorization: `Bearer ${adminToken}`
            }
        });
    },

    //
    updateStatus: (id, status) => {
        return axiosInstance.patch(`/orderdetails/${id}`, { status }).then(res => res.data);
    },


    createOrderDetailUser: (orderdetail) => {
        return axiosInstance.post("/orderdetails/user", orderdetail).then((res) => res.data);
    },

    getAllOrderDetail: (order_id) => {
        return axiosInstance.get(`/orderdetails/all-order/${order_id}`).then((res) => res.data);
    },

}
export default apiOrderDetails;
