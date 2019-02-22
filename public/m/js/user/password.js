/**
 * Created by cfb on 2019/2/22.
 */
$(function () {
    var timer;
    $('#get_vfcode').on('tap', function () {
        if(!timer){
            /*发送验证码的逻辑*/
            /*页面显示变化*/
            console.log(123);
            var t = 60;
            var that = $(this);
            timer = setInterval(function () {
                t--;
                that.html(t + '秒后可再次发送');
                if(t==0){
                    clearInterval(timer);
                    that.html('获取验证码');
                }
            },1000);
        }else{
            mui.toast('让验证码飞一会儿(∩_∩)O');
        }
    });
    $('#confirm').on('tap', function () {
        /*获取*/
        var oldP = $('#oldPassword').val();
        var newP = $.trim($('#newPassword').val());
        var confirmP = $.trim($('#confirmPassword').val());
        /*首先判断两次输入的密码是否相等*/
        if(newP == ''){
            mui.toast('请按要求输入');
        }else if(newP != confirmP){
            mui.toast('两次输入的新密码不一致,请重新输入');
        }else{
            $.ajax({
                url: '/user/updatePassword',
                data: {
                    oldPassword: oldP,
                    newPassword: confirmP
                },
                type: 'POST',
                dataType: 'json',
                success: function (data) {
                    console.log(data);
                    setTimeout(function () {
                        if(data.success && data.success == true){
                            /*修改成功*/
                            mui.toast('修改成功');
                            location.href = '/m/user.html';
                        }else{
                            mui.toast('修改失败,请重试');
                            /*清空输入表单*/
                            $('#oldPassword').val('');
                            $('#newPassword').val('');
                            $('#confirmPassword').val('');
                        }
                    },5000);

                }
            })
        }
    });
});