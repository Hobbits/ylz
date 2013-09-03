app.controller("centerCtrl",function($scope,loadingPromp,AJAX,$navigate,$localStorage){
    $scope.imgdir =APP_ACTION.imgdir;
    var ajax1=AJAX({
        url: APP_ACTION["centerURL"],
        bCall: function () {
            loadingPromp.open("正在进入个人中心...");
        },
        sCall: function (d) {
            console.log(d);
            if(d && d.status == "ok"){
                $scope.user = d.result;
                $scope.posts = d.remark;
            }
        },
        cCall: function () {
            loadingPromp.close();
        }
    });

    var ajax2;
    $scope.logout = function() {
        ajax2=AJAX({
            url: APP_ACTION["logoutURL"],
            sCall: function (d) {
                console.log(d);
                if(d && d.status == "ok"){
                    delete $localStorage.userInfo;
                    $navigate.go('/');
                }
            }
        });
    }
    
    $scope.$on('$destroy',function(e){
        ajax1.resolve();
        try{ajax2.resolve();}catch(e){}
    })
    
})
