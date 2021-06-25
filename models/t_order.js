const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return t_order.init(sequelize, DataTypes);
}

class t_order extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 't_user',
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
    address_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 't_address',
        key: 'id'
      }
    },
    expected_del_day: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    del_complete_day: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    product_amount: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    order_status: {
      type: DataTypes.STRING(30),
      allowNull: false,
      comment: "입금대기, 배송준비중, 배송중, 배송완료, 반품완료"
    },
    ordered_day: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp')
    },
    del_requirement: {
      type: DataTypes.STRING(300),
      allowNull: false
    },
    used_point: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    patment_method: {
      type: DataTypes.STRING(30),
      allowNull: false,
      comment: "카카오페이, 가상계좌, 신용 / 체크 카드, 계좌이체"
    }
  }, {
    sequelize,
    tableName: 't_order',
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
        name: "FK_t_order_t_user",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "FK_t_order_t_product",
        using: "BTREE",
        fields: [
          { name: "product_id" },
        ]
      },
      {
        name: "FK_t_order_t_address",
        using: "BTREE",
        fields: [
          { name: "address_id" },
        ]
      },
    ]
  });
  return t_order;
  }
}
