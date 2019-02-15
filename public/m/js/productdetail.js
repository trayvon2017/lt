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

});