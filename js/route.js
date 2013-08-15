app.config(function($routeProvider) {
        $routeProvider
            .when("/two", {
                templateUrl: "content/page2.html",
                pageTitle:"Page2",
                transition: "modal" //this is overwritten by the go() in home.html
            })
            .when("/popup", {
                templateUrl: "content/popup.html",
                pageTitle:"Popup",
                transition: "modal"
            })
            .when("/monkey", {
                templateUrl: "content/monkey.html"
            })
            .when("/backwards", {
                templateUrl: "content/backwards.html",
                pageTitle:"后跳",
                reverse: true
            })
            .when("/goods", {
                templateUrl: "content/goods.html",
                pageRole:"nav2",
                pageTitle:"产品"
            })
            .when("/goodslist/:goodslistId", {
                templateUrl: "content/goodslist.html",
                pageTitle:"产品列表"
            })
            .when("/goodsDetail/:goodsId", {
                templateUrl: "content/goodsDetail.html",
                pageTitle:""

            })
            .when("/info", {
                templateUrl: "content/info.html",
                pageRole:"nav1",
                pageTitle:"企业简介",
                transition: "slide",
                reverse: false
            })
            .when("/", {
                templateUrl: "content/home.html",
                pageRole:"nav0",
                pageRole:"main",
                pageTitle:"首页"

            })
            .otherwise({
                redirectTo: "/"
            });
    })

