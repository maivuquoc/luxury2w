import axiosInstance from "./axios";


const apiProduct = {
    // getProductPagination: (page, limit)=> {
    //     return axiosInstance.get(`/products?page=${page}&limit=${limit}`).then((res) => res.data);
    // },

    //Tất cả sản phẩm 
    getAll: () => {
        return axiosInstance.get("/products").then((res) => res.data);
    },

    //Xem 1 sản phẩm
    getOne: (id) => {
        return axiosInstance.get(`/products/${id}`).then((res) => res.data);
    },

    //Thêm sản phẩm mới 
    createProduct: (product) => {
        const adminToken = axiosInstance.getAuthToken('admin');

        if (adminToken === null) {
            return;
        }
        return axiosInstance.post("/products", product, {
            headers: {
                Authorization: `Bearer ${adminToken}`
            }
        });
    },

    //Sửa sản phẩm 
    updateProduct: (id, product) => {
        const adminToken = axiosInstance.getAuthToken('admin');

        if (adminToken === null) {
            return;
        }
        return axiosInstance.put(`/products/${id}`, product, {
            headers: {
                Authorization: `Bearer ${adminToken}`
            }
        });
    },

    //Xoá sản phẩm 
    deleteProduct: (id) => {
        const adminToken = axiosInstance.getAuthToken('admin');

        if (adminToken === null) {
            return;
        }
        return axiosInstance.delete(`/products/${id}`, {
            headers: {
                Authorization: `Bearer ${adminToken}`
            }
        });
    },

    //
    updateStatus: (id, status) => {
        return axiosInstance.patch(`/products/${id}`, { status }).then(res => res.data);
    },

    //Lâý sản phẩm mới 
    newProduct: () => {
        return axiosInstance.get("/products/new").then((res) => res.data);
    },

    //Lâý sản giảm giá 
    saleProduct: () => {
        return axiosInstance.get("/products/sale").then((res) => res.data);
    },

    //Chi tiết sản phẩm
    slugProduct: (slug) => {
        return axiosInstance.get(`/products/slug/${slug}`).then((res) => res.data);
    },

    //Sẩn phẩm cùng loai
    getCategoryProduct: (category_id, limit = 4) => {
        return axiosInstance.get(`/products/category/${category_id}?limit=${limit}`).then((res) => res.data);
    },

    //Lấy tất cả sản phẩm theo category
    getAllCategoryProduct: (category_id) => {
        return axiosInstance.get(`/products/all-category/${category_id}`).then((res) => res.data);
    },

    //Lấy tất cả sản phẩm theo brand
    getAllBrandProduct: (brand_id) => {
        return axiosInstance.get(`/products/all-brand/${brand_id}`).then((res) => res.data);
    },
}
export default apiProduct;
