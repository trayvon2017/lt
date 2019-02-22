/**
 * Created by cfb on 2019/2/22.
 */
$(function () {
    /*初始化区域滚动组件*/
    var muiScrollOptions = {
        scrollY: true, //是否竖向滚动
        scrollX: false, //是否横向滚动
        startX: 0, //初始化时滚动至x
        startY: 0, //初始化时滚动至y
        indicators: false, //是否显示滚动条
        deceleration:0.0006, //阻尼系数,系数越小滑动越灵敏
        bounce: true //是否启用回弹
    };
    mui('.mui-scroll-wrapper').scroll(muiScrollOptions);

    /*查询地址*/
    ifLoginAjaxRequest({
        url: '/address/queryAddress',
        data: '',
        type: 'GET',
        dataType: 'json',
        callback: function(data){
            if(data.length && data.length>0){
                console.log(template('address_list',{data:data}))
                /*渲染页面*/
                $('.address_list').html(template('address_list',{data:data}));
            }else{
                /*提示暂无地址 添加*/
            }
        }
    });
    $('.address_list').on('tap','#del', function (e) {
        $this = $(this);
        var btnArray = ['是', '否'];
        mui.confirm('', '删除该收货地址', btnArray, function(e) {
            if (e.index == 0) {
                /*ajax请求删除*/
                ifLoginAjaxRequest({
                    url: '/address/deleteAddress',
                    data: {
                        id: $this.data('id')
                    },
                    type: 'POST',
                    dataType: 'json',
                    callback: function(data){
                        if(data.success && data.success == true){
                            /*页面删除*/
                            $this.parent().parent().remove();
                        }else{
                            mui.toast('删除失败,请稍后重试');
                        }
                    }
                });
            }
        })
        e.stopPropagation();
    });
    $('body').on('tap','li', function () {
        var id  = $(this).find('a#del').data('id');
        location.href = '/m/user/add-address.html?id='+id;
    });
});