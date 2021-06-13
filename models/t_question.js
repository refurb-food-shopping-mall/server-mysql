const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return t_question.init(sequelize, DataTypes);
}

class t_question extends Sequelize.Model {
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
    q_title: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    q_description: {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    q_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp')
    },
    answer_status: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      comment: "1-처리중, 2-답변 완료"
    },
    q_type: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      comment: "1-배송관련, 2-상품관련, 3-기타"
    }
  }, {
    sequelize,
    tableName: 't_question',
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
        name: "FK_t_question_t_user",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "FK_t_question_t_product",
        using: "BTREE",
        fields: [
          { name: "product_id" },
        ]
      },
    ]
  });
  return t_question;
  }
}
