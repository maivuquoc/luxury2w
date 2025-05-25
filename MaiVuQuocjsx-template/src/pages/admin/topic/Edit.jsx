import { Link, useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../../api/axios';
import { useEffect, useState } from "react";
import createSlug from '../../../utils/f';

function TopicEdit() {
    const { id } = useParams();
    const [Name, setName] = useState("");
    const [Description, setDescription] = useState("");
    const [SortOrder, setSortOrder] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        // Lấy thông tin topic theo ID
        axiosInstance.get(`/topics/${id}`).then(res => {
            const topic = res.data;
            setName(topic.name);
            setDescription(topic.description);
            setSortOrder(topic.sort_order);
        });
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const topicData = {
            name: Name,
            slug: createSlug(Name),
            description: Description,
            sort_order: parseInt(SortOrder),
            created_at: Date.now(),
            created_by: 1,
            updated_at: Date.now(),
            updated_by: 1,
            status: 1,
        };

        const adminToken = localStorage.getItem("adminToken");
        if (adminToken) {
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${adminToken}`;
        } else {
            alert("Bạn cần đăng nhập trước khi thực hiện thao tác này.");
            return;
        }

        try {
            axiosInstance.enableJson();
            const resTopic = await axiosInstance.put(`/topics/${id}`, topicData);
            console.log("Cập nhật topic thành công:", resTopic);
            navigate("/admin/listtopic");
        } catch (error) {
            console.error("Lỗi khi cập nhật topic:", error.response?.data || error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="card shadow-sm">
                <div className="card-header bg-light">
                    <div className="row">
                        <div className="col-6">
                            <strong className="text-primary">Chỉnh sửa chủ đề</strong>
                        </div>
                        <div className="col-6 text-end">
                            <Link className="btn btn-sm btn-success" to="/admin/listtopic">
                                <i className="fa fa-long-arrow-alt-left me-1"></i>
                                Về danh sách
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="card-body">
                    <div className="row">
                        <div className="col-md-9">
                            <div className="mb-3">
                                <label><strong>Tên chủ đề</strong></label>
                                <input type="text" className="form-control" value={Name} onChange={(e) => setName(e.target.value)} />
                            </div>

                            <div className="mb-3">
                                <label><strong>Mô tả</strong></label>
                                <textarea rows="3" className="form-control" value={Description} onChange={(e) => setDescription(e.target.value)} />
                            </div>

                            <div className="text-end">
                                <button type="submit" className="btn btn-sm btn-primary">
                                    <i className="fa fa-save me-1"></i>
                                    Lưu
                                </button>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="mb-3">
                                <label><strong>Thứ tự sắp xếp</strong></label>
                                <input type="number" className="form-control" value={SortOrder} onChange={(e) => setSortOrder(e.target.value)} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default TopicEdit;
