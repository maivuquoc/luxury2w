const ordersService = require('../services/orders.service');

function getAll(req, res) {
    ordersService.getAll(this.mysql)
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.error('Database error: ', err);
            res.status(500).send({ error: 'Internal Server Error' });
        });
}

//
function getOne(req, res) {
    const id = req.params.id;
    ordersService.getOne(this.mysql, id)
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
function createOrder(req, res) {
    const data = req.body;
    ordersService.createOrder(this.mysql, data)
        .then(result => {
            const id = result.insertId;
            return ordersService.getOne(this.mysql, id);
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
function updateOrder(req, res) {
    const data = req.body;
    const id = req.params.id;
    ordersService.updateOrder(this.mysql, data, id)
        .then(async (result) => {
            if (result.affectedRows === 0) {
                res.status(400).send({ Error: 'Not found' });
                return
            }
            const item = await ordersService.getOne(this.mysql, id);
            res.send(item);
        })
        .catch(err => {
            console.error('Database', err);
            res.status(500).send({ Error: 'Internal Server Error' });
        })
}

//
async function deleteOrder(req, res) {
    const id = req.params.id;
    try {
        const item = await ordersService.getOne(this.mysql, id);
        if (!item) {
            res.status(404).send({ error: 'Order not found' });
        }
        const result = await ordersService.deleteOrder(this.mysql, id);
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

    ordersService.updateStatus(this.mysql, id, status)
        .then((result) => {
            if (result.affectedRows === 0) {
                res.status(404).send({ error: 'Order not found' });
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
function createOrderUser(req, res) {
    const data = req.body;
    ordersService.createOrderUser(this.mysql, data)
        .then(result => {
            const id = result.insertId;
            return ordersService.getOne(this.mysql, id);
        })
        .then((item) => {
            res.send(item);
        })
        .catch((err) => {
            console.error('Database error: ', err);
            res.status(500).send({ error: 'Internal Server Error' });
        });
}


function getAllOrderUser(req, res) {
    const { user_id } = req.params;

    ordersService.getAllOrderUser(this.mysql, user_id)
        .then((orders) => {
            if (!orders || orders.length === 0) {
                return res.status(404).send({ error: 'Không tìm thấy đơn hàng của người dùng này' });
            }
            res.send(orders);
        })
        .catch((err) => {
            console.error('Database error:', err);
            res.status(500).send({ error: 'Internal Server Error' });
        });
}

//
async function deleteOrderUser(req, res){
    const id = req.params.id;
    try {
        const item = await ordersService.getOne(this.mysql, id);
        if(!item){
            res.status(404).send({error: 'Order not found'});
        }
        const result = await ordersService.deleteOrderUser(this.mysql, id);
        if(result.error){
            res.status(404).send(result);
        }else{
            res.send(item);
        }
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).send({error: 'Internal Server Error'});
    }
}


module.exports = {
    getAll, getOne, createOrder, updateOrder, deleteOrder, updateStatus, createOrderUser, getAllOrderUser, deleteOrderUser
}
