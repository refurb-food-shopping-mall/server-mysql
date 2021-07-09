const router = require('express').Router()
const { model } = require('mongoose');
//const verifyToken = require('../middlewares/verify-token')
const { sequelize, Review } = require('../models');
const  initModels  =  require ( "../models/init-models" );
const t_product_image = require('../models/t_product_image');

const  models  =  initModels ( sequelize );



router.get('/qna/:id', async (req, res) => {
    try {
        const qna = await models.t_question.findAll({
        where : {
            product_id : req.params.id
        },
        include : [{
            as: 'user',
            model: models.t_user,
            attributes: ['user_name']
        }]
      })
        res.json({
            qna
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        })
    }
});

module.exports = router
