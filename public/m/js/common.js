/**
 * Created by cfb on 2019/1/31.
 */
/*��ֹiphone������ϵ��϶�¶��*/
document.querySelector('.content').addEventListener('touchmove', function(e) {
    e.preventDefault();
});
/*�жϵ�loginҳ���Ƿ���returnUrl*/
/**
 * ��ȡ�ƶ�url������ֵ
 * @param paramName ������
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