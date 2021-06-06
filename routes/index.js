const router = require('express').Router()
const Review = require('../models/review')
const User = require('../models/user')

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

module.exports = router