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
            },
            unique: true
        }
    }, {
        classMethods: {
            associate: (models) => {
            }
        }
    });
    return Skills;
};
