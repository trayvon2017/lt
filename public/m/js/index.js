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
    /*初始化自动轮播*/
    //获得slider插件对象
    var gallery = mui('.mui-slider');
    gallery.slider({
        interval:2000//自动轮播周期，若为0则不自动播放，默认为0；
    });
});
