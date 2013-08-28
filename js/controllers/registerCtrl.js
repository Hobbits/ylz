app.controller("registerCtrl",function($scope,$q,$http,$location,$timeout,alertBox){
    var regForm,formdata,regAlert;
    $scope.regSubmit = function() {
        regForm = document.getElementById("regForm");
        formdata = new FormData(regForm);
        console.log(formdata);

        $http.post(APP_ACTION["registerURL"], formdata, {
            headers: { 'Content-Type': false },
            transformRequest: function(data) { return data; }
        }).success(function(d, status, headers, config){
                console.log(d);
                if(d && d.status == "ok"){
                    if(regAlert){
                        regAlert.change("注册成功","success");
                    } else {
                        regAlert = alertBox.show({
                            'where':document.getElementById('regAlert'),
                            'html':"注册成功！",
                            'type':'success',
                            "dismissable":false
                        });
                    }
                    $timeout(function(){
                        $location.path("/login");
                    },1000);
                } else if(d.status == "no"){
                    if(regAlert){
                        regAlert.change(d.result, "danger");
                    } else {
                        regAlert = alertBox.show({
                            'where':document.getElementById('regAlert'),
                            'html': d.result,
                            'type':"danger",
                            "dismissable":false
                        });
                    }
                }
            }).error(function(data, status, headers, config) {

            });
    }

    $scope.pickImg = function(){
        $("#upload_avatar").click();
    }

})


app.directive("file", function() {
    var files,f;
    return {
        scope: {
            file: '='
        },
        link: function(scope, element, attrs) {
            element.bind('change', function(event) {
                files = event.target.files;
                f = files[0];
                if(!f.type.match('image.*')){
                    return null;
                }
                var reader = new FileReader();
                reader.onload = function(e){
                    var DataURIScheme = this.result;
                    $("#head_portrait").attr("src", DataURIScheme);
                    $("#imgSize").text(Math.ceil(f.size/1000) + "KB");
                }
                reader.readAsDataURL(f);
//                scope.$apply();
            })
        }

    }
})

