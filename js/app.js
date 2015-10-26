var spotMe = angular.module('spotMe', [
	'ui.router',
	'userControllers',
	'profileControllers',
	'profileFactory',
	'directives'
])

spotMe.config(function($stateProvider, $urlRouterProvider){

  $urlRouterProvider.otherwise("/login");
  $stateProvider
    .state('login', {
      url: "/login",
      controller: 'userManagement as login',
			templateUrl: 'partials/home.html'
    })
    .state('profile', {
      url: "/profile",
      controller: "profileController as profile",
      templateUrl: "partials/profile.html"
    })
});
