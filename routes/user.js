const router = require('express').Router()
const { sequelize } = require('../models');
const initModels = require("../models/init-models");
const models = initModels(sequelize);
const verifyToken = require('../middlewares/verify-token')
const bcrypt = require('bcryptjs')

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

    // 응답으로 보낼 유저 객체 조립
    newUserInfo = {}
    newUserInfo.userName = changedUserData.user_name
    newUserInfo.userEmail = changedUserData.user_email
    newUserInfo.userPhoneNumber = changedUserData.phone_number
    newUserInfo.userPointMoney = changedUserData.user_point_money

    res.json({
      success: true,
      newUserInfo,
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
})

module.exports = router