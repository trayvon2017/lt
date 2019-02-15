/**
 * Created by cfb on 2019/2/12.
 */
$(function () {
    /*找到要显示搜索历史的区域*/
    $search_history = $('.search_history');
    renderHistoryList();
    /*点击搜索时候的事件*/
    $('.search_box a').on('tap', function () {
            var search = $('.search_box input').val().trim();
            if(!search){
                mui.toast("请输入内容");
            }else{
                //获取到本地存储的历史数据
                var search_keys_str = localStorage.getItem('search_keys_str');
                var search_keys = search_keys_str ? search_keys_str.split(',') : [];
                search_keys.unshift(search);
                localStorage.setItem('search_keys_str',search_keys.join(','));
                location.href = 'searchlist.html?proName='+search;
                /*renderHistoryList();*/
            }
    });
    /*屏蔽form表单的自动提交*/
    $('.search_box form').on('submit', function () {
        $('.search_box a').trigger('tap');
        return false;
    });
    /*点击清空记录*/
    $('.search_history').on('tap','.clear_all', function () {
       localStorage.clear();
        renderHistoryList();
    });
    /*删除单条*/
    $('.search_history').on('tap','.delete_one',function (event) {
        //获取到本地存储的历史数据
        var search_keys_str = localStorage.getItem('search_keys_str');
        var search_keys = search_keys_str ? search_keys_str.split(',') : [];
        var history = $(this).parent().parent().data('history');
        var index = $.inArray(history+'',search_keys);
        search_keys.splice(index,1);
        localStorage.setItem('search_keys_str',search_keys.join(','));
        renderHistoryList();
        /*阻止事件冒泡*/
        event.stopPropagation();

    });
    /*点击跳转*/
    $(document).on('tap','.history_list li',function () {
        //获取到本地存储的历史数据
        var search_keys_str = localStorage.getItem('search_keys_str');
        var search_keys = search_keys_str ? search_keys_str.split(',') : [];
        var history = $(this).data('history');
        location.href = 'searchlist.html?proName='+history;
    });
    function renderHistoryList(){
        //获取到本地存储的历史数据
        var search_keys_str = localStorage.getItem('search_keys_str');
        var search_keys = [];
        /*有搜索历史*/
        if(search_keys_str){
            search_keys = search_keys_str.split(',');
            //模板渲染
            $search_history.html(template('search_history',{history_list:search_keys}));
        }else {        /*无搜索历史*/
            $search_history.html('没有搜索记录');
        }
    }

});
