'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('messages', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
      },
      message: {
        allowNull: true,
        type: Sequelize.DataTypes.TEXT,
      },
      ravenId: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
      },
      locationId: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
      },
      reading: {
        allowNull: false,
        type: Sequelize.DataTypes.BOOLEAN,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('messages');
  },
};
