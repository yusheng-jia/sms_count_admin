var api_internal_v1 = '/api/v1'; 
// faq问答地址，包含：faq数据和提交测试
var api_out_v1 = 'http://tt.api.coomaan.com:8998'; //api_out_v1
// 测试对话 线上地址
var api_conversation_url = 'https://wx.coomaan.com/coomaanAI';
// 测试对话 线下地址
var api_conversation_offline_url = 'http://tt.api.coomaan.com:18500/raAI/respond';

var app =angular.module('app', ['ngCookies','btford.socket-io','ng-jsyaml','ngSanitize','ngFileUpload', 'angularUtils.directives.dirPagination','ngRoute', 'chart.js', 'ngResource', 'ngStorage', 'ngTagsInput', 'jsonFormatter'])
.config(function config() {
  function success(response) {
    return response;
  }
  function error(response) {
    var status = response.status;
    if (status == 401) {
      //window.location = "/account/login?redirectUrl=" + Base64.encode(document.URL);
      //$rootScope.$broadcast("INVALID_JWT_TOKEN");
      return;
    }
    // otherwise
    return $q.reject(response);
  }
  return function(promise) {
    return promise.then(success, error);
  }
}).factory('mySocket', function (socketFactory) {
  return socketFactory({
    ioSocket: io.connect()
  });
}).run(function run($rootScope, $http, $sessionStorage) {
  // keep user logged in after page refresh
  if ($sessionStorage.jwt) {
    $rootScope.authenticated = true;
    $http.defaults.headers.common.Authorization = 'Bearer ' + $sessionStorage.jwt;
  }else{
    //show login page
    $rootScope.authenticated = false;
    $rootScope.$broadcast("INVALID_JWT_TOKEN");
  }
  $rootScope.$on('USER_AUTHENTICATED', function(event) {
    $rootScope.authenticated = true;
    $http.defaults.headers.common.Authorization = 'Bearer ' + $sessionStorage.jwt;
  });

   $rootScope.$on('INVALID_JWT_TOKEN', function(event) {
    $rootScope.authenticated = false;
    $sessionStorage.$reset();
   });
});

angular.module('app').controller('appCtrl', function($rootScope, $scope, $route, $routeParams, $location, $timeout, $http, $sessionStorage, $cookies) {
     $scope.$route = $route;
     $scope.$location = $location;
     $scope.$routeParams = $routeParams;
     $rootScope.currentPage = 1;

     $scope.go = function ( path ) {
       $location.path( path );
     };

     $scope.formData = {};

     $scope.$on('setAlert', function(event, alert_text) {
       $('#alertDiv').addClass('show');
       $scope.alert_text = alert_text;
       $timeout(function(){$('#alertDiv').removeClass('show')}, 2000);
     });

     $scope.loginUser = function(user){
       $http.post(api_internal_v1 + "/auth", JSON.stringify(user))
         .then(
           function(response){
             // success callback
             $sessionStorage.jwt = response.data.token;
             $cookies.put('loggedinjwt', $sessionStorage.jwt);
             $rootScope.$broadcast("USER_AUTHENTICATED");
           },
           function(errorResponse){
             // failure callback
             $('#alertDiv').addClass('show');
             $scope.alert_text = "用户名或者密码错误，请再试一次！";
             $timeout(function(){$('#alertDiv').removeClass('show')}, 2000);
           }
         );
     }
});
