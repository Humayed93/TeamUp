module.exports = (sequelize, DataType) => {
    const ProjectSkills = sequelize.define("ProjectSkills", {
        skill_title: {
            type: DataType.STRING,
            references: {
                model: "Skills",
                key: "title"
            }
        },
        project_id: {
            type: DataType.INTEGER,
            references: {
                model: "Projects",
                key: "id"
            }
        }
    }, {
        classMethods: {
            associate: (models) => {}
        }
    });
    return ProjectSkills;
};
