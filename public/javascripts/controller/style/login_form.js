var oLoginBtn = $(".log_in_btn");
var oLgAltFrameBg = $(".lg_alt_frame_bg");
var oLoginAltFrame = $(".login_alt_frame");
var oCloseLaf = $(".close_laf");

var oRegisterBtn = $(".register_btn");
var oRegistLink = $(".regist_link");

var oLoginEmail = document.getElementById("login_email");
var oLoginPassword = document.getElementById("login_password");
var oReminderInfo = document.getElementById("reminder_info");
var oLafmLoginBtn = document.getElementById("lafm_login_btn");

oLoginBtn.click(function () {
    oLgAltFrameBg.css("display", "block");
    oLoginAltFrame.css("display", "block");
});

oCloseLaf.click(function () {
    oLoginEmail.value = "";
    oLoginPassword.value = "";
    oLgAltFrameBg.css("display", "none");
    oLoginAltFrame.css("display", "none");
});

oLafmLoginBtn.onclick = function () {
    if (oLoginEmail.value.length == 0) {
        oReminderInfo.innerHTML = "请输入邮箱账号";
    } else {
        var emailRegex = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
        if (!emailRegex.test(oLoginEmail.value)) {
            oReminderInfo.innerHTML = "邮箱格式不正确";
        } else {
            if (oLoginPassword.value.length == 0) {
                oReminderInfo.innerHTML = "请输入密码";
            } else {
                oReminderInfo.innerHTML = null;
                $.ajax({
                    url: ipAndHost + '/gdmusicserver/user/service/@login',
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        email: oLoginEmail.value,
                        password: oLoginPassword.value
                    },
                    error: function () {
                        customAlert("网络请求错误，请稍候重试");
                    },
                    success: function (result) {
                        if (!result.is_success) {
                            oReminderInfo.innerHTML = "用户名或密码不正确！";
                        } else {
                            oReminderInfo.innerHTML = "";
                            var uResult = result.result;
                            $.cookie("uId", uResult.id, {
                                path: '/',//cookie的作用域
                                expires: 7
                            });
                            window.location.href = "index.html";
                        }
                    }
                });
            }
        }
    }
};

oRegisterBtn.click(function () {
    window.location.href = "register.html";
});

oRegistLink.click(function () {
    window.location.href = "register.html";
});


