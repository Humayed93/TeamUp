module.exports = app => {
    const Members = app.db.models.Members;

    app.route("/api/projects/member")
        .all(app.auth.authenticate())

        .get((req, res) => {
            Members.findAll({
                where: { member_id: req.user.id }
            })
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({msg: error.message});
                });
        });


    app.route("/api/myproject/:id/members")
        .all(app.auth.authenticate())

        .get((req, res) => {
            Members.findAll({ where: {
                project_id: req.params.id,
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
        });

    app.route("/api/myproject/:id/member/:mid")
        .all(app.auth.authenticate())

        .get((req, res) => {
            Members.findOne({ where: {
                project_id: req.params.id,
                member_id: req.params.mid
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
                project_id: req.params.id,
                member_id: req.params.mid
            }})
                .then(result => res.sendStatus(204))
                .catch(error => {
                    res.status(412).json({msg: error.message});
                });
        })

        .delete((req, res) => {
            Members.destroy({ where: {
                id: req.params.id,
                member_id: req.params.mid
            }})
                .then(result => res.sendStatus(204))
                .catch(error => {
                    res.status(412).json({msg: error.message});
                });
        });

    app.route("/api/myproject/:id/member/:mid/active")
        .all(app.auth.authenticate())

        .patch((req, res) => {
            Members.update(
                {states: 'ACTIVE'},
                { where: {
                project_id: req.params.id,
                member_id: req.params.mid
            }})
                .then(result => res.json({msg: "Member ACTIVATED"}))
                .catch(error => {
                    res.status(412).json({msg: error.message});
                })
        });

    app.route("/api/myproject/:id/member/:mid/pending")
        .all(app.auth.authenticate())

        .patch((req, res) => {
            Members.update(
                {states: 'PENDING'},
                { where: {
                    project_id: req.params.id,
                    member_id: req.params.mid
                }})
                .then(result => res.json({msg: "Member PENDING"}))
                .catch(error => {
                    res.status(412).json({msg: error.message});
                })
        });

    app.route("/api/myproject/:id/member/:mid/rejected")
        .all(app.auth.authenticate())

        .patch((req, res) => {
            Members.update(
                {states: 'REJECTED'},
                { where: {
                    project_id: req.params.id,
                    member_id: req.params.mid
                }})
                .then(result => res.json({msg: "Member REJECTED"}))
                .catch(error => {
                    res.status(412).json({msg: error.message});
                })
        });

    app.route("/api/myproject/:pid/user/:uid")
        .all(app.auth.authenticate())

        .post((req, res) => {
            req.body.project_id = req.params.pid;
            req.body.member_id = req.params.uid;
            Members.create(req.body)
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
