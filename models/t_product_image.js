const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return t_product_image.init(sequelize, DataTypes);
}

class t_product_image extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    product_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 't_product',
        key: 'id'
      }
    },
    type_image: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      comment: "1-썸네일, 2-제품이미지, 3-제품설명이미지"
    },
    path: {
      type: DataTypes.STRING(150),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 't_product_image',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "FK_t_product_image_t_product",
        using: "BTREE",
        fields: [
          { name: "product_id" },
        ]
      },
    ]
  });
  return t_product_image;
  }
}
