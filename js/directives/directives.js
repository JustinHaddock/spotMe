var directives = angular.module('directives', []);


directives.directive('nav', ['profileFactory', '$state', function(profileFactory, $state) {

  Controller = function($timeout) {

    var vm = this;
    vm.profileInfo = '';

    vm.getFirstName = function(name) {
      if (name.indexOf(' ') != -1) {
        var split = name.split(" ");
        return split[0]
      }
      return name;
    }

    if (profileFactory.hasUsersReady()) {
      var index = profileFactory.users.$indexFor(profileFactory.uid);
      $timeout(vm.profileInfo = profileFactory.users[index]);
      vm.profileInfo.name = vm.getFirstName(vm.profileInfo.name)
    } else {
      profileFactory.getUsers().then(function(data) {
        var index = data.$indexFor(profileFactory.uid);
        $timeout(vm.profileInfo = data[index]);
        vm.profileInfo.name = vm.getFirstName(vm.profileInfo.name)
      })
    }
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
