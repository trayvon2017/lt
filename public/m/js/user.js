/**
 * Created by cfb on 2019/2/22.
 */
$(function () {
    /*���������Ϣ����*/
    $.ajax({
        url: '/user/queryUserMessage',
        data: '',
        type: 'GET',
        dataType: 'json',
        success: function(data){
            if(data.error){
                /*û�е�¼,��ת����¼ҳ*/
                location.href = '/m/user/login.html';
            }else{
                $('.username').html(data.username);
                $('.phone').html(data.mobile);
            }
        }
    });
    /*�ǳ�*/
    $('button').on('tap', function () {
        $.ajax({
            url: '/user/logout',
            data: '',
            type: 'GET',
            dataType: 'json',
            success: function(data){
                if(data.error){
                    /*û�е�¼,��ת����¼ҳ*/
                    location.href = '/m/user/login.html';
                }else{
                    mui.toast('�ǳ��ɹ�');
                    setTimeout(function () {
                        location.href = '/m/user/login.html';
                    },2000);
                }
            }
        });
    });
});