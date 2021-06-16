const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return t_user_bussiness_type.init(sequelize, DataTypes);
}

class t_user_bussiness_type extends Sequelize.Model {
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
    bussiness_type: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        comment: "1-한식, 2-일식, 3-중식, 4-서양식" 
    }
  }, {
    sequelize,
    tableName: 't_user_bussiness_type',
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
        name: "FK_t_user_bussiness_type_t_user",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
  return t_user_bussiness_type;
  }
}