const router = require('express').Router()
const { model } = require('mongoose');
//const verifyToken = require('../middlewares/verify-token')
const { sequelize, Review } = require('../models');
const  initModels  =  require ( "../models/init-models" );
const t_product_image = require('../models/t_product_image');
const t_user = require('../models/t_user');
const  models  =  initModels ( sequelize );




router.get('/paymentdetail_cancel/:id', async (req, res) => {
    try {
        // console.log(req.params.id);
        const detail = await models.t_order.findAll({
        where : {id : req.params.id},
        // include: [{
        //     as : 't_product_images', 
        //     model: models.t_product_image,
        //     attributes: ['path'],
        //     where: {
        //         type_image : 1,
        //     },            
        // },
        // {
        //     as : 'product',
        //     model: models.t_product,
        //     attributes: ['product_name',
        //     'product_price',
        //     'delivery_price'

        // ]
        // }]
    });
        res.json({
            success: true,
            detail
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
});