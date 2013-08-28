app.controller("infoCtrl",function($scope,AJAX,alertBox){
    $scope.imgdir = APP_ACTION.imgdir;
    AJAX({
        url: APP_ACTION["infoURL"],
        bCall: function () {
            loadingPromp.open("正在获取企业信息...");
        },
        sCall: function (d) {
            if(d.status == "ok") {

                $scope.companyInfo = d.result;
            }
            console.log(d);

        },
        cCall: function () {
            loadingPromp.close();
        },
        eCall:function(){
            alertBox.show({
                'where':document.getElementById('infoAlert'),
                'html':"获取企业信息失败！",
                'type':'danger'
            });
        }
    })

})
