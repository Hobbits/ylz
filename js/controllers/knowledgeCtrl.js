app.controller("knowledgeCtrl",function($scope,AJAX){
    $scope.knowledge={};
    var getAct=function(index){
        AJAX({
            url: APP_ACTION["knowledgeURL"] + index,
            cache: true,
            bCall: function () {
                loadingPromp.open("正在获取信息...");
            },
            sCall: function (d) {
                console.log(d);
                if(d.status == "ok" && d.result[0]) {
                    $scope.knowledge['content' + index] = d.result[0].content;
                }else{
                    $scope.knowledge['content' + index] = '<div class="alert">看来此页是空的.</div>';
                }
            },
            cCall: function () {
                loadingPromp.close();
            },
            eCall:function(){}
        })
    };
    getAct(1);
    $scope.getContent = function(i){
        getAct(i);
    }
})
