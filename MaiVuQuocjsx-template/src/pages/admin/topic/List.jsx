import { useEffect, useState } from "react";
import apiTopic from "../../../api/apiTopics"; // đổi lại đường dẫn phù hợp nếu cần

// Icon
import { FaTrash } from "react-icons/fa";
import { IoEyeSharp, IoAddCircle } from "react-icons/io5";
import { MdEditSquare } from "react-icons/md";
import { FaTrashCanArrowUp } from "react-icons/fa6";
import { Link } from "react-router-dom";

function TopicList() {
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        apiTopic.getAll().then(res => {
            try {
                const topicData = res
                    .filter(item => item.status === 1)
                    .map(item => ({
                        id: item.id,
                        name: item.name,
                        slug: item.slug,
                        description: item.description,
                        sort_order: item.sort_order,
                    }));
                setTopics(topicData);
            } catch (e) {
                console.error("Lỗi khi xử lý dữ liệu topic:", e);
            }
        });
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Bạn có chắc chắn muốn chuyển chủ đề này vào thùng rác?");
        if (!confirmDelete) return;

        try {
            await apiTopic.updateStatus(id, 0);
            setTopics(prev => prev.filter(topic => topic.id !== id));
            alert("Chủ đề đã được chuyển vào thùng rác!");
        } catch (error) {
            console.error("Lỗi khi xoá topic:", error.response?.data || error.message);
            alert("Đã xảy ra lỗi khi xoá chủ đề.");
        }
    };

    return (
        <div>
            <main className="flex-grow-1 p-4 bg-light">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="m-0">Danh sách Chủ đề</h2>
                    <Link to={`/admin/trashTopic`}>
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
                                <th>Tên</th>
                                <th>Slug</th>
                                <th>Mô tả</th>
                                <th>Thứ tự</th>
                                
                                <th className="text-nowrap">Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {topics.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.slug}</td>
                                    <td style={{ maxWidth: "200px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                        {item.description}
                                    </td>
                                    <td>{item.sort_order}</td>
                                    
                                    <td className="text-nowrap">
                                        <Link to={`/admin/showTopic/${item.id}`}>
                                            <button className="btn btn-sm btn-secondary me-1">
                                                <IoEyeSharp /> Xem
                                            </button>
                                        </Link>
                                        <Link to="/admin/addTopic">
                                            <button className="btn btn-sm btn-success me-1">
                                                <IoAddCircle /> Thêm
                                            </button>
                                        </Link>
                                        <Link to={`/admin/editTopic/${item.id}`}>
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

export default TopicList;
