const router = require('express').Router()
const { model } = require('mongoose');
//const verifyToken = require('../middlewares/verify-token')
const { sequelize, Review } = require('../models');
const  initModels  =  require ( "../models/init-models" );
const t_product_image = require('../models/t_product_image');

const  models  =  initModels ( sequelize );



router.get('/review/:id', async (req, res) => {
    try {
        const review = await models.t_review.findAll({
        where : {product_id : req.params.id},
        include: [{
            as : 't_review_images',
            model: models.t_review_image,
            attributes: ['path'],
            where: {
                product_id : req.params.id,
            }
        }]
    })
        res.json({
            review 
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
});



module.exports = router
