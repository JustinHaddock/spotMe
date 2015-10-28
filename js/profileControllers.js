var profileControllers = angular.module('profileControllers', ['ngDialog', 'firebase']);
var ref = new Firebase("https://spotmee.firebaseio.com");


profileControllers.controller("profileController", ['$scope', '$state', 'profileFactory', '$firebaseArray', function($scope, $state, profileFactory, $firebaseArray) {
  var profC = this;
  if (profileFactory.uid == null) {
    $state.go('login');
  }
  if (profileFactory.hasUsersReady()) {
    var index = profileFactory.users.$indexFor(profileFactory.uid);
    profC.profileInfo = profileFactory.users[index];
  } else {
    profileFactory.getUsers().then(function(data) {
      var index = data.$indexFor(profileFactory.uid);
      profC.profileInfo = data[index];
    })
  }
  // -------------- ON TO ACTUAL METHODS ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  profC.classes = {
    textInput: "text-noEdit",
    selectInput: "select-noEdit",
    readonly: true
  };

  profC.save = function() {
    console.log("GARBAGE");
    var f = document.getElementById('file').files[0],
      r = new FileReader();
    console.log(r);
    r.onloadend = function(e) {
        var data = e.target.result
        console.log(data);
        console.log(e);
        console.log(r);
        //send you binary data via $http or $resource or do anything else with it
      }
      r.readAsBinaryString(f);

  }

  profC.editInfo = function() {
    console.log(profC.classes.textInput);
    if (profC.classes.textInput == "text-edit") {
      profC.classes = {
        textInput: "text-noEdit",
        selectInput: "select-noEdit",
        readonly: true
      }
    } else {
      profC.classes = {
        textInput: "text-edit",
        selectInput: "select-edit",
        readonly: false
      }
    }
  };

  return profC;
}]);
