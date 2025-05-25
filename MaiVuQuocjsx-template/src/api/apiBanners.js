import axiosInstance from "./axios";


const apiBanners = {
    //Tất cả thương hiệu
    getAll: () => {
        return axiosInstance.get("/banners").then((res) => res.data);
    },

    //Xem 1 thương hiệu
    getOne: (id) => {
        return axiosInstance.get(`/banners/${id}`).then((res) => res.data);
    },

    //Thêm thương hiệu mới 
    createBanner: (banner) => {
        const adminToken = axiosInstance.getAuthToken('admin');

        if (adminToken === null) {
            return;
        }
        return axiosInstance.post("/banners", banner, {
            headers: {
                Authorization: `Bearer ${adminToken}`
            }
        });
    },

    //Sửa thương hiệu
    updateBanner: (id, banner) => {
        const adminToken = axiosInstance.getAuthToken('admin');

        if (adminToken === null) {
            return;
        }
        return axiosInstance.put(`/banners/${id}`, banner, {
            headers: {
                Authorization: `Bearer ${adminToken}`
            }
        });
    },

    //Xoá thương hiệu
    deleteBanner: (id) => {
        const adminToken = axiosInstance.getAuthToken('admin');
        
        if (adminToken === null) {
            return;
        }
        return axiosInstance.delete(`/banners/${id}`, {
            headers: {
                Authorization: `Bearer ${adminToken}`
            }
        });    
    },

    //
    updateStatus: (id, status) => {
        return axiosInstance.patch(`/banners/${id}`, { status }).then(res => res.data);
    }



}
export default apiBanners;
