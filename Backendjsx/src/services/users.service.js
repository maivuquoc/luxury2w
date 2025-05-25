const getAll = async (db) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM users', (err, result) => {
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
        db.query('SELECT * FROM users WHERE id = ?', [id], (err, result) => {
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
const createUser = async (db, { name, username, password, email, phone, address, gender, thumbnail, roles, status, created_by }) => {
    return new Promise((resolve, reject) => {
        try {
            const created_at = new Date();
            const updated_at = new Date();
            const updated_by = created_by;

            db.query(
                `INSERT INTO users 
            (name, username, password, email, phone, address, gender, thumbnail, roles, created_at, created_by, updated_at, updated_by, status) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [name, username, password, email, phone, address, gender, thumbnail, roles, created_at, created_by, updated_at, updated_by, status],
                (err, result) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(result);
                }
            );
        } catch (error) {
            console.error('Database error: ', error);
            reject(error);
        }
    });
};

const login = async (db, { email }) => {
    return new Promise((resolve, reject) => {
        db.query(
            'SELECT * FROM users WHERE email = ? ',
            [email],
            (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                if (result.length === 0) {
                    resolve(null);
                    return;
                }
                resolve(result[0]);
            }
        )
    })
}

//
const updateUser = async (db, { name, username, password, email, phone, address, gender, thumbnail, roles, status, created_by }, id) => {
    return new Promise((resolve, reject) => {
        const created_at = new Date();
        const updated_at = new Date();
        const updated_by = created_by;

        db.query(
            `UPDATE users SET name = ?, username = ?, password = ?, email = ?, phone = ?, address = ?, gender =? , thumbnail = ?, roles = ?, 
            created_at = ?, created_by = ?, updated_at = ?, updated_by =?, status =? WHERE id = ?`,
            [name, username, password, email, phone, address, gender, thumbnail, roles, created_at, created_by, updated_at, updated_by, status, id],
            (err, result) => {
                if (err) {
                    console.error('Error:', err.message);
                    return reject(err);
                }
                if (result.affectedRows === 0) {
                    resolve({ Error: 'User not found' });
                }
                resolve(result);
            }
        );
    });
}

//
const deleteUser = async (db, id) => {
    return new Promise((resolve, reject) => {
        db.query(`DELETE FROM users WHERE id = ?`, [id],
            (err, result) => {
                if (err) {
                    console.error('Error:', err.message);
                    return reject(err);
                }
                if (result.affectedRows === 0) {
                    resolve({ Error: 'User not found' });
                }
                else {
                    resolve({ Message: 'User deleted successfuly' });
                }
            }
        )
    })
}

const updateStatus = async (db, id, status) => {
    return new Promise((resolve, reject) => {
        const updated_at = new Date();
        db.query(
            `UPDATE users SET status = ?, updated_at = ? WHERE id = ?`,
            [status, updated_at, id],
            (err, result) => {
                if (err) {
                    console.error('Error updating status:', err.message);
                    return reject(err);
                }
                if (result.affectedRows === 0) {
                    resolve({ error: 'User not found' });
                } else {
                    resolve({ message: 'User status updated successfully' });
                }
            }
        );
    });
};

const checkEmail = (db, email) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT id FROM users WHERE email = ?';
        db.query(sql, [email], (err, result) => {
            if (err) {
                console.error('Lỗi kiểm tra email:', err.message);
                return reject(err);
            }
            if (result.length > 0) {
                resolve(true); // email tồn tại
            } else {
                resolve(false); // email không tồn tại
            }
        });
    });
};


const updatePassword = (db, { email, password }) => {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE users SET password = ? WHERE email = ?';
        db.query(sql, [password, email], (err, result) => {
            if (err) {
                console.error('Lỗi cập nhật mật khẩu:', err.message);
                return reject(err);
            }
            resolve(result);
        });
    });
};

module.exports = {
    getAll, getOne, createUser, login, updateUser, deleteUser, updateStatus, checkEmail, updatePassword
}