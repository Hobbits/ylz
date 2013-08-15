// app.factory('loadingPromp', function() {
//     return {
//         divStr: "<div id='div_load'><img src='images/loading.gif' /></div>",
//         _init: function() {
//             $(document.body).append(this.divStr);
//             var img = $("#div_load").find('img');
//             img.css('top', (parseInt($("#div_load").height() - img.height()))/2 +'px');
//         },
//         open: function () {
//             var self = this;
//             this._init();
//         },
//         close: function () {
//             if($("#div_load")){
//                 $("#div_load").css("display","none");
//             }
//         }
//     }
// })

app.factory('loadingPromp', function() {
    return {
        open: function (msg) {
            var msg = msg || "";
            var divStr = '<div class="ajax-loading"><h1>'+msg+'</h1></div>';
            $(document.body).append(divStr);
        },
        close: function () {
            if($(".ajax-loading")){
                $(".ajax-loading").remove();
            }
        }
    }
})
