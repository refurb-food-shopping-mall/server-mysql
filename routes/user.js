const router = require('express').Router()
const { sequelize } = require('../models');
const initModels = require("../models/init-models");
const models = initModels(sequelize);
const verifyToken = require('../middlewares/verify-token')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// API get user profile 
router.get('/userprofile', verifyToken, (req, res) => {
  try {
    const { user_name, user_email, phone_number } = req.decode
    res.json({
      success: true,
      userInfo: {
        user_name,
        user_email,
        phone_number
      }
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
})

// API update user profile 
router.put('/profileupdate', verifyToken, async (req, res) => {
  // TODO strength validation needed 

  if (req.body.newPassword !== req.body.confirmPassword) {
    res.status(403).json({
      success: false,
      message: "비밀번호가 일치하지 않습니다."
    })
  }


  // ..validation logic section
  try {
    const newUserData = req.body
    const userID = req.decode.id

    // token 추출을 통한 id값으로 user 조회
    const preUserInfo = await models.t_user.findOne({
      where: {
        id: userID
      }
    })

    const hashedPassword = await bcrypt.hash(req.body.newPassword.trim(), 12)
    console.log(hashedPassword)
    // 새로운 user 정보로 db table update
    preUserInfo.user_name = newUserData.userName
    preUserInfo.user_password = hashedPassword
    preUserInfo.phone_number = newUserData.userPhoneNumber

    await preUserInfo.save()

    // 변경된 user 정보 조회
    const changedUserData = await models.t_user.findOne({
      where: {
        id: userID
      }
    })

    const tokenData = jwt.sign(changedUserData.toJSON(), process.env.SECRET, {
      expiresIn: '1h'
    })

    // 응답으로 보낼 유저 객체 조립
    newUserInfo = {}
    newUserInfo.userName = changedUserData.user_name
    newUserInfo.userEmail = changedUserData.user_email
    newUserInfo.userPhoneNumber = changedUserData.phone_number
    newUserInfo.userPointMoney = changedUserData.user_point_money

    res.json({
      success: true,
      newUserInfo,
      tokenData
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
})

// API delete account 
router.delete('/deleteaccount', verifyToken, async (req, res) => {
  try {
    const user = await models.t_user.findOne({
      where: {
        id: req.decode.id
      }
    })

    await user.destroy()

    res.json({
      success: true,
      message: '유저 삭제 완료'
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
})

// [ 특정 user 조회 ]
router.get('/userinfo', verifyToken, async (req, res) => {
  // verify-token 미들웨어에서 token 을 확인하면 req.decode에 유저 정보를 넣어줌.
  // token을 확인하지 못하면 api 접근 불가.
  try {
    // req.decode 확인 =>
    // console.log(req.decode)
    const user = await models.t_user.findOne({
      where: {
        id: req.decode.id
      }
    })
    // console.log(user)

    res.json({
      success: true,
      user: user.dataValues,
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
})

module.exports = router