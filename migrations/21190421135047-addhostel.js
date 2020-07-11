'use strict';

module.exports = {
  up:(queryInterface, Sequelize) => {
    return queryInterface.addColumn(
        'students',
        'hostel',
        {
          type: Sequelize.STRING,
          defaultValue:null
        }
      )
  },

  down: async (queryInterface, Sequelize) => {
    return 
      queryInterface.removeColumn('students', 'hostel')
  }
};
