const router = require('express').Router()
const { model } = require('mongoose');
//const verifyToken = require('../middlewares/verify-token')
const { sequelize, Review } = require('../models');
const  initModels  =  require ( "../models/init-models" );
const t_product_image = require('../models/t_product_image');
const t_user = require('../models/t_user');
const  models  =  initModels ( sequelize );




router.get('/paymentdetail_cancel/:id', async (req, res) => {
    let pd_info = {}
    let pd_image = {}
    try {
        const detail = await models.t_order.findOne({
        where : {id : req.params.id},
        include: [{
            as : 'product',
            model: models.t_product,
            attributes: ['product_name',
            'product_price',
            'delivery_price'
        ]
        }]
    })
    .then(async(order) => {
        let pdct = await models.t_product_image.findOne({
            where: {
                product_id:order.dataValues.product_id,
                type_image : 1
            },
            attributes: ['path']

        }) 
        pd_info = order;
        pd_image = pdct;

    })
    
        res.json({
            success: true,
            pd_info,
            pd_image
        })
    
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
});


module.exports = router
