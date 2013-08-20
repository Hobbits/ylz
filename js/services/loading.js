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
        timmer:{
            delay:0,
            date:null,
            timeoutId:null
        },
        target:(function(){
            return document.getElementById('ajax-loading');
        })(),
        open: function (msg,delay) {
            var self=this;
            if(delay!==0){
                self.timmer.delay=delay||350;
            }else{
                self.timmer.delay=0;
            }

            var msg = msg || "...";
            self.timmer.date=new Date();
            clearTimeout(self.timmer.timeoutId);
            self.timmer.timeoutId=setTimeout(function(){
                self.target.getElementsByTagName('h1')[0].innerHTML=msg;
                self.target.style.display='block';
            },self.timmer.delay);
        },
        close: function () {
            var self=this;
            var cDate=new Date();
            if((cDate-self.timmer.date)<=self.timmer.delay){
                clearTimeout(self.timmer.timeoutId);
            }
            self.target.style.display='none';
        }
    }
})
