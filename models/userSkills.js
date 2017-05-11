module.exports = (sequelize, DataType) => {
    const UserSkills = sequelize.define("UserSkills", {
        skill_title: {
            type: DataType.STRING,
            references: {
                model: "Skills",
                key: "title"
            }
        },
        user_id: {
            type: DataType.INTEGER,
            references: {
                model: "Users",
                key: "id"
            },
            unique: true
        },
    }, {
        classMethods: {
            associate: (models) => {}
        }
    });
    return UserSkills;
};
