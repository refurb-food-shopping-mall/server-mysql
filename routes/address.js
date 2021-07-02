const router = require('express').Router()
const { sequelize } = require('../models');
const  initModels  =  require ( "../models/init-models" );

const  models  =  initModels ( sequelize );

//사용자의 기본 배송지를 가져오는 라우터
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
}),

// 사용자의 배송지 목록을 가져오는 라우터
router.post('/address/list', async (req, res) => {
    try {
        let useraddresslist = await models.t_address.findAll({
            where : {
                user_id : req.body.user_id
            }
        })
        res.json({
            success : true,
            useraddresslist
        })
    } catch (err) {
        res.status(500).json({
            success : false,
            message : err.message
        })
    }
})



module.exports = router