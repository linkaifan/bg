
function myLogin() {
    $("#submitBTN").click(function() {
        var email = $("#useremail").val();
        var password = $("#psw").val();
        if (email == "") {
            alert("请输入用户名");
            return false;
        } else if (password == "") {
            alert("请输入密码");
            return false;
        }
        $.ajax({
            type: "POST",
            url: "http://139.199.18.137:7777/api/login",
            data: "email=" + email + "&password=" + password,
            dataType: 'json',
            success: function(data) {
               /* $("body").children("#mask").remove();
                $("body").children("#alertbox").remove();
                $("#loginBtn").attr("src", "img/home/BTN-LOG2.png");//右上角登录头像变*/
                sessionStorage.setItem("token", data.data); 
                window.location.href="administrate.html";
            },
            error: function(err) {
                $("#Msg").css("display", "block");
            }
        });
    });
}