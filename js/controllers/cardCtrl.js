app.controller("cardCtrl", function($scope,$navigate,$timeout){
    $scope.front=true;

    $scope.goin=function(bol){
        if(bol){
            $navigate.go('/info');
        }else{
            $navigate.go('/summary');
        }
    }

    var naved=false;
    $scope.$on('$pageNaved',function(){
        if(naved){return}
        naved=true;
        var img=$("#justgetStyle");
        $timeout(function(){
            var x=img.width();
            var y=img.height();
            var corz_a=[0,y,0,0,x,0,x,y/2].join(",");
            var corz_b=[0,y,x,y,x,y/2].join(",");
            console.log(x,y,$('area'));
            $('#area_a').prop('coords',corz_a);
            $('#area_b').prop('coords',corz_b);
        },500);



    })

})