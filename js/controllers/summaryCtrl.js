app.controller("summaryCtrl",function($scope,AJAX,loadingPromp,CacheLocal){
    $scope.summary={}

    var getAct=function(index,cb){
        AJAX({
            url: APP_ACTION["summaryURL"]+index,
            cache:CacheLocal,
            bCall: function () {
                loadingPromp.open("正在获取信息...");
            },
            sCall: function (d) {
                if(d.status == "ok" && d.result[0]) {
                    if(angular.isFunction(cb)){
                        cb(index,d.result[0].content);
                    }
                }else{
                    cb(index,'<div class="alert">看来此页是空的.</div>');
                }


            },
            cCall: function () {
                loadingPromp.close();
            },
            eCall:function(){}
        })
    };
    getAct(1,function(index,content){
        $scope.summary['content'+index]=content;
        $scope.summary.summaryIndex=index;
    });


    $scope.getContent=function(index){
        var changepage=function(i){
            if(i>$scope.summary.summaryIndex){
                $scope.animateType={enter: 'slide2left-enter', leave: 'slide2left-leave'};
            }else{
                $scope.animateType={enter: 'slide2right-enter', leave: 'slide2right-leave'};
            }
            $scope.summary.summaryIndex=i;
        };
        if(!$scope.summary['content'+index]){
            getAct(index,function(index,content){
                $scope.summary['content'+index]=content;
                changepage(index);
            });
        }else{
            changepage(index);
        }



     }
})
