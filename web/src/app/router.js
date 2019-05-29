app.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      controller:'StatisticsController as statistics',
      templateUrl:'/app/components/statistics/statistics.html',
      activePage:'statistics'
    })
    .when('/statistics',{
      controller:'StatisticsController as statistics',
      templateUrl:'/app/components/statistics/statistics.html',
      activePage:'statistics'
    })
    .when('/login', {
      controller:'LoginController',
      templateUrl:'/app/modules/login/login.html',
      activePage:'login'
    })
    .when('/channel', {
      controller:'ChannelController as channel',
      templateUrl:'/app/components/channel/channel.html',
      activePage:'channels'
    })
    // .when('/skill/add', {
    //   controller:'AddSkillController as addskill',
    //   templateUrl:'/app/modules/skills/add_skill.html',
    //   activePage:'skills'
    // })
    // .when('/skill/import', {
    //   controller:'ImportSkillController as importskill',
    //   templateUrl:'/app/modules/skills/import_skill.html',
    //   activePage:'skills'
    // })
    // .when('/skill/:skill_id', {
    //   controller:'EditSkillController as editskill',
    //   templateUrl:'/app/modules/skills/edit_skill.html',
    //   activePage:'skills'
    // })
    // .when('/skill/modify/:skill_id',{
    //   controller:'ModifySkillController as modifyskill',
    //   templateUrl:'/app/modules/skills/modify_skill.html',
    //   activePage:'skills'
    // })
    // .when('/skill/:skill_id/action/edit/:action_id', {
    //   controller:'ActionsController as actionsController',
    //   templateUrl:'/app/modules/actions/actions.html',
    //   activePage:'skills'
    // })
    // .when('/skill/:skill_id/intent/add', {
    //   controller:'AddIntentController as addintent',
    //   templateUrl:'/app/modules/intents/add_intent.html',
    //   activePage:'skills'
    // })
    // .when('/skill/:skill_id/intent/:intent_id', {
    //   controller:'EditIntentController as editintent',
    //   templateUrl:'/app/modules/intents/edit_intent.html',
    //   activePage:'skills'
    // })
    // .when('/skill/:skill_id/stories/', {
    //   controller:'StoriesController as stories',
    //   templateUrl:'/app/modules/stories/stories.html',
    //   activePage:'stories'
    // })
    // .when('/skill/down/:skill_id',{
    //   controller:'DownSkillController as downskill',
    //   templateUrl:'/app/modules/skills/down_skill.html',
    //   activePage:'skills'
    // })
    .when('/vendor', {
      controller:'VendorController as vendor',
      templateUrl:'/app/components/vendor/vendor.html',
      activePage:'vendors'
    })
    // .when('/skill/:skill_id/entity/add', {
    //   controller:'AddEntityController as addentity',
    //   templateUrl:'/app/modules/entities/add_entity.html',
    //   activePage:'entities'
    // })
    // .when('/skill/:skill_id/entity/:entity_id/synonyms', {
    //   controller:'SynonymController',
    //   templateUrl:'/app/modules/synonyms/synonyms.html',
    //   activePage:'entities'
    // })
    // .when('/entities/:entity_id/synonyms', {
    //   controller:'SynonymController',
    //   templateUrl:'/app/modules/synonyms/synonyms.html',
    //   activePage:'entities'
    // })
    .when('/views',{
      controller:'ViwesController as views',
      templateUrl:'/app/components/views/views.html',
      activePage:'views'
    })
    // .when('/category/add',{
    //   controller:'CategoryAddController',
    //   templateUrl:'/app/modules/faq/add_category.html',
    //   activePage:'category'
    // })
    // .when('/category/:categoryid',{
    //   controller:'FaqListController',
    //   templateUrl:'/app/modules/faq/faqs.html',
    //   activePage:'category'
    // })
    // .when('/conversation',{
    //   controller:'ConversationController as conversation',
    //   templateUrl:'/app/modules/conversation/conversation.html',
    //   activePage:'conversation'
    // })
    .otherwise({
      redirectTo:'/'
    });
})
