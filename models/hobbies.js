module.exports = function(sequelize, DataTypes) {
    var Hobbies = sequelize.define("Hobbies", {
      hobbies: DataTypes.STRING
    });

    Hobbies.associate = function (models) {
        Hobbies.hasMany(models.Surveys, {
            onDelete: "cascade"
        });
    };

    return Hobbies;
  };