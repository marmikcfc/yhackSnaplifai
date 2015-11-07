angular.module('starter', ['ionic', 'ngCordova']).config(function($sceDelegateProvider) {
  $sceDelegateProvider.resourceUrlWhitelist([
    // Allow same origin resource loads.
    'self',
    // Allow loading from our assets domain.  Notice the difference between * and **.
    '*'
  ]);

}).controller('CameraCtrl', function ($scope,$ionicPlatform,$ionicPlatform, $cordovaCamera, $ionicLoading,$http) {
    $scope.results = [];
    $scope.cordovaReady = false;
    $scope.fileName="";
    $ionicPlatform.ready(function() {   
        $scope.$apply(function() {
            $scope.cordovaReady = true;
        });
    });

    $scope.data = { "ImageURI" :  "Select Image" };
    $scope.takePhoto = function() {
      var options = {
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        targetWidth: 300,
        targetHeight: 300,
        encodingType: Camera.EncodingType.JPEG
      };
      $cordovaCamera.getPicture(options).then(
        function(imageData) {
            $scope.picData = imageData;
            $scope.ftLoad = true;
//            $localstorage.set('fotoUp', imageData);
          //  $ionicLoading.show({template: 'Foto acquisita...', duration:500});
          //uploadPicture

        alert("into upload picture");
       // $ionicLoading.show({template: 'Sto inviando la foto...'});
        var fileURL = $scope.picData;
        var options1 = new FileUploadOptions();
        options1.fileKey = "file";
        options1.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
        options1.mimeType = "image/jpeg";
        options1.chunkedMode = true;

        var params = {};
        params.value1 = "someparams";
        params.value2 = "otherparams";

        options1.params = params;

        var ft = new FileTransfer();
        ft.upload(fileURL, encodeURI("http://21fb43a3.ngrok.com/upload"), function(success) {
            alert("success"+JSON.stringify(success.response));
            var fName=options1.fileName; 
            var link=  "http://21fb43a3.ngrok.com/recognition";
            alert("File Name"+fName);
            $http.post(link, {imageURL : "http://21fb43a3.ngrok.com/uploads/"+fName }).then(function (res){
                    $scope.$apply(function() {
                        alert(JSON.stringify(res.response));
                    $scope.results = JSON.parse(res.response);
                });
                
            
        });
        }, 
        function(error) {document.write("error"+JSON.stringify(error));},
         options1);

        },
        function(err){
         //   $ionicLoading.show({template: 'Errore di caricamento...', duration:500});
            })
      }

      $scope.choosePhoto = function() { 
        var options = {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
            targetWidth: 300,
            targetHeight: 300,
            encodingType: Camera.EncodingType.JPEG
        };

      $cordovaCamera.getPicture(options).then(
        function(imageURI) {
            window.resolveLocalFileSystemURI(imageURI, function(fileEntry) {
                $scope.picData = fileEntry.nativeURL;
                $scope.ftLoad = true;
                var image = document.getElementById('myImage');
                image.src = fileEntry.nativeURL;
                //Upload Picture

                     //uploadPicture

        alert("into upload picture");
       // $ionicLoading.show({template: 'Sto inviando la foto...'});
        var fileURL = $scope.picData;
        var options1 = new FileUploadOptions();
        options1.fileKey = "file";
        options1.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
        options1.mimeType = "image/jpeg";
        options1.chunkedMode = true;

        var params = {};
        params.value1 = "someparams";
        params.value2 = "otherparams";

        options1.params = params;

        var ft = new FileTransfer();
        ft.upload(fileURL, encodeURI("http://21fb43a3.ngrok.com/upload"), function(success) {
            alert("success"+JSON.stringify(success.response));
        }, 
        function(error) {alert("error"+JSON.stringify(error));}, options1);

            });
 //           $ionicLoading.show({template: 'Foto acquisita...', duration:500});
        },
        function(err){
   //         $ionicLoading.show({template: 'Errore di caricamento...', duration:500});
        })
    };

    $scope.getKeyWords = function(fileName) {

              var link=  "http://21fb43a3.ngrok.com/recognition";
              alert("File Name"+$scope.fileName);
              $http.post(link, {imageURL : "http://21fb43a3.ngrok.com/"+fileName }).then(function (res){
            $scope.results =  JSON.parse(res.text);
        });
          }

});