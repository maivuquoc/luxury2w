const topicsService = require('../services/topics.service');

//
function getAll(req, res) {
    topicsService.getAll(this.mysql)
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
    topicsService.getOne(this.mysql, id)
        .then((result) => {
            if (!result) {
                res.status(404).send({ error: 'Topic not found' });
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
function createTopic(req, res) {
    const data = req.body;
    topicsService.createTopic(this.mysql, data)
        .then((result) => {
            const id = result.insertId;
            return topicsService.getOne(this.mysql, id);
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
function updateTopic(req, res) {
    const data = req.body;
    const id = req.params.id;
    topicsService.updateTopic(this.mysql, data, id)
        .then(async (result) => {
            if (result.affectedRows === 0) {
                res.status(404).send({ error: 'Topic not found' });
                return;
            }
            const item = await topicsService.getOne(this.mysql, id);
            res.send(item);
        })
        .catch((err) => {
            console.error('Database error:', err);
            res.status(500).send({ error: 'Internal Server Error' });
        });
}

//
async function deleteTopic(req, res) {
    const id = req.params.id;
    try {
        const item = await topicsService.getOne(this.mysql, id);
        if (!item) {
            return res.status(404).send({ error: 'Topic not found' });
        }

        const result = await topicsService.deleteTopic(this.mysql, id);
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

    topicsService.updateStatus(this.mysql, id, status)
        .then((result) => {
            if (result.affectedRows === 0) {
                res.status(404).send({ error: 'Topic not found' });
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
    getAll,
    getOne,
    createTopic,
    updateTopic,
    deleteTopic,
    updateStatus
};
