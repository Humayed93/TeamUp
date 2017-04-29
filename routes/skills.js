module.exports = app => {
    const Skills = app.db.models.Skills;
    const UserSkills = app.db.models.UserSkills;
    const ProjectSkills = app.db.models.ProjectSkills;

    app.route("/api/skills")
        .get((req, res) => {
            Skills.findAll()
                .then(result => {
                    if (result) {
                        res.json(result);
                    } else {
                        res.sendStatus(404);
                    }
                })
                .catch(error => {
                    res.status(412).json({msg: error.message});
                });
        });

    app.route("/api/users/:id/skills")
        .get((req, res) => {
            UserSkills.findAll({
                where: {
                    user_id: req.params.id
                }
            })
                .then(result => {
                    if (result) {
                        res.json(result);
                    } else {
                        res.sendStatus(404);
                    }
                })
                .catch(error => {
                    res.status(412).json({msg: error.message});
                });
        });

    app.route("/api/user/skills")
        .all(app.auth.authenticate())

        .get((req, res) => {
            UserSkills.findAll({
                where: {
                    user_id: req.user.id
                }
            })
                .then(result => {
                    if (result) {
                        res.json(result);
                    } else {
                        res.sendStatus(404);
                    }
                })
                .catch(error => {
                    res.status(412).json({msg: error.message});
                });
        })

        .post((req, res) => {
            req.body.user_id = req.user.id;
            UserSkills.create(req.body)
                .then(result => {
                    if (result) {
                        res.json(result);
                    } else {
                        res.sendStatus(404);
                    }
                })
                .catch(error => {
                    res.status(412).json({msg: error.message});
                });
        });

    app.route("/api/users/skill/:id")
        .all(app.auth.authenticate())

        .delete((req, res) => {
            UserSkills.destroy({
                where: {
                    id: req.params.id
                }
            })
                .then(result => {
                    if (result) {
                        res.json(result);
                    } else {
                        res.sendStatus(404);
                    }
                })
                .catch(error => {
                    res.status(412).json({msg: error.message});
                });
        })

    // Project skills
    app.route("/api/project/:id/skills")
        .all(app.auth.authenticate())

        .get((req, res) => {
            ProjectSkills.findAll({
                where: {
                    project_id: req.params.id
                }
            })
                .then(result => {
                    if (result) {
                        res.json(result);
                    } else {
                        res.sendStatus(404);
                    }
                })
                .catch(error => {
                    res.status(412).json({msg: error.message});
                });
        })

        .post((req, res) => {
            req.body.project_id = req.params.id;
            ProjectSkills.create(req.body)
                .then(result => {
                    if (result) {
                        res.json(result);
                    } else {
                        res.sendStatus(404);
                    }
                })
                .catch(error => {
                    res.status(412).json({msg: error.message});
                });
        });

    app.route("/api/project/:pid/skill/:id")
        .all(app.auth.authenticate())

        .delete((req, res) => {
            ProjectSkills.destroy({
                where: {
                    project_id: req.params.pid,
                    id: req.params.id
                }
            })
                .then(result => {
                    if (result) {
                        res.json(result);
                    } else {
                        res.sendStatus(404);
                    }
                })
                .catch(error => {
                    res.status(412).json({msg: error.message});
                });
        })

};