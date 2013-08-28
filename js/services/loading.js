window.loadingPromp={
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
        self.target.style.display='none';
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
};

//app.factory('loadingPromp', function() {
//    return {
//        timmer:{
//            delay:0,
//            date:null,
//            timeoutId:null
//        },
//        target:(function(){
//            return document.getElementById('ajax-loading');
//        })(),
//        open: function (msg,delay) {
//            var self=this;
//            if(delay!==0){
//                self.timmer.delay=delay||350;
//            }else{
//                self.timmer.delay=0;
//            }
//
//            var msg = msg || "...";
//            self.timmer.date=new Date();
//            clearTimeout(self.timmer.timeoutId);
//            self.timmer.timeoutId=setTimeout(function(){
//                self.target.getElementsByTagName('h1')[0].innerHTML=msg;
//                self.target.style.display='block';
//            },self.timmer.delay);
//        },
//        close: function () {
//            var self=this;
//            var cDate=new Date();
//            if((cDate-self.timmer.date)<=self.timmer.delay){
//                clearTimeout(self.timmer.timeoutId);
//            }
//            self.target.style.display='none';
//        }
//    }
//})
