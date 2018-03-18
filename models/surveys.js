module.exports = function(sequelize, DataTypes) {
    var Surveys = sequelize.define("Surveys", {
      Age: DataTypes.STRING,
      Hobbies: DataTypes.STRING,
      Industry: DataTypes.STRING,
      Income: DataTypes.STRING,
      Education: DataTypes.STRING,
      Children: DataTypes.STRING,
      Pets: DataTypes.STRING,
      Relationship_Status: DataTypes.STRING,
      Car: DataTypes.STRING,
      Social: DataTypes.STRING,
      Lifestyle: DataTypes.STRING
    });
    return Surveys;
  };
  