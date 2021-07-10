const router = require('express').Router()
const { model } = require('mongoose');
//const verifyToken = require('../middlewares/verify-token')
const { sequelize, Review } = require('../models');
const  initModels  =  require ( "../models/init-models" );
const t_product_image = require('../models/t_product_image');
const t_user = require('../models/t_user');

const  models  =  initModels ( sequelize );

var multer  = require('multer')
var upload = multer({ dest: 'images/' })



router.get('/review/:id', async (req, res) => {
    try {
        const review = await models.t_review.findAll({
        where : {product_id : req.params.id},
        include: [{
            as : 't_review_images', 
            model: models.t_review_image,
            attributes: ['path'],
            where: {
                product_id : req.params.id,
            },            
        },
        {
            as : 'user',
            model: models.t_user,
            attributes: ['user_name']
        }]
    });
        res.json({
            review
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
});

router.post('/review/save', async (req, res) => {   
    console.log(req.body)
    try {     
        let review = await models.t_review.create({ 
            product_id : req.body.product_id,
            user_id : req.body.user_id,
            review_title : req.body.review_title,
            review_description : req.body.review_description, 
            star_grade : req.body.star_grade 
        });
        console.log(review.dataValues.id);
        res.json({
            success: true,
            review_id : review.dataValues.id
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

router.post('/reviewimage/save', upload.single('image'), async (req, res) => {
     console.log(req.file)
     console.log(req.body)
    await models.t_review_image.create({
        review_id : req.body.review_id,
        product_id : req.body.product_id,
        path : req.file.path

    })
})



module.exports = router
