const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      user_name: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      phone_number: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      user_email: {
        type: Sequelize.STRING(20),
        unique: true,
        allowNull: false,
      },
      user_password: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      user_point_money: {
        type: Sequelize.INTEGER,
        allowNull: false,
      }
    }, {
      sequelize,
      timestamps: true,
      underscored: true,
      modelName: 'User',
      tableName: 'users',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
    db.User.hasMany(db.Review, { foreignKey: 'commenter', sourceKey: 'id' });
  }
};