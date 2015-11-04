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

  profC.uploadFile = function(file) {
    // offload to service, inject
    this.file = file;
    if (!this.file) return;
    angular.forEach(file, function(file) {
      if (file && !file.$error) {
        file.upload = $upload.upload({
          url: "https://api.cloudinary.com/v1_1/spot-me/upload",
          file: file
        }).progress(function(e) {
          file.progress = Math.round((e.loaded * 100.0) / e.total);
          file.status = "Uploading... " + file.progress + "%";
        }).success(function(data, status, headers, config) {

        }).error(function(data, status, headers, config) {
          file.result = data;
        });
      }
    });
  };

  return profC;
}]);


profileControllers.controller("editController", ['$scope', '$state', '$firebaseArray', 'profileFactory', 'ngDialog', function($scope, $state, $firebaseArray, profileFactory, ngDialog) {
  profC = this;
  profC.picFile = "yabba dabba do!";
  $scope.namesString = "";
  this.namesString = "";

  if (profileFactory.hasUsersReady()) {
    var index = profileFactory.users.$indexFor(profileFactory.uid);
    profC.profileInfo = profileFactory.users[index];
  } else {
    profileFactory.getUsers().then(function(data) {
      var index = data.$indexFor(profileFactory.uid);
      profC.profileInfo = data[index];
    })
  }
  profC.handleFile = function( $file, $event, $flow ){
    console.log($file);
    console.log($event);
    console.log($flow);
  }
  profC.save = function() {
    console.log(profC.picFile);
    // var members = $firebaseArray(ref.child('members'));
    // members.$loaded().then(function() {
    //   var index = members.$indexFor(profileFactory.uid);
    //   members[index] = profC.profileInfo;
    //   members.$save(index);
    // })
    // $scope.closeThisDialog(0);
  }
}]);
