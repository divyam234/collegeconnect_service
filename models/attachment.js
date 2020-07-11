'use strict';
module.exports = (sequelize, DataTypes) => {
  const attachment = sequelize.define('attachment', {
  	attachmentId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
    attachmentPath: DataTypes.STRING,
    fileName: DataTypes.STRING,
    fileSize: DataTypes.STRING
  }, {});
  attachment.associate = function(models) {
    // associations can be defined here
    attachment.belongsTo(models.notice,{
        foreignKey:'noticeId',
        sourceKey:'noticeId'
    })
  };
  return attachment;
};