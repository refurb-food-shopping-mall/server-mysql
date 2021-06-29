const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return t_address.init(sequelize, DataTypes);
}

class t_address extends Sequelize.Model {
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
    receiver: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    address_name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    post_code: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    city: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    road_name: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    detailed_address: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    phonenumber: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    address_list: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      comment: "1-배송지목록의배송지, 0-임시배송지"
    },
    default_address: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      comment: "1-기본배송지, 0-그외"
    }
  }, {
    sequelize,
    tableName: 't_address',
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
        name: "FK_t_address_t_user",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
  return t_address;
  }
}
