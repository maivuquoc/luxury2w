const categoriesService = require('../services/categories.service');

//
function getAll(req, res){
    categoriesService.getAll(this.mysql)
    .then((result) =>{
        res.send(result);
    })
    .catch((err) =>{
        console.error('Database error: ', err);
        res.status(500).send({error: 'Internal Server Error'});
    });
}

//
function getOne(req, res){
    const id = req.params.id;
    categoriesService.getOne(this.mysql, id)
    .then((result) => {
        if(!result){
            res.status(404).send({error: 'Not found'});
            return;
        }
        res.send(result);
    })
    .catch((err) =>{
        console.error('Database error: ', err);
        res.status(500).send({error: 'Internal Server Error'});
    });
}

//
function createCategory(req, res){
    const data = req.body;
    categoriesService.createCategory(this.mysql, data)
    .then(result =>{
        const id = result.insertId;
        return categoriesService.getOne(this.mysql, id);
    })
    .then((item) =>{
        res.send(item);
    })
    .catch((err) =>{
        console.error('Database error: ', err);
        res.status(500).send({error: 'Internal Server Error'});
    });
}

//
function updateCategory(req, res){
    const data = req.body;
    const id = req.params.id;
    categoriesService.updateCategory(this.mysql, data, id)
    .then(async(result) => {
        if(result.affectedRows === 0){
            res.status(400).send({Error: 'Not found'});
            return
        }
        const item = await categoriesService.getOne(this.mysql, id);
        res.send(item);
    })
    .catch(err => {
        console.error('Database', err);
        res.status(500).send({Error: 'Internal Server Error'});
    })
}

//
async function deleteCategory(req, res){
    const id = req.params.id;
    try {
        const item = await categoriesService.getOne(this.mysql, id);
        if(!item){
            res.status(404).send({error: 'Category not found'});
        }
        const result = await categoriesService.deleteCategory(this.mysql, id);
        if(result.error){
            res.status(404).send(result);
        }else{
            res.send(item);
        }
    } catch (error) {
        console.err('Database error:', err);
        res.status(500).send({error: 'Internal Server Error'});
    }
}

function updateStatus(req, res) {
    const id = req.params.id;
    const { status } = req.body;

    categoriesService.updateStatus(this.mysql, id, status)
        .then((result) => {
            if (result.affectedRows === 0) {
                res.status(404).send({ error: 'Category not found' });
            } else {
                res.send({ message: 'Status updated successfully' });
            }
        })
        .catch((err) => {
            console.error('Database error:', err);
            res.status(500).send({ error: 'Internal Server Error' });
        });
}

module.exports = {
    getAll, getOne, createCategory, updateCategory, deleteCategory, updateStatus
}
