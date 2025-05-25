import { Link, useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../../api/axios';
import { useEffect, useState } from "react";
import createSlug from '../../../utils/f';

function PostEdit() {
    const { id } = useParams();
    const [TopicId, setTopicId] = useState("");
    const [Title, setTitle] = useState("");
    const [Description, setDescription] = useState("");
    const [Type, setType] = useState("");
    const [Content, setContent] = useState("");
    const [Thumbnail, setThumbnail] = useState(null);

    const [topics, setTopics] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axiosInstance.get("/topics").then(res => setTopics(res.data));

        axiosInstance.get(`/posts/${id}`).then(res => {
            const post = res.data;
            setTopicId(post.topic_id);
            setTitle(post.title);
            setDescription(post.description);
            setContent(post.content);
            setType(post.type);
            setThumbnail(post.thumbnail);
        });
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const postData = {
            topic_id: parseInt(TopicId),
            title: Title,
            slug: createSlug(Title),
            thumbnail: "",
            description: Description,
            type: Type,
            content: Content,
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
            let filename = "";

            if (Thumbnail instanceof File) {
                const fileData = new FormData();
                fileData.append("files", Thumbnail);
                axiosInstance.enableUploadFile();
                const res = await axiosInstance.post("/upload", fileData);
                filename = res.data.filename;
            } else {
                filename = Thumbnail;
            }

            postData.thumbnail = filename;

            axiosInstance.enableJson();
            const resPost = await axiosInstance.put(`/posts/${id}`, postData);
            console.log("Cập nhật bài viết thành công:", resPost);

            navigate("/admin/listpost");
        } catch (error) {
            console.error("Lỗi khi cập nhật bài viết:", error.response?.data || error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="card shadow-sm">
                <div className="card-header bg-light">
                    <div className="row">
                        <div className="col-6">
                            <strong className="text-primary">Chỉnh sửa bài viết</strong>
                        </div>
                        <div className="col-6 text-end">
                            <Link className="btn btn-sm btn-success" to="/admin/listpost">
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
                                <input type="text" className="form-control" value={Title} onChange={(e) => setTitle(e.target.value)} />
                            </div>

                            <div className="mb-3">
                                <label><strong>Mô tả</strong></label>
                                <textarea rows="3" className="form-control" value={Description} onChange={(e) => setDescription(e.target.value)} />
                            </div>

                            <div className="mb-3">
                                <label><strong>Nội dung</strong></label>
                                <textarea rows="5" className="form-control" value={Content} onChange={(e) => setContent(e.target.value)} />
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
                                <select className="form-control" value={TopicId} onChange={(e) => setTopicId(e.target.value)}>
                                    <option value="">-- Chọn chủ đề --</option>
                                    {topics.map(topic => (
                                        <option key={topic.id} value={topic.id}>{topic.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-3">
                                <label><strong>Loại bài viết</strong></label>
                                <select className="form-control" value={Type} onChange={(e) => setType(e.target.value)} required>
                                    <option value="">-- Chọn loại --</option>
                                    <option value="show">Hiện</option>
                                    <option value="hide">Ẩn</option>
                                </select>
                            </div>

                            <div className="mb-3">
                                <label><strong>Hình ảnh</strong></label>
                                <input type="file" className="form-control" onChange={(e) => setThumbnail(e.target.files[0])} />
                                {typeof Thumbnail === "string" && (
                                    <small className="text-muted">Ảnh hiện tại: {Thumbnail}</small>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default PostEdit;
