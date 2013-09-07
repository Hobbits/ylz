app.controller("goodsCtrl", function($scope,loadingPromp,AJAX){
    var ajax1=AJAX({
        url: APP_ACTION["goodsURL"],
        cache:true,
        bCall: function () {
            loadingPromp.open("正在加载...");
        },
        sCall: function (d) {
            $scope.products = d;
        },
        cCall: function () {
            loadingPromp.close();
        }
    });

    $scope.$on('$destroy',function(e){
         try{ajax1.resolve();}catch(e){}
    })
})
