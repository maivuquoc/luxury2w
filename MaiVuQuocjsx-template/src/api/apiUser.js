import axiosInstance from "./axios";


const apiUser = {
    // createUser: (data) => {
    //     return axiosInstance.post("/users", data);
    // },

    //Xem tất cả user
    getAll: () => {
        return axiosInstance.get("/users").then((res) => res.data);
    },

    //Xem 1 user
    getOne: (id) => {
        return axiosInstance.get(`/users/${id}`).then((res) => res.data);
    },

    //tạo 
    createUser: (data) => {
        return axiosInstance.post("/users", data).then((res) => res.data);
    },

    //
    loginUser: (data) => {
        return axiosInstance.post("/users/login", data)
    },

    //Sửa 1 user
    updateUser: (id, data) => {
        return axiosInstance.put(`/users/${id}`, data).then(res => res.data);
    },

    //Xoá user
    deleteUser: (id) => {
        return axiosInstance.delete(`/users/${id}`).then(res => res.data);
    },

    //
    updateStatus: (id, status) => {
        return axiosInstance.patch(`/users/${id}`, { status }).then(res => res.data);
    },

    //Kiểm tra email
    checkEmail: (email) => {
        return axiosInstance.post('/users/check-email', { email }).then(res => res.data);
    },

    //đổi pass
    updatePassword: (email, newPassword) => {
        return axiosInstance.patch('/users/update-password', { email, newPassword }).then(res => res.data);
    },

    
    
}

export default apiUser;