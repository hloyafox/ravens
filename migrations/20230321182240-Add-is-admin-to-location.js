'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('locations', 'isAdmin', {
      allowNull: false,
      type: Sequelize.DataTypes.BOOLEAN,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('locations', 'isAdmin');
  },
};
