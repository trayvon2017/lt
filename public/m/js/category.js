/**
 * Created by cfb on 2019/2/1.
 */
$(function () {
    /*区域滚动*/
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
    /*首次加载渲染分类*/
    ajax({
        url: '/category/queryTopCategory',
        type: 'GET',
        dataType : 'json',
        data : '',
        success : function (data) {
            //console.log(data);
            console.log(template('topCate',data));
            $('.first_ca ul').html(template('topCate',data));
        }
    });
    $.ajax({
        url: '/category/querySecondCategory',
        type : 'GET',
        data:{
            id : 1
        },
        dataType : 'json',
        success : function (data) {
            $('.ca_content ul').html(template('ca_content',data));
        }
    });
    /*左侧a标签注册点击事件*/
    $('.first_ca ul').on('tap','a', function () {
        var $li = $(this).parent();
        var cateId = $li.data('id');
        console.log(cateId);
        $li.addClass('now').siblings().removeClass('now');
        /*渲染右侧数据*/
        $.ajax({
            url: '/category/querySecondCategory',
            type : 'GET',
            data:{
                id : cateId
            },
            dataType : 'json',
            success : function (data) {
                $('.ca_content ul').html(template('ca_content',data));
            }
        });
    });
});