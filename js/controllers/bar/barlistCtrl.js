app.controller("barlistCtrl", function($scope,AJAX,loadingPromp,$sessionStorage){

    $scope.imgURL=APP_ACTION['imgdir'];
    var newajax;
     var getList=function(pagenum){
         newajax=AJAX({
             url: APP_ACTION["forumURL"],
             cache: true,
             bCall:function(){loadingPromp.open('加载列表...')},
             sCall: function (d) {
                 if(d.status == "ok" && d.result.length > 0) {
                     $scope.barlist = d.result;

                     for(f in d.result){
                         var fobj=d.result[f];
                         $sessionStorage['forumlist'+fobj.fid]={
                             bg:$scope.imgURL+fobj.image || 'images/forumdefaultbg.jpg',
                             title:fobj.name || '帖子列表'
                         };
                     }

                 }
             },
             cCall: function () {
                 loadingPromp.close();
             },
             eCall:function(){}
         });
     };

    getList(1);

    $scope.$on('$destroy',function(e){
        newajax.resolve();
    })
})
