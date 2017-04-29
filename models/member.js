module.exports = (sequelize, DataType) => {
    const Members = sequelize.define("Members", {
        member_id: {
            type: DataType.INTEGER,
            primaryKey: true,
            references: {
                model: "Users",
                key: "id"
            }
        },
        project_id: {
            type: DataType.INTEGER,
            primaryKey: true,
            references: {
                model: "Projects",
                key: "id"
            }
        },
        states: {
            type: DataType.ENUM,
            values: ['ACTIVE', 'PENDING', 'REJECTED'],
            defaultValue: 'PENDING'
        }
    }, {
        classMethods: {
            associate: (models) => {

            }
        }
    });
    return Members;
};
