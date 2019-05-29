angular
.module('app')
.controller('ChannelController',ChannelController)

function ChannelController($scope,$http){
  console.log("ChannelController...")
  $scope.channels = [];
  $http({
    method:'GET',
    url:api_out_v1 + "/" + "coomaan/sms_backend/api/channel/"
  }).then( res =>{
    $scope.channels = res.data.results;
    console.log($scope.channels);
  }, error =>{
    console.log(error)
  });
}