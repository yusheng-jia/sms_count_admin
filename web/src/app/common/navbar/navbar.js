angular
.module('app')
.controller('NavBarController', NavBarController)

function NavBarController($scope, $rootScope) {
  $scope.toggleSidebar = function () {
    if (angular.element('body').hasClass('sidebar-fixed')) {
      angular.element('body').removeClass('sidebar-fixed').addClass('sidebar-hidden');
    } else {
      angular.element('body').addClass('sidebar-fixed').removeClass('sidebar-hidden');
    }
  }

  $scope.logout = function(){
    $rootScope.$broadcast("INVALID_JWT_TOKEN");
  }
}
