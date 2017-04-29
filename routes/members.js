module.exports = app => {
    const Members = app.db.models.Members;

    app.route("/api/projects/member")
        .all(app.auth.authenticate())

        .get((req, res) => {
            Members.findOne({
                where: { member_id: req.user.id }
            })
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({msg: error.message});
                });
        })

        .post((req, res) => {
            req.body.member_id = req.user.id;
            Members.create(req.body)
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({msg: error.message});
                });
        });
///////////////////////////////////////////////////
    app.route("/api/myprojects/:id")
        .all(app.auth.authenticate())

        .get((req, res) => {
            Members.findOne({ where: {
                id: req.params.id,
                owner_id: req.user.id
            }})
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

        .put((req, res) => {
            Members.update(req.body, { where: {
                id: req.params.id,
                owner_id: req.user.id
            }})
                .then(result => res.sendStatus(204))
                .catch(error => {
                    res.status(412).json({msg: error.message});
                });
        })

        .delete((req, res) => {
            Members.destroy({ where: {
                id: req.params.id,
                owner_id: req.user.id
            }})
                .then(result => res.sendStatus(204))
                .catch(error => {
                    res.status(412).json({msg: error.message});
                });
        });

    app.route("/api/projects")
        .get((req, res) => {
            Members.findAll()
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({msg: error.message});
                });
        });

    app.route("/api/projects/:id/members")
        .get((req, res) => {
            Members.findOne({ where: {
                project_id: req.params.id
            }})
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

    app.route("/api/projects/owner/:id")
        .get((req, res) => {
            Members.findOne({ where: {
                owner_id: req.params.id
            }})
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
};
