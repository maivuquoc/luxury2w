import axiosInstance from "./axios";


const apiBrands = {
    // getProductPagination: (page, limit)=> {
    //     return axiosInstance.get(`/products?page=${page}&limit=${limit}`).then((res) => res.data);
    // },

    //Tất cả thương hiệu
    getAll: () => {
        return axiosInstance.get("/brands").then((res) => res.data);
    },

    //Xem 1 thương hiệu
    getOne: (id) => {
        return axiosInstance.get(`/brands/${id}`).then((res) => res.data);
    },

    //Thêm thương hiệu mới 
    createBrand: (brand) => {
        const adminToken = axiosInstance.getAuthToken('admin');

        if (adminToken === null) {
            return;
        }
        return axiosInstance.post("/brands", brand, {
            headers: {
                Authorization: `Bearer ${adminToken}`
            }
        });
    },

    //Sửa thương hiệu
    updateBrand: (id, brand) => {
        const adminToken = axiosInstance.getAuthToken('admin');

        if (adminToken === null) {
            return;
        }
        return axiosInstance.put(`/brands/${id}`, brand, {
            headers: {
                Authorization: `Bearer ${adminToken}`
            }
        });
    },

    //Xoá thương hiệu
    deleteBrand: (id) => {
        const adminToken = axiosInstance.getAuthToken('admin');
        
        if (adminToken === null) {
            return;
        }
        return axiosInstance.delete(`/brands/${id}`, {
            headers: {
                Authorization: `Bearer ${adminToken}`
            }
        });    
    },

    //
    updateStatus: (id, status) => {
        return axiosInstance.patch(`/brands/${id}`, { status }).then(res => res.data);
    }

}
export default apiBrands;
