const getAll = async (db) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM menus', (err, result) => {
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
        db.query('SELECT * FROM menus WHERE id = ?', [id], (err, result) => {
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
const createMenu = async (db, { name, link, type, table_id, parent_id, sort_order, position, status, created_by }) => {
    return new Promise((resolve, reject) => {
        const created_at = new Date();
        const updated_at = new Date();
        const updated_by = created_by;

        db.query(
            `INSERT INTO menus 
            (name, link, type, table_id, parent_id, sort_order, position, created_at, created_by, updated_at, updated_by, status) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [name, link, type, table_id, parent_id, sort_order, position, created_at, created_by, updated_at, updated_by, status],
            (err, result) => {
                if (err) {
                    console.error('Lỗi khi tạo menu:', err.message);
                    return reject(err);
                }
                resolve(result);
            }
        );
    });
};

//
const updateMenu = async (db, { name, link, type, table_id, parent_id, sort_order, position, status, updated_by }, id) => {
    return new Promise((resolve, reject) => {
        const updated_at = new Date();

        db.query(
            `UPDATE menus SET name = ?, link = ?, type = ?, table_id = ?, parent_id = ?, sort_order = ?, position = ?, 
            updated_at = ?, updated_by = ?, status = ? WHERE id = ?`,
            [name, link, type, table_id, parent_id, sort_order, position, updated_at, updated_by, status, id],
            (err, result) => {
                if (err) {
                    console.error('Lỗi khi cập nhật menu:', err.message);
                    return reject(err);
                }
                if (result.affectedRows === 0) {
                    resolve({ Error: 'Menu not found' });
                } else {
                    resolve(result);
                }
            }
        );
    });
};

//
const deleteMenu = async (db, id) => {
    return new Promise((resolve, reject) => {
        db.query(`DELETE FROM menus WHERE id = ?`, [id], (err, result) => {
            if (err) {
                console.error('Lỗi khi xoá menu:', err.message);
                return reject(err);
            }
            if (result.affectedRows === 0) {
                resolve({ Error: 'Menu not found' });
            } else {
                resolve({ Message: 'Menu deleted successfully' });
            }
        });
    });
};

module.exports = {
    getAll, getOne, createMenu, updateMenu, deleteMenu
}