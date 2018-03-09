var oNickname = document.getElementById("nickname");
var oNicknameReminder = document.getElementById("nickname_reminder");
var oIntroduction = document.getElementById("introduction");
var oResidueText = document.getElementById("residue_text");
var oChangeHpBtn = document.getElementById("change_hp_btn");
var oUpload = document.getElementById("upload");

var oSelectGender = document.getElementById("select_gender");
var aSGLabel = oSelectGender.getElementsByTagName("label");

var oYear = document.getElementById("year");
var oMonth = document.getElementById("month");
var oDay = document.getElementById("day");

var oSelProvince = document.getElementById("selProvince");
var oSelCity = document.getElementById("selCity");

var oUserHeadPhoto = document.getElementById("user_head_photo");

function timestampToTime(timestamp) {
    var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    Y = date.getFullYear();
    M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    D = date.getDate();
    h = date.getHours();
    m = date.getMinutes();
    s = date.getSeconds();
    var dateOfBirth = {
        year: Y,
        month: M,
        day: D,
        hour: h,
        minute: m,
        second: s
    };
    return dateOfBirth;
}

$.ajax({
    url: 'http://localhost:7200/gdmusicserver/user/service/info/@get',
    type: 'POST',
    dataType: 'json',
    data: {
        uID: $.cookie("uId")
    },
    error: function () {
        alert("网络请求错误，请稍候重试！");
    },
    success: function (result) {
        if (!result.is_success) {
            alert(result.message);
        } else {
            var user = result.result;
            oNickname.value = user.nickname;
            oIntroduction.value = user.introduction;
            var residueText = 150 - user.introduction.length;
            oResidueText.innerHTML = "" + residueText;
            for (var i = 0; i < aSGLabel.length; i++) {
                var oGender = aSGLabel[i].getElementsByClassName("gender")[0];
                if ((i + 1) == user.sex) {
                    oGender.checked = "checked";
                } else {
                    oGender.checked = null;
                }
            }
            var oDOfB = timestampToTime(user.date_of_birth / 1000);
            oYear.value = oDOfB.year;
            oMonth.value = oDOfB.month;
            oDay.value = oDOfB.day;
            oSelProvince.value = user.province;
            provinceChange();
            oSelCity.value = user.city;
            var allImgExt = ".jpg|.jpeg|.bmp|.png";
            if (user.head_photo.toLowerCase().match(allImgExt) == null) {
                oUserHeadPhoto.src = "/images/headphoto/default_head_photo.png";
            } else {
                oUserHeadPhoto.src = user.head_photo;
            }
        }
    }
});

oNickname.onblur = function () {
    var nicknameValue = oNickname.value;
    console.log(nicknameValue);
    if (nicknameValue == "") {
        oNicknameReminder.style.display = "block";
        oNicknameReminder.innerText = "昵称不能为空，且长度控制在20个字符以内";
    } else if (nicknameValue.length > 20) {
        oNicknameReminder.style.display = "block";
        oNicknameReminder.innerText = "亲的昵称太长了，长度请控制在20个字符以内";
    } else {
        oNicknameReminder.style.display = "none";
    }
};


oIntroduction.onfocus = function () {
    oIntroduction.onkeydown = function () {
        var introductionValue = oIntroduction.value;
        var residueText = 150 - introductionValue.length;
        oResidueText.innerHTML = "" + residueText;
        if (residueText < 0) {
            oResidueText.innerHTML = "字数超出";
            oIntroduction.style.color = "#C20C0C";
        } else {
            oIntroduction.style.color = "#333333";
        }
    };
};

oChangeHpBtn.onclick = oUpload.onclick = function () {
    window.location.href = "changeHeadPhoto.html";
};



