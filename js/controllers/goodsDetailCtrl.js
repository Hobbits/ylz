app.controller("goodsDetailCtrl", function($scope,headerChanger,$routeParams,AJAX,loadingPromp){
    var goodsId = $routeParams.goodsId;
    AJAX({
        url: APP_ACTION["goodsDetailURL"] + goodsId,
        bCall: function () {
            loadingPromp.open("正在获取商品信息...");
        },
        sCall: function (d) {
            console.log(d);
            if(d.status=="ok"){
                $scope.goodsDetail = d["result"][0];
                //headerChanger.send({pageTitle: d.remark});
//                $scope.$emit('$headerChangeEvt',{pageTitle: d.remark})
            }
        },
        cCall: function () {
            loadingPromp.close();
        },
        eCall:function(){
            alert("获取商品信息失败！");
        }
    })

    $scope.showImg = function(param) {
        var img = $("#modal-body img:visible");
        var index = img.index();
        console.log(img.get(0));
        console.log(index);
        img.hide();
        if(param == 1) {
            $(".modal-body img").eq(index-1).show();
        } else if(param == 2) {
            var len = $(".modal-body img").length;
            if(index == (len-1)) index = -1;
            $(".modal-body img").eq(index+1).show();
        }


    }

})

