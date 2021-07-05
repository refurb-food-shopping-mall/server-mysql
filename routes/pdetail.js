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


router.post('/getOrder', async (req, res) => {
    try {
        const getorder = await models.t_order.findAll({
            where: {
                id: req.body.id
            }
        })
        res.json({
            success: true,
            getorder,
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
        let startDate = req.body.dayarr[0]
        let endDate = req.body.dayarr[1]
        const getgett = await models.t_order.findAll({
            where: {
                // expected_del_day: req.body.dayarr[i](i=0,1)
                // expected_del_day: { gte: req.body.dayarr[0] },
                // expected_del_day: { lte: req.body.dayarr[1] }

                [Op.or]: [{
                    expected_del_day: {
                        [Op.between]: [startDate, endDate]
                    }
                }, {
                    expected_del_day: {
                        [Op.between]: [startDate, endDate]
                    }
                }]

            }
        })
        //console.log(getgett)
        res.json({
            success: true,
            getgett,
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        })
    }
})



// router.post('/getget', function (req, res, next) {
//     let number = req.body.num;
//     db.query('SELECT * FROM t_order WHERE REGDATE BETWEEN TO_DATE('20210705', 'YYYYMMDD') AND TO_DATE('20210707')', req.body.num, (err, rows, fields) => {
//         res.send(rows);
//     });
// });



module.exports = router