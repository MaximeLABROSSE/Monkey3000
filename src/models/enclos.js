module.exports = (sequelize, DataTypes) => {
    var Enclos = sequelize.define('Enclos', {
      name : DataTypes.STRING,
	  NbreSinge : DataTypes.INTEGER,
	  ContenanceMax : DataTypes.INTEGER                     
	  
    });
	
	Enclos.associate = function(models) {
          Enclos.hasMany(models.Singe, {
               foreignKey: 'Enclos_ID2',

            });
		};
  
    return Enclos;
  };