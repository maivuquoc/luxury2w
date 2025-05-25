import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import apiContact from '../../../api/apiContacts';
import axiosInstance from '../../../api/axios';

function ContactTrash() {
    const [trashContacts, setTrashContacts] = useState([]);

    // Gọi API lấy contact đã xoá (status = 0)
    useEffect(() => {
        const fetchTrashContacts = async () => {
            try {
                const allContacts = await apiContact.getAll();
                const deletedContacts = allContacts.filter(c => c.status === 0);
                setTrashContacts(deletedContacts);
            } catch (error) {
                console.error("Lỗi khi load contact thùng rác:", error.message);
            }
        };

        fetchTrashContacts();
    }, []);

    // Khôi phục contact
    const handleRestore = async (id) => {
        if (!window.confirm("Khôi phục liên hệ này?")) return;
        try {
            await apiContact.updateStatus(id, 1);
            setTrashContacts(prev => prev.filter(c => c.id !== id));
        } catch (error) {
            console.error("Lỗi khi khôi phục liên hệ:", error.message);
        }
    };

    // Xoá vĩnh viễn contact
    const handlePermanentDelete = async (id) => {
        if (!window.confirm("Xoá vĩnh viễn liên hệ này?")) return;

        const adminToken = localStorage.getItem("adminToken");
        if (!adminToken) {
            alert("Bạn cần đăng nhập để thực hiện thao tác này.");
            return;
        }

        try {
            axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${adminToken}`;
            axiosInstance.enableJson();

            const result = await axiosInstance.delete(`/contacts/${id}`);

            if (result.status === 200) {
                setTrashContacts(prev => prev.filter(c => c.id !== id));
            }
        } catch (error) {
            console.error("Lỗi khi xoá vĩnh viễn:", error.response?.data || error.message);
        }
    };

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-header bg-secondary text-white">
                    <div className="row">
                        <div className="col-md-6">
                            <strong>Liên hệ đã xoá</strong>
                        </div>
                        <div className="col-md-6 text-end">
                            <Link to="/admin/listContact" className="btn btn-sm btn-success">
                                <i className="fa fa-long-arrow-alt-left me-1"></i>
                                Về danh sách
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="card-body">
                    <table className="table table-bordered table-hover">
                        <thead className="table-light">
                            <tr>
                                <th>ID</th>
                                <th>Họ tên</th>
                                <th>Email</th>
                                <th>Điện thoại</th>
                                <th>Tiêu đề</th>
                                <th>Ngày xoá</th>
                                <th style={{ width: "20%" }}>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {trashContacts.length > 0 ? (
                                trashContacts.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>{item.phone}</td>
                                        <td>{item.title}</td>
                                        <td>{new Date(item.updated_at).toLocaleDateString()}</td>
                                        <td>
                                            <button className="btn btn-sm btn-info me-1" onClick={() => handleRestore(item.id)}>
                                                <i className="fa fa-undo"></i> Khôi phục
                                            </button>
                                            <button className="btn btn-sm btn-danger" onClick={() => handlePermanentDelete(item.id)}>
                                                <i className="fa fa-trash"></i> Xoá vĩnh viễn
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="text-center">Không có liên hệ nào trong thùng rác</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ContactTrash;
