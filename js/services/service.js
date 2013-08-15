app.factory('AJAX', function($http){
    /*url p bCall sCall eCall*/
      var send=function(o,timeout){
          var sendmethod=o.method || "GET";
          if(typeof(o.bCall)=="function"){o.bCall();}

          var httpPatams={}
          if(sendmethod=="GET"){
              httpPatams.url= o.url;
              httpPatams.method =sendmethod;
              httpPatams.params=o.p || {};              
          }else{
              httpPatams.url= o.url;
              httpPatams.method =sendmethod;
              httpPatams.data=o.p || null;
          }
              httpPatams.timeout=timeout || 15000;
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