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
    /*获取url参数*/
    var params = getParams();
    var content = params.proName || '';
    /*首次查询参数配置*/
    var data = {
        page:1,
        pageSize:4
    };
    for(key in params){
        if(key == 'proName'){
            data[key] = params[key];
        }
    }
    console.log(data);
    /*显示到搜索框*/
    $('.search_box input').val(content);
    /*下拉刷新,上啦加载*/
    mui.init({
        pullRefresh : {
            container: '.mui-scroll-wrapper',
            down: {
                auto: true,//首次加载自动上拉刷新一次
                callback : function () {
                    data.page=1;
                    /*ajax请求查询产品*/
                    $.ajax({
                        url:'/product/queryProduct',
                        type:'GET',
                        data:data,
                        dataType:'json',
                        success: function (data) {
                            if(data.data && data.data.length>0){
                                console.dir(data);
                                /*渲染产品*/
                                $('.pro_list>ul').html(template('pro_list',data));
                            }else{
                                $('.pro_list>ul').html('暂无相关产品');
                            }
                            console.dir(mui('.mui-scroll-wrapper'));
                            mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
                            /*之前把上滑加载更多的关闭了,现在重新打开*/
                            mui('.mui-scroll-wrapper').pullRefresh().refresh(true);
                            lastPage = 1;
                        }
                    });
                }
            },
            up: {
                auto: false,//首次加载自动上拉刷新一次
                callback : function () {
                    data.page++;
                    /*ajax请求查询产品*/
                    $.ajax({
                        url:'/product/queryProduct',
                        type:'GET',
                        data:data,
                        dataType:'json',
                        success: function (data) {
                            if(data.data && data.data.length>0){
                                console.dir(data);
                                /*渲染产品*/
                                $('.pro_list>ul').append(template('pro_list',data));
                                mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh();
                            }else{
                                mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh(true);
                            }
                        }
                    });
                }
            }
        }
    });
    /*排序添加点击事件*/
    $('.search_result .rank_rule a').on('tap', function () {
        /*视觉变化*/
        $(this).hasClass('now')?$(this).children('span').toggleClass('fa-angle-down').toggleClass('fa-angle-up'):
            $(this).addClass('now').siblings().removeClass('now');
        $(this).data('rule',$(this).children('span').hasClass('fa-angle-down')?'2':'1');
        $('.search_result .rank_rule a').each(function (index, item) {
            $item = $(item);
            data[$item.data('rulename')]=$item.hasClass('now')?$item.data('rule'):'';
        });
        /*执行带规则的下拉刷新*/
        console.log(data);
        mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();

    });
    /*产品的点击事件,跳转到详情页购买*/
    $('.pro_list').on('tap','.ct_product', function () {
       location.href = 'productdetail.html?id='+$(this).data('id');
    });
});

/*获取url后面的参数*/
function getParams(){
    var search = location.search;
    var params = new Object();
    if(search.indexOf('?')!=-1){
        search = search.substr(1);
        var arr = search.split('&');
        for(var i=0;i<arr.length;i++){
            var temp = arr[i].split('=');
            params[temp[0]] = decodeURIComponent(temp[1]);
        }
    }
    return params;
}