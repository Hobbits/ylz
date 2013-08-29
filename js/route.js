app.config(function($routeProvider) {
        $routeProvider
            .when("/goods", {
                templateUrl: "content/goods.html",
                pageRole:"nav2",
                pageTitle:"产品分类"
            })
            .when("/goodslist/:goodslistId", {
                templateUrl: "content/goodslist.html",
                pageTitle:"产品列表"
            })
            .when("/goodsDetail/:goodsId", {
                templateUrl: "content/goodsDetail.html",
                pageTitle:"产品详情"

            })
            .when("/companycard", {
                templateUrl: "content/companyCard.html",
                pageTitle:"企业名片",
                transition: "slide"
            })
            .when("/info", {
                templateUrl: "content/info.html",
                pageRole:"nav1",
                pageTitle:"企业简介",
                transition: "slide"
            })
            .when("/news", {
                templateUrl: "content/news.html",
                pageTitle:"新闻列表",
                transition: "slide"
            })
            .when("/newsDetail/:newsId", {
                templateUrl: "content/newsDetail.html",
                transition: "slide",
                pageTitle:"新闻内容"
            })
            .when("/knowledge", {
                templateUrl: "content/knowledge.html",
                pageTitle:"银离子知识",
                transition: "slide",
                reverse: false
            })
            .when("/summary", {
                templateUrl: "content/summary.html",
                pageTitle:"企业概况",
                transition: "slide",
                reverse: false
            })
            .when("/question", {
                templateUrl: "content/question.html",
                pageTitle:"银离子疑问",
                transition: "slide",
                reverse: false
            })
            .when("/login", {
                templateUrl: "content/login.html",
                pageTitle:"登录",
                transition: "modal"
            })
            .when("/register", {
                templateUrl: "content/register.html",
                pageTitle:"注册",
                transition: "modal"
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

