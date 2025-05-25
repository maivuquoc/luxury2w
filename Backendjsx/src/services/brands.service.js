const getAll = async (db) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM brands', (err, result) => {
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
        db.query('SELECT * FROM brands WHERE id = ?', [id], (err, result) => {
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
const createBrand = async (db, { name, slug, thumbnail, description, sort_order, status, created_by }) => {
    return new Promise((resolve, reject) => {
        const created_at = new Date();
        const updated_at = new Date();
        const updated_by = created_by;

        db.query(
            `INSERT INTO brands 
            (name, slug, thumbnail, description, sort_order, created_at, created_by, updated_at, updated_by, status) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ? )`, 
            [name, slug, thumbnail, description, sort_order, created_at, created_by, updated_at, updated_by, status], 
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
const updateBrand = async(db, { name, slug, thumbnail, description, sort_order, status, created_by }, id) => {
    return new Promise((resolve, reject) => {
        const created_at = new Date();
        const updated_at = new Date();
        const updated_by = created_by;

        db.query(
            `UPDATE brands SET name = ?, slug = ?, thumbnail = ?, description = ?, sort_order = ?, 
            created_at = ?, created_by = ?, updated_at = ?, updated_by =?, status =? WHERE id = ?`,
            [name, slug, thumbnail, description, sort_order, created_at, created_by, updated_at, updated_by, status, id], 
            (err, result) => {
                if (err) {
                    console.error('Error:', err.message);
                    return reject(err);
                }
                if (result.affectedRows === 0){
                    resolve({Error: 'Brand not found'});
                }
                resolve(result);
            }
        );
    });
}

//
const deleteBrand = async(db, id) => {
    return new Promise((resolve, reject) => {
        db.query(`DELETE FROM brands WHERE id = ?`, [id],
            (err, result) => {
                if(err){
                    console.error('Error:', err.message);
                    return reject(err);
                }
                if(result.affectedRows === 0){
                    resolve({Error: 'Brand not found'});
                }
                else{
                    resolve({Message: 'Brand deleted successfuly'});
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
            `UPDATE brands SET status = ?, updated_at = ? WHERE id = ?`,
            [status, updated_at, id],
            (err, result) => {
                if (err) {
                    console.error('Error updating status:', err.message);
                    return reject(err);
                }
                if (result.affectedRows === 0) {
                    resolve({ error: 'Brand not found' });
                } else {
                    resolve({ message: 'Brand status updated successfully' });
                }
            }
        );
    });
};

module.exports = {
    getAll, getOne, createBrand, updateBrand, deleteBrand, updateStatus
}