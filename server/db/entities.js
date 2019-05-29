const db = require('./db')

function getAllEntities(req, res, next) {
  console.log("Entities.getAllEntities");
  db.any('select * from entities')
    .then(function (data) {
      res.status(200)
        .json(data);
    })
    .catch(function (err) {
      return next(err);
    });
}

function getAllEntitiesForSkill(req, res, next) {
  console.log("Entities.getAllEntitiesForSkill");
  var skillId = parseInt(req.params.skill_id);
  db.any('select * from entities where skill_id=$1', skillId)
    .then(function (data) {
      res.status(200)
        .json(data);
    })
    .catch(function (err) {
      return next(err);
    });
}

function getSingleEntity(req, res, next) {
  console.log("Entities.getSingleEntity");
  var entityID = parseInt(req.params.entity_id);
  db.one('select * from entities where entity_id = $1', entityID)
    .then(function (data) {
      res.status(200)
        .json(data);
    })
    .catch(function (err) {
      return next(err);
    });
}

function createEntity(req, res, next) {
  console.log("Entities.createEntity");
  req.body.skill_id =req.body.skill.skill_id;
  db.none('insert into entities(entity_name, skill_id, slot_data_type) values(${entity_name},${skill_id},${slot_data_type})',
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted'
        });
    })
    .catch(function (err) {
      console.log(err);
      return next(err);
    });
}

function updateEntity(req, res, next) {
  db.none('update entities set entity_name=$1, skill_id=$3, slot_data_type=$4 where entity_id=$2',
    [req.body.entity_name, parseInt(req.params.entity_id),parseInt(req.body.skill.skill_id), req.body.slot_data_type])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated skill'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function removeEntity(req, res, next) {
  var entityId = parseInt(req.params.entity_id);
  db.result('delete from entities where entity_id = $1', entityId)
  var entityID = parseInt(req.params.entity_id);
  db.result('delete from entities where entity_id = $1', entityID)
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

module.exports = {
  getAllEntities: getAllEntities,
  getAllEntitiesForSkill: getAllEntitiesForSkill,
  getSingleEntity: getSingleEntity,
  createEntity: createEntity,
  updateEntity: updateEntity,
  removeEntity: removeEntity
};
