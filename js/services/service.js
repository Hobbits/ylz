app.factory('AJAX', function($http,$q){
    /*url p bCall sCall eCall*/
      var send=function(o){

          var canceler = $q.defer();

          var sendmethod=o.method || "GET";
          if(typeof(o.bCall)=="function"){o.bCall();}

          var httpPatams={
              cache: o.cache||false
          };
          httpPatams.url= o.url;
          httpPatams.method =sendmethod;
          if(sendmethod=="GET"){
              httpPatams.params=o.p || {};              
          }else{
              httpPatams.data=o.p || null;
          };

          /*设定超时*/
          httpPatams.timeout= o.timeout || canceler.promise || 15000;

              $http(httpPatams).success(function(data, status, headers, config){
                      if(typeof(o.sCall)=="function"){
                            o.sCall(data,status, headers, config);
                          };
                      if(typeof(o.cCall)=="function"){
                          o.cCall(data,status, headers, config);
                      };
                  }).error(function(data,status, headers, config){
                      if(typeof(o.eCall)=="function"){
                          o.eCall(data,status, headers, config);
                      };
                      if(typeof(o.cCall)=="function"){
                          o.cCall(data,status, headers, config);
                      };
                  });

          return canceler;
      };
      return send;
});

app.factory('headerChanger', function($rootScope){
    return {
        send:function(o){
            $rootScope.$broadcast("$headerChangeEvt",o);
        }
    };
});

app.factory('alertBox', function(){
    return {
        show:function(o){
//            html,type,dismissable,where
//            type: 'danger' 'info' 'success'
            if(o && o.where){
                var html= o.html || "";
                if('innerHTML' in o.where){
                    var newdom=document.createElement("DIV");
                }else{return false;}

                newdom.className='alert ';
                if(o.dismissable!==false){
                    newdom.className+='alert-dismissable ';
                    newdom.innerHTML='<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>';
                }
                if(o.type){
                    newdom.className+='alert-'+ o.type+' ';
                }
                newdom.innerHTML+='<span class="alertText">'+html+'</span>';
                o.where.appendChild(newdom);
                o.dom=newdom;

                var returnObj={
                    change:function(text,type){
                        var self=this;
                        var dommy=self.getprop('dom');

                        var changeprop=function(key,val){
                            if(key=='html'){
                                dommy.getElementsByClassName('alertText')[0].innerHTML=val;
                            }
                            if(key=='type'){
                                var oldclass='alert-'+self.getprop('type');
//                                console.log(oldclass);
//                                var reg=new RegExp(/(?:^|\s)+oldclass+(?!\S)/g);
//                                dommy.className.replace(reg,'alert-'+val);
                                try{
                                dommy.classList.remove(oldclass);
                                dommy.classList.add('alert-'+val);
                                }catch(e){}
                            }
                            o[key]=val;
                        }

                        if(angular.isString(text)){
                            changeprop('html',text);
                        }
                        if(angular.isString(type)){
                            changeprop('type',type);
                        }
                    },
                    hide:function(){
                        var thedom=this.getprop('dom');
                        try{
                            thedom.parentNode.removeChild(thedom);
                        }catch(e){}

                    },
                    getprop:function(str){
                        return o[str];
                    }
                }
                return returnObj;
            }
        }
    };
});