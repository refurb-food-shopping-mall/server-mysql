const router = require('express').Router()
const { sequelize } = require('../models');
const initModels = require("../models/init-models");
const models = initModels(sequelize);
const { Op } = require('sequelize');


router.post('/getProduct', async (req, res) => {
    try {
        const getproduct = await models.t_product.findAll({
            where: {
                id: req.body.productid
            },
            include: [{
                as: 't_product_images',
                model: models.t_product_image,
                attributes: ['path'],
                where: {
                    type_image: 1
                }
            }]
        })
        res.json({
            success: true,
            getproduct
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        })
    }
})


router.post('/paymentdetail/:id', async (req, res) => {
    try {
        const getorder = await models.t_order.findAll({
            where: {
                // id: req.body.id
                id: req.params.id
            }
        })
        res.json({
            success: true,
            getorder
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        })
    }
})


router.post('/getAddress', async (req, res) => {
    try {
        const getaddress = await models.t_address.findAll({
            where: {
                id: req.body.addressid
            }
        })
        res.json({
            success: true,
            getaddress,
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        })
    }
})


router.post('/getDate', async (req, res) => {
    try {
        let cnt1 = 0
        let cnt2 = 0
        let cnt3 = 0
        let cntarr = []
        let arr = []
        let startDate = req.body.dayarr[0]
        let endDate = req.body.dayarr[1]
        await models.t_order.findAll({
            where: {
                ordered_day: {
                    [Op.between]: [startDate, endDate]
                },
                user_id: req.body.user_id,
            },
            attributes: ['id', 'product_amount', 'order_status', 'ordered_day', 'product_id'],
            order: [['ordered_day', 'DESC']]
        })
            .then(async (order) => {
                //console.log(order)
                for (let i = 0; i < order.length; i++) {
                    if (order[i].dataValues.order_status == '배송준비중') { cnt1 += 1 }
                    else if (order[i].dataValues.order_status == '배송중') { cnt2 += 1 }
                    else if (order[i].dataValues.order_status == '반품중') { cnt3 += 1 }

                    let data = await models.t_product.findAll({
                        where: {
                            id: order[i].dataValues.product_id
                        },
                        include: [{
                            as: 't_product_images',
                            model: models.t_product_image,
                            attributes: ['path'],
                            where: {
                                type_image: 1
                            }
                        }],
                        //attributes: ['product_name', 'product_price', 'delivery_price', 'add_delivery_price', 't_product_images'],
                    })
                    //console.log(data)
                    order[i].dataValues.key = data[0].dataValues
                    arr.push(order[i].dataValues)
                }
                cntarr.push(cnt1)
                cntarr.push(cnt2)
                cntarr.push(cnt3)
                //console.log(cntarr)
            })

        res.json({
            success: true,
            arr,
            cntarr
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        })
    }
})




module.exports = router