const Sequelize = require('sequelize');

module.exports = class Review extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      review_title: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      review_description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      star_grade: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    }, {
      sequelize,
      timestamps: true,
      underscored: true,
      modelName: 'Review',
      tableName: 'reviews',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
    db.Review.belongsTo(db.User, { foreignKey: 'commenter', targetKey: 'id' });
  }
};