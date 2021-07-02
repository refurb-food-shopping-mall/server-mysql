const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return t_product.init(sequelize, DataTypes);
}

class t_product extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    seller_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      defaultValue: 0,
      references: {
        model: 't_seller',
        key: 'id'
      }
    },
    product_category: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      comment: "1-야채, 2-과일, 3-기타"
    },
    product_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    product_price: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    delivery_price: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    add_delivery_price: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    total_product: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      comment: "판매가능한 상품 총량"
    },
    created_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp')
    },
    average_star_grade: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      comment: "별점 평균"
    },
    acknowledged_product: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      comment: "0-판매가 승인되지 않은 상품, 1-판매 승인된 상품"
    }
  }, {
    sequelize,
    tableName: 't_product',
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
        name: "FK_t_product_t_seller",
        using: "BTREE",
        fields: [
          { name: "seller_id" },
        ]
      },
    ]
  });
  return t_product;
  }
}
