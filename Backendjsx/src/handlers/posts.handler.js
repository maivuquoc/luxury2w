const postsService = require('../services/posts.service');

function getAll(req, res){
    postsService.getAll(this.mysql)
    .then((result) =>{
        res.send(result);
    })
    .catch((err) =>{
        console.error('Database error: ', err);
        res.status(500).send({error: 'Internal Server Error'});
    });
}

//
function getOne(req, res) {
    const id = req.params.id;
    postsService.getOne(this.mysql, id)
        .then((result) => {
            if (!result) {
                res.status(404).send({ error: 'Not found' });
                return;
            }
            res.send(result);
        })
        .catch((err) => {
            console.error('Database error: ', err);
            res.status(500).send({ error: 'Internal Server Error' });
        });
}

//
function createPost(req, res) {
    const data = req.body;
    postsService.createPost(this.mysql, data)
        .then(result => {
            const id = result.insertId;
            return postsService.getOne(this.mysql, id);
        })
        .then((item) => {
            res.send(item);
        })
        .catch((err) => {
            console.error('Database error: ', err);
            res.status(500).send({ error: 'Internal Server Error' });
        });
}

//
function updatePost(req, res) {
    const data = req.body;
    const id = req.params.id;
    postsService.updatePost(this.mysql, data, id)
        .then(async (result) => {
            if (result.affectedRows === 0) {
                res.status(400).send({ Error: 'Not found' });
                return;
            }
            const item = await postsService.getOne(this.mysql, id);
            res.send(item);
        })
        .catch(err => {
            console.error('Database', err);
            res.status(500).send({ Error: 'Internal Server Error' });
        });
}

//
async function deletePost(req, res) {
    const id = req.params.id;
    try {
        const item = await postsService.getOne(this.mysql, id);
        if (!item) {
            res.status(404).send({ error: 'Post not found' });
            return;
        }
        const result = await postsService.deletePost(this.mysql, id);
        if (result.error) {
            res.status(404).send(result);
        } else {
            res.send(item);
        }
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
}

//
function updateStatus(req, res) {
    const id = req.params.id;
    const { status } = req.body;

    postsService.updateStatus(this.mysql, id, status)
        .then((result) => {
            if (result.affectedRows === 0) {
                res.status(404).send({ error: 'Post not found' });
            } else {
                res.send({ message: 'Status updated successfully' });
            }
        })
        .catch((err) => {
            console.error('Database error:', err);
            res.status(500).send({ error: 'Internal Server Error' });
        });
}

//
function newPost(req, res) {
    postsService.newPost(this.mysql)
        .then((post) => {
            if (!post) {
                res.status(404).send({ error: 'No latest post found' });
                return;
            }
            res.send(post);
        })
        .catch((err) => {
            console.error('Database error:', err);
            res.status(500).send({ error: 'Internal Server Error' });
        });
}

module.exports = {
    getAll, getOne, createPost, updatePost, deletePost, updateStatus, newPost
}
