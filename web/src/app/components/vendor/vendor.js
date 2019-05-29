angular
.module('app')
.controller('VendorController',VendorController)

function VendorController($scope,$rootScope,$http){
  console.log("VendorController...")
  $scope.vendors = [];
  $http({
    method:'GET',
    url:api_out_v1 + "/" + "coomaan/sms_backend/api/manufacturer/"
  }).then( res =>{
    $scope.vendors = res.data.results;
    console.log($scope.vendors);
  }, error =>{
    console.log(error)
  });

  $scope.showDelDialog = function (faq) {
    console.log('====================================');
    console.log('faqTableDelete: ' + faq.url);
    console.log('====================================');

    $http({
      method:'DELETE',
      url:faq.url
    }).then((res) => {
      //删除成功后重新获取当前页面
      if($scope.searchText != null && $scope.searchText != ""){
        getData(searchUrl);
      }else{
        getData(faqUrl)
      }
    },(error) => {

    })
  }
  
}