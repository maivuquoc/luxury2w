const getAll = async (db) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM topics', (err, result) => {
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

const getOne = async (db, id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM topics WHERE id = ?', [id], (err, result) => {
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

const createTopic = async (db, { name, slug, description, sort_order, created_by, status }) => {
    return new Promise((resolve, reject) => {
        const created_at = new Date();
        const updated_at = new Date();
        const updated_by = created_by;

        db.query(
            `INSERT INTO topics 
            (name, slug, description, sort_order, created_at, created_by, updated_at, updated_by, status) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [name, slug, description, sort_order, created_at, created_by, updated_at, updated_by, status],
            (err, result) => {
                if (err) {
                    console.error('Lỗi khi tạo topic:', err.message);
                    return reject(err);
                }
                resolve(result);
            }
        );
    });
};

const updateTopic = async (db, { name, slug, description, sort_order, created_by, status }, id) => {
    return new Promise((resolve, reject) => {
        const created_at = new Date();
        const updated_at = new Date();
        const updated_by = created_by;

        db.query(
            `UPDATE topics SET name = ?, slug = ?, description = ?, sort_order = ?, 
            created_at = ?, created_by = ?, updated_at = ?, updated_by = ?, status = ? WHERE id = ?`,
            [name, slug, description, sort_order, created_at, created_by, updated_at, updated_by, status, id],
            (err, result) => {
                if (err) {
                    console.error('Lỗi khi cập nhật topic:', err.message);
                    return reject(err);
                }
                if (result.affectedRows === 0) {
                    resolve({ Error: 'Topic không tồn tại' });
                }
                resolve(result);
            }
        );
    });
};

const deleteTopic = async (db, id) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM topics WHERE id = ?', [id], (err, result) => {
            if (err) {
                console.error('Lỗi khi xóa topic:', err.message);
                return reject(err);
            }
            if (result.affectedRows === 0) {
                resolve({ Error: 'Topic không tồn tại' });
            } else {
                resolve({ Message: 'Xóa topic thành công' });
            }
        });
    });
};

//
const updateStatus = async (db, id, status) => {
    return new Promise((resolve, reject) => {
        const updated_at = new Date();
        db.query(
            `UPDATE topics SET status = ?, updated_at = ? WHERE id = ?`,
            [status, updated_at, id],
            (err, result) => {
                if (err) {
                    console.error('Error updating status:', err.message);
                    return reject(err);
                }
                if (result.affectedRows === 0) {
                    resolve({ error: 'Topic not found' });
                } else {
                    resolve({ message: 'Topic status updated successfully' });
                }
            }
        );
    });
};

module.exports = {
    getAll,
    getOne,
    createTopic,
    updateTopic,
    deleteTopic,
    updateStatus
};
