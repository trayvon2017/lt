/**
 * Created by cfb on 2019/1/31.
 */
/*禁止iphone浏览器上的拖动露底*/
document.querySelector('.content').addEventListener('touchmove', function(e) {
    e.preventDefault();
});
/*判断到login页面是否有returnUrl*/
/**
 * 获取制定url参数的值
 * @param paramName 参数名
 */
function getReturnUrl(){
    var search = location.search;
    var arr;
    var value = '';
    if(search.indexOf('?')!=-1){
        search = search.substr(1);
        arr = search.split('&');
        value = search.substr(search.indexOf('=')+1);
    }
    return value;
}
/**
 * 获取url中某个参数的值
 * @param paramName 参数名
 * @returns {string} 返回字符串类型
 */
function getValue(paramName){
    var search = location.search;
    var arr;
    var value = '';
    if(search.indexOf('?')!=-1){
        search = search.substr(1);
        arr = search.split('&');
        for(var i=0;i<arr.length;i++){
            var temp = arr[i].split('=');
            if(paramName == temp[0]){
                value = decodeURIComponent(temp[1]);
                break;
            }
        }
    }
    return value;
}
/**
 * 需要登录权限的ajax请求
 * @param params ajax请求的一些参数
 */
function ifLoginAjaxRequest(params){
    App.ajax({
        url: params.url,
        type: params.type || 'GET',
        data: params.data || '',
        dataType: params.dataType || 'json',
        success: function (data) {
            if(data.error){
                location.href = '/m/user/login.html?returnUrl='+ location.href;
            }else{
                params.callback(data);
            }
        }
    });
}
if(!App) var App = {};
var mask = mui.createMask(function () {
    
});//callback为用户点击蒙版时自动执行的回调；


App.ajax = function (options) {
    var timer;
    $.ajax({
        url: options.url,
        data: options.data || '',
        dataType: options.dataType || 'GET',
        beforeSend: function(){
            mask.show();//显示遮罩
            timer = setInterval(function () {
                console.log('开始ajax');

            },1000);

        },
        success: function (data) {
            options.success && options.success(data);
            clearInterval(timer);
            console.log('ajax结束');
            mask.close();//关闭遮罩
        }
    })
}