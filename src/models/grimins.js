module.exports = (sequelize, DataTypes) => {
    var grimelins = sequelize.define('grimelins', {
      name: DataTypes.STRING,
	
    });
  
    return grimelins;
  };