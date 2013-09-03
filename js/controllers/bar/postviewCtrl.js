app.controller("postviewCtrl",function($scope,$routeParams,loadingPromp,$sessionStorage,AJAX,$navigate){
    var postid=$routeParams['postid'];
    $scope.imgURL=APP_ACTION.imgdir;
    $scope.postinfo={};


    AJAX({
        url:APP_ACTION['postviewURL']+String(postid),
        bCall:function(){loadingPromp.open('加载内容...')},
        sCall: function (d) {
            console.log(d);

            var getComments=function(tid){
                AJAX({
                    url:APP_ACTION.getcommentURL+tid,
                    bCall:function(){loadingPromp.open('加载评论...')},
                    sCall: function (d) {
                        console.log(d);
                        if(d.status == "ok") {
                           $scope.trueComments= d.result;
                        }
                    },
                    cCall: function () {
                        loadingPromp.close();
                    },
                    eCall:function(){}
                });
            };

            if(d.status == "ok") {
                $scope.postinfo= d.result;
                getComments(postid);
            }
        },
        cCall: function () {
            loadingPromp.close();
        },
        eCall:function(){}
    });


    $scope.comment=function(tid,name,quote){
        console.log(tid,name);
        if(!name){
            delete $sessionStorage.commentingPrefix;
        }else{
            if(!quote){
                $sessionStorage.commentingPrefix="回复："+name+" : ";
            }else{
                $sessionStorage.commentingPrefix="引用"+name+":--“ "+quote+" ”";
            }


        }
        $navigate.go('/addnewcomment'+tid);
    }

})