import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../../api/axios';
import apiPost from '../../../api/apiPosts';  // API để thao tác với bài viết
import { useEffect, useState } from "react";
import createSlug from '../../../utils/f';

function PostAdd() {
    const [TopicId, setTopicId] = useState("");
    const [Title, setTitle] = useState("");
    const [Description, setDescription] = useState("");
    const [Content, setContent] = useState("");
    const [Type, setType] = useState("");  // Sử dụng dropdown cho loại bài viết
    const [Thumbnail, setThumbnail] = useState(null);

    const [topics, setTopics] = useState([]);  // Danh sách các chủ đề

    const navigate = useNavigate();

    // Lấy danh sách chủ đề
    useEffect(() => {
        axiosInstance.get("/topics").then(res => setTopics(res.data));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const postData = {
            topic_id: TopicId,
            title: Title,
            slug: createSlug(Title),
            thumbnail: "",
            description: Description,
            content: Content,
            type: Type,  // Trường loại sẽ được lấy từ dropdown
            created_at: Date.now(),
            created_by: 1,  // Giả sử user ID là 1
            updated_at: Date.now(),
            updated_by: 1,  // Giả sử user ID là 1
            status: 1,
        };

        const adminToken = localStorage.getItem("adminToken");
        if (!adminToken) {
            alert("Bạn cần đăng nhập trước khi thực hiện thao tác này.");
            return;
        }

        try {
            let filename = "";
            if (Thumbnail) {
                const file = new FormData();
                file.append("files", Thumbnail);

                axiosInstance.enableUploadFile();
                const res = await axiosInstance.post("/upload", file);
                filename = res.data.filename;
            }

            postData.thumbnail = filename;

            axiosInstance.enableJson();
            const resPost = await apiPost.createPost(postData);

            console.log("Thêm bài viết thành công:", resPost);
            navigate("/admin/ListPost");
        } catch (error) {
            console.error("Lỗi khi thêm bài viết:", error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="card shadow-sm">
                <div className="card-header bg-light">
                    <div className="row">
                        <div className="col-6">
                            <strong className="text-primary">Thêm bài viết</strong>
                        </div>
                        <div className="col-6 text-end">
                            <Link className="btn btn-sm btn-success" to="/admin/ListPost">
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
                                <label><strong>Tiêu đề bài viết</strong></label>
                                <input type="text" className="form-control" value={Title} onChange={(e) => setTitle(e.target.value)} required />
                            </div>

                            <div className="mb-3">
                                <label><strong>Mô tả</strong></label>
                                <textarea rows="3" className="form-control" value={Description} onChange={(e) => setDescription(e.target.value)} required />
                            </div>

                            <div className="mb-3">
                                <label><strong>Nội dung</strong></label>
                                <textarea rows="5" className="form-control" value={Content} onChange={(e) => setContent(e.target.value)} required />
                            </div>

                            <div className="mb-3">
                                <label><strong>Loại bài viết</strong></label>
                                <select className="form-control" value={Type} onChange={(e) => setType(e.target.value)} required>
                                    <option value="">-- Chọn loại --</option>
                                    <option value="show">Hiện</option>
                                    <option value="hide">Ẩn</option>
                                </select>
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
                                <label><strong>Chủ đề</strong></label>
                                <select className="form-control" value={TopicId} onChange={(e) => setTopicId(e.target.value)} required>
                                    <option value="">-- Chọn chủ đề --</option>
                                    {topics.map(topic => (
                                        <option key={topic.id} value={topic.id}>{topic.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-3">
                                <label><strong>Hình ảnh</strong></label>
                                <input type="file" className="form-control" onChange={(e) => setThumbnail(e.target.files[0])} required />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default PostAdd;
