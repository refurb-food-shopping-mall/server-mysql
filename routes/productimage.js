const router = require('express').Router()
//const verifyToken = require('../middlewares/verify-token')
const { sequelize } = require('../models');
const initModels = require("../models/init-models");
const models = initModels(sequelize);

router.post('/productimage/thumbnail', async(req, res) => {
    thumbnail = await models.t_product_image.findAll({
        where : {
            product_id : req.body.product_id,
            type_image : 1
        }
    })
    console.log(thumbnail)
    res.json({
        success : true,
        thumbnail : thumbnail[0].dataValues.path
    })
})



module.exports = router