// 
const getAll = async (db) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM orderdetails', (err, result) => {
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

// 
const getOne = async (db, id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM orderdetails WHERE id = ?', [id], (err, result) => {
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

// 
const createOrderDetail = async (db, { order_id, product_id, price, discount, is_paid, qty, amount, status }) => {
    return new Promise((resolve, reject) => {
        db.query(
            `INSERT INTO orderdetails 
            (order_id, product_id, price, discount, qty, amount, is_paid, status) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [order_id, product_id, price, discount, qty, amount, is_paid, status],
            (err, result) => {
                if (err) {
                    console.error('Lỗi khi tạo orderdetail:', err.message);
                    return reject(err);
                }
                resolve(result);
            }
        );
    });
};

// 
const updateOrderDetail = async (db, { order_id, product_id, price, discount, qty, amount, is_paid, status }, id) => {
    return new Promise((resolve, reject) => {
        db.query(
            `UPDATE orderdetails SET order_id = ?, product_id = ?, price = ?, discount = ?, qty = ?, amount = ?, is_paid = ?, status = ?
             WHERE id = ?`,
            [order_id, product_id, price, discount, qty, amount, is_paid, status, id],
            (err, result) => {
                if (err) {
                    console.error('Lỗi khi cập nhật orderdetail:', err.message);
                    return reject(err);
                }
                if (result.affectedRows === 0) {
                    resolve({ Error: 'Order detail not found' });
                }
                resolve(result);
            }
        );
    });
};

// 
const deleteOrderDetail = async (db, id) => {
    return new Promise((resolve, reject) => {
        db.query(`DELETE FROM orderdetails WHERE id = ?`, [id], (err, result) => {
            if (err) {
                console.error('Lỗi khi xoá orderdetail:', err.message);
                return reject(err);
            }
            if (result.affectedRows === 0) {
                resolve({ Error: 'Order detail not found' });
            } else {
                resolve({ Message: 'Order detail deleted successfully' });
            }
        });
    });
};

//
const updateStatus = async (db, id, status) => {
    return new Promise((resolve, reject) => {
        db.query(
            `UPDATE orderdetails SET status = ?  WHERE id = ?`,
            [status, id],
            (err, result) => {
                if (err) {
                    console.error('Error updating status:', err.message);
                    return reject(err);
                }
                if (result.affectedRows === 0) {
                    resolve({ error: 'OrderDetail not found' });
                } else {
                    resolve({ message: 'OrderDetail status updated successfully' });
                }
            }
        );
    });
};

// 
const createOrderDetailUser = async (db, { order_id, product_id, price, discount, is_paid, qty, amount, status }) => {
    return new Promise((resolve, reject) => {
        db.query(
            `INSERT INTO orderdetails 
            (order_id, product_id, price, discount, qty, amount, is_paid, status) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [order_id, product_id, price, discount, qty, amount, is_paid, status],
            (err, result) => {
                if (err) {
                    console.error('Lỗi khi tạo orderdetail:', err.message);
                    return reject(err);
                }
                resolve(result);
            }
        );
    });
};

//lấy hết các orderdetail theo order
const getAllOrderDetail = async (db, order_id) => {
    return new Promise((resolve, reject) => {
        db.query(
            'SELECT * FROM orderdetails WHERE order_id = ?',
            [order_id],
            (err, result) => {
                if (err) {
                    console.error('Lỗi khi lấy tất cả theo order:', err.message);
                    return reject(err);
                }
                if (result.length === 0) {
                    resolve({ message: 'Không có nào trong order này' });
                }
                resolve(result);
            }
        );
    });
};

module.exports = {
    getAll, getOne, createOrderDetail, updateOrderDetail, deleteOrderDetail, updateStatus, createOrderDetailUser, getAllOrderDetail
};
