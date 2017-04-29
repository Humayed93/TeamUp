module.exports = app => {
  const Tasks = app.db.models.Tasks;

  app.route("/api/tasks")
    .all(app.auth.authenticate())

    .get((req, res) => {
      Tasks.findAll({
        where: { member_member_id: req.user.id }
      })
      .then(result => res.json(result))
      .catch(error => {
        res.status(412).json({msg: error.message});
      });
    });

  app.route("/api/tasks/:id")
    .all(app.auth.authenticate())

    .get((req, res) => {
      Tasks.findOne({ where: {
        id: req.params.id,
        member_member_id: req.user.id
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
      Tasks.update(req.body, { where: {
        id: req.params.id,
        member_member_id: req.user.id
      }})
      .then(result => res.sendStatus(204))
      .catch(error => {
        res.status(412).json({msg: error.message});
      });
    })

    .delete((req, res) => {
      Tasks.destroy({ where: {
        id: req.params.id,
        member_member_id: req.user.id
      }})
      .then(result => res.sendStatus(204))
      .catch(error => {
        res.status(412).json({msg: error.message});
      });
    });

    app.route("/api/project/:id/tasks")
        .all(app.auth.authenticate())

        .get((req, res) => {
            Tasks.findAll({
                where: { member_member_id: req.user.id,
                    project_id: req.params.id
                }
            })
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({msg: error.message});
                });
        })

        .post((req, res) => {
            req.body.member_member_id = req.user.id;
            req.body.project_id = req.params.id;
            Tasks.create(req.body)
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({msg: error.message});
                });
        })
};
