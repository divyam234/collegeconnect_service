'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'students',
        'deviceToken',
        {
          type: Sequelize.STRING,
          defaultValue:null
        }
      ),
      queryInterface.addColumn(
        'professors',
        'deviceToken',
        {
          type: Sequelize.STRING,
          defaultValue:null
        }
      ),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('students', 'deviceToken'),
      queryInterface.removeColumn('deviceToken', 'deviceToken')
    ]);
  }
};
