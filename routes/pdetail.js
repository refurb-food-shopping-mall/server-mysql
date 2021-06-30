const router = require('express').Router()
const { sequelize } = require('../models');
const  initModels  =  require ( "../models/init-models" );
const  models  =  initModels ( sequelize );


router.post('/getProduct', async(req,res)=>{
    const getproduct = await models.t_product.findAll({
        where : {
            id : req.body.productid
        }
    })
    res.json({
        success: true,
        getproduct,
      })
})


router.post('/getOrder', async(req,res)=>{
    const getorder = await models.t_order.findAll({
        where : {
            id : req.body.id
        }
    })
    res.json({
        success: true,
        getorder,
      })
})


router.post('/getAddress', async(req,res)=>{
    const getaddress = await models.t_address.findAll({
        where : {
            id : req.body.addressid
        }
    })
    res.json({
        success: true,
        getaddress,
      })
})



module.exports = router