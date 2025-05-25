const orderdetailsService = require('../services/orderdetails.service');

function getAll(req, res) {
    orderdetailsService.getAll(this.mysql)
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.error('Database error: ', err);
            res.status(500).send({ error: 'Internal Server Error' });
        });
}

function getOne(req, res) {
    const id = req.params.id;
    orderdetailsService.getOne(this.mysql, id)
        .then((result) => {
            if (!result) {
                res.status(404).send({ error: 'Order detail not found' });
                return;
            }
            res.send(result);
        })
        .catch((err) => {
            console.error('Database error: ', err);
            res.status(500).send({ error: 'Internal Server Error' });
        });
}

function createOrderDetail(req, res) {
    const data = req.body;
    orderdetailsService.createOrderDetail(this.mysql, data)
        .then(result => {
            const id = result.insertId;
            return orderdetailsService.getOne(this.mysql, id);
        })
        .then(item => {
            res.send(item);
        })
        .catch(err => {
            console.error('Database error: ', err);
            res.status(500).send({ error: 'Internal Server Error' });
        });
}

function updateOrderDetail(req, res) {
    const data = req.body;
    const id = req.params.id;
    orderdetailsService.updateOrderDetail(this.mysql, data, id)
        .then(async (result) => {
            if (result.affectedRows === 0) {
                res.status(404).send({ error: 'Order detail not found' });
                return;
            }
            const item = await orderdetailsService.getOne(this.mysql, id);
            res.send(item);
        })
        .catch(err => {
            console.error('Database error:', err);
            res.status(500).send({ error: 'Internal Server Error' });
        });
}

async function deleteOrderDetail(req, res) {
    const id = req.params.id;
    try {
        const item = await orderdetailsService.getOne(this.mysql, id);
        if (!item) {
            res.status(404).send({ error: 'Order detail not found' });
            return;
        }
        const result = await orderdetailsService.deleteOrderDetail(this.mysql, id);
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

//
function updateStatus(req, res) {
    const id = req.params.id;
    const { status } = req.body;

    orderdetailsService.updateStatus(this.mysql, id, status)
        .then((result) => {
            if (result.affectedRows === 0) {
                res.status(404).send({ error: 'OrderDetail not found' });
            } else {
                res.send({ message: 'Status updated successfully' });
            }
        })
        .catch((err) => {
            console.error('Database error:', err);
            res.status(500).send({ error: 'Internal Server Error' });
        });
}

function createOrderDetailUser(req, res) {
    const data = req.body;
    orderdetailsService.createOrderDetailUser(this.mysql, data)
        .then(result => {
            const id = result.insertId;
            return orderdetailsService.getOne(this.mysql, id);
        })
        .then(item => {
            res.send(item);
        })
        .catch(err => {
            console.error('Database error: ', err);
            res.status(500).send({ error: 'Internal Server Error' });
        });
}

function getAllOrderDetail(req, res) {
    const { order_id } = req.params;

    orderdetailsService.getAllOrderDetail(this.mysql, order_id)
        .then((orders) => {
            if (!orders || orders.length === 0) {
                return res.status(404).send({ error: 'No orders found in this orderdetail' });
            }
            res.send(orders);
        })
        .catch((err) => {
            console.error('Database error:', err);
            res.status(500).send({ error: 'Internal Server Error' });
        });
}

module.exports = {
    getAll, getOne, createOrderDetail, updateOrderDetail, deleteOrderDetail, updateStatus, createOrderDetailUser, getAllOrderDetail
};
