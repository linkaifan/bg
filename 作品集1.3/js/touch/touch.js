$(document).ready(function(){

    // 拨号，复制
    var WechatHang = new Clipboard('#wechatCopyHang');
    WechatHang.on('success', function(e) {
    e.clearSelection();
    alert('复制成功~')
    });
    WechatHang.on('error', function(e) {
    console.log('error')
    });

    var emailHang = new Clipboard('#emailCopyHang');
    emailHang.on('success', function(e) {
    e.clearSelection();
    alert('复制成功~')
    });
    emailHang.on('error', function(e) {
    console.log('error')
    });

    var WechatHui = new Clipboard('#wechatCopyHui');
    WechatHui.on('success', function(e) {
    e.clearSelection();
    alert('复制成功~')
    });
    WechatHui.on('error', function(e) {
    console.log('error')
    });

    var emailHui = new Clipboard('#emailCopyHui');
    emailHui.on('success', function(e) {
    e.clearSelection();
    alert('复制成功~')
    });
    emailHui.on('error', function(e) {
    console.log('error')
    });

   //填充数据
    $.ajax({
        url:'http://139.199.18.137:7777/api/colleagues',
        type: 'GET',
        dataType: 'json',


        success: function (data) {
            // 改图片地址
            for(let i =0;i<data.data.length;i++){
                data.data[i].pic = data.data[i].pic.replace(/image\//g,'http://139.199.18.137:7777/upload/image/');
            }
            // 填充数据
            var myTemplate = Handlebars.compile($("#table-template").html());
            $('#personList').html(myTemplate(data.data));
        },


        error : function (error) {
            alert(error)
        }

    });
    
})