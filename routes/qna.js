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

router.post('/qna/save', async (req, res) => {
    try {
        let SavaQna = await models.t_question.create({
            q_title : req.body.q_title,
            q_description : req.body.q_description,
            user_id : 1,
            product_id : req.body.product_id,
            q_type: 1,
            answer_status: 1
        });
        console.log(SavaQna.dataValues.id);
        res.json({
            success: true,
            qna_id: SaveQna.dataValues.id
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
});

router.get('/dltjddn', verifyToken, (req, res) => {
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
