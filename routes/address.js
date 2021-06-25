const router = require('express').Router()
const { sequelize } = require('../models');
const  initModels  =  require ( "../models/init-models" );

const  models  =  initModels ( sequelize );



module.exports = router