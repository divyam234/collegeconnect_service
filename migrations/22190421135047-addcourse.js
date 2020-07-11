'use strict';

module.exports = {
  up:(queryInterface, Sequelize) => {
    return queryInterface.addColumn(
        'students',
        'course',
        {
          type: Sequelize.STRING,
          defaultValue:'btech'
        }
      )
  },

  down: async (queryInterface, Sequelize) => {
    return 
      queryInterface.removeColumn('students', 'course')
  }
};
