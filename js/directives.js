var directives = angular.module('directives', []);


directives.directive('nav', function() {
  Controller = function() {
  }
  return {
      restrict: "E",
      controller: Controller,
      controllerAs: 'nav',
      scope: true,
      templateUrl: "partials/_nav.html"
  }
});
