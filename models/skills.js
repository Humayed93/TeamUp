module.exports = (sequelize, DataType) => {
    const Skills = sequelize.define("Skills", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    }, {
        classMethods: {
            associate: (models) => {
                Skills.belongsToMany(models.Users, {through: 'UserSkills'});
            }
        }
    });
    return Skills;
};
