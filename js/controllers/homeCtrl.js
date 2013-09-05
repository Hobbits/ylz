app.controller("homeCtrl",function($scope,$localStorage,$http,headerChanger){
    var getCommentTip = function(){
        $http({
            method: 'GET',
            url: APP_ACTION["commentTipURL"]
        }).success(function(d) {
            if(d && d.status=="ok"){
                var commentTipNum = d.result.alertmessage;
                if(commentTipNum > 0){
                    $scope.commentTipNum = commentTipNum;
                    $scope.hasNewComment =true;
                }
            }

        })
    };

    var naved=false;
    $scope.$on('$pageNaved',function(){
        if(naved){return}
        naved=true;
        headerChanger.send({pageTitle: '银离子课堂'});
    });

    if(angular.isDefined($localStorage.userInfo)){
        getCommentTip();
    }

})