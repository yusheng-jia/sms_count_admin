var express = require('express');
var router = express.Router();

var skills = require('../db/skills');
var intents = require('../db/intents');
var actions = require('../db/actions');
var expressions = require('../db/expressions');
var parameters = require('../db/parameters');
var entities = require('../db/entities');
var regex = require('../db/regex');
var synonyms = require('../db/synonyms');
var variants = require('../db/variants');
var responses = require('../db/responses');
var auth = require('./auth');

router.get('/skills', skills.getAllSkills);
router.get('/skills/:skill_id', skills.getSingleSkill);
router.post('/skills', skills.createSkill);
router.put('/skills/:skill_id', skills.updateSkill);
router.post('/skillStory', skills.updateSkillStory);
router.delete('/skills/:skill_id', skills.removeSkill);
router.post('/skills/upload', skills.uploadSkillFromFile);


router.get('/actions/:action_id', actions.getSingleAction);
router.put('/actions/:action_id', actions.updateAction);
router.delete('/actions/:action_id', actions.removeAction);
router.post('/actions', actions.createSkillAction);
router.get('/skills/:skill_id/actions', actions.getSkillActions);

router.get('/skills/:skill_id/intents', intents.getSkillIntents);
router.get('/intents/:intent_id', intents.getSingleIntent);
router.get('/intents/:intent_id/unique_intent_entities', intents.getUniqueIntents);
router.put('/intents/:intent_id', intents.updateIntent);

router.post('/skills/:skill_id/intents', intents.createSkillIntent);
router.post('/intents', intents.createSkillIntent);
router.delete('/intents/:intent_id', intents.removeIntent);

router.get('/intent_expressions', expressions.getIntentExpressionQuery); //Used for training

router.get('/intents/:intent_id/expressions', expressions.getIntentExpressions);
router.get('/expressions/:expression_id', expressions.getSingleExpression);
router.post('/expressions', expressions.createIntentExpression);
router.delete('/expressions/:expression_id', expressions.removeExpression);

router.get('/expression_parameters', parameters.getExpressionParametersQuery); //Used for training

router.get('/expresions/:expression_id/parameters', parameters.getExpressionParameters);
router.get('/parameters/:parameter_id', parameters.getSingleParameter);
router.get('/intent/:intent_id/parameters', parameters.getIntentParameters);
router.post('/parameters', parameters.createExpressionParameter);
router.put('/parameters/:parameter_id', parameters.updateParameter);
router.delete('/parameters/:parameter_id', parameters.removeParameter);

router.get('/entities', entities.getAllEntities);
router.get('/entities/skill/:skill_id', entities.getAllEntitiesForSkill);
router.get('/entities/:entity_id', entities.getSingleEntity);
router.post('/entities', entities.createEntity);
router.put('/entities/:entity_id', entities.updateEntity);
router.delete('/entities/:entity_id', entities.removeEntity);

router.get('/regex', regex.getAllRegex);
router.get('/regex/:regex_id', regex.getSingleRegex);
router.post('/regex', regex.createRegex);
router.put('/regex/:regex_id', regex.updateRegex);
router.delete('/regex/:regex_id', regex.removeRegex);

router.get('/entity/:entity_id/synonyms', synonyms.getEntitySynonyms);
router.get('/synonyms/:synonym_id', synonyms.getSingleSynonym);
router.post('/synonyms', synonyms.createEntitySynonym);
router.delete('/synonyms/:synonym_id', synonyms.removeSynonym);

router.get('/entity_synonym_variants', variants.getEntitySynonymVariantsQuery); //Used for training

router.get('/synonyms/:synonym_id/variants', variants.getEntitySynonymVariants);
router.get('/variants/:synonym_variant_id', variants.getSingleVariant);
router.get('/synonymvariants', variants.getAllSynonymVariants);
router.post('/variants', variants.createVariant);
router.delete('/variants/:synonym_variant_id', variants.removeVariant);
router.delete('/synonyms/:synonym_id/variants', variants.removeSynonymVariants);

router.get('/actionresponse/:action_id', responses.getActionResponses);
router.post('/actionresponse', responses.createActionResponse);

router.get('/response/:intent_id', responses.getIntentResponses);
router.post('/response', responses.createIntentResponse);
router.delete('/response/:response_id', responses.removeResponse);

router.get('/rndmresponse', responses.getRandomResponseForIntent);
router.get('/action_responses', responses.getActionResponsesQuery);

//authentication js
router.post('/auth', auth.authenticateUser);
router.post('/authclient', auth.authenticateClient);


module.exports = router;
