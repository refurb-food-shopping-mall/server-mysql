const router = require('express').Router()
//const verifyToken = require('../middlewares/verify-token')
const { sequelize } = require('../models');
const initModels = require("../models/init-models");
const t_product_image = require('../models/t_product_image');

const models = initModels(sequelize);


// [[ 상품 정보와 썸네일이미지 조회 ]]
router.post('/product/thumnail', async (req, res) => {
    let res_array = [];
    for (let i = 0; i < req.body.productarray.length; i++) {
        let product = await models.t_product.findAll({
            where: {
                id: req.body.productarray[i]
            },
            include: [{
                as: 't_product_images',
                model: models.t_product_image,
                attributes: ['path'],
                where: {
                    product_id: req.body.productarray[i],
                    type_image: 1
                }
            }]
        })
        //console.log(product[0].dataValues);
        //console.log(product[0].dataValues.t_product_images[0].dataValues);
        res_array.push(product[0].dataValues);
        // console.log(res_array);
    }
    //console.log(res_array);
    res.send(res_array);
});


// API - get All Products with product image 
router.get('/product', async (req, res) => {
    try {
        const allProduct = await models.t_product.findAll({
            include: [{
                as: 't_product_images',
                model: models.t_product_image,
                attributes: ['path'],
                where: {
                    type_image: 1
                }
            }]
        })
        res.status(201).json(allProduct)
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

// API - post single product 
router.post('/product', async (req, res) => {
    try {
        const newProduct = await models.t_product.create({
            seller_id: req.body.sellerID,
            product_category: req.body.productCategory,
            product_name: req.body.productName,
            product_price: req.body.productPrice,
            delivery_price: req.body.productDeliveryPrice,
            add_delivery_price: req.body.addDeliveryPrice,
            total_product: req.body.totalProduct,
            average_star_grade: req.body.averageStarGrade,
            acknowledged_product: req.body.acknowledgedProduct,
        })
        res.status(201).json(newProduct)
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

// 특정 제품의 정보 + 썸네일 이미지들 요청
router.get('/product/:id', async (req, res) => {
    try {
      const product_info = await models.t_product.findOne({where : {id : req.params.id},
    include: [{
        as: 't_product_images',
        model: models.t_product_image,
        attributes: ['path'],
        where: {
            product_id: req.params.id,
            type_image: 2
        }
        
    }]})
      res.json({
        
        product_info

      })

        // const product_info = await models.t_product.findOne({
        //     include: [{
        //         as: 't_product_images',
        //         model: models.t_product_image,
        //         attributes: ['path'],
        //         where: {
        //             type_image: 2
        //         }
        //     }],
        //     where: {
        //         id: req.params.id
        //     }
        // })
        // res.json({
        //     product_info
        // })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }

  });

router.post('/product/productname', async (req, res) => {
    try {
        product_name = await models.t_product.findAll({
            where : {
                id : req.body.product_id
            },
            attributes : ['product_name']
        })
        // console.log(product_name)
        res.json({
            success : true,
            product_name : product_name[0].dataValues.product_name
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
    

})


module.exports = router

// });


