const router = require('express').Router()
//const verifyToken = require('../middlewares/verify-token')
const { sequelize } = require('../models');
const  initModels  =  require ( "../models/init-models" );
const t_product_image = require('../models/t_product_image');

const  models  =  initModels ( sequelize );

// [[ 상품 정보와 썸네일이미지 조회 ]]
router.post('/product/thumnail', async (req, res) => {
    let res_array = [];
    for(let i = 0 ; i < req.body.productarray.length ; i++){
        let product =  await models.t_product.findAll({
                            where : {
                                id : req.body.productarray[i].product_id
                            },
                            include: [{
                                as : 't_product_images',
                                model: models.t_product_image,
                                attributes: ['path'],
                                where: {
                                    product_id : req.body.productarray[i].product_id,
                                    type_image : 1
                                }
                            }]
                       })
        //console.log(product[0].dataValues);
        //console.log(product[0].dataValues.t_product_images[0].dataValues);
        product[0].dataValues.product_count = req.body.productarray[i].prodcut_count;
        res_array.push(product[0].dataValues);
    }
    //console.log(res_array);
    res.send(res_array);
    
});


//제품 상세페이지_상단 제품 기본 정보
router.get('/product/:id', async (req, res) => {
    try {
      const product_info = await models.t_product.findOne({where : {id : req.params.id}})
      res.json({
        
        product_info

      })
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message
      })
    }
  });


module.exports = router