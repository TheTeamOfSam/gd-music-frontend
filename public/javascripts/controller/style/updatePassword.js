var oOldPassword = document.getElementById("old_password");
var oNewPassword = document.getElementById("new_password");
var oReNewPassword = document.getElementById("re_new_password");
var oOldPasswordReminder = document.getElementById("old_password_reminder");
var oNewPasswordReminder = document.getElementById("new_password_reminder");
var oReNewPasswordReminder = document.getElementById("re_new_password_reminder");

var oSavePwdBtn = document.getElementById("save_pwd_btn");

oOldPassword.onblur = function () {
    var oldPasswordValue = oOldPassword.value;
    if (oldPasswordValue == "") {
        oOldPasswordReminder.innerHTML = "亲，原密码不能为空！";
    } else {
        oOldPasswordReminder.innerHTML = "";
    }
};

oNewPassword.onblur = function () {
    var newPasswordValue = oNewPassword.value;
    if (newPasswordValue == "") {
        oNewPasswordReminder.innerHTML = "亲，新密码不能为空！";
    } else if (newPasswordValue.length > 20) {
        oNewPasswordReminder.innerHTML = "请，密码长度请控制在20个字符以内！";
    } else {
        oNewPasswordReminder.innerHTML = "";
    }
};

oReNewPassword.onblur = function () {
    var newPasswordValue = oNewPassword.value;
    var reNewPasswordValue = oReNewPassword.value;
    if (newPasswordValue == "") {
        oReNewPasswordReminder.innerHTML = "亲，请填写上面的新密码！";
    } else {
        if (reNewPasswordValue == "") {
            oReNewPasswordReminder.innerHTML = "亲，确认密码不能为空！";
        } else if (reNewPasswordValue != newPasswordValue) {
            oReNewPasswordReminder.innerHTML = "亲，确认密码和新密码不同！";
        } else {
            oReNewPasswordReminder.innerHTML = "";
        }
    }
};

oSavePwdBtn.onclick = function () {
    $.ajax({
        url: ipAndHost + '/gdmusicserver/user/service/password/@reset',
        type: 'POST',
        dataType: 'json',
        data: {
            uId: $.cookie("uId"),
            oldPassword: oOldPassword.value,
            newPassword: oNewPassword.value
        },
        error: function () {
            alert("网络请求错误，请稍后重试！");
        },
        success: function (data) {
            if (!data.is_success) {
                alert(data.message);
            } else {
                window.location.href = "settings.html";
            }
        }
    });
};


