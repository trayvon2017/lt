/**
 * Created by cfb on 2019/2/15.
 */
$(function () {
    /*登录按钮绑定事件*/
    $('#login').on('tap', function () {
        /*盘算两个输入框的状态*/
        var username = $.trim($('#username').val());
        var password = $.trim($('#password').val());
        if(!password || !username){
            mui.toast('账号或密码不能为空');
        }else {
            /*ajax登录*/
            $.ajax({
                url:'/user/login',
                type:'POST',
                data:{
                    username:username,
                    password:password
                },
                dataType:'json',
                success: function (data) {
                    if(data.success){
                        //alert('登录成功');
                        alert(getReturnUrl());
                        console.log(getReturnUrl());
                        location.href = getReturnUrl()|| '../index.html';
                    }else if(data.error) {
                        alert("登录失败");
                    }
                }
            });
        }
    });
});
