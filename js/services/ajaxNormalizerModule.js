(function(){
    var normalizer=angular.module('regou.ajaxNormalizer', [], function($httpProvider)
    {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];

        // Use x-www-form-urlencoded Content-Type
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

        // Override $http service's default transformRequest

        /* PHP接收
        *$allposts = file_get_contents("php://input");
        *$all = json_decode($allposts);
        */

//        $httpProvider.defaults.transformRequest = [function(data)
//        {
//            /**
//             * The workhorse; converts an object to x-www-form-urlencoded serialization.
//             * @param {Object} obj
//             * @return {String}
//             */
//            var param = function(obj)
//            {
//                var query = '';
//                var name, value, fullSubName, subName, subValue, innerObj, i;
//
//                for(name in obj)
//                {
//                    value = obj[name];
//
//                    if(value instanceof Array)
//                    {
//                        for(i=0; i<value.length; ++i)
//                        {
//                            subValue = value[i];
//                            fullSubName = name + '[' + i + ']';
//                            innerObj = {};
//                            innerObj[fullSubName] = subValue;
//                            query += param(innerObj) + '&';
//                        }
//                    }
//                    else if(value instanceof Object)
//                    {
//                        for(subName in value)
//                        {
//                            subValue = value[subName];
//                            fullSubName = name + '[' + subName + ']';
//                            innerObj = {};
//                            innerObj[fullSubName] = subValue;
//                            query += param(innerObj) + '&';
//                        }
//                    }
//                    else if(value !== undefined && value !== null)
//                    {
//                        query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
//                    }
//                }
//
//                return query.length ? query.substr(0, query.length - 1) : query;
//            };
//
//            return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
//        }];
    });


    normalizer.factory('AJAX', function($http,$q){
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
    })


})()