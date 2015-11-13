var spotMe = angular.module('spotMe', [
  'ui.router',
  'userControllers',
  'profileControllers',
  'profileFactory',
  'cloudFactory',
  'searchControllers', 
  'directives',
  'cloudinary',
  'ngFileUpload',
  'flow',
  'firebase'
])

var ref = new Firebase("https://spotmee.firebaseio.com");


spotMe.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/login");
  $stateProvider
    .state('login', {
      url: "/login",
      controller: 'userManagement as login',
      templateUrl: 'partials/home.html'
    })
    .state('search', {
      url: "/search",
      controller: 'searchController as search',
      templateUrl: 'partials/search.html'
    })
    .state('profile', {
      url: "/profile",
      controller: "profileController as profile",
      templateUrl: "partials/profile.html"
    })
});
