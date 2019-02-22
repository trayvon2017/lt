/**
 * Created by cfb on 2019/2/1.
 */
$(function () {
    /*�������*/
    var muiScrollOptions = {
        scrollY: true, //�Ƿ��������
        scrollX: false, //�Ƿ�������
        startX: 0, //��ʼ��ʱ������x
        startY: 0, //��ʼ��ʱ������y
        indicators: false, //�Ƿ���ʾ������
        deceleration:0.0006, //����ϵ��,ϵ��ԽС����Խ����
        bounce: true //�Ƿ����ûص�
    };
    mui('.mui-scroll-wrapper').scroll(muiScrollOptions);
    /*�״μ�����Ⱦ����*/
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
    /*���a��ǩע�����¼�*/
    $('.first_ca ul').on('tap','a', function () {
        var $li = $(this).parent();
        var cateId = $li.data('id');
        console.log(cateId);
        $li.addClass('now').siblings().removeClass('now');
        /*��Ⱦ�Ҳ�����*/
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