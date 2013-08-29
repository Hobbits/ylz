app.controller("loginCtrl",function($scope,AJAX,alertBox,$location,$timeout,$localStorage,$navigate){
    var ajax1, p, loginAlertMsg;
    $scope.form = {};
    $scope.form.rememberPsw = true; //默认记住密码
    var changeBtn=function(text,bol){
        $scope.subBtn={isOff:bol,submitText:text};
    };

    var naved=false;
    $scope.$on('$pageNaved',function(){
        if(naved){return}
        naved=true;
        var userLoginInfo = $localStorage.userLoginInfo;
        if(angular.isObject(userLoginInfo)){
            $scope.form.user_name = userLoginInfo.user_name;
            $scope.form.user_password = userLoginInfo.user_password;
        }
    })

    $scope.sendForm = function(){
       if(!angular.isObject(loginAlertMsg)){
           loginAlertMsg = alertBox.show({
               'where':document.getElementById('loginAlert'),
               "dismissable":false,
               "html": ""
           });
       }
       if($scope.form.user_name == undefined || $scope.form.user_password == undefined){
           loginAlertMsg.change("请输入账号和密码!","danger");
           return;
       }
       p = {
           'user_name':$scope.form.user_name,
           'user_password':$scope.form.user_password
       }
       ajax1 = AJAX({
           url: APP_ACTION["loginURL"],
           p: p,
           method: "POST",
           bCall: function () {
               loadingPromp.open("正在登录...");
               changeBtn("登录中",true);
           },
           sCall: function (d) {
               if(typeof(d)=="object" && d.status == "ok"){
                   loginAlertMsg.change("登录成功","success");
                   if($scope.form.rememberPsw){ //记住密码时存储用户信息
                       $localStorage.userLoginInfo = p;
                   } else {
                       $localStorage.userLoginInfo = "";
                   }
                   $timeout(function(){
                       loginAlertMsg.hide();
                       $navigate.go('/',null,true);
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
        if(ajax1 && angular.isObject(ajax1)){
            ajax1.resolve();
        }
    })
})
