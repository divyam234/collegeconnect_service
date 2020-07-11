'use strict';
module.exports = (sequelize, DataTypes) => {
  const notice = sequelize.define('notice', {
    noticeId:{
      allowNull: false,
      type:DataTypes.STRING,
      primaryKey: true,
    },
    subject: DataTypes.STRING,
    composedMessage: DataTypes.STRING
  }, {});
  notice.associate = function(models) {
    // associations can be defined here
    notice.belongsTo(models.professor,{
        foreignKey:'professorId',
        sourceKey:'professorId'
    })
    notice.hasMany(models.attachment,{
      foreignKey:'noticeId',
      sourceKey:'noticeId'
    })
    notice.hasMany(models.noticeto,{
      foreignKey:'noticeId',
      sourceKey:'noticeId'
    })
  };
  return notice;
};