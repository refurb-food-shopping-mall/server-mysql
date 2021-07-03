const router = require('express').Router()
const { sequelize } = require('../models');
const  initModels  =  require ( "../models/init-models" );
const verifyToken = require('../middlewares/verify-token');
const  models  =  initModels ( sequelize );

// 주문하였을 떄 주문정보를 저장하는 라우터
router.post('/order/create', async (req, res) => {   
    console.log(req.body)
    try {     
        await models.t_order.create({ 
            user_id: req.body.user_id, 
            order_number : req.body.order_number,
            product_id: req.body.product_id,
            address_id : req.body.address_id,
            product_amount : req.body.product_amount,
            order_status : req.body.order_status,
            del_requirement : req.body.del_requirement,
            used_point : req.body.used_point,
            payment_method : req.body.payment_method 
        });
        res.json({
            success: true
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})


module.exports = router