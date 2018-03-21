module.exports = function (sequelize, DataTypes) {
    const Hobbies = sequelize.define("Hobbies", {
        name: DataTypes.STRING
    });

    Hobbies.associate = (models) => {

        Hobbies.belongsToMany(models.Surveys, {
            through: "SurveyHobbies"
        });
    };

    return Hobbies;
};