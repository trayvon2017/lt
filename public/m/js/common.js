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
        console.log(arr);
        console.log(search.indexOf('='));
        console.log(search.substr(0,search.indexOf('=')));
        console.log(search.substr(search.indexOf('=')+1));
        value = search.substr(search.indexOf('=')+1);
    }
    return value;
}