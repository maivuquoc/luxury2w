import { Link } from "react-router-dom";

const StoreLocator = () => {
  return (
    <div>
      <section>
        <div className="bg-body-tertiary">
          <div className="container">
            <div className="row">
              <ul className="breadcrumb m-0 px-0 py-2">
                <li className="home">
                  <Link to="/"><span>Trang chủ</span></Link>
                  <span className="mx-1">/</span>
                </li>
                <li><strong><span>Hệ thống cửa hàng</span></strong></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <div className="container py-4">
        <div className="row g-4 align-items-start">
          {/* Cột bên trái */}
          <div className="col-md-4">
            <div className="p-3 border rounded shadow-sm bg-white">
              <h4 className="mb-3">Tìm cửa hàng</h4>

              <div className="mb-3">
                <label className="form-label">Chọn tỉnh thành</label>
                <select className="form-select">
                  <option>Hồ Chí Minh</option>
                  <option>Hà Nội</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Chọn cửa hàng</label>
                <select className="form-select">
                  <option>Chi nhánh Quận 1, HCM</option>
                  <option>Chi nhánh Quận 3, HCM</option>
                </select>
              </div>

              <div>
                <h5 className="mt-4"><i className="bi bi-geo-alt-fill me-2"></i>Địa chỉ</h5>
                <p className="mb-0">
                  2 Nguyễn Bỉnh Khiêm, Bến Nghé, Quận 1, Thành phố Hồ Chí Minh 700000, Vietnam
                </p>
              </div>
            </div>
          </div>

          {/* Cột bên phải */}
          <div className="col-md-8">
            <div className="ratio ratio-16x9 shadow-sm rounded">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.40676322163!2d106.70042307588366!3d10.778700159204553!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f3fe7cbb97d%3A0x12f43bda0e0ac1a6!2zMiBOZ3V54buFbiBCw61uaCBLaGnDqm0sIELhur8gTmfhu41oLCBRdeG6rW4gMSwgVGjDoG5oIHBo4buRIEjhu5MgQ2jDrSBNaW5oIDcwMDAwMA!5e0!3m2!1svi!2s!4v1715673486785!5m2!1svi!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreLocator;
