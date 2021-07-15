const router = require('express').Router()
const { model } = require('mongoose');
//const verifyToken = require('../middlewares/verify-token')
const { sequelize, Review } = require('../models');
const  initModels  =  require ( "../models/init-models" );
const t_product_image = require('../models/t_product_image');
const t_user = require('../models/t_user');
const  models  =  initModels ( sequelize );

const multer  = require('multer')
const sharp = require('sharp')
const fs = require('fs')

// 이미지 저장위치와 파일명
const imagestorage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, './images')
    },
    filename : (req, file, cb) => {
        cb(null, Date.now() + "__" + file.originalname)
    }
})
const upload = multer({ storage : imagestorage})



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

//리뷰 저장
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

// 리뷰이미지 저장 
router.post('/reviewimage/save', upload.single('image'), async (req, res) => {
    //  console.log(req.file)
    //  console.log(req.body)
    try {
        await models.t_review_image.create({
            review_id : req.body.review_id,
            product_id : req.body.product_id,
            path : req.file.path
        })
        // console.log(req.file.path);
        sharp(req.file.path)	// 리사이징할 파일의 경로
        .resize(120, 120, {
            fit: sharp.fit.inside,
            withoutEnlargement: true
        })
        .withMetadata()
        .toFile(`./public/images/${req.file.filename}`, (err, info)=>{
            if(err) {
                console.log(err);
            }              
            // console.log(`info : ${info}`)
            fs.unlink(`./images/${req.file.filename}`, (err)=>{	
              if(err) {
                  console.log(err);
              }				            
            })                  
    	})
        res.json({
            success : true
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }  
})

// 리뷰이미지 라우터 예제
// router.post('/review/image', async (req, res) => {
//     console.log(req.body)
//     let image = await models.t_review_image.findAll({
//         where : {
//             review_id : req.body.review_id
//         },
//         attributes: ['path']
//     })
//     console.log(image)
//     const imgUrl = "http://localhost:3000/" 
//     result = imgUrl+`${image[0].dataValues.path}` //imgUrl+"kitty.png" 
//     res.json({
//         success : true,
//         result
//     })
// })




module.exports = router
