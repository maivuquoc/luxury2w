// const getAll = async (db, page, limit) => {
//     return new Promise((resolve, reject) => {
//         db.query(
//             'SELECT COUNT(*) AS total FROM products',
//             (err, countResult) => {
//                 if (err) {
//                     reject(err);
//                     return;
//                 }

//                 db.query(
//                     'SELECT * FROM products LIMIT ?, ?',
//                     [(page - 1) * limit, limit],
//                     (err, products) => {
//                         if (err) {
//                             reject(err);
//                             return;
//                         }
//                         if (products.length === 0) {
//                             resolve({
//                                 data: [], meta: {
//                                     pagination: {
//                                         page, pageSize:
//                                             limit, pageCount: 0, total: 0
//                                     }
//                                 }
//                             })
//                         }
//                         const total = countResult[0].total;
//                         const pageCount = Math.ceil(total / limit);
//                         resolve({
//                             data: products,
//                             meta: {
//                                 pagination: {
//                                     page: parseInt(page, 10),
//                                     pageSize: parseInt(limit, 10),
//                                     pageCount,
//                                     total
//                                 }
//                             }
//                         })
//                     }
//                 )
//             }
//         )
//     })
// };

//
const getOne = async (db, id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM products WHERE id = ?', [id], (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            if (result.length === 0) {
                resolve(null);
                return;
            }
            resolve(result[0]);
        });
    });
};

const getAll = async (db) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM products', (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            if (result.length === 0) {
                resolve(null);
                return;
            }
            resolve(result);
        });
    });
};

const createProduct = async (db, { category_id, brand_id, name, slug, thumbnail, description, content, pricebuy, pricesale, qty, status, created_by }) => {
    return new Promise((resolve, reject) => {
        const created_at = new Date();
        const updated_at = new Date();
        const updated_by = created_by;

        db.query(
            `INSERT INTO products 
            (category_id, brand_id, name, slug, thumbnail, description, content, pricebuy, pricesale, qty, created_at, created_by, updated_at, updated_by, status) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [category_id, brand_id, name, slug, thumbnail, description, content, pricebuy, pricesale, qty, created_at, created_by, updated_at, updated_by, status],
            (err, result) => {
                if (err) {
                    console.error('Lỗi khi tạo product:', err.message);
                    return reject(err);
                }
                resolve(result);
            }
        );
    });
};

//
const updateProduct = async (db, { category_id, brand_id, name, slug, thumbnail, description, content, pricebuy, pricesale, qty, status, created_by }, id) => {
    return new Promise((resolve, reject) => {
        const created_at = new Date();
        const updated_at = new Date();
        const updated_by = created_by;

        db.query(
            `UPDATE products SET category_id = ?, brand_id = ?, name = ?, slug = ?, thumbnail = ?, description = ?, content = ?, pricebuy = ?, pricesale = ?, qty = ?,
            created_at = ?, created_by = ?, updated_at = ?, updated_by =?, status =? WHERE id = ?`,
            [category_id, brand_id, name, slug, thumbnail, description, content, pricebuy, pricesale, qty, created_at, created_by, updated_at, updated_by, status, id],
            (err, result) => {
                if (err) {
                    console.error('Error:', err.message);
                    return reject(err);
                }
                if (result.affectedRows === 0) {
                    resolve({ Error: 'Product not found' });
                }
                resolve(result);
            }
        );
    });
}

//
const deleteProduct = async (db, id) => {
    return new Promise((resolve, reject) => {
        db.query(`DELETE FROM products WHERE id = ?`, [id],
            (err, result) => {
                if (err) {
                    console.error('Error:', err.message);
                    return reject(err);
                }
                if (result.affectedRows === 0) {
                    resolve({ Error: 'Product not found' });
                }
                else {
                    resolve({ Message: 'Product deleted successfuly' });
                }
            }
        )
    })
}

//
const updateStatus = async (db, id, status) => {
    return new Promise((resolve, reject) => {
        const updated_at = new Date();
        db.query(
            `UPDATE products SET status = ?, updated_at = ? WHERE id = ?`,
            [status, updated_at, id],
            (err, result) => {
                if (err) {
                    console.error('Error updating status:', err.message);
                    return reject(err);
                }
                if (result.affectedRows === 0) {
                    resolve({ error: 'Product not found' });
                } else {
                    resolve({ message: 'Product status updated successfully' });
                }
            }
        );
    });
};

//Sản phẩm mới
const newProduct = async (db, limit = 4) => {
    return new Promise((resolve, reject) => {
        // Lấy các sản phẩm mới nhất, sắp xếp theo created_at DESC
        db.query(
            'SELECT * FROM products ORDER BY created_at DESC LIMIT ?',
            [limit],
            (err, result) => {
                if (err) {
                    console.error('Lỗi khi lấy sản phẩm mới:', err.message);
                    return reject(err);
                }
                if (result.length === 0) {
                    resolve({ message: 'No new products found' });
                }
                resolve(result);
            }
        );
    });
};

//Sản phẩm giảm giá
const saleProduct = async (db, limit = 4) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT * FROM products 
             WHERE pricesale <= pricebuy 
             ORDER BY (pricebuy - pricesale) DESC 
             LIMIT ?`,
            [limit],
            (err, result) => {
                if (err) {
                    console.error('Lỗi khi lấy sản phẩm giảm giá:', err.message);
                    return reject(err);
                }
                if (result.length === 0) {
                    resolve({ message: 'Không có sản phẩm giảm giá' });
                }
                resolve(result);
            }
        );
    });
};

