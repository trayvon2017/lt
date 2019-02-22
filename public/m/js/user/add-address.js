/**
 * Created by cfb on 2019/2/22.
 */
$(function () {

    var add = true;
    /*渲染页面*/
    var search = location.search;
    var id;
    if(search.indexOf('?')!=-1){
        search = search.substr(1);
        console.log(search);
        var temparr1 = search.split('&');
        for(var i=0;i<temparr1.length;i++){
            var temparr2 = temparr1[i].split('=');
            if(temparr2[0] && temparr2[0] == 'id'){
                id = decodeURIComponent(temparr2[1]);
            }
        }
    }
    if(id){
        $('h4').html('修改地址');
        $('button').html('修改');
        add = false;
        /*查询数据*/
        /*查询地址*/
        ifLoginAjaxRequest({
            url: '/address/queryAddress',
            data: '',
            type: 'GET',
            dataType: 'json',
            callback: function(data){
                if(data.length && data.length>0){
                    var flag = false;
                    for(var i=0 ;i<data.length ;i++){
                        if(id == data[i].id){
                            /*回显数据*/
                            $('#name').val(data[i].recipients);
                            $('#postCode').val(data[i].postCode);
                            $('#area').val(data[i].address);
                            $('#address').val(data[i].addressDetail);
                            flag = true;
                            break;
                        }
                    }
                    if(!flag){
                        mui.toast('网络异常,请稍后重试');
                        location.href = '/m/user/address.html';
                    }
                }else{
                    mui.toast('网络异常,请稍后重试');
                    location.href = '/m/user/address.html';
                }
            }
        });
    }
    $('button').on('tap', function () {
        var name = $.trim($('#name').val());
        /*判断*/
        if(!name){
            mui.toast('请输入名字');
            return;
        }
        var postCode = $.trim($('#postCode').val());
        if(!postCode){
            mui.toast('请输入邮编');
            return;
        }else{
            /*邮编正则验证*/
            var reg = new RegExp("[0-9]{6}");//从头到尾都不是数字
            if(!reg.test($.trim($('#postCode').val()))){
                mui.toast('邮编格式不正确,如不清楚请输入000000');
                return;
            }
        }
        var area = $.trim($('#area').val());
        if(!area){
            mui.toast('请选择地区');
            return;
        }
        var address = $.trim($('#address').val());
        if(!address){
            mui.toast('请输入详细地址');
            return;
        }
        /*ajax保存地址*/
        var data = {
            address: area,
            addressDetail: address,
            recipients: name,
            postcode: postCode
        };
        /*默认访问的是添加页面*/
        var url = '/address/addAddress';
        if(!add){
            data.id = id;
            url = '/address/updateAddress';
        }
        /*
        * address  三级联动地址
         addressDetail  详细地址
         recipients 收货人
         postcode 邮编*/
        ifLoginAjaxRequest({
            url: url,
            type: 'POST',
            data: data,
            dataType: 'json',
            callback: function (data) {
                if(data.success && data.success == true){
                    if(add){
                        mui.toast('添加成功');
                    }else{
                        mui.toast('修改成功');
                    }
                    setTimeout(function () {
                        location.href = '/m/user/address.html';
                    },2000);

                }
            }
        });
    });
    $('#area').on('tap', function () {
        console.log(123)
        var picker = new mui.PopPicker({
            layer:3
        });
        picker.setData(cityData);
        /*picker.pickers[0].setSelectedIndex(4);
        picker.pickers[1].setSelectedIndex(1);
        picker.pickers[2].setSelectedIndex(1);*/
        picker.show(function(SelectedItem) {
            /*
            * 0: {value: "110000", text: "北京市", children: Array(1)}
             1: {value: "110101", text: "北京市", children: Array(19)}
             2: {value: "110101", text: "东城区"}
             */
            console.log(SelectedItem);
            var area = '';
            for(var i=0;i<SelectedItem.length;i++){
                area += SelectedItem[i].text+' ';
            }
            $('#area').val(area);
            picker.dispose();
        })
    });
});