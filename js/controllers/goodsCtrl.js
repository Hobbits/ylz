app.controller("goodsCtrl", function($scope,AJAX,loadingPromp){
    AJAX({
        url: APP_ACTION["goodsURL"],
        bCall: function () {
            loadingPromp.open("正在加载...");
        },
        sCall: function (d) {
            console.log(d);
            $scope.products = d;

        },
        cCall: function () {
            loadingPromp.close();
        }
    })
})
