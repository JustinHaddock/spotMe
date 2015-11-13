var cloudFactory = angular.module('cloudFactory', []);
var ref = new Firebase("https://spotmee.firebaseio.com");

cloudFactory.factory("cloudFactory", ['$firebaseArray', 'Upload', 'profileFactory', '$http', function($firebaseArray, Upload, profileFactory, $http) {
  var cc = {};

  cc.delete = function(id) {
    var data = {
      public_id: id,
      timestamp: Date.now(),
    }
    return $http({
      url: '/signature',
      params: data,
      method: "GET"
    }).then(function(response) {
      var api_key = response.data.api_key;
      var api_url = response.data.api_url;
      var secret = response.data.secret;
      Upload.upload({
        url: "https://api.cloudinary.com/v1_1/spot-me/image/destroy",
        data: {
          public_id: id,
          api_key: api_key,
          timestamp: data.timestamp,
          signature: secret
        }
      })
    })

  }

  cc.upload = function(pfile) {
    var oldPicId = profileFactory.findUser(profileFactory.uid).picId;
    cc.delete(oldPicId);
    var publicId = "";
    cc.continue = true;
    if (pfile.size > 5000000) {
      emessage = "Profile picture too big! Please use photos that are less than 5mb";
      cc.continue = false;
    }
    if (cc.continue) {
      return Upload.upload({
        url: "https://api.cloudinary.com/v1_1/spot-me/upload",
        data: {
          file: pfile.file,
          upload_preset: 'cf0lswed',
          api_key: '622124564534639',
          timestamp: Date.now(),
          public_id: profileFactory.uid
        }
      })
    } else {
      return ""
    }
  }
  return cc;
}]);
