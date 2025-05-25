const menusService = require('../services/menus.service');

function getAll(req, res){
    menusService.getAll(this.mysql)
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
    menusService.getOne(this.mysql, id)
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
function createMenu(req, res) {
    const data = req.body;
    menusService.createMenu(this.mysql, data)
        .then(result => {
            const id = result.insertId;
            return menusService.getOne(this.mysql, id);
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
function updateMenu(req, res) {
    const data = req.body;
    const id = req.params.id;
    menusService.updateMenu(this.mysql, data, id)
        .then(async (result) => {
            if (result.affectedRows === 0) {
                res.status(400).send({ error: 'Not found' });
                return;
            }
            const item = await menusService.getOne(this.mysql, id);
            res.send(item);
        })
        .catch(err => {
            console.error('Database error:', err);
            res.status(500).send({ error: 'Internal Server Error' });
        });
}

//
async function deleteMenu(req, res) {
    const id = req.params.id;
    try {
        const item = await menusService.getOne(this.mysql, id);
        if (!item) {
            res.status(404).send({ error: 'Menu not found' });
            return;
        }
        const result = await menusService.deleteMenu(this.mysql, id);
        if (result.error) {
            res.status(404).send(result);
        } else {
            res.send(item);
        }
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).send({ error: 'Internal Server Error' });
    }
}

module.exports = {
    getAll, getOne, createMenu, updateMenu, deleteMenu
}
