const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return t_seller.init(sequelize, DataTypes);
}

class t_seller extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    seller_name: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    phone_number: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    seller_email: {
      type: DataTypes.STRING(1024),
      allowNull: false,
      unique: "seller_email"
    },
    seller_password: {
      type: DataTypes.STRING(1024),
      allowNull: false
    },   
  }, {
    sequelize,
    tableName: 't_seller',
    timestamps: true,
    paranoid: true,
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
        name: "seller_email",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "seller_email" },
        ]
      },
    ]
  });
  return t_seller;
  }
}