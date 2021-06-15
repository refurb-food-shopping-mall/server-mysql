const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return t_review_image.init(sequelize, DataTypes);
}

class t_review_image extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    review_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 't_review',
        key: 'id'
      }
    },
    product_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 't_product',
        key: 'id'
      }
    },
    path: {
      type: DataTypes.STRING(150),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 't_review_image',
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
        name: "FK_t_review_image_t_product",
        using: "BTREE",
        fields: [
          { name: "product_id" },
        ]
      },
      {
        name: "FK_t_review_image_t_review",
        using: "BTREE",
        fields: [
          { name: "review_id" },
        ]
      },
    ]
  });
  return t_review_image;
  }
}
