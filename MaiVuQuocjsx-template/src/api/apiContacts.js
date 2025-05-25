import axiosInstance from "./axios";


const apiContacts = {
    //Tất cả liên hệ
    getAll: () => {
        return axiosInstance.get("/contacts").then((res) => res.data);
    },

    //Xem 1 liên hệ
    getOne: (id) => {
        return axiosInstance.get(`/contacts/${id}`).then((res) => res.data);
    },

    //Thêm liên hệ mới 
    createContact: (contact) => {
        const adminToken = axiosInstance.getAuthToken('admin');

        if (adminToken === null) {
            return;
        }
        return axiosInstance.post("/contacts", contact, {
            headers: {
                Authorization: `Bearer ${adminToken}`
            }
        });
    },

    //Sửa liên hệ
    updateContact: (id, contact) => {
        const adminToken = axiosInstance.getAuthToken('admin');

        if (adminToken === null) {
            return;
        }
        return axiosInstance.put(`/contacts/${id}`, contact, {
            headers: {
                Authorization: `Bearer ${adminToken}`
            }
        });
    },

    //Xoá liên hệ
    deleteContact: (id) => {
        const adminToken = axiosInstance.getAuthToken('admin');

        if (adminToken === null) {
            return;
        }
        return axiosInstance.delete(`/contacts/${id}`, {
            headers: {
                Authorization: `Bearer ${adminToken}`
            }
        });
    },

    //
    updateStatus: (id, status) => {
        return axiosInstance.patch(`/contacts/${id}`, { status }).then(res => res.data);
    },

    //tao don hang
    createContactUser: (contact) => {
        return axiosInstance.post("/contacts/user", contact).then((res) => res.data);
    },
}
export default apiContacts;
