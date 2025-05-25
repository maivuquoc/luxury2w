import axiosInstance from "./axios";


const apiPosts = {
    //Tất cả
    getAll: () => {
        return axiosInstance.get("/posts").then((res) => res.data);
    },

    //Xem
    getOne: (id) => {
        return axiosInstance.get(`/posts/${id}`).then((res) => res.data);
    },

    //Thêm
    createPost: (post) => {
        const adminToken = axiosInstance.getAuthToken('admin');

        if (adminToken === null) {
            return;
        }
        return axiosInstance.post("/posts", post, {
            headers: {
                Authorization: `Bearer ${adminToken}`
            }
        });
    },

    //Sửa
    updatePost: (id, post) => {
        const adminToken = axiosInstance.getAuthToken('admin');

        if (adminToken === null) {
            return;
        }
        return axiosInstance.put(`/posts/${id}`, post, {
            headers: {
                Authorization: `Bearer ${adminToken}`
            }
        });
    },

    //Xoá
    deletePost: (id) => {
        const adminToken = axiosInstance.getAuthToken('admin');

        if (adminToken === null) {
            return;
        }
        return axiosInstance.delete(`/posts/${id}`, {
            headers: {
                Authorization: `Bearer ${adminToken}`
            }
        });
    },

    //
    updateStatus: (id, status) => {
        return axiosInstance.patch(`/posts/${id}`, { status }).then(res => res.data);
    },

    //Lâý bài viết mới 
    newPost: () => {
        return axiosInstance.get("/posts/new").then((res) => res.data);
    },

}
export default apiPosts;
