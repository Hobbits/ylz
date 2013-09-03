app.controller("barlistCtrl", function($scope,AJAX,loadingPromp,$sessionStorage){

    $scope.imgURL=APP_ACTION['imgdir'];

     var getList=function(pagenum){
         var newajax=AJAX({
             url: APP_ACTION["forumURL"],
             cache: true,
             bCall:function(){loadingPromp.open('加载列表...')},
             sCall: function (d) {
                 if(d.status == "ok" && d.result.length > 0) {
                     $scope.barlist = d.result;

                     for(f in d.result){
                         var fobj=d.result[f];
                         $sessionStorage['forumlist'+fobj.fid]=$scope.imgURL+fobj.image;
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


})
