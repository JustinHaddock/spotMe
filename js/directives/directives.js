var directives = angular.module('directives', []);


directives.directive('nav', ['profileFactory', '$state', function(profileFactory, $state) {

  Controller = function($timeout) {

    var vm = this;
    vm.profileInfo = '';
    vm.displayName = '';

    vm.getFirstName = function(name) {
      if (name.indexOf(' ') != -1) {
        var split = name.split(" ");
        return split[0]
      }
      return name;
    }

    vm.init = function() {
      if (profileFactory.hasUsersReady()) {
        console.log(profileFactory.uid);
        $timeout(vm.profileInfo = profileFactory.thisUser);
        vm.displayName = vm.getFirstName(vm.profileInfo.name)
      } else {
        profileFactory.getUsers().then(function(data) {
          var index = data.$indexFor(profileFactory.uid);
          $timeout(vm.profileInfo = data[index]);
          vm.displayName = vm.getFirstName(vm.profileInfo.name)
        })
      }
    }
    vm.init();
  }


  return {
    restrict: "E",
    controller: Controller,
    controllerAs: 'nav',
    scope: true,
    templateUrl: "partials/_nav.html"
  }
}]);



directives.directive('memberBox', function() {
  return {
    restrict: "E",
    scope: {
      member: '=member'
    },
    templateUrl: "partials/_memberBox.html"
  }
});
