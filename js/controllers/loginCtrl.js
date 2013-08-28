app.controller("loginCtrl",function($scope,AJAX,alertBox,$location,$timeout){
    var changeBtn=function(text,bol){
        $scope.subBtn={isOff:bol,submitText:text};
    };
    var ajax1;
    var loginAlertMsg = null;
    $scope.form = {};
    $scope.sendForm = function(){
       if(!angular.isObject(loginAlertMsg)){
           loginAlertMsg = alertBox.show({
               'where':document.getElementById('loginAlert'),
               "dismissable":false
           });
       }
       ajax1 = AJAX({
           url: APP_ACTION["loginURL"],
           p: {
               'user_name':$scope.form.user_name,
               'user_password':$scope.form.user_password,
               'rememberPsw':$scope.form.rememberPsw
           },
           method: "POST",
           bCall: function () {
               loadingPromp.open("正在登录...");
               changeBtn("登录中",true);
           },
           sCall: function (d) {
               console.log(d);
               if(typeof(d)=="object" && d.status == "ok"){
                   loginAlertMsg.change("登录成功","success");
                   $timeout(function(){
                       loginAlertMsg.hide();
                       $location.path('/');
                   },1000);
               } else if(typeof(d)=="object" && d.status == "no") {
                   loginAlertMsg.change(d.result,"danger");
               }
           },
           cCall: function () {
               loadingPromp.close();
               changeBtn("登录",false);
           },
           eCall:function(){
               loginAlertMsg.change("登录失败！","danger");
           }
       })
    }

    $scope.$on('$destroy',function(e){
        ajax1.resolve();
    })
})
