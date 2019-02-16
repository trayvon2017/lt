/**
 * Created by cfb on 2019/2/15.
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
    /*ajax请求数据,渲染当前页面*/
    $.ajax({
        url:'/product/queryProductDetail',
        data:{id:getValue('id')},
        type:'GET',
        dataType:'json',
        success: function (data) {
            /*渲染页面*/
            $('.mui-scroll').html(template('pro_detail',data));
            //获得slider插件对象
            var gallery = mui('.mui-slider');
            gallery.slider({
                interval:0//自动轮播周期，若为0则不自动播放，默认为0；
            });
        }
    });
    /*选择尺码*/
    $('.content').on('tap','.pro_size a', function () {
        $(this).addClass('now').siblings().removeClass('now');
        $('.pro_size input').val($(this).html());
    });
    $('.content').on('tap','a.dec', function () {
        var count = $('#count').val() - 1;
        if(count<1){
            mui.toast('最少选择一件');
        }else{
            $('#count').val(count);
        }
    });
    $('.content').on('tap','a.inc', function () {
        var count = parseInt($('#count').val()) + 1;
        if(count>$('#count').data('max')){
            mui.toast('最多选择'+$('#count').data('max')+'件');
        }else{
            $('#count').val(count);
        }
    });
    /*添加购物车按钮*/
    $('.tab_control a:nth-of-type(2)').on('tap', function () {
        /*未勾选尺码或者库存数不满足要求时候提醒*/
        var size = $('#size').val();
        if(!size){
            mui.toast('请选择尺码');
            return;
        }
        console.log($('#count').val());
        var count = parseInt($('#count').val());
        var max = $('#count').data('max');
        if(!count || count<1 || count > max){
            mui.toast('最少购买1件,最多购买'+ $('#count').data('max') +'件');
            return;
        }
        /*添加购物车,有登录需求的ajax请求*/
        ifLoginAjaxRequest({
            url: '/cart/addCart',
            type:'POST',
            data:{
                productId:getValue('id'),
                num:count,
                size:size
            },
            callback: function (data) {
                /*跳出确认框*/
                var btnArray = ['好', '我还要逛逛'];
                mui.confirm('要去购物车看看吗？', '添加成功', btnArray, function(e) {
                    if (e.index == 0) {
                        /*跳转购物车*/
                        location.href = 'cart.html';
                    } else {
                        mui.toast('稍后您可以手动点击购物车查看');
                    }
                });
            }
        });
    });
});