angular.module('starter', ['ionic', 'ngCordova']).config(function($sceDelegateProvider) {
  $sceDelegateProvider.resourceUrlWhitelist([
    // Allow same origin resource loads.
    'self',
    // Allow loading from our assets domain.  Notice the difference between * and **.
    '*'
  ]);

}).controller('CameraCtrl', function ($scope,$ionicPlatform,$ionicPlatform, $cordovaCamera, $ionicLoading,$http) {
    $scope.results = [];
    $scope.bingResults = [];
    $scope.keywordString="";
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
                    
                        alert(JSON.stringify(res.data));
            
            for(var i=0;i<res.data.length;i++) {
                    alert(res.data[i].text);
                    $scope.results.push(res.data[i].text);  
                    $scope.keywordString=$scope.keywordString+res.data[i].text+" ";  
              }

                    if($scope.results == ""){
                        $scope.results.push("COULDNT FIND IT");}
                
            }, function errorCallback(response) {
                alert("ERROR"+JSON.stringify(response));
        }).finally(function(){

                       alert("INSIDE FINALLY");
                       alert("inside else and keyword is "+$scope.keywordString);

           var binglink="http://21fb43a3.ngrok.com/searchResults";

           $http.post(binglink, {keywords : $scope.keywordString }).then(function (res){
                    alert("inside bing search api and keyword is "+$scope.keywordString);
                    for(var i=0;i<res.data.length;i++) {
                        alert(res.data[i].Title);
                        $scope.bingResults.push(res.data[i]);  
                    }
                
            }, function errorCallback(response) {
                alert("ERROR"+JSON.stringify(response));
        }).finally(function(){
            alert("inside another finally");
                var ocrLink="http://21fb43a3.ngrok.com/ocr"
                $http.post(ocrLink, {imageURL : "http://21fb43a3.ngrok.com/uploads/"+fName }).then(function (res){
                    
                        alert(JSON.stringify(res.data));
            
                    ocrResult=res.data.summary;  
              

                    if($scope.ocrResults == ""){
                        $scope.results.push("COULDNT FIND IT");}
                
            }, function errorCallback(response) {
                alert("ERROR"+JSON.stringify(response));
        });

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
            var fName=options1.fileName; 
            var link=  "http://21fb43a3.ngrok.com/recognition";
            alert("File Name"+fName);
            $http.post(link, {imageURL : "http://21fb43a3.ngrok.com/uploads/"+fName }).then(function (res){
                    
                        alert(JSON.stringify(res.data));
            
            for(var i=0;i<res.data.length;i++) {
                    alert(res.data[i].text);
                    $scope.results.push(res.data[i].text);  
                    $scope.keywordString=$scope.keywordString+res.data[i].text+" ";  
              }

                    if($scope.results == ""){
                        $scope.results.push("COULDNT FIND IT");}
                
            }, function errorCallback(response) {
                alert("ERROR"+JSON.stringify(response));
        }).finally(function(){

                       alert("INSIDE FINALLY");
                       alert("inside else and keyword is "+$scope.keywordString);

           var binglink="http://21fb43a3.ngrok.com/searchResults";

           $http.post(binglink, {keywords : $scope.keywordString }).then(function (res){
                    alert("inside bing search api and keyword is "+$scope.keywordString);
                    for(var i=0;i<res.data.length;i++) {
                        alert(res.data[i].Title);
                        $scope.bingResults.push(res.data[i]);  
                    }
                
            }, function errorCallback(response) {
                alert("ERROR"+JSON.stringify(response));
        }).finally(function(){
            alert("inside another finally");
                var ocrLink="http://21fb43a3.ngrok.com/ocr"
                $http.post(ocrLink, {imageURL : "http://21fb43a3.ngrok.com/uploads/"+fName }).then(function (res){
                    
                        alert(JSON.stringify(res.data));
            
                    ocrResult=res.data.summary;  
              

                    if($scope.ocrResults == ""){
                        $scope.results.push("COULDNT FIND IT");}
                
            }, function errorCallback(response) {
                alert("ERROR"+JSON.stringify(response));
        });

        });

        });
        }, 
        function(error) {document.write("error"+JSON.stringify(error));},
         options1);


            });
 //           $ionicLoading.show({template: 'Foto acquisita...', duration:500});
        },
        function(err){
   //         $ionicLoading.show({template: 'Errore di caricamento...', duration:500});
        })
    };

    $scope.getBingResults = function() {

           alert("inside else and keyword is "+$scope.keywordString);

           var binglink="http://21fb43a3.ngrok.com/searchResults";

           $http.post(binglink, {keywords : $scope.keywordString }).then(function (res){
                    alert("inside bing search api and keyword is "+$scope.keywordString);
                    for(var i=0;i<res.data.length;i++) {
                        alert(res.data[i].title);
                        $scope.bingResults.push(res.data[i]);  
                    }
                
            }, function errorCallback(response) {
                alert("ERROR"+JSON.stringify(response));
        });

    
          }

});