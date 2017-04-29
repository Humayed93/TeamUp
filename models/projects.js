module.exports = (sequelize, DataType) => {
    const Projects = sequelize.define('Projects', {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        description: {
            type: DataType.TEXT,
            allowNull: false
        },
        deadline: {
            type: DataType.DATE,
            allowNull: false
        }
    }, {
        classMethods: {
            associate: (models) => {
            }
        }
    });
    return Projects;
};
