const router = require('express').Router()
const { sequelize } = require('../models');
const  initModels  =  require ( "../models/init-models" );

const  models  =  initModels ( sequelize );

//사용자의 기본 배송지를 가져오는 라우터
router.post('/address/default', async (req, res) => {
    try{
        let useraddress = await models.t_address.findAll({ 
            where : { 
                user_id : req.body.userid,
                default_address : req.body.default_address
            }   
        })
        res.json({
            success : true,
            useraddress : useraddress[0].dataValues
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

// 결제페이지에서 신규배송지를 저장
router.post('/address/save', async (req, res) => {
    // console.log(req.body);
    try {
        if(req.body.default_address){
            models.t_address.update({
                user_id : req.body.user_id,
                receiver : req.body.receiver,
                address_name : req.body.address_name,
                post_code : req.body.post_code,
                address : req.body.address,
                detailed_address : req.body.detail_adress,
                phonenumber : req.body.phonenumber,
                address_list : true,
                default_address : req.body.default_address
            }, {
                where : {
                    default_address : 1,
                    user_id : req.body.user_id
                }
            })
            .catch(err => {
                console.log(err)
            })
            // console.log(newaddress)
            res.json({
                success : true
            })
        } else {
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
        }
        
    } catch (err) {
        res.status(500).json({
            success : false,
            message : err.message
        })
    }
})

// 배송지관리페이지에서 신규배송지를 저장
router.post('/addresslist/save', async (req, res) => {
    // console.log(req.body);
    try {
        if(req.body.default_address){
            models.t_address.update({
                user_id : req.body.user_id,
                receiver : req.body.receiver,
                address_name : req.body.address_name,
                post_code : req.body.post_code,
                address : req.body.address,
                detailed_address : req.body.detail_adress,
                phonenumber : req.body.phonenumber,
                address_list : req.body.address_list,
                default_address : req.body.default_address
            }, {
                where : {
                    default_address : 1,
                    user_id : req.body.user_id
                }
            })
            .catch(err => {
                console.log(err)
            })
            // console.log(newaddress)
            res.json({
                success : true
            })
        } else {
            models.t_address.create({
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
            .catch(err => {
                console.log(err)
            })
            res.json({
                success : true              
            })
        }
        
    } catch (err) {
        res.status(500).json({
            success : false,
            message : err.message
        })
    }
})


module.exports = router