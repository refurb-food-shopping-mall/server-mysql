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
                user_id : req.body.user_id,
                address_list : 1
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

// 신규배송지를 저장
router.post('/address/save', async (req, res) => {
    console.log(req.body);
    try {
        let newaddress = await models.t_address.create({
            user_id : req.body.user_id,
            receiver : req.body.receiver,
            address_name : req.body.address_name,
            post_code : req.body.post_code,
            address : req.body.address,
            detailed_address : req.body.detail_adress,
            phonenumber : req.body.phonenumber,
            address_list : req.body.address_list,
            default_address : req.body.default_address
        })
        console.log(newaddress.dataValues.id)
        res.json({
            success : true,
            address_id : newaddress.dataValues.id
        })
    } catch (err) {
        res.status(500).json({
            success : false,
            message : err.message
        })
    }
})


module.exports = router