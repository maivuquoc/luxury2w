const productsService = require('../services/products.service');

// function getAll(req, res){
//     const {page = '1', limit = '10'} = req.query;
//     const pageNum = parseInt(page, 10);
//     const limitNum = parseInt(limit, 10);
//     const validPage = pageNum > 0 ? pageNum : 1;
//     const validLimit = limitNum > 0 ? limitNum : 10;


//     productsService.getAll(this.mysql, validPage, validLimit)
//     .then((result) =>{
//         if(!result || !result.data){
//             res.status(404).send({error: 'No products found'});
//             return;
//         }
//         const formattedResult = {
//             data: result.data.map(product => ({
//                 id: product.id,
//                 attributes:{
//                     category_id: product.category_id,
//                     brand_id: product.brand_id,
//                     name: product.name,
//                     slug: product.slug,
//                     thumbnail: product.thumbnail,
//                     description: product.description,
//                     content: product.content,
//                     pricebuy: product.pricebuy,
//                     pricesale: product.pricesale,
//                     qty: product.qty,

//                     created_at: product.created_at,
//                     created_by: product.created_by,
//                     updated_at: product.updated_at,
//                     updated_by: product.updated_by,
//                     status: product.status
//                 }
//             })),
//             meta:{
//                 pagination: result.meta.pagination
//             }
//         };
//         res.send(formattedResult);
//     })
//     .catch((err) =>{
//          console.error('Database error:', err);
//          res.status(500).send({error: 'Internal Server Error'})
//     }); 
// }

//
function getOne(req, res) {
    const id = req.params.id;
    productsService.getOne(this.mysql, id)
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
function getAll(req, res) {
    productsService.getAll(this.mysql)
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.error('Database error: ', err);
            res.status(500).send({ error: 'Internal Server Error' });
        });
}

function createProduct(req, res) {
    const data = req.body;
    productsService.createProduct(this.mysql, data)
        .then(result => {
            const id = result.insertId;
            return productsService.getOne(this.mysql, id);
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
function updateProduct(req, res) {
    const data = req.body;
    const id = req.params.id;
    productsService.updateProduct(this.mysql, data, id)
        .then(async (result) => {
            if (result.affectedRows === 0) {
                res.status(400).send({ Error: 'Not found' });
                return
            }
            const item = await productsService.getOne(this.mysql, id);
            res.send(item);
        })
        .catch(err => {
            console.error('Database', err);
            res.status(500).send({ Error: 'Internal Server Error' });
        })
}

async function deleteProduct(req, res) {
    const id = req.params.id;
    try {
        const item = await productsService.getOne(this.mysql, id);
        if (!item) {
            res.status(404).send({ error: 'Category not found' });
        }
        const result = await productsService.deleteProduct(this.mysql, id);
        if (result.error) {
            res.status(404).send(result);
        } else {
            res.send(item);
        }
    } catch (error) {
        console.err('Database error:', err);
        res.status(500).send({ error: 'Internal Server Error' });
    }
}

//
function updateStatus(req, res) {
    const id = req.params.id;
    const { status } = req.body;

    productsService.updateStatus(this.mysql, id, status)
        .then((result) => {
            if (result.affectedRows === 0) {
                res.status(404).send({ error: 'Product not found' });
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
function newProduct(req, res) {
    productsService.newProduct(this.mysql)
        .then((product) => {
            if (!product) {
                res.status(404).send({ error: 'No latest product found' });
                return;
            }
            res.send(product);
        })
        .catch((err) => {
            console.error('Database error:', err);
            res.status(500).send({ error: 'Internal Server Error' });
        });
}

//
function saleProduct(req, res) {
    productsService.saleProduct(this.mysql)
        .then((products) => {
            if (!products || products.length === 0) {
                res.status(404).send({ error: 'No sale products found' });
                return;
            }
            res.send(products);
        })
        .catch((err) => {
            console.error('Database error:', err);
            res.status(500).send({ error: 'Internal Server Error' });
        });
}

function slugProduct(req, res) {
    const { slug } = req.params;

    productsService.slugProduct(this.mysql, slug)
        .then((result) => {
            if (!result) {
                res.status(404).send({ error: 'Product not found' });
                return;
            }
            res.send(result);
        })
        .catch((err) => {
            console.error('Database error:', err);
            res.status(500).send({ error: 'Internal Server Error' });
        });
}

function getCategoryProduct(req, res) {
    const { category_id } = req.params;
    const limit = req.query.limit || 4;

    productsService.getCategoryProduct(this.mysql, category_id, limit)
        .then((products) => {
            if (!products || products.length === 0) {
                return res.status(404).send({ error: 'No products found in this category' });
            }
            res.send(products);
        })
        .catch((err) => {
            console.error('Database error:', err);
            res.status(500).send({ error: 'Internal Server Error' });
        });
}

function getAllCategoryProduct(req, res) {
    const { category_id } = req.params;

    productsService.getAllCategoryProduct(this.mysql, category_id)
        .then((products) => {
            if (!products || products.length === 0) {
                return res.status(404).send({ error: 'No products found in this category' });
            }
            res.send(products);
        })
        .catch((err) => {
            console.error('Database error:', err);
            res.status(500).send({ error: 'Internal Server Error' });
        });
}

function getAllBrandProduct(req, res) {
    const { brand_id } = req.params;

    productsService.getAllBrandProduct(this.mysql, brand_id)
        .then((products) => {
            if (!products || products.length === 0) {
                return res.status(404).send({ error: 'No products found in this brand' });
            }
            res.send(products);
        })
        .catch((err) => {
            console.error('Database error:', err);
            res.status(500).send({ error: 'Internal Server Error' });
        });
}


module.exports = {
    getAll, getOne, createProduct, updateProduct, deleteProduct, updateStatus,
    newProduct, saleProduct, slugProduct, getCategoryProduct, getAllCategoryProduct, getAllBrandProduct
}
