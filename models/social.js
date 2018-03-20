module.exports = function(sequelize, DataTypes) {
    var Social = sequelize.define("Socialites", {
      socials: DataTypes.STRING
    });

    Social.associate = function (models) {
        Social.hasMany(models.Surveys, {
            onDelete: "cascade"
        });
    };

    return Social;
  };