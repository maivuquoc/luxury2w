const brandsService = require('../services/brands.service');

function getAll(req, res){
    brandsService.getAll(this.mysql)
    .then((result) =>{
        res.send(result);
    })
    .catch((err) =>{
        console.error('Database error: ', err);
        res.status(500).send({error: 'Internal Server Error'});
    });
}

function getOne(req, res){
    const id = req.params.id;
    brandsService.getOne(this.mysql, id)
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
function createBrand(req, res){
    const data = req.body;
    brandsService.createBrand(this.mysql, data)
    .then(result =>{
        const id = result.insertId;
        return brandsService.getOne(this.mysql, id);
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
function updateBrand(req, res){
    const data = req.body;
    const id = req.params.id;
    brandsService.updateBrand(this.mysql, data, id)
    .then(async(result) => {
        if(result.affectedRows === 0){
            res.status(400).send({Error: 'Not found'});
            return
        }
        const item = await brandsService.getOne(this.mysql, id);
        res.send(item);
    })
    .catch(err => {
        console.error('Database', err);
        res.status(500).send({Error: 'Internal Server Error'});
    })
}

//
async function deleteBrand(req, res){
    const id = req.params.id;
    try {
        const item = await brandsService.getOne(this.mysql, id);
        if(!item){
            res.status(404).send({error: 'brand not found'});
        }
        const result = await brandsService.deleteBrand(this.mysql, id);
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

//
function updateStatus(req, res) {
    const id = req.params.id;
    const { status } = req.body;

    brandsService.updateStatus(this.mysql, id, status)
        .then((result) => {
            if (result.affectedRows === 0) {
                res.status(404).send({ error: 'Brand not found' });
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
    getAll, getOne, createBrand, updateBrand, deleteBrand, updateStatus
}
