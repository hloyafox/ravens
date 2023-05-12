'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('ravens', 'isWhite', {
      allowNull: false,
      type: Sequelize.DataTypes.BOOLEAN,
    });

    await queryInterface.addColumn('ravens', 'weight', {
      allowNull: false,
      type: Sequelize.DataTypes.INTEGER,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('ravens', 'isWhite');
    await queryInterface.removeColumn('ravens', 'weight');
  },
};
