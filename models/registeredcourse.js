'use strict';
module.exports = (sequelize, DataTypes) => {
  const registeredcourse = sequelize.define('registeredcourse', {
    batchId: {
       allowNull: false,
       primaryKey: true,
       type:DataTypes.STRING
    },
    semester: {
       allowNull: false,
       primaryKey: true,
       type:DataTypes.STRING
    },
    classcode: {
       allowNull: false,
       primaryKey: true,
       type:DataTypes.STRING
    },
    professorId: DataTypes.STRING,
    course:DataTypes.STRING,
    classTitle:DataTypes.STRING
  }, {});
  registeredcourse.associate = function(models) {
     registeredcourse.belongsTo(models.professor,{
        foreignKey :'professorId',
        sourceKey: 'professorId'
    })
  }
  return registeredcourse;
};