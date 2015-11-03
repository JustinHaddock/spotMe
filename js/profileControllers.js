var profileControllers = angular.module('profileControllers', ['ngDialog', 'firebase']);
var ref = new Firebase("https://spotmee.firebaseio.com");
$.cloudinary.config({ cloud_name: 'spot-me', api_key: '622124564534639'})



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

  profC.save = function() {
     var url = $.cloudinary.url('spot-me', {format: 'json', type: 'list'});
     console.log(url);
    var members = $firebaseArray(ref.child('members'));
    members.$loaded().then(function() {
      var index = members.$indexFor(profileFactory.uid);
      members[index] = profC.profileInfo;
      members.$save(index);
      profC.editInfo();
    })
  }

  profC.editInfo = function() {
    console.log(profC.classes.textInput);
    if (profC.classes.textInput.name == "text-name-edit") {
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
      }
    } else {
      profC.classes = {
        textInput: {
          name: "text-name-edit",
          age: "text-age-edit"
        },
        selectInput: {
          lift: "select-lift-edit",
          gender: "select-gender-edit"
        },
        readonly: false
      }
    }
  };


  profC.uploadFile = function(file) {
    this.file = file;
    if (!this.file) return;
    angular.forEach(file, function(file) {
      if (file && !file.$error) {
        file.upload = $upload.upload({
          url: "https://api.cloudinary.com/v1_1/spot-me/upload",
          fields: {
            upload_preset: $.cloudinary.config().upload_preset,
            context: 'photo=' + this.title
          },
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
