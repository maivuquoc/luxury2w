const getAll = async (db) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM posts', (err, result) => {
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
        db.query('SELECT * FROM posts WHERE id = ?', [id], (err, result) => {
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
const createPost = async (db, { topic_id, title, slug, thumbnail, description, type, content, created_by, status }) => {
    return new Promise((resolve, reject) => {
        const created_at = new Date();
        const updated_at = new Date();
        const updated_by = created_by;

        db.query(
            `INSERT INTO posts 
            (topic_id, title, slug, thumbnail, description, type, content, created_at, created_by, updated_at, updated_by, status) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
            [topic_id, title, slug, thumbnail, description, type, content, created_at, created_by, updated_at, updated_by, status], 
            (err, result) => {
                if (err) {
                    console.error('Lỗi khi tạo bài viết:', err.message);
                    return reject(err);
                }
                resolve(result);
            }
        );
    });
};

//
const updatePost = async (db, { topic_id, title, slug, thumbnail, description, type, content, created_by, status }, id) => {
    return new Promise((resolve, reject) => {
        const updated_at = new Date();
        const updated_by = created_by;

        db.query(
            `UPDATE posts SET topic_id = ?, title = ?, slug = ?, thumbnail = ?, description = ?, type = ?, content = ?, 
            updated_at = ?, updated_by = ?, status = ? WHERE id = ?`,
            [topic_id, title, slug, thumbnail, description, type, content, updated_at, updated_by, status, id], 
            (err, result) => {
                if (err) {
                    console.error('Error:', err.message);
                    return reject(err);
                }
                if (result.affectedRows === 0){
                    resolve({Error: 'Post not found'});
                }
                resolve(result);
            }
        );
    });
}

//
const deletePost = async (db, id) => {
    return new Promise((resolve, reject) => {
        db.query(`DELETE FROM posts WHERE id = ?`, [id],
            (err, result) => {
                if(err){
                    console.error('Error:', err.message);
                    return reject(err);
                }
                if(result.affectedRows === 0){
                    resolve({Error: 'Post not found'});
                }
                else{
                    resolve({Message: 'Post deleted successfully'});
                }
            }
        );
    });
}

//
//
const updateStatus = async (db, id, status) => {
    return new Promise((resolve, reject) => {
        const updated_at = new Date();
        db.query(
            `UPDATE posts SET status = ?, updated_at = ? WHERE id = ?`,
            [status, updated_at, id],
            (err, result) => {
                if (err) {
                    console.error('Error updating status:', err.message);
                    return reject(err);
                }
                if (result.affectedRows === 0) {
                    resolve({ error: 'Post not found' });
                } else {
                    resolve({ message: 'Post status updated successfully' });
                }
            }
        );
    });
};

//Bài viết mới
const newPost = async (db, limit = 4) => {
    return new Promise((resolve, reject) => {
        // Lấy các bài viết mới nhất, sắp xếp theo created_at DESC
        db.query(
            'SELECT * FROM posts ORDER BY created_at DESC LIMIT ?',
            [limit],
            (err, result) => {
                if (err) {
                    console.error('Lỗi khi lấy bài viết mới:', err.message);
                    return reject(err);
                }
                if (result.length === 0) {
                    resolve({ message: 'No new posts found' });
                }
                resolve(result);
            }
        );
    });
};

module.exports = {
    getAll, getOne, createPost, updatePost, deletePost, updateStatus, newPost
}