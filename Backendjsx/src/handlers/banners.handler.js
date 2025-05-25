const bannersService = require('../services/banners.service');

function getAll(req, res){
    bannersService.getAll(this.mysql)
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
    bannersService.getOne(this.mysql, id)
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
function createBanner(req, res){
    const data = req.body;
    bannersService.createBanner(this.mysql, data)
    .then(result =>{
        const id = result.insertId;
        return bannersService.getOne(this.mysql, id);
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
function updateBanner(req, res){
    const data = req.body;
    const id = req.params.id;
    bannersService.updateBanner(this.mysql, data, id)
    .then(async(result) => {
        if(result.affectedRows === 0){
            res.status(400).send({Error: 'Not found'});
            return
        }
        const item = await bannersService.getOne(this.mysql, id);
        res.send(item);
    })
    .catch(err => {
        console.error('Database', err);
        res.status(500).send({Error: 'Internal Server Error'});
    })
}

//
async function deleteBanner(req, res){
    const id = req.params.id;
    try {
        const item = await bannersService.getOne(this.mysql, id);
        if(!item){
            res.status(404).send({error: 'Banner not found'});
        }
        const result = await bannersService.deleteBanner(this.mysql, id);
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

    bannersService.updateStatus(this.mysql, id, status)
        .then((result) => {
            if (result.affectedRows === 0) {
                res.status(404).send({ error: 'Banner not found' });
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
    getAll, getOne, createBanner, updateBanner, deleteBanner, updateStatus
}
