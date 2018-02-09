var oRegisterStep = document.getElementById("register_step");
var oRegisterUl = oRegisterStep.getElementsByTagName("ul")[0];
var oRULis = oRegisterUl.getElementsByTagName("li");

var oFirstStepForm = document.getElementById("first_step_form");
var oRegisterEmail = document.getElementById("register_email");
var oReminderRegisterEmail = document.getElementById("reminder_register_email");
var oEmailCode = document.getElementById("email_code");
var oSendEmailBtn = document.getElementById("send_email_btn");
var oReminderEmailCode = document.getElementById("reminder_email_code");
var oFirstNextStepLink = document.getElementById("first_next_step_link");
var oSecondStepForm = document.getElementById("second_step_form");
var oNickname = document.getElementById("nickname");
var oReminderNickname = document.getElementById("reminder_nickname");
var oPassword = document.getElementById("password");
var oReminderPassword = document.getElementById("reminder_password");
var oRePassword = document.getElementById("re_password");
var oReminderRePassword = document.getElementById("reminder_re_password");
var oSecondNextStepLink = document.getElementById("second_next_step_link");
var oFinishStepForm = document.getElementById("finish_step_form");
var oGender = document.getElementsByName("gender");
var oYear = document.getElementById("year");
var oMonth = document.getElementById("month");
var oDay = document.getElementById("day");
var oSelProvince = document.getElementById("selProvince");
var oSelCity = document.getElementById("selCity");
var oFinishStepLink = document.getElementById("finish_step_link");

var timer = null;

oSendEmailBtn.onclick = function () {
    if (oRegisterEmail.value.length == 0) {
        oReminderRegisterEmail.innerHTML = "请输入邮箱号";
    } else {
        var emailRegex = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
        if (!emailRegex.test(oRegisterEmail.value)) {
            oReminderRegisterEmail.innerHTML = "邮箱格式不正确";
        } else {
            oReminderRegisterEmail.innerHTML = "";
            if (oSendEmailBtn.value != "发送") {
            } else {
                var countDown = 60;
                timer = setInterval(function () {
                    countDown--;
                    if (countDown == 0) {
                        oSendEmailBtn.value = "发送";
                        clearInterval(timer);
                    } else {
                        oSendEmailBtn.value = "(" + countDown + ")后重发";
                    }
                }, 1000);
            }
        }
    }
};

oFirstNextStepLink.onclick = function () {
    if (oEmailCode.value.length == 0) {
        oReminderEmailCode.value = "请输入邮箱验证码";
    } else {
        if (oEmailCode.value != "1111") {
        } else {
            oRULis[0].style.border = "1px solid #C6C6C6";
            oRULis[0].style.backgroundColor = "#F7F7F7";
            oRULis[0].getElementsByTagName("div")[0].className = "step_number";
            oRULis[0].getElementsByTagName("span")[0].className = "step_text";
            oRULis[1].style.borderTop = "1px solid #C20C0C";
            oRULis[1].style.backgroundColor = "#FFFFFF";
            oRULis[1].getElementsByTagName("div")[0].className = "step_number step_outline";
            oRULis[1].getElementsByTagName("span")[0].className = "step_text step_text_outline";
            oFirstStepForm.style.display = "none";
            oSecondStepForm.style.display = "block";
        }
    }
};

oSecondNextStepLink.onclick = function () {
    if (oNickname.value.length == 0) {
        oReminderNickname.innerHTML = "请输入昵称";
    } else if (oNickname.value.length > 20) {
        oReminderNickname.innerHTML = "请控制昵称长度在20个字符以内";
    } else {
        oReminderNickname.innerHTML = "";
        if (oPassword.value.length == 0) {
            oReminderPassword.innerHTML = "请输入密码";
        } else if (oPassword.value.length > 50) {
            oReminderPassword.innerHTML = "密码过长，请控制在50个字符以内";
        } else {
            oReminderPassword.innerHTML = "";
            if (oRePassword.value.length == 0) {
                oReminderRePassword.innerHTML = "请输入确认密码";
            } else {
                if (oRePassword.value != oPassword.value) {
                    oReminderRePassword.innerHTML = "密码与确认密码不同";
                } else {
                    oReminderRePassword.innerHTML = "";
                    oRULis[1].style.border = "1px solid #C6C6C6";
                    oRULis[1].style.backgroundColor = "#F7F7F7";
                    oRULis[1].getElementsByTagName("div")[0].className = "step_number";
                    oRULis[1].getElementsByTagName("span")[0].className = "step_text";
                    oRULis[2].style.borderTop = "1px solid #C20C0C";
                    oRULis[2].style.backgroundColor = "#FFFFFF";
                    oRULis[2].getElementsByTagName("div")[0].className = "step_number step_outline";
                    oRULis[2].getElementsByTagName("span")[0].className = "step_text step_text_outline";
                    oSecondStepForm.style.display = "none";
                    oFinishStepForm.style.display = "block";
                }
            }
        }
    }
};

oFinishStepLink.onclick = function () {
    console.log(oRegisterEmail.value);
    console.log(oNickname.value);
    console.log(oPassword.value);
    for (var i = 0; i < oGender.length; i++) {
        if (oGender[i].checked) {
            console.log(oGender[i].value);
        }
    }
    console.log(oYear.value + "-" + oMonth.value + "-" + oDay.value);
    console.log(oSelProvince.value);
    console.log(oSelCity.value);
};


