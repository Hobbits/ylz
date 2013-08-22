app.controller("headerCtrl",function($scope,$rootScope,$navigate,headerChanger){

    var headerCollapse=$("#my_headerCollapse");
    $rootScope.$on("$routeChangeStart",function(){
        try{
            headerCollapse.addClass('noTransition');
            headerCollapse.collapse('hide');
            setTimeout(function(){headerCollapse.removeClass('noTransition');},450);
        }catch(e){}
    });


    $scope.$on("$pageNaved",function(angularEvent,navHistory,curRoute,preRoute){
        if(!curRoute.$$route){
            return
        }
        var curPageRole=null;
        curPageRole=curRoute.$$route['pageRole'];


        $scope.tt.pTitle=curRoute.$$route['pageTitle'];
        if(curPageRole=="main"){
            navHistory=$navigate.eraseHistory('page',curRoute);
        }
        var l=navHistory.length;
        var pre=navHistory[l-2];
        if(pre){
            $scope.tt.bTitle=pre[1].$$route['pageTitle'];
        }else{
            $scope.tt.bTitle=null;
        }


        $scope.navActiveClass=[];
        (function(role){
            if(!role){return}
            var num = (role.replace('nav', ""))*1;
            if(typeof(num)=="number"){
                $scope.navActiveClass=[];
                $scope.navActiveClass[num]="active";
            }
        })(curPageRole);
    });

    $scope.$on("$headerChangeEvt",function(angularEvt,o){
        if(o && o.pageTitle){
            $scope.tt.pTitle= o.pageTitle;
        }
        if(o && o.backTitle){
            $scope.tt.bTitle= o.backTitle;
        }

    })

    $scope.historyBack=function(){
        $navigate.back();
    }






})
