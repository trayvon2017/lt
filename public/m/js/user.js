/**
 * Created by cfb on 2019/2/22.
 */
$(function () {
    /*请求个人信息数据*/
    $.ajax({
        url: '/user/queryUserMessage',
        data: '',
        type: 'GET',
        dataType: 'json',
        success: function(data){
            if(data.error){
                /*没有登录,跳转到登录页*/
                location.href = '/m/user/login.html';
            }else{
                $('.username').html(data.username);
                $('.phone').html(data.mobile);
            }
        }
    });
    /*登出*/
    $('button').on('tap', function () {
        $.ajax({
            url: '/user/logout',
            data: '',
            type: 'GET',
            dataType: 'json',
            success: function(data){
                if(data.error){
                    /*没有登录,跳转到登录页*/
                    location.href = '/m/user/login.html';
                }else{
                    mui.toast('登出成功');
                    setTimeout(function () {
                        location.href = '/m/user/login.html';
                    },2000);
                }
            }
        });
    });
});