//Chi tiết sản phẩm
const slugProduct = async (db, slug) => {
    return new Promise((resolve, reject) => {
        db.query(
            'SELECT * FROM products WHERE slug = ? LIMIT 1',
            [slug],
            (err, result) => {
                if (err) {
                    console.error('Lỗi khi lấy sản phẩm theo slug:', err.message);
                    return reject(err);
                }
                resolve(result[0]); // Lấy phần tử đầu tiên
            }
        );
    });
};

//Sản phẩm cùng loại
const getCategoryProduct = async (db, category_id, limit = 4) => {
    return new Promise((resolve, reject) => {
        db.query(
            'SELECT * FROM products WHERE category_id = ? LIMIT ?',
            [category_id, limit],
            (err, result) => {
                if (err) {
                    console.error('Lỗi khi lấy sản phẩm cùng loại:', err.message);
                    return reject(err);
                }
                if (result.length === 0) {
                    resolve({ message: 'Không có sản phẩm cùng loại' });
                }
                resolve(result);
            }
        );
    });
};

//Lấy hết sản phẩm theo category
const getAllCategoryProduct = async (db, category_id) => {
    return new Promise((resolve, reject) => {
        db.query(
            'SELECT * FROM products WHERE category_id = ?',
            [category_id],
            (err, result) => {
                if (err) {
                    console.error('Lỗi khi lấy tất cả sản phẩm theo category:', err.message);
                    return reject(err);
                }
                if (result.length === 0) {
                    resolve({ message: 'Không có sản phẩm nào trong danh mục này' });
                }
                resolve(result);
            }
        );
    });
};

//Lấy hết sản phẩm theo brand
const getAllBrandProduct = async (db, brand_id) => {
    return new Promise((resolve, reject) => {
        db.query(
            'SELECT * FROM products WHERE brand_id = ?',
            [brand_id],
            (err, result) => {
                if (err) {
                    console.error('Lỗi khi lấy tất cả sản phẩm theo category:', err.message);
                    return reject(err);
                }
                if (result.length === 0) {
                    resolve({ message: 'Không có sản phẩm nào trong thương hiệu này' });
                }
                resolve(result);
            }
        );
    });
};


module.exports = {
    getAll, getOne, createProduct, updateProduct, deleteProduct, updateStatus,
    newProduct, saleProduct, slugProduct, getCategoryProduct, getAllCategoryProduct, getAllBrandProduct
}