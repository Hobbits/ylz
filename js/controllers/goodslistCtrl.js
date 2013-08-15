app.controller("goodslistCtrl", function($scope,$routeParams,AJAX,loadingPromp,headerChanger){

    var goodslistId = $routeParams.goodslistId;
    AJAX({
        url: APP_ACTION["goodslistURL"] + goodslistId,
        bCall: function () {
            loadingPromp.open("正在获取商品列表...");
        },
        sCall: function (d) {
            console.log(d);
            if(d.status=="ok"){
                headerChanger.send({pageTitle: d.remark});
                //$scope.$emit('$headerChangeEvt',{pageTitle: d.remark})
                $scope.goodslist = d.result;
            }else{
//                pop.open(d.result);
            }
        },
        cCall: function () {
            loadingPromp.close();
        },
        eCall:function(){
            alert("获取商品列表失败！");
        }
    })

})

