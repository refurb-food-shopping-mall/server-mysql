const router = require('express').Router()
const { sequelize } = require('../models');
const initModels = require("../models/init-models");
const models = initModels(sequelize);
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// API sign-up 
router.post('/auth/signup', async (req, res) => {
  // TODO strength validation needed 
  if (!req.body.userEmail || !req.body.userPassword || !req.body.userName || !req.body.userPhoneNumber) {
    res.status(403).json({
      success: false,
      message: "폼의 모든 부분을 작성해주세요."
    })
  }
  if (req.body.userPassword !== req.body.confirmPassword) {
    res.status(403).json({
      success: false,
      message: "비밀번호가 일치하지 않습니다."
    })
  }
  // ... validate ....
  try {
    const isUserAlreadyExist = await models.t_user.findOne({
      where: {
        user_email: req.body.userEmail
      }
    })

    if (isUserAlreadyExist) {
      res.status(403).json({
        success: false,
        message: "이미 등록된 이메일 계정입니다. 다른 이메일을 선택해주세요."
      })
    }

    const hashedPassword = await bcrypt.hash(req.body.userPassword.trim(), 12)

    if (hashedPassword) {
      const newUser = await models.t_user.create({
        user_name: req.body.userName,
        phone_number: req.body.userPhoneNumber,
        user_email: req.body.userEmail,
        user_password: hashedPassword,
        user_point_money: 0
      })

      const tokenData = jwt.sign(newUser.toJSON(), process.env.SECRET, {
        expiresIn: '1h'
      })

      const userData = {
        userName: req.body.userName,
        userPhoneNumber: req.body.userPhoneNumber,
        userEmail: req.body.userEmail,
        userPointMoney: req.body.userPointMoney
      }

      res.json({
        success: true,
        userData,
        tokenData,
      })
    } else {
      res.status(500).json({
        success: false,
        message: "암호화 실패"
      })
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
})

// API login 
router.post('/auth/login', async (req, res) => {
  // TODO strength validation needed 
  try {
    if (req.body.userPassword === '' || req.body.userEmail === '') {
      res.status(403).json({
        success: false,
        message: "아이디나 패스워드가 입력되지 않았습니다."
      })
    }

    const foundUser = await models.t_user.findOne({
      where: {
        user_email: req.body.userEmail
      }
    })

    if (!foundUser) {
      res.status(403).json({
        success: false,
        message: "인증 실패, 존재하지 않는 유저입니다."
      })
    } else {
      const isValidUser = await bcrypt.compare(req.body.userPassword, foundUser.user_password)

      if (isValidUser) {
        const tokenData = jwt.sign(foundUser.toJSON(), process.env.SECRET, {
          expiresIn: '1h'
        })

        const userData = {
          userName: foundUser.user_name,
          userPhoneNumber: foundUser.phone_number,
          userEmail: foundUser.user_email,
          userPointMoney: foundUser.user_point_money
        }

        res.json({
          success: true,
          userData,
          tokenData,
        })
      } else {
        res.status(403).json({
          success: false,
          message: "인증 실패, 비밀번호가 틀렸습니다."
        })
      }
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
})

// API get user profile 
router.get('/auth/userprofile', (req, res) => {
  try {
    res.json({
      success: true,
      result: req.decode
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
})


module.exports = router