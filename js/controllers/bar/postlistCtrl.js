app.controller("postlistCtrl",function($scope,$routeParams,$sessionStorage,loadingPromp,AJAX,$navigate,paginationServ){
    var fid=$routeParams['fid'];

    paginationServ.toogle($scope,true);
    var newpostHtml="<span class='glyphicon glyphicon-edit'></span>";

    $scope.$on('middleBtn',function(){
        /*点了中间的按钮*/
        $navigate.go('/addnewpost'+fid);
    });

    /*设定背景*/
    var forumbg=$sessionStorage['forumlist'+fid];
    $scope.forumbgStyle={'backgroundImage':'url('+forumbg+')'};
    $scope.imgURL=APP_ACTION['imgdir'];
    var paginal=10;/*每页多少条*/
    var getList=function(pagenum){
        AJAX({
            url: APP_ACTION["getpostsURL"]+fid+"/"+pagenum+"/"+paginal,
                cache: false,
                bCall:function(){loadingPromp.open('加载列表...')},
                sCall: function (d) {
                    if(d.status=="ok"){
                        console.log(d);
                        $scope.postlist= d.result;
                        console.log(d.result);
                        if(('totalItem' in d.remark) && d.remark['totalItem']>=1 ){
                            var totalpage=Math.ceil(d.remark['totalItem']/paginal);
                            paginationServ.setter($scope,pagenum,totalpage,newpostHtml);
                        }
                    }else{

                    }

            },
            cCall: function () {
                loadingPromp.close();
            },
            eCall:function(){}
        })
    };
    paginationServ.setter($scope,1,1,newpostHtml);
    getList(1);


    $scope.$on('pagination',function(evt,o){
        /*被点击上一页或下一页事件*/
        if(o && o.where && o.curpageNum){
            var newPageNum= o.curpageNum;
            if(o.where=="next"){
                newPageNum++;
            }else if(o.where=="pre"){
                newPageNum--;
            };

            getList(newPageNum);
        }
    });



    $scope.$on('$destroy',function(){
        paginationServ.toogle($scope,false);
    })


})