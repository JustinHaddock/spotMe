var profileControllers = angular.module('profileControllers', ['ngDialog', 'firebase']);
var ref = new Firebase("https://spotmee.firebaseio.com");

profileControllers.controller("profileController", ['$scope', '$state', 'profileFactory', '$firebaseArray', 'ngDialog', function($scope, $state, profileFactory, $firebaseArray, ngDialog) {
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
    textInput: {
      name: "text-name-noEdit",
      age: "text-age-noEdit"
    },
    selectInput: {
      lift: "select-lift-noEdit",
      gender: "select-gender-noEdit"
    },
    readonly: true
  };


  profC.editInfo = function() {
    $scope.profileInfo = profC.profileInfo;
    ngDialog.openConfirm({
      className: 'ngdialog-theme-default',
      template: 'partials/profile_edit.html',
      controller: "editController as profile",
      scope: $scope
    })
  };

  profC.getGenderSymbol = function() {
    if (profC.profileInfo.gender == "male") {
      return '♂';
    }
    return '♀';
  }


  return profC;
}]);


profileControllers.controller("editController", ['$scope', '$state', '$firebaseArray', 'profileFactory', 'ngDialog', 'cloudFactory', function($scope, $state, $firebaseArray, profileFactory, ngDialog, cloudFactory) {
  profC = this;
  profC.picFile = "";
  profC.isAdded = false;

  if (profileFactory.hasUsersReady()) {
    var index = profileFactory.users.$indexFor(profileFactory.uid);
    profC.profileInfo = profileFactory.users[index];
  } else {
    profileFactory.getUsers().then(function(data) {
      var index = data.$indexFor(profileFactory.uid);
      profC.profileInfo = data[index];
    })
  }
  profC.handleFile = function($file, $event, $flow) {
    $flow.files = [];
    profC.picFile = $file;

    if ($flow.files.length) {
      event.preventDefault();
    }
    profC.isAdded = true;
  }
  profC.save = function() {
    if (profC.picFile == "") {
      var members = $firebaseArray(ref.child('members'));
      members.$loaded().then(function() {
        var index = members.$indexFor(profileFactory.uid);
        members[index] = profC.profileInfo;
        members.$save(index);
      });
    } else {
      cloudFactory.upload(profC.picFile)
        .then(function(data, status, headers, config) {
          console.log(data);
          profC.profileInfo.picUrl = data.data.secure_url;
          profC.profileInfo.picId = data.data.public_id;
          // save other data
          var members = $firebaseArray(ref.child('members'));
          members.$loaded().then(function() {
            var index = members.$indexFor(profileFactory.uid);
            members[index] = profC.profileInfo;
            members.$save(index);
          });
        }).catch(function(data, status, headers, config) {
          console.log(data);
        });
    }
    $scope.closeThisDialog(0);
  }
}]);
