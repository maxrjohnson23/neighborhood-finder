module.exports = function(sequelize, DataTypes) {
    var Surveys = sequelize.define("Surveys", {
      Street: DataTypes.STRING,
      City: DataTypes.STRING,
      State: DataTypes.STRING,
      Zip: DataTypes.INTEGER,
      Age: DataTypes.STRING,
      Industry: DataTypes.STRING,
      Income: DataTypes.STRING,
      Education: DataTypes.STRING,
      Children: DataTypes.STRING,
      Pets: DataTypes.STRING,
      Relationship_Status: DataTypes.STRING,
      Car: DataTypes.STRING,
      Address: DataTypes.STRING,
      Neighborhood: DataTypes.STRING,
      geocodeLat: DataTypes.DECIMAL(9,6),
      geocodeLng: DataTypes.DECIMAL(9,6)
    });

    Surveys.associate = (models) => {
        Surveys.belongsToMany(models.Hobbies, {
            through: "SurveyHobbies"
        });
        Surveys.belongsToMany(models.Social, {
            through: "SurveySocial"
        });
    };

    return Surveys;
  };
  