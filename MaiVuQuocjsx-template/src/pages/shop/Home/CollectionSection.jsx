import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiCategory from "../../../api/apiCategories";

const CollectionSection = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        apiCategory.getAll()
            .then(res => setCategories(res))
            .catch(err => console.error("Lỗi lấy danh mục:", err));
    }, []);

    // Mapping tạm ảnh nếu API không có trường image
    const imageMap = {
        "Bông tai": "season_coll_1_img.webp",
        "Vòng cổ": "season_coll_2_img.webp",
        "Nhẫn": "season_coll_3_img.webp",
        "Vòng tay": "season_coll_4_img.webp"
    };

    return (
        <div className="container py-5">
            <h3 className="text-center py-2">Bộ sưu tập</h3>
            <div className="row">
                {categories.map((cat, index) => (
                    <div className="col-md-3" key={cat.id}>
                        <Link to={`/products-by-cat/${cat.id}`} className="text-decoration-none text-dark">
                            <div className="image-container position-relative">
                                <img
                                    src={`../../../assets/image/${imageMap[cat.name] || "default.webp"}`}
                                    className="rounded img-hover-effect"
                                    alt={cat.name}
                                    width="280"
                                    height="265"
                                />
                                <div className="image-text">{cat.name}</div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CollectionSection;
