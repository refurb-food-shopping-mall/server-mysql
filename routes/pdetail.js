const router = require('express').Router()
const { sequelize } = require('../models');
const  initModels  =  require ( "../models/init-models" );
const  models  =  initModels ( sequelize );


router.post('/getProduct', async(req,res)=>{
    const getproduct = await models.t_product.findAll({
        where : {
            id : req.body.id
        }
    })
    res.send(getproduct)
})



module.exports = router