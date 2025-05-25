import axiosInstance from "./axios";


const apiTopics = {
    //Tất cả 
    getAll: () => {
        return axiosInstance.get("/topics").then((res) => res.data);
    },

    //Xem 1 
    getOne: (id) => {
        return axiosInstance.get(`/topics/${id}`).then((res) => res.data);
    },

    //Thêm 
    createTopic: (topic) => {
        const adminToken = axiosInstance.getAuthToken('admin');

        if (adminToken === null) {
            return;
        }
        return axiosInstance.post("/topics", topic, {
            headers: {
                Authorization: `Bearer ${adminToken}`
            }
        });
    },

    //Sửa 
    updateTopic: (id, topic) => {
        const adminToken = axiosInstance.getAuthToken('admin');

        if (adminToken === null) {
            return;
        }
        return axiosInstance.put(`/topics/${id}`, topic, {
            headers: {
                Authorization: `Bearer ${adminToken}`
            }
        });
    },

    //Xoá 
    deleteTopic: (id) => {
        const adminToken = axiosInstance.getAuthToken('admin');
        
        if (adminToken === null) {
            return;
        }
        return axiosInstance.delete(`/topics/${id}`, {
            headers: {
                Authorization: `Bearer ${adminToken}`
            }
        });    
    },

    //
    updateStatus: (id, status) => {
        return axiosInstance.patch(`/topics/${id}`, { status }).then(res => res.data);
    }



}
export default apiTopics;
