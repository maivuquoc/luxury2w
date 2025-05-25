//
const getAll = async (db) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM banners', (err, result) => {
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
        db.query('SELECT * FROM banners WHERE id = ?', [id], (err, result) => {
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

//
const createBanner = async (db, { name, link, position, image, description, sort_order, status, created_by }) => {
    return new Promise((resolve, reject) => {
        const created_at = new Date();
        const updated_at = new Date();
        const updated_by = created_by;

        db.query(
            `INSERT INTO banners 
            (name, link, position, image, description, sort_order, created_at, created_by, updated_at, updated_by, status) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
            [name, link, position, image, description, sort_order, created_at, created_by, updated_at, updated_by, status], 
            (err, result) => {
                if (err) {
                    console.error('Lỗi khi tạo banner:', err.message);
                    return reject(err);
                }
                resolve(result);
            }
        );
    });
};

//
const updateBanner = async(db, { name, link, position, image, description, sort_order, status, created_by }, id) => {
    return new Promise((resolve, reject) => {
        const created_at = new Date();
        const updated_at = new Date();
        const updated_by = created_by;

        db.query(
            `UPDATE banners SET name = ?, link = ?, position = ?, image = ?, description = ?, sort_order = ?, 
            created_at = ?, created_by = ?, updated_at = ?, updated_by =?, status =? WHERE id = ?`,
            [name, link, position, image, description, sort_order, created_at, created_by, updated_at, updated_by, status, id], 
            (err, result) => {
                if (err) {
                    console.error('Error:', err.message);
                    return reject(err);
                }
                if (result.affectedRows === 0){
                    resolve({Error: 'Banner not found'});
                }
                resolve(result);
            }
        );
    });
}

//
const deleteBanner = async(db, id) => {
    return new Promise((resolve, reject) => {
        db.query(`DELETE FROM banners WHERE id = ?`, [id],
            (err, result) => {
                if(err){
                    console.error('Error:', err.message);
                    return reject(err);
                }
                if(result.affectedRows === 0){
                    resolve({Error: 'Banner not found'});
                }
                else{
                    resolve({Message: 'Banner deleted successfuly'});
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
            `UPDATE banners SET status = ?, updated_at = ? WHERE id = ?`,
            [status, updated_at, id],
            (err, result) => {
                if (err) {
                    console.error('Error updating status:', err.message);
                    return reject(err);
                }
                if (result.affectedRows === 0) {
                    resolve({ error: 'Banner not found' });
                } else {
                    resolve({ message: 'Banner status updated successfully' });
                }
            }
        );
    });
};

module.exports = {
    getAll, getOne, createBanner, updateBanner, deleteBanner, updateStatus
}