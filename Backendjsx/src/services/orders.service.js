const getAll = async (db) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM orders', (err, result) => {
            if(err){
                reject(err);
                return;
            }
            if(result.length === 0){
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
        db.query('SELECT * FROM orders WHERE id = ?', [id], (err, result) => {
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
const createOrder = async (db, { user_id, name, phone, email, address, status, updated_by, is_paid }) => {
    return new Promise((resolve, reject) => {
        const created_at = new Date();
        const updated_at = new Date();

        db.query(
            `INSERT INTO orders 
            (user_id, name, phone, email, address, created_at, updated_at, updated_by, status, is_paid) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [user_id, name, phone, email, address, created_at, updated_at, updated_by, status, is_paid],
            (err, result) => {
                if (err) {
                    console.error('Lỗi khi tạo order:', err.message);
                    return reject(err);
                }
                resolve(result);
            }
        );
    });
};

//
const updateOrder = async (db, { user_id, name, phone, email, address, status, updated_by, is_paid }, id) => {
    return new Promise((resolve, reject) => {
        const updated_at = new Date();

        db.query(
            `UPDATE orders SET user_id = ?, name = ?, phone = ?, email = ?, address = ?, 
            updated_at = ?, updated_by = ?, status = ?, is_paid= ? WHERE id = ?`,
            [user_id, name, phone, email, address, updated_at, updated_by, status, is_paid, id],
            (err, result) => {
                if (err) {
                    console.error('Lỗi khi cập nhật order:', err.message);
                    return reject(err);
                }
                if (result.affectedRows === 0) {
                    resolve({ Error: 'Order not found' });
                } else {
                    resolve(result);
                }
            }
        );
    });
};

//
const deleteOrder = async (db, id) => {
    return new Promise((resolve, reject) => {
        db.query(`DELETE FROM orders WHERE id = ?`, [id],
            (err, result) => {
                if (err) {
                    console.error('Lỗi khi xóa order:', err.message);
                    return reject(err);
                }
                if (result.affectedRows === 0) {
                    resolve({ Error: 'Order not found' });
                } else {
                    resolve({ Message: 'Order deleted successfully' });
                }
            }
        );
    });
};

//
const updateStatus = async (db, id, status) => {
    return new Promise((resolve, reject) => {
        const updated_at = new Date();
        db.query(
            `UPDATE orders SET status = ?, updated_at = ? WHERE id = ?`,
            [status, updated_at, id],
            (err, result) => {
                if (err) {
                    console.error('Error updating status:', err.message);
                    return reject(err);
                }
                if (result.affectedRows === 0) {
                    resolve({ error: 'Order not found' });
                } else {
                    resolve({ message: 'Order status updated successfully' });
                }
            }
        );
    });
};

//
const createOrderUser = async (db, { user_id, name, phone, email, address, status, updated_by, is_paid }) => {
    return new Promise((resolve, reject) => {
        const created_at = new Date();
        const updated_at = new Date();

        db.query(
            `INSERT INTO orders 
            (user_id, name, phone, email, address, created_at, updated_at, updated_by, status, is_paid) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [user_id, name, phone, email, address, created_at, updated_at, updated_by, status, is_paid],
            (err, result) => {
                if (err) {
                    console.error('Lỗi khi tạo order:', err.message);
                    return reject(err);
                }
                resolve(result);
            }
        );
    });
};

const getAllOrderUser = async (db, user_id) => {
    return new Promise((resolve, reject) => {
        db.query(
            'SELECT * FROM orders WHERE user_id = ?',
            [user_id], 
            (err, result) => {
                if (err) {
                    console.error('Lỗi khi lấy đơn hàng của người dùng:', err.message);
                    return reject(err);
                }
                if (result.length === 0) {
                    resolve([]);  // Trả về một mảng rỗng nếu không tìm thấy đơn hàng
                } else {
                    resolve(result);  // Trả về các đơn hàng của người dùng
                }
            }
        );
    });
};

//
const deleteOrderUser = async (db, id) => {
    return new Promise((resolve, reject) => {
        db.query(`DELETE FROM orders WHERE id = ?`, [id],
            (err, result) => {
                if (err) {
                    console.error('Lỗi khi xóa order:', err.message);
                    return reject(err);
                }
                if (result.affectedRows === 0) {
                    resolve({ Error: 'Order not found' });
                } else {
                    resolve({ Message: 'Order deleted successfully' });
                }
            }
        );
    });
};


module.exports = {
    getAll, getOne, createOrder, updateOrder, deleteOrder, updateStatus, createOrderUser, getAllOrderUser, deleteOrderUser
}