const Sequelize = require('sequelize');
// const bcrypt = require('bcrypt');

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
        type: Sequelize.STRING(320),
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
      hooks: {
        beforeCreate: (user, options) => {
          // way 1
          // if (user.user_password) {
          //   bcrypt.genSalt(10, function(err, salt) {
          //     bcrypt.hash(user.user_password, salt, function(err, hash) {
          //         // Store hash in your password DB.
          //       user.user_password = hash
          //       console.log(hash)
          //     });
          //   });
          // }
          // way 2
          // const salt = bcrypt.genSaltSync(10);
          // user.user_password = bcrypt.hashSync(user.user_password, salt);
        },
      },
    });
  }

  static associate(db) {
    db.User.hasMany(db.Review, { foreignKey: 'commenter', sourceKey: 'id' });
  }
};