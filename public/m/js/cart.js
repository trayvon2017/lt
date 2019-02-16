/**
 * Created by cfb on 2019/2/16.
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
    /*首次加载渲染*/
    /*url参数准备*/
    var data = {
        page: 1,
        pageSize: 10
    }
    requesCartList1stPage();
    /*初始化下拉刷新和上拉加载*/
    mui.init({
        pullRefresh : {
            container:".mui-scroll-wrapper",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            down : {
                auto: false,//可选,默认false.首次加载自动上拉刷新一次
                callback : function () {
                    data.page = 1;
                    /*重新加载第一页的数据*/
                    requesCartList1stPage();
                }
            },
            up : {
                auto: false,//可选,默认false.首次加载自动上拉刷新一次
                callback : function () {
                    data.page ++;
                    /*重新加载第一页的数据*/
                    ifLoginAjaxRequest({
                        url: '/cart/queryCartPaging',
                        data: data,
                        callback: function (data) {
                            var html;
                            /*有数据*/
                            if(data.count && data.count>0){
                                /*渲染数据*/
                                html = template('cart_list',data);
                                $('.cart_list').append(html);
                                mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh();
                            }else{
                                /*提示购物车空的,去购物*/
                                mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh(true);
                            }

                        }
                    });
                }
            }
        }
    });

    /*编辑和删除注册事件*/
    $('.cart_list').on('tap','#edit_pro', function () {
        $item = $(this).parent().parent();
        var li = this.parentNode.parentNode;
        console.dir($item);
        var pid = $item.data('pid');
        var id = $item.data('id');
        var editHtml;
        $.ajax({
            url: '/product/queryProductDetail',
            data: {
                id: pid
            },
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                editHtml = '<div class="pro_size">'+
                    '                        <label for="size">尺码:</label>'+
                    '                        <input id="size" name="size" type="text" hidden="">';
                var sizearr = data.size.split('-');
                var min = sizearr[0];
                var max = sizearr[1];
                for(var i=min;i<=max;i++) {
                    editHtml += '<a href="javascript:void(0);">' + i + '</a>';
                }
                editHtml += '</div>'+
                    '<div class="pro_count">'+
                    '<label for="count">数量:</label><a class="dec" href="#"><span class="fa fa-minus"></span></a><input id="count" name="count" type="number" data-max="20" value="1" readonly=""><a href="#" class="inc"><span class="fa fa-plus"></span></a><span>库存:</span><span>20</span>'+
                    '</div>';

                var btnArray = ['是', '否'];
                mui.confirm(editHtml, '编辑产品', btnArray, function(e) {
                    if (e.index == 0) {
                        //发送请求 修改该条购物车数据
                        $.ajax({
                            url: '/cart/updateCart',
                            type: 'POST',
                            data: {
                                id: id,
                                size: $('.pro_size input').val(),
                                num: $('#count').val()
                            },
                            dataType: 'json',
                            success: function(){
                                /*修改当前页面上的尺码和数量*/
                                $item.children().children().children().children('.size').html(
                                    '尺码:'+$('.pro_size input').val()
                                );
                                $item.children().children().children().children('.num').html(
                                    '数量:'+$('#count').val()
                                );
                                mui.swipeoutClose(li);
                            }
                        });
                    } else {
                        /*什么都不用做*/
                    }
                })
            }
        });
    });
    $('.cart_list').on('tap','#delete_pro', function () {
        alert(2);
    });
    /*选择尺码,以及数量控制*/
    $('body').on('tap','.pro_size a', function () {
        $(this).addClass('now').siblings().removeClass('now');
        $('.pro_size input').val($(this).html());
    });
    $('body').on('tap','a.dec', function () {
        var count = $('#count').val() - 1;
        if(count<1){
            mui.toast('最少选择一件');
        }else{
            $('#count').val(count);
        }
    });
    $('body').on('tap','a.inc', function () {
        var count = parseInt($('#count').val()) + 1;
        if(count>$('#count').data('max')){
            mui.toast('最多选择'+$('#count').data('max')+'件');
        }else{
            $('#count').val(count);
        }
    });
    function requesCartList1stPage(){
        /*判断登录的ajax*/
        ifLoginAjaxRequest({
            url: '/cart/queryCartPaging',
            data: data,
            callback: function (data) {
                var html;
                /*有数据*/
                if(data.count && data.count>0){
                    /*渲染数据*/
                    html = template('cart_list',data);
                }else{
                    /*提示购物车空的,去购物*/
                    html = '购物车空空如也，快去逛逛吧！'
                }
                $('.cart_list').html(html);
                mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
                mui('.mui-scroll-wrapper').pullRefresh().refresh(true);
            }
        });
    }
});
