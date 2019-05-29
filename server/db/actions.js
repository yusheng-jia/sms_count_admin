const db = require('./db')

function getSingleAction(req, res, next) {
  var action_id = parseInt(req.params.action_id);
  console.log("actions.getSingleAction");
  db.one('select * from actions where action_id = $1', action_id)
    .then(function (data) {
      res.status(200)
        .json(data);
    })
    .catch(function (err) {
      return next(err);
    });
}

function getSkillActions(req, res, next) {
  console.log("actions.getSkillActions");
  var SkillID = parseInt(req.params.skill_id);
  db.any('select * from actions where skill_id = $1', SkillID)
    .then(function (data) {
      res.status(200)
        .json(data);
    })
    .catch(function (err) {
      return next(err);
    });
}

function createSkillAction(req, res, next) {
console.log("actions.createSkillAction");
  db.any('insert into actions(skill_id, action_name)' +
      'values(${skill_id}, ${action_name})',
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function removeAction(req, res, next) {
  console.log("actions.removeAction");
  var action_id = parseInt(req.params.action_id);
  db.result('delete from actions where action_id = $1', action_id)
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: 'Removed ${result.rowCount}'
        });
      /* jshint ignore:end */
    })
    .catch(function (err) {
      return next(err);
    });
}

function updateAction(req, res, next) {
  console.log("actions.updateAction");
  db.none('update actions set action_name=$2 where action_id=$1',
    [parseInt(req.params.action_id),req.body.action_name])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated Action'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

module.exports = {
  getSingleAction: getSingleAction,
  getSkillActions: getSkillActions,
  createSkillAction: createSkillAction,
  updateAction: updateAction,
  removeAction: removeAction
};
