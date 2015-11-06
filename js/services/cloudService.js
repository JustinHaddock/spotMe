var cloudFactory = angular.module('cloudFactory', []);
var ref = new Firebase("https://spotmee.firebaseio.com");

cloudFactory.factory("cloudFactory", ['$firebaseArray', 'Upload', 'profileFactory', function($firebaseArray, Upload, profileFactory) {
  var cc = {};

  cc.upload = function(pfile) {
    var oldPicId = profileFactory.findUser(profileFactory.uid);
    console.log(oldPicId);
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
    }
    else{
      return ""
    }
  }
  return cc;
}]);
