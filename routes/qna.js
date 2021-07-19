const router = require('express').Router()
const { model } = require('mongoose');
//const verifyToken = require('../middlewares/verify-token')
const { sequelize, Review } = require('../models');
const  initModels  =  require ( "../models/init-models" );
const t_product_image = require('../models/t_product_image');
const verifyToken = require('../middlewares/verify-token')


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

router.get('/readqna/:id', async (req, res) => {
    try {
        const qna = await models.t_question.findOne({
        where : {
            id : req.params.id
        },
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

router.post('/qna/save', async (req, res) => {
    try {
        models.t_question.create({
            q_title : req.body.q_title,
            q_description : req.body.q_description,
            user_id : req.body.user_id,
            product_id : req.body.product_id,
            q_type: 1,
            answer_status: 1,
            answer_description: ""
        })
        .then((qna) => {
            return models.t_question.findAll({
                where: {product_id : req.body.product_id}
                ,include: [{
                    as: 'user',
                    model: models.t_user,
                    attributes: ['user_name']
                }]
            })
            .then(result => {
                res.json({
                    success: true,
                    result
                })
            })
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
});

router.get('/verify_user', verifyToken, (req, res) => {
    try {
      const { user_name, id } = req.decode
      res.json({
        success: true,
        userInfo: {
          user_name,
          id
        }
      })

    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message
      })
    }
  });

module.exports = router
