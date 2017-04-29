module.exports = app => {
    const Invitations = app.db.models.Invitations;

    app.route("/api/user/invitations")
        .all(app.auth.authenticate())

        .get((req, res) => {
            Invitations.findAll({
                where: { receiver_id: req.user.id }
            })
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({msg: error.message});
                });
        });

    app.route("/api/user/invitation/:id")
        .all(app.auth.authenticate())

        .get((req, res) => {
            Invitations.findOne({
                where: { receiver_id: req.user.id,
                         id: req.params.id
                }
            })
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({msg: error.message});
                });
        });

    app.route("/api/user/invitation/:id/accept")
        .all(app.auth.authenticate())

        .patch((req, res) => {
            Invitations.update(
                {states: 'ACCEPTED'},
                { where: {
                    receiver_id: req.user.id,
                    id: req.params.id
                }})
                .then(result => res.json({msg: "Invitation ACCEPTED"}))
                .catch(error => {
                    res.status(412).json({msg: error.message});
                })
        });

    app.route("/api/user/invitation/:id/pending")
        .all(app.auth.authenticate())

        .patch((req, res) => {
            Invitations.update(
                {states: 'PENDING'},
                { where: {
                    receiver_id: req.user.id,
                    id: req.params.id
                }})
                .then(result => res.json({msg: "Invitation PENDING"}))
                .catch(error => {
                    res.status(412).json({msg: error.message});
                })
        });

    app.route("/api/user/invitation/:id/reject")
        .all(app.auth.authenticate())

        .patch((req, res) => {
            Invitations.update(
                {states: 'REJECTED'},
                { where: {
                    receiver_id: req.user.id,
                    id: req.params.id
                }})
                .then(result => res.json({msg: "Invitation REJECTED"}))
                .catch(error => {
                    res.status(412).json({msg: error.message});
                })
        });


    app.route("/api/user/:uid/project/:pid/invite")
        .all(app.auth.authenticate())

        .post((req, res) => {
            req.body.project_id = req.params.pid;
            req.body.receiver_id = req.params.uid;
            req.body.sender_id = req.user.id;
            Invitations.create(req.body)
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
