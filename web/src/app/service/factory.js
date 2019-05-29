

app.factory('Skill', function($resource) {
  return $resource(api_internal_v1 + '/skills/:skill_id/:path', {skill_id: '@id', path: '@path'},
      {
          'update': { method:'PUT' }
      });
});

app.factory('SkillActions', function ($resource) {
  return $resource(api_internal_v1 + '/skills/:skill_id/actions', {
    skill_id: '@id'
  });
});

app.factory('Intent', function($resource) {
  return $resource(api_internal_v1 + '/intents/:intent_id', {intent_id: '@id'},
      {
          'update': { method:'PUT' }
      });
});

app.factory('Intents', function($resource) {
  return $resource(api_internal_v1 + '/skills/:skill_id/intents', {skill_id:'@id'});
});

app.factory('Expressions', function($resource) {
  return $resource(api_internal_v1 + '/intents/:intent_id/expressions', {intent_id:'@id'});
});

app.factory('IntentExpressions', function($resource) {
  return $resource(api_internal_v1 + '/intent_expressions');
});

app.factory('Expression', function($resource) {
  return $resource(api_internal_v1 + '/expressions/:expression_id');
});

app.factory('UniqueIntentEntities', function($resource) {
  return $resource(api_internal_v1 + '/intents/:intent_id/unique_intent_entities', {intent_id:'@id'});
});

app.factory('Parameters', function($resource) {
  return $resource(api_internal_v1 + '/intent/:intent_id/parameters');
});

app.factory('ExpressionParameters', function($resource) {
  return $resource(api_internal_v1 + '/expression_parameters/:expression_id');
});

app.factory('Parameter', ['$resource', function($resource) {
return $resource(api_internal_v1 + '/parameters/:parameter_id', {parameter_id: '@id'},
    {
        'update': { method:'PUT' }
    });
}]);

app.factory('Entity', ['$resource', function($resource) {
return $resource(api_internal_v1 + '/entities/:entity_id', {entity_id: '@id'},
    {
        'update': { method:'PUT' }
    });
}]);

app.factory('Entities', function($resource) {
  return $resource(api_internal_v1 + '/entities');
});

app.factory('Regex', ['$resource', function($resource) {
  return $resource(api_internal_v1 + '/regex/:regex_id', {regex_id:'@id'},
  {
      'update': { method:'PUT' }
  });
}]);

app.factory('EntitySynonyms', function($resource) {
  return $resource(api_internal_v1 + '/entity/:entity_id/synonyms', {entity_id:'@id'});
});

app.factory('SkillEntities', function($resource) {
  return $resource(api_internal_v1 + '/entities/skill/:skill_id', {skill_id:'@id'});
});


app.factory('Synonym', function($resource) {
  return $resource(api_internal_v1 + '/synonyms/:synonym_id', {synonym_id:'@id'});
});

app.factory('EntitySynonymVariants', function($resource) {
  return $resource(api_internal_v1 + '/synonyms/:synonym_id/variants', {synonym_id:'@id'});
});

app.factory('EntitySynonymVariantsByEntity', function($resource) {
  return $resource(api_internal_v1 + '/entity_synonym_variants');
});

app.factory('SynonymVariant', function($resource) {
  return $resource(api_internal_v1 + '/variants/:synonym_variant_id', {synonym_variant_id:'@id'});
});

app.factory('AllSynonymVariants', function($resource) {
  return $resource(api_internal_v1 + '/synonymvariants');
});

app.factory('ActionResponses', function($resource) {
  return $resource(api_internal_v1 + '/actionresponse/:action_id', {action_id:'@id'});
});
//All responses for an intent
app.factory('Responses', function($resource) {
  return $resource(api_internal_v1 + '/response/:intent_id', {intent_id:'@id'});
});
//Reponse actions: create and delete
app.factory('Response', function($resource) {
  return $resource(api_internal_v1 + '/response/:response_id', {response_id:'@id'});
});
app.factory('IntentResponse', function($resource) {
  return $resource(api_internal_v1 + '/rndmresponse');
});
