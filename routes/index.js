const router = require('express').Router()
const verifyToken = require('../middlewares/verify-token')

const { sequelize } = require('../models');
const initModels = require("../models/init-models");
const models = initModels(sequelize);

// [ user 전체 조회 ]
router.get('/user', async (req, res) => {
  try {
    const users = await models.t_user.findAll()
    res.json({
      success: true,
      users,
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
})

// [ user 등록 ]
router.post('/user', async (req, res) => {
  try {
    const user = await models.t_user.create({
      user_name: req.body.name,
      phone_number: req.body.phoneNumber,
      user_email: req.body.email,
      user_password: req.body.password,
      user_point_money: 0,
    })
    res.status(201).json(user)
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
})

// [ 리뷰 등록 ]
router.post('/review', async (req, res) => {
  try {
    const review = await models.t_review.create({
      commenter: req.body.id,
      review_title: req.body.review,
      review_description: req.body.description,
      star_grade: req.body.starGrade,
    })
    res.json({
      success: true,
      review,
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
})

// [ 특정 유저가 쓴 리뷰 조회 ]
router.get('/:id/reviews', async (req, res) => {
  try {
    const reviews = await models.t_review.findAll({
      where: { commenter: req.params.id },
      // include: {
      //   model: User,
      //   where: { id: req.params.id },
      // }
    })
    res.json({
      success: true,
      reviews,
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
})

// [ 리뷰 전체 조회 ]
router.get('/reviews', async (req, res) => {
  try {
    const reviews = await models.t_review.findAll()
    res.json({
      success: true,
      reviews
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
})

// [ 특정 리뷰 삭제 ]
router.delete('/review/:id', async (req, res) => {
  try {
    const result = await models.t_review.destroy({
      where: {
        id: req.params.id
      }
    })
    res.json({
      success: true,
      result
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
})


// 유저가 사용한 포인트 반영
router.post('/userpoint', async (req, res) => {
  try {
    // console.log(req.body)
    models.t_user.findAll({
      where: {
        id: req.body.user_id
      },
      attributes: ['user_point_money'],
    })
      .then((user) => {
        if (user[0].dataValues.user_point_money - req.body.used_point < 0) {
          res.status(500).json({
            success: false,
            message: "알 수 없는 에러"
          })
        }
        models.t_user.update({
          user_point_money: user[0].dataValues.user_point_money - req.body.used_point
        }, {
          where: { id: req.body.user_id }
        })

      })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
})

// 리뷰작성시 포인트 지급
router.post('/user/reviewpoint', async (req, res) => {
  try {
    // console.log(req.body)
    models.t_user.findAll({
      where: {
        id: req.body.user_id
      },
      attributes: ['user_point_money'],
    })
    .then((user) => {
      models.t_user.update({
        user_point_money: user[0].dataValues.user_point_money + req.body.point
      }, {
        where: { id: req.body.user_id }
      })

    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
})

module.exports = router