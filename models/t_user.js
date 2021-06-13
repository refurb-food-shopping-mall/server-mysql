const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return t_user.init(sequelize, DataTypes);
}

class t_user extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    user_name: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    phone_number: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    user_email: {
      type: DataTypes.STRING(40),
      allowNull: false,
      unique: "user_email"
    },
    user_password: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    type_business: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    user_point_money: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 't_user',
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
        name: "user_email",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "user_email" },
        ]
      },
    ]
  });
  return t_user;
  }
}
