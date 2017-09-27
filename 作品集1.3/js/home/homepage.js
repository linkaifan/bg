

//登录框
(function() {
    window.onload = function() {
        myAlert();
        
    }

    function myAlert() {
        var oLoginBtn = document.getElementById('loginBtn');
        oLoginBtn.onclick = function() {
            //遮罩层
            var sHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
            var sWidth = document.documentElement.scrollWidth || document.body.scrollWidth;
            var oMask = document.createElement("div");
            oMask.id = "mask";
            oMask.style.height = sHeight + "px";
            oMask.style.width = sWidth + "px";
            document.body.appendChild(oMask);
            oMask.addEventListener('touchmove', function(event) {
                event.preventDefault();
            }, false);
            //登录框
            var oAlert = document.createElement("div");
            oAlert.id = "alertbox";
            oAlert.className = "moveIn";
            document.body.appendChild(oAlert);
            oAlert.innerHTML = "<img alt='close' id='alertClose' src='img/home/BTN关闭.png'><a href='#' id='signIn'>注册账号</a><div class='alertboxContent'><img alt='vtmerLogin' src='img/home/vtmerLogin.png'><p>管理员登录</p><form id='Form'><ul><li><input id='useremail' name='yourname' placeholder='账号' type='text'/></li><li><input id='psw' name='yourpassword' placeholder='密码' type='password'/></li><li id='Msg'><span> 登录失败！请检查账号密码。</span></li></ul><input id='submitBTN' name='submitBTN' type='button' value='登录'></form> </div>";
            myLogin();
            mySignin();
            //关闭
            var oClose = document.getElementById("alertClose");
            oClose.onclick = function() {
                document.body.removeChild(oMask);
                document.body.removeChild(oAlert);
            }
        }
    }
    //注册框
    function mySignin() {
        var oSigninA = document.getElementById("signIn");
        oSigninA.onclick = function() {
            var oSignin = document.createElement("div");
            oSignin.id = "signinBOX";
            oSignin.className = "moveIn";
            document.body.appendChild(oSignin);
            oSignin.innerHTML = "<img src='img/home/BTN关闭.png'alt='close'id='closesignin'><div id='signinboxContent'><p>Sign In</p><form id='signinForm'><ul class='email'><li><input type='email' name='' value='' placeholder='请输入邮箱'></li><li><span id='EmailMsg'>请输入正确邮箱<span></li></ul><input type='password' name='first' placeholder='请输入密码' ><ul class='password'><li><input type='password' name='second' placeholder='再次输入密码'></li><li><span id='PswMsg'>两次密码不一致</span></li></ul></form><input type='button' value='注册' id='signinBtn'></div>";
            testInputs();
            var oClose2 = document.getElementById("closesignin");
            oClose2.onclick = function() {
                document.body.removeChild(oSignin);
            }
        }
    }
    //表单验证
    function testInputs() {
        var oForm = document.getElementById("signinForm");
        var aInput = oForm.getElementsByTagName("input");
        var oEmail = aInput[0];
        var oPsw1 = aInput[1];
        var oPsw2 = aInput[2];
        var oMsg1 = document.getElementById("EmailMsg");
        var oMsg2 = document.getElementById("PswMsg");
        //验证邮箱格式
        oEmail.onblur = function() {
                var re_a = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                if (!re_a.test(this.value)) {
                    oMsg1.style.display = "block";
                } else {
                    oMsg1.style.display = "none";
                }
            }
            //失去焦点时确认密码验证是否一致
        oPsw2.onblur = function() {
            if (this.value != oPsw1.value) {
                oMsg2.style.display = "block";
            } else {
                oMsg2.style.display = "none";
            }
        }
    }
})();