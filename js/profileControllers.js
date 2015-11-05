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


profileControllers.controller("editController", ['$scope', '$state', '$firebaseArray', 'profileFactory', 'ngDialog', 'Upload', function($scope, $state, $firebaseArray, profileFactory, ngDialog, Upload) {
  profC = this;
  profC.picFile = "";

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
    console.log(profC.picFile);

    if ($flow.files.length) {
      event.preventDefault();
    }
  }
  profC.save = function() {
    this.continue = true;
    if (profC.picFile.size > 5000000) {
      emessage = "Profile picture too big! Please use photos that are less than 5mb";
      this.continue = false;
    }
    console.log(profC.picFile);
    if (this.continue) {
      Upload.upload({
        url: "https://api.cloudinary.com/v1_1/spot-me/upload",
        data: {
          file: profC.picFile.file,
          upload_preset: 'cf0lswed',
          api_key: '622124564534639',
          timestamp: Date.now(),
          public_id: profileFactory.uid
        }
      }).success(function(data, status, headers, config) {
        console.log("working");
        profC.profileInfo.picId = data.public_id;
        var members = $firebaseArray(ref.child('members'));
        members.$loaded().then(function() {
          var index = members.$indexFor(profileFactory.uid);
          members[index] = profC.profileInfo;
          members.$save(index);
        });
      }).error(function(data, status, headers, config) {
        profC.picFile.result = data;
      });
    }
    $scope.closeThisDialog(0);
  }
}]);
