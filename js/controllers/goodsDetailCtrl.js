app.controller("goodsDetailCtrl", function($scope,loadingPromp,headerChanger,alertBox,$routeParams,AJAX){


    var goodsId = $routeParams.goodsId;
    var all_imgURL = [];
    $scope.imgdir =APP_ACTION.imgdir;


    var naved=false;
    $scope.$on('$pageNaved',function(){
        if(naved){return}
        naved=true;
        var ajax1=AJAX({
            url: APP_ACTION["goodsDetailURL"] + goodsId,
            bCall: function () {
                loadingPromp.open("正在获取商品信息...");
            },
            sCall: function (d) {
                console.log(d);
                if(d.status=="ok"){
                    var r = d["result"][0];
                    $scope.goodsDetail = r;
                    all_imgURL = r.all_img;
                    $scope.imgURL = all_imgURL[0];
                }
            },
            cCall: function () {
                loadingPromp.close();
            },
            eCall:function(data,status, headers, config){
                var gdAlert=document.getElementById('gdAlert');
                if(status){
                    var q=alertBox.show({
                        'where':gdAlert,
                        'html':"服务器通讯错误！",
                        'type':'danger'
                    });
                }else{
                    var q=alertBox.show({
                        'where':gdAlert,
                        'html':"超时！",
                        'type':'danger'
                    });
                }

            }
        })

        var i = 0;
        $scope.showImg = function(param) {
            var len = all_imgURL.length;
            if(param == 1) {
                i--;
                if(i < 0) {i = len-1}
                $scope.imgURL = all_imgURL[i];
            } else if(param == 2) {
                i++;
                if(i >= len) {i = 0}
                $scope.imgURL = all_imgURL[i];
            }
        };


        $scope.$on('$destroy',function(e){
            try{ajax1.resolve();}catch(e){}
        })


    })

})

