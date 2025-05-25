import apiProduct from '../../../api/apiBanners';
import React, { useEffect, useState } from 'react';
import { imageURL } from "../../../api/config";


const SliderHome = () => {
    const [banners, setBanners] = useState([]);


    useEffect(() => {
        apiProduct.getAll().then((res) => {
            try {
                const bannerData = res.filter(banner => banner.status === 1).map(banner => ({
                    id: banner.id,
                    name: banner.name,
                    link: banner.link,
                    position: banner.position,
                    image: banner.image,
                    description: banner.description,
                    sort_order: banner.sort_order,
                }))
                setBanners(bannerData);
            } catch (err) {
                console.error("Lỗi khi xử lý dữ liệu:", err);
            }
        });
    }, []);
    return (
        <div>
            <div className="container">
                <div className="row">
                    <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-inner">
                            {banners.map((banner, index) => (
                                <div
                                    key={banner.id}
                                    className={`carousel-item ${index === 0 ? 'active' : ''}`}
                                >
                                    <img
                                        src={`${imageURL}/public/${banner.image}`}
                                        className="d-block w-100"
                                        alt={`Banner ${banner.name}`}
                                    />
                                </div>
                            ))}
                        </div>
                        <button
                            className="carousel-control-prev"
                            type="button"
                            data-bs-target="#carouselExample"
                            data-bs-slide="prev"
                        >
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button
                            className="carousel-control-next"
                            type="button"
                            data-bs-target="#carouselExample"
                            data-bs-slide="next"
                        >
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SliderHome;