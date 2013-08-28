//var SERVER = 'http://192.168.1.116/ylz/code/index.php'; //朱
//var SERVER_ROOT = 'http://192.168.1.116/ylz/code/';


//var SERVER = 'http://192.168.1.111/ylz/code/index.php'; //钮
//var SERVER_ROOT = 'http://192.168.1.111/ylz/code/';

var SERVER = 'http://yunku.4pu.com/yzd/code/index.php'; //服务器
var SERVER_ROOT = 'http://yunku.4pu.com/yzd/code/';

// var SERVER = 'http://192.168.1.2/yzd/code/index.php'; //服务器



var APP_ACTION = {
    imgdir:SERVER_ROOT+'uploads/',
    goodsURL : SERVER + '/Product_category/get_all', 
    goodslistURL : SERVER + '/Product/get_by_category/', /*商品列表*/
    goodsDetailURL : SERVER + '/Product/get_detail/',   /*商品详情*/
    infoURL : SERVER + '/Company/getcompany',  /*企业信息*/
    summaryURL: SERVER + '/Company/summary/',/*企业概况*/
    newsURL: SERVER + '/Article/', /*新闻资讯*/
    newsDetailURl: SERVER + '/Article/get_articlecontent/',  /*新闻详情*/
    knowledgeURL: SERVER + '/Article/get_ylz_knowledge/', /*银离子知识*/
    questionURL: SERVER + '/Faq/get_questions', /*银离子疑问*/ 
    registerURL: SERVER + '/User/register',  /*注册*/
    loginURL: SERVER + '/User/login' /*登录*/


}
