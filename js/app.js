var spotMe = angular.module('spotMe', [
	'ui.router',
	'userControllers'
])

spotMe.config(function($stateProvider, $urlRouterProvider){

  $urlRouterProvider.otherwise("/home");
  $stateProvider
    .state('home', {
      url: "/home",
      controller: 'userManagement as login',
			templateUrl: 'partials/home.html'
    })
    .state('create', {
      url: "/createAcount",
      controller: "createUserController as create",
      templateUrl: "partials/createUser.html"
    })
});
