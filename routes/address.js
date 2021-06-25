const router = require('express').Router()
const { sequelize } = require('../models');
const  initModels  =  require ( "../models/init-models" );

const  models  =  initModels ( sequelize );

router.post('/address/default', async (req, res) => {
    try{
        let useraddress = await models.t_address.findAll({ 
            where : { 
                id : req.body.userid,
                default_address : req.body.default_address
            }   
        })
        res.json({
            success : true,
            useraddress
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }    
})



module.exports = router