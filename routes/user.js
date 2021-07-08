const router = require('express').Router()
// const { sequelize } = require('../models');
// const initModels = require("../models/init-models");
// const models = initModels(sequelize);
const verifyToken = require('../middlewares/verify-token')

// API get user profile 
router.get('/userprofile', verifyToken, (req, res) => {
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