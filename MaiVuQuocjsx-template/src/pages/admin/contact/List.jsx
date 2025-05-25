import { useEffect, useState } from "react";
import apiContact from "../../../api/apiContacts"; // bạn cần có file này
import { Link } from "react-router-dom";

// Icons
import { FaTrash } from "react-icons/fa";
import { IoEyeSharp, IoAddCircle } from "react-icons/io5";
import { MdEditSquare } from "react-icons/md";
import { FaTrashCanArrowUp } from "react-icons/fa6";


function ContactList() {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        apiContact.getAll().then(res => {
            try {
                const contactData = res
                    .filter(item => item.status === 1)
                    .map(item => ({
                        id: item.id,
                        name: item.name,
                        email: item.email,
                        phone: item.phone,
                        title: item.title,
                        content: item.content,
                        reply_id: item.reply_id,
                    }));
                setContacts(contactData);
            } catch (e) {
                console.error("Lỗi khi xử lý dữ liệu liên hệ:", e);
            }
        });
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Bạn có chắc chắn muốn chuyển liên hệ này vào thùng rác?");
        if (!confirmDelete) return;

        try {
            await apiContact.updateStatus(id, 0); // cập nhật status = 0
            setContacts(prev => prev.filter(c => c.id !== id));
            alert("Liên hệ đã được chuyển vào thùng rác!");
        } catch (error) {
            console.error("Lỗi khi xoá liên hệ:", error.response?.data || error.message);
            alert("Đã xảy ra lỗi khi xoá liên hệ.");
        }
    };

    return (
        <div>
            <main className="flex-grow-1 p-4 bg-light">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="m-0">Danh sách Liên hệ</h2>
                    <Link to={`/admin/trashContact`}>
                        <button className="btn btn-sm btn-warning">
                            <FaTrashCanArrowUp /> Thùng rác
                        </button>
                    </Link>
                </div>

                <div className="table-responsive">
                    <table className="table table-bordered table-hover">
                        <thead className="table-light">
                            <tr>
                                <th>ID</th>
                                <th>Họ tên</th>
                                <th>Email</th>
                                <th>Điện thoại</th>
                                <th>Tiêu đề</th>
                                <th>Nội dung</th>
                                <th>Trả lời ID</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contacts.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.phone}</td>
                                    <td>{item.title}</td>
                                    <td style={{ maxWidth: "250px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                        {item.content}
                                    </td>
                                    <td>{item.reply_id}</td>
                                    <td className="text-nowrap">
                                        <Link to={`/admin/showContact/${item.id}`}>
                                            <button className="btn btn-sm btn-secondary me-1">
                                                <IoEyeSharp /> Xem
                                            </button>
                                        </Link>
                                        <Link to="/admin/addContact">
                                            <button className="btn btn-sm btn-success me-1">
                                                <IoAddCircle /> Thêm
                                            </button>
                                        </Link>
                                        <Link to={`/admin/editContact/${item.id}`}>
                                            <button className="btn btn-sm btn-info me-1">
                                                <MdEditSquare /> Sửa
                                            </button>
                                        </Link>
                                        <button className="btn btn-sm btn-danger" onClick={() => handleDelete(item.id)}>
                                            <FaTrash /> Xoá
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}

export default ContactList;
