$(function () {
    /*��ʼ������������*/
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
    /*��ʼ���Զ��ֲ�*/
    //���slider�������
    var gallery = mui('.mui-slider');
    gallery.slider({
        interval:2000//�Զ��ֲ����ڣ���Ϊ0���Զ����ţ�Ĭ��Ϊ0��
    });
});
