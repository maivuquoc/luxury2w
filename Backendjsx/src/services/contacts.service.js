const getAll = async (db) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM contacts', (err, result) => {
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
        db.query('SELECT * FROM contacts WHERE id = ?', [id], (err, result) => {
            if(err){
                reject(err);
                return;
            }
            if(result.length === 0){
                resolve(null);
                return;
            }
            resolve(result[0]);
        });
    });
};

const createContact = async (db, { name, email, phone, title, content, reply_id, status, updated_by }) => {
    return new Promise((resolve, reject) => {
        const created_at = new Date();
        const updated_at = new Date();

        db.query(
            `INSERT INTO contacts 
            (name, email, phone, title, content, reply_id, created_at, updated_at, updated_by, status) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [name, email, phone, title, content, reply_id, created_at, updated_at, updated_by, status],
            (err, result) => {
                if (err) {
                    console.error('Lỗi khi tạo contact:', err.message);
                    return reject(err);
                }
                resolve(result);
            }
        );
    });
};

//
const updateContact = async (db, { name, email, phone, title, content, reply_id, status, updated_by }, id) => {
    return new Promise((resolve, reject) => {
        const updated_at = new Date();

        db.query(
            `UPDATE contacts SET name = ?, email = ?, phone = ?, title = ?, content = ?, reply_id = ?, 
            updated_at = ?, updated_by = ?, status = ? WHERE id = ?`,
            [name, email, phone, title, content, reply_id, updated_at, updated_by, status, id],
            (err, result) => {
                if (err) {
                    console.error('Lỗi khi cập nhật contact:', err.message);
                    return reject(err);
                }
                if (result.affectedRows === 0) {
                    resolve({ Error: 'Contact not found' });
                } else {
                    resolve(result);
                }
            }
        );
    });
};

//
const deleteContact = async (db, id) => {
    return new Promise((resolve, reject) => {
        db.query(`DELETE FROM contacts WHERE id = ?`, [id],
            (err, result) => {
                if (err) {
                    console.error('Lỗi khi xóa contact:', err.message);
                    return reject(err);
                }
                if (result.affectedRows === 0) {
                    resolve({ Error: 'Contact not found' });
                } else {
                    resolve({ Message: 'Contact deleted successfully' });
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
            `UPDATE contacts SET status = ?, updated_at = ? WHERE id = ?`,
            [status, updated_at, id],
            (err, result) => {
                if (err) {
                    console.error('Error updating status:', err.message);
                    return reject(err);
                }
                if (result.affectedRows === 0) {
                    resolve({ error: 'Contact not found' });
                } else {
                    resolve({ message: 'Contact status updated successfully' });
                }
            }
        );
    });
};

const createContactUser = async (db, { name, email, phone, title, content, reply_id, status, updated_by }) => {
    return new Promise((resolve, reject) => {
        const created_at = new Date();
        const updated_at = new Date();

        db.query(
            `INSERT INTO contacts 
            (name, email, phone, title, content, reply_id, created_at, updated_at, updated_by, status) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [name, email, phone, title, content, reply_id, created_at, updated_at, updated_by, status],
            (err, result) => {
                if (err) {
                    console.error('Lỗi khi tạo contact:', err.message);
                    return reject(err);
                }
                resolve(result);
            }
        );
    });
};

module.exports = {
    getAll, getOne, createContact, updateContact, deleteContact, updateStatus, createContactUser
}