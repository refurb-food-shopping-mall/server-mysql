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
            }
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
            attributes: ['id', 'product_amount', 'order_status', 'ordered_day', 'product_id']
        })
            .then(async (order) => {
                //console.log(order)
                for (let i = 0; i < order.length; i++) {
                    let data = await models.t_product.findAll({
                        where: {
                            id: order[i].dataValues.product_id
                        },
                        attributes: ['product_name', 'product_price', 'delivery_price', 'add_delivery_price']
                    })
                    //console.log(data)
                    order[i].dataValues.key = data[0].dataValues
                    arr.push(order[i].dataValues)
                }
                //console.log(arr)
            })

        res.json({
            success: true,
            arr,
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        })
    }
})




module.exports = router