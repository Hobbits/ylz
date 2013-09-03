(function(){
    document.addEventListener("deviceready", function(){
        var toogleCollapse=function(){
            $("#my_headerCollapse").collapse('toggle');
        }
        document.addEventListener("menubutton", toogleCollapse, false);
    }, false);
})()
