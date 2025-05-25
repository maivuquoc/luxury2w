import { useEffect, useState } from "react";
import apiPost from "../../../api/apiPosts"; 
import { imageURL } from "../../../api/config";

// Icons
import { FaTrash } from "react-icons/fa";
import { IoEyeSharp, IoAddCircle } from "react-icons/io5";
import { MdEditSquare } from "react-icons/md";
import { FaTrashCanArrowUp } from "react-icons/fa6";
import { Link } from "react-router-dom";

function PostList() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        apiPost.getAll().then(res => {
            try {
                const postData = res
                    .filter(item => item.status === 1)
                    .map(item => ({
                        id: item.id,
                        topic_id: item.topic_id,
                        title: item.title,
                        slug: item.slug,
                        thumbnail: item.thumbnail,
                        description: item.description,
                        type: item.type,
                        content: item.content,
                        created_at: item.created_at,
                        created_by: item.created_by,
                        updated_at: item.updated_at,
                        updated_by: item.updated_by,
                    }));
                setPosts(postData);
            } catch (e) {
                console.error("Lỗi khi xử lý dữ liệu bài viết:", e);
            }
        });
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Bạn có chắc chắn muốn chuyển bài viết này vào thùng rác?");
        if (!confirmDelete) return;

        try {
            await apiPost.updateStatus(id, 0); // cập nhật status = 0
            setPosts(prev => prev.filter(p => p.id !== id));
            alert("Bài viết đã được chuyển vào thùng rác!");
        } catch (error) {
            console.error("Lỗi khi xoá tạm thời bài viết:", error.response?.data || error.message);
            alert("Đã xảy ra lỗi khi xoá bài viết.");
        }
    };

    return (
        <div>
            <main className="flex-grow-1 p-4 bg-light">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="m-0">Danh sách Bài viết</h2>
                    <Link to="/admin/trashPost">
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
                                <th>Topic ID</th>
                                <th>Tiêu đề</th>
                                <th>Slug</th>
                                <th>Hình ảnh</th>
                                <th>Mô tả</th>
                                <th>Loại</th>
                                <th className="text-nowrap">Hoạt động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.id}</td>
                                    <td>{item.topic_id}</td>
                                    <td>{item.title}</td>
                                    <td>{item.slug}</td>
                                    <td>
                                        <img
                                            src={`${imageURL}/public/${item.thumbnail}`}
                                            alt={item.title}
                                            style={{ width: "100px", height: "100px", objectFit: "cover" }}
                                        />
                                    </td>
                                    <td style={{ maxWidth: "150px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                        {item.description}
                                    </td>
                                    <td>{item.type}</td>
                                    <td className="text-nowrap">
                                        <Link to={`/admin/showPost/${item.id}`}>
                                            <button className="btn btn-sm btn-secondary me-1">
                                                <IoEyeSharp /> Xem
                                            </button>
                                        </Link>
                                        <Link to="/admin/addPost">
                                            <button className="btn btn-sm btn-success me-1">
                                                <IoAddCircle /> Thêm
                                            </button>
                                        </Link>
                                        <Link to={`/admin/editPost/${item.id}`}>
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

export default PostList;
