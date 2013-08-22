/*启动angular*/
var app=angular.module('myApp', ['ajoslin.mobile-navigate','hmTouchEvents','Cacher']);


app.config(function($httpProvider,$compileProvider) {
    $compileProvider.urlSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel|sms):/);
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
});

app.controller('MainCtrl', function($scope, $navigate) {
    $scope.$navigate = $navigate;
})

/*导航动画
* 用法：添加"nav-to"属性 "ani"属性（动画）ani属性值前加符号为反向
* */
app.directive("navTo",['$navigate', function($navigate){
    return {
        restrict: 'A',
        link: function (scope,element,attrs) {
            Hammer(element[0]).on("tap",function(){
                var path=attrs['navTo'];
                var animate=attrs.ani;
                if(path=='back'){
                    scope.$apply(function(){$navigate.back()});
                }else{
                    if(animate && animate.substr(0, 1) == "-"){
                        animate=animate.substr(1);
                        scope.$apply(function(){$navigate.go(path,animate,true)});
                    }else{
                        scope.$apply(function(){$navigate.go(path,animate)});
                    }

                }
            });
        }
    }
}]);

app.directive("touchact",function(){
    return {
        restrict: 'A',
        link: function (scope,element,attrs) {
            var classname=attrs['touchact'] || 'navfocus';
            element.bind("touchstart",function(){
                try{this.classList.add(classname);}catch(e){}
            });
            element.bind("touchend",function(){
                try{this.classList.remove(classname);}catch(e){}
            })
        }
    }
});

app.run(['$navigate', '$rootScope', function($navigate, $rootScope) {
    //Android back button functionality for phonegap
    document.addEventListener("deviceready", function() {
        document.addEventListener("backbutton", function() {
            $rootScope.$apply(function() {
                var history=$navigate.getHistory();
                if(history.length>=1){
                    var last=history[history.length-1];
                    if(last[0]=="main"){
                        navigator.app.exitApp();
                    }
                }else{
                    navigator.app.exitApp();
                }

            });
        });
    });
}]);


