const router = require('express').Router()
const Review = require('../models/review')
const User = require('../models/user')
const verifyToken = require('../middlewares/verify-token')

const { sequelize } = require('../models');
const initModels = require("../models/init-models");
const models = initModels(sequelize);

// [ 특정 user 조회 ]
router.get('/auth/user', verifyToken, async (req, res) => {
  try {
    // verify-token 미들웨어에서 token 을 확인하면 req.decode에 유저 정보를 넣어줌.
    // token을 확인하지 못하면 api 접근 불가.

    // req.decode 확인 =>
    //  console.log(req.decode)
    console.log('hi')
    const user = await User.findOne({ _id: req.decode._id })

    res.json({
      success: true,
      user,
    })

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
})

// [ user 전체 조회 ]
router.get('/user', async (req, res) => {
  try {
    const users = await User.findAll()
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
    const user = await User.create({
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
    const review = await Review.create({
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
    const reviews = await Review.findAll({
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
    const reviews = await Review.findAll()
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
    const result = await Review.destroy({
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
          where : {
              id : req.body.user_id
          },
          attributes: ['user_point_money'],
      })
      .then((user) => {
          if(user[0].dataValues.user_point_money - req.body.used_point < 0){
              res.status(500).json({
                  success: false,
                  message: "알 수 없는 에러"
                })
          }
          models.t_user.update({
              user_point_money : user[0].dataValues.user_point_money - req.body.used_point
          }, {
              where : { id : req.body.user_id }
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