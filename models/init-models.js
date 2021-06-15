var DataTypes = require("sequelize").DataTypes;
var _t_address = require("./t_address");
var _t_order = require("./t_order");
var _t_product = require("./t_product");
var _t_product_image = require("./t_product_image");
var _t_question = require("./t_question");
var _t_review = require("./t_review");
var _t_review_image = require("./t_review_image");
var _t_user = require("./t_user");

function initModels(sequelize) {
  var t_address = _t_address(sequelize, DataTypes);
  var t_order = _t_order(sequelize, DataTypes);
  var t_product = _t_product(sequelize, DataTypes);
  var t_product_image = _t_product_image(sequelize, DataTypes);
  var t_question = _t_question(sequelize, DataTypes);
  var t_review = _t_review(sequelize, DataTypes);
  var t_review_image = _t_review_image(sequelize, DataTypes);
  var t_user = _t_user(sequelize, DataTypes);

  t_order.belongsTo(t_address, { as: "address", foreignKey: "address_id"});
  t_address.hasMany(t_order, { as: "t_orders", foreignKey: "address_id"});
  t_order.belongsTo(t_product, { as: "product", foreignKey: "product_id"});
  t_product.hasMany(t_order, { as: "t_orders", foreignKey: "product_id"});

  t_product_image.belongsTo(t_product, { as: "product", foreignKey: "product_id"});
  t_product.hasMany(t_product_image, { as: "t_product_images", foreignKey: "product_id"});

  t_question.belongsTo(t_product, { as: "product", foreignKey: "product_id"});
  t_product.hasMany(t_question, { as: "t_questions", foreignKey: "product_id"});
  t_review.belongsTo(t_product, { as: "product", foreignKey: "product_id"});
  t_product.hasMany(t_review, { as: "t_reviews", foreignKey: "product_id"});

  t_review_image.belongsTo(t_review, { as: "review", foreignKey: "review_id"});
  t_review.hasMany(t_review_image, { as: "t_review_images", foreignKey: "review_id"});

  t_review_image.belongsTo(t_product, { as: "product", foreignKey: "product_id"});
  t_product.hasMany(t_review_image, { as: "t_review_images", foreignKey: "product_id"});

  t_address.belongsTo(t_user, { as: "user", foreignKey: "user_id"});
  t_user.hasMany(t_address, { as: "t_addresses", foreignKey: "user_id"});
  t_order.belongsTo(t_user, { as: "user", foreignKey: "user_id"});
  t_user.hasMany(t_order, { as: "t_orders", foreignKey: "user_id"});
  t_product.belongsTo(t_user, { as: "register_user", foreignKey: "register_user_id"});
  t_user.hasMany(t_product, { as: "t_products", foreignKey: "register_user_id"});
  t_question.belongsTo(t_user, { as: "user", foreignKey: "user_id"});
  t_user.hasMany(t_question, { as: "t_questions", foreignKey: "user_id"});
  t_review.belongsTo(t_user, { as: "user", foreignKey: "user_id"});
  t_user.hasMany(t_review, { as: "t_reviews", foreignKey: "user_id"});

  return {
    t_address,
    t_order,
    t_product,
    t_product_image,
    t_question,
    t_review,
    t_review_image,
    t_user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
