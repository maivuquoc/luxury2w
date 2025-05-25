import axiosInstance from "./axios";

const apiCategories = {
    //lấy tất cả danh mục
    getAll: () => {
        return axiosInstance.get("/categories").then((res) => res.data);
    },

    //Xem 1 danh mục
    getOne: (id) => {
        return axiosInstance.get(`/categories/${id}`).then((res) => res.data);
    },

    //thêm danh mục
    createCategory: (category) => {
        const adminToken = axiosInstance.getAuthToken('admin');

        if (adminToken === null) {
            return;
        }
        return axiosInstance.post("/categories", category, {
            headers: {
                Authorization: `Bearer ${adminToken}`
            }
        });
    },

    //Sửa danh mục
    updateCategory: (id, category) => {
        const adminToken = axiosInstance.getAuthToken('admin');

        if (adminToken === null) {
            return;
        }
        return axiosInstance.put(`/categories/${id}`, category, {
            headers: {
                Authorization: `Bearer ${adminToken}`
            }
        });
    },
    

    //Xoá danh mục
    deleteCategory: (id) => {
        const adminToken = axiosInstance.getAuthToken('admin');
        
        if (adminToken === null) {
            return;
        }
        return axiosInstance.delete(`/categories/${id}`, {
            headers: {
                Authorization: `Bearer ${adminToken}`
            }
        });    
    },

    updateStatus: (id, status) => {
        return axiosInstance.patch(`/categories/${id}`, { status }).then(res => res.data);
    }
}
export default apiCategories;